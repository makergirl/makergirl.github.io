/**
 * Geocoder
 * Source: https://github.com/googlemaps/js-samples/blob/gh-pages/geocoder/v3-geocoder-tool.html
 */
var geocoder = new google.maps.Geocoder();

function submitQuery(query) {
  if (/\s*^\-?\d+(\.\d+)?\s*\,\s*\-?\d+(\.\d+)?\s*$/.test(query)) {
    var latlng = parseLatLng(query);
    if (latlng == null) {

    } else {
      geocode({ 'latLng': latlng });
    }
  } else {
    geocode({ 'address': query });
  }
}

/**
 * Prepare a geocoding request and send it to the API.
 * @param {!google.maps.GeocoderRequest} request Geocoding request.
 */
function geocode(request) {
  resetMap();
  var query = '';
  if (request.latLng) {
    clickMarker = new google.maps.Marker({
      'position': request.latLng,
      'map': map,
      'title': request.latLng.toString(),
      'clickable': false,
      'icon': clickIcon,
      'shadow': shadow
    });
    query = request.latLng.toUrlValue();
  } else {
    query = request.address;
  }
  geocoder.geocode(request, showResults);
}

/**
 * Build a permalink to represent the query and preferences.
 * @param {!string} query User-entered query.
 */
function getPermalink(query) {
  var hash = 'q=' + query;
  var vpbias = document.getElementById("biasViewport").checked;
  var country = document.getElementById("country").value;
  if (vpbias) {
    hash += '&vpcenter=' + map.getCenter().toUrlValue(6);
    hash += '&vpzoom=' + map.getZoom();
  }
  if (country) {
    hash += '&country=' + country;
  }
  return hash
}

function parseLatLng(value) {
  value.replace('/\s//g');
  var coords = value.split(',');
  var lat = parseFloat(coords[0]);
  var lng = parseFloat(coords[1]);
  if (isNaN(lat) || isNaN(lng)) {
    return null;
  } else {
    return new google.maps.LatLng(lat, lng);
  }
}

function showResults(results, status) {
  var reverse = (clickMarker != null);
  if (! results) {
    alert("Geocoder did not return a valid response");
  } else {
    document.getElementById("statusValue").innerHTML = status;
    document.getElementById("statusDescription").innerHTML = GeocoderStatusDescription[status];
    document.getElementById("responseInfo").style.display = "block";
    document.getElementById("responseStatus").style.display = "block";
    if (status == google.maps.GeocoderStatus.OK) {
      document.getElementById("matchCount").innerHTML = results.length;
      document.getElementById("responseCount").style.display = "block";
      plotMatchesOnMap(results, reverse);
    } else {
      if (! reverse) {
        map.setCenter(new google.maps.LatLng(0.0, 0.0));
        map.setZoom(1);
      }
    }
  }
}

function plotMatchesOnMap(results, reverse) {
  markers = new Array(results.length);
  var resultsListHtml = "";
  var openInfoWindow = function(resultNum, result, marker) {
    return function() {
      if (selected != null) {
        document.getElementById('p' + selected).style.backgroundColor = "white";
        clearBoundsOverlays();
      }
      map.fitBounds(result.geometry.viewport);
      infowindow.setContent(getAddressComponentsHtml(result.address_components));
      infowindow.open(map, marker);
      if (result.geometry.bounds) {
        boundsOverlay = new google.maps.Rectangle({
          'bounds': result.geometry.bounds,
          'strokeColor': '#ff0000',
          'strokeOpacity': 1.0,
          'strokeWeight': 2.0,
          'fillOpacity': 0.0
        });
        boundsOverlay.setMap(map);
        google.maps.event.addListener(boundsOverlay, 'click', onClickCallback);
        document.getElementById('boundsLegend').style.display = 'block';
      } else {
        boundsOverlay = null;
      }
      viewportOverlay = new google.maps.Rectangle({
          'bounds': result.geometry.viewport,
          'strokeColor': '#0000ff',
          'strokeOpacity': 1.0,
          'strokeWeight': 2.0,
          'fillOpacity': 0.0
        });
      viewportOverlay.setMap(map);
      google.maps.event.addListener(viewportOverlay, 'click', onClickCallback);
      document.getElementById('viewportLegend').style.display = 'block';
      document.getElementById('p' + resultNum).style.backgroundColor = "#eeeeff";
      document.getElementById('matches').scrollTop =
        document.getElementById('p' + resultNum).offsetTop -
        document.getElementById('matches').offsetTop;
      selected = resultNum;
    }
  }
  for (var i = 0; i < results.length; i++) {
    var icon = new google.maps.MarkerImage(
      getMarkerImageUrl(i),
      new google.maps.Size(20, 34),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 34)
    );
    markers[i] = new google.maps.Marker({
      'position': results[i].geometry.location,
      'map': map,
      'icon': icon,
      'shadow': shadow
    });
    google.maps.event.addListener(markers[i], 'click', openInfoWindow(i, results[i], markers[i]));
    resultsListHtml += getResultsListItem(i, getResultDescription(results[i]));
  }
  document.getElementById("matches").innerHTML = resultsListHtml;
  document.getElementById("p0").style.border = "none";
  document.getElementById("matches").style.display = "block";
  document.getElementById("suggestions").innerHTML = getPostcodeLocalitiesSuggestion(results[0]);
  document.getElementById("suggestions").style.display = "block";
  if (reverse){
      // make a smooth movement to the clicked position
      map.panTo(clickMarker.getPosition());
      google.maps.event.addListenerOnce(map, 'idle', function(){
        selectMarker(0);
      });
  }
  else {
      zoomToViewports(results);
      selectMarker(0);
  }
}

/**
 * Get suggestions for a postcode with multiple localities.
 * @param {!google.maps.GeocoderResult} resultDescription Geocoding result.
 */
function getPostcodeLocalitiesSuggestion(resultDescription) {
  if (resultDescription.types.indexOf("postal_code") == -1) return "";
  console.log(resultDescription.postcode_localities.length + " localities");
  var postcode = resultDescription.address_components[0].long_name;
  var html = '<span class="dym">Did you mean</span>: '
      + '<span class="pc_localities">' + postcode + ' in ';
  for (i in resultDescription.postcode_localities) {
      var locality = resultDescription.postcode_localities[i];
      html += '<a href="#' + escape(getPermalink(postcode + ' ' + locality)) + '">';
      html += locality + '</a>';
      html += (i == resultDescription.postcode_localities.length - 1 ? '.' : ', ');
  }
  return html;
}
/**
 * Get a nicely formatted result description.
 * @param {!google.maps.GeocoderResult} result Geocoding result.
 */
function getResultDescription(result) {
  var bounds = result.geometry.bounds;
  var html  = '<table class="tabContent">';
      html += tr('Address', result.formatted_address);
  if (result.postcode_localities) {
      html += tr('Localities', result.postcode_localities.join('<br/>'));
  }
      html += tr('Types', result.types.join(", "));
      html += tr('Location', result.geometry.location.toString());
      html += tr('Bounds', (bounds ? boundsToHtml(bounds) : "None"));
      html += tr('Viewport', boundsToHtml(result.geometry.viewport));
      html += tr('Location type', result.geometry.location_type);
      if (result.partial_match) {
        html += tr('Partial match', 'Yes');
      }
      html += '</table>';
  return html;
}
