'''
This job will fetch data, and store it as local files
'''

from data_processing import import_data, export_data, get_response

# Configurations
token_file = 'tokens.dat'
eids_file = 'eids.dat'
path = 'data/attendees'

# Main Function
def main():
    tokens = import_data(token_file)
    eids = import_data(eids_file)

    endpoints = []
    zipcodes = []
    locations = 'locations = [\n\n'

    i = 0
    for eid in eids:
        i += 1

        endpoint = get_endpoints(eid, tokens[0])
        endpoints.append(endpoint)
        print endpoint

        response = get_response(endpoint)
        export_data(path, eid + '.json', response)

        for r in response['attendees']:
            if(r['profile']):
                profile = r['profile']

                if(profile['addresses'] and profile['addresses']['bill'] and profile['addresses']['bill']['postal_code']):
                    zipcode = str(profile['addresses']['bill']['postal_code'])

                    # Remove duplicates
                    if(zipcode not in zipcodes):
                        zipcodes.append(zipcode)

                        # Check if last element
                        if(i == len(eids)):
                            locations += zipcode
                        else:
                            locations += zipcode + ',\n'

    locations += '\n]'

    export_data(path, 'zipcodes.dat', zipcodes)
    export_data(path, 'locations.js', locations)
    export_data('../../public/js/project/', 'locations.js', locations)

# Get attendees endpoints
def get_endpoints(eid, token):
    endpoint = 'https://www.eventbriteapi.com/v3/events/' + str(eid) + '/attendees/?token=' + str(token)
    return endpoint

main()
