import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {OSM} from 'ol/source.js';
import {Tile as TileLayer} from 'ol/layer.js';
import {CarLocationProvider} from "./carlocationprovider";
import {CarLocationDrawer} from "./carlocationdrawer";
import {PopupDrawer} from "./popupdrawer";

const raster = new TileLayer({
    source: new OSM(),
});

const map = new Map({
    layers: [raster],
    target: 'map',
    view: new View({
        center: [-11000000, 4600000],
        zoom: 4
    }),
});

const url = "http://localhost:3000/cars"
let carLocationProvider = new CarLocationProvider(url);
let popupDrawer = new PopupDrawer(map);
let carLocationDrawer = new CarLocationDrawer(map, popupDrawer);
carLocationProvider.onNewLocation((d) => carLocationDrawer.addToMap.call(carLocationDrawer, d));
carLocationProvider.start()
