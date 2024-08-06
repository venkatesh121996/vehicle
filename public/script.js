const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: { lat: 17.385044, lng: 78.486671 }
  });
  
  const vehicleIcon = {
    url: 'vehicle-icon.png',
    scaledSize: new google.maps.Size(50, 50)
  };
  
  let vehicleMarker = new google.maps.Marker({
    map: map,
    icon: vehicleIcon
  });
  
  const pathCoordinates = [];
  const polyline = new google.maps.Polyline({
    path: pathCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  polyline.setMap(map);
  
  async function updateVehicleLocation() {
    try {
      const response = await fetch('/api/vehicle-location');
      const data = await response.json();
  
      const latestPoint = data[data.length - 1];
      const latLng = new google.maps.LatLng(latestPoint.latitude, latestPoint.longitude);
      vehicleMarker.setPosition(latLng);
      pathCoordinates.push(latLng);
      polyline.setPath(pathCoordinates);
    } catch (error) {
      console.error('Error fetching vehicle location data:', error);
    }
  }
  
  setInterval(updateVehicleLocation, 5000);
  
  updateVehicleLocation();
  