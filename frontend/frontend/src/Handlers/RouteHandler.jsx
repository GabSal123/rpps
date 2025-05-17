// RouteHandler.js
let selectedIds = [];
let selectedType = null;
let markers = [];

const selectCargo = (cargoId, type, coordinates) => {
  const updatedSelectedIds = [...selectedIds];
  const index = updatedSelectedIds.indexOf(cargoId);

  if (index > -1) {
    updatedSelectedIds.splice(index, 1);
    markers = markers.filter(marker => marker.id !== cargoId);
  } else {
    updatedSelectedIds.push(cargoId);
    markers = [...markers, { id: cargoId, ...coordinates }];
  }

  selectedIds = updatedSelectedIds;
  selectedType = updatedSelectedIds.length > 0 ? type : null;
};

const getSelectedIds = () => selectedIds;
const getSelectedType = () => selectedType;
const getMarkers = () => markers;

const generateMapUrl = () => {
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
  const apiKey = "API_KEY";

  return `${baseUrl}?key=${apiKey}&origin=${origin}&destination=${destination}${waypoints ? `&waypoints=${waypoints}` : ''}`;
};

export default {
  selectCargo,
  generateMapUrl,
  getSelectedIds,
  getSelectedType,
  getMarkers,
};
