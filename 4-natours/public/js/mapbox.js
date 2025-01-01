/* eslint-disable */

document.addEventListener('DOMContentLoaded', function() {
  // Get locations from HTML dataset
  const locations = JSON.parse(
    document.getElementById('map').dataset.locations
  );

  // Create the map and attach it to the #map element
  const map = L.map('map', {
    zoomControl: true, // Enable zoom control buttons
    minZoom: 1, // Set minimum zoom level
    maxZoom: 18 // Set maximum zoom level
  });

  // Add OpenStreetMap tile layer to the map
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Create a LatLngBounds object to calculate bounds
  const bounds = L.latLngBounds();

  // Loop through each location in the locations array
  locations.forEach(loc => {
    const [lng, lat] = loc.coordinates; // Extract longitude and latitude

    // Add the location to the bounds for fitting later
    bounds.extend([lat, lng]);

    // Create a custom marker with the 'marker' class (optional if you want custom styles)
    const markerElement = document.createElement('div');
    markerElement.classList.add('marker'); // Add the 'marker' class for custom styling

    // Add a marker to the map with the specified coordinates
    const marker = L.marker([lat, lng], {
      icon: L.divIcon({
        html: markerElement.outerHTML,
        className: 'leaflet-div-icon'
      })
    })
      .addTo(map) // Add marker to the map
      .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
        autoClose: false,
        className: 'mapPopup'
      })
      .on('mouseover', function() {
        this.openPopup(); // Open popup on hover
      })
      .on('mouseout', function() {
        this.closePopup(); // Close popup on mouseout
      })
      .openPopup(); // Open the popup immediately
  });

  // Fit the map bounds to include all locations
  map.fitBounds(bounds, { padding: [50, 50] }); // Add padding for a better view
});
