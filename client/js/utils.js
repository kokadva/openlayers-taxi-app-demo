import {transform} from "ol/proj";


const SRC_PROJECTION = 'EPSG:3857';
const DEST_PROJECTION = 'EPSG:4326';

export const transformCoordinates = (coordinates) => {
    return transform(coordinates, DEST_PROJECTION, SRC_PROJECTION)
}