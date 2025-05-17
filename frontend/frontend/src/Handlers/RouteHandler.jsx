const generateMapUrl = (markers, selectedIds, selectedType) => {
  if (markers.length < 1) return '';

  const orderedMarkers = selectedIds
    .map(id => markers.find(marker => marker.id === id))
    .filter(Boolean);

  if (orderedMarkers.length < 1) return '';

  const origin = `${orderedMarkers[0].startCoordinateX},${orderedMarkers[0].startCoordinateY}`;
  const destination = `${orderedMarkers[orderedMarkers.length - 1].endCoordinateX},${orderedMarkers[orderedMarkers.length - 1].endCoordinateY}`;

  const waypointCoords = [];

  for (let i = 0; i < orderedMarkers.length; i++) {
    const marker = orderedMarkers[i];
    const isFirst = i === 0;
    const isLast = i === orderedMarkers.length - 1;

    if (!isFirst) {
      waypointCoords.push(`${marker.startCoordinateX},${marker.startCoordinateY}`);
    }

    if (!isLast) {
      waypointCoords.push(`${marker.endCoordinateX},${marker.endCoordinateY}`);
    }
  }

  const waypoints = waypointCoords.join('|');

  const baseUrl = "https://www.google.com/maps/embed/v1/directions";
  const apiKey = "AIzaSyB90ez86DtlLQU3ZL9YKHD3ZPAq_fh-u28";

  return `${baseUrl}?key=${apiKey}&origin=${origin}&destination=${destination}${waypoints ? `&waypoints=${waypoints}` : ''}`;
};

export default {
  generateMapUrl,
};
