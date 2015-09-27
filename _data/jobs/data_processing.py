import os.path
import json
import urllib

# Imports data and stores it in an array
def import_data(filename):
    array = []
    with open (filename, 'r') as file:
        for line in file:
            if(line.strip() != ''):
                array.append(str(line.replace('\n', '')))
    return array

# Exports data array into a file
def export_data(path, filename, data):
    if not os.path.exists(path):
        os.makedirs(path)

    with open(path + '/' + filename, 'wb') as file:
        if(type(data) == dict):
            json.dump(data, file, sort_keys=True, indent=2, ensure_ascii=False)

        elif(type(data) == list):
            for d in data:
                file.write(d + '\n')

        else:
            file.write(data)

# Get response from endpoint
def get_response(url):
    response = urllib.urlopen(url)
    data = json.loads(response.read())
    return data
