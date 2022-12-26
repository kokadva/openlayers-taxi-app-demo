import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {OSM, XYZ} from 'ol/source.js';
import {Tile as TileLayer} from 'ol/layer.js';
import {CarLocationProvider} from "./carlocationprovider";
import {CarLocationDrawer} from "./carlocationdrawer";
import {PopupDrawer} from "./popupdrawer";

const rasterLayer = new TileLayer({
    source: new OSM(),
});

const key = 'U4TB1Bcgau3wRomRNAcU';

const aerial = new XYZ({
    url: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=' + key,
    maxZoom: 20,
    crossOrigin: '',
});

const satelliteLayer = new TileLayer({
    source: aerial
})

satelliteLayer.setVisible(false);

const map = new Map({
    layers: [rasterLayer, satelliteLayer],
    target: 'map',
    view: new View({
        center: [4980064.771340098, 5119423.052469303],
        zoom: 14
    }),
});

const url = "http://localhost:3000/cars"
let carLocationProvider = new CarLocationProvider(url);
let popupDrawer = new PopupDrawer(map);
let carLocationDrawer = new CarLocationDrawer(map, popupDrawer);
carLocationProvider.onNewLocation((d) => carLocationDrawer.addToMap.call(carLocationDrawer, d));
carLocationProvider.start()

map.on("moveend", (evt) => popupDrawer.update());
map.on("movestart", (evt) => popupDrawer.update());
map.on("pointerdrag", (evt) => popupDrawer.update());
map.on("change:view", (evt) => popupDrawer.update());


let rad = document.layersForm.layers;

const layers = {
    "osm": rasterLayer,
    "areal": satelliteLayer
}

const updateLayers = () => {
    rad.forEach((r)=> layers[r.value].setVisible(r.checked));
}

rad.forEach((r) => r.addEventListener('change', updateLayers));
