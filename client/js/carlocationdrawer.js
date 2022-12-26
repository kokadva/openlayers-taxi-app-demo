import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import {Feature, Overlay} from "ol";
import {Point} from "ol/geom";
import {Icon, Style} from "ol/style";

const getVectorSource = () => {
    return new VectorSource();
}

const getVectorLayer = () => {
    return new VectorLayer({
        source: getVectorSource()
    })
}

const popupElement = document.getElementById('popup');


const carIconStyle = new Style({
    image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'static/car.png',
    }),
});

const getPopupOverlay = () => {
    return new Overlay({
        element: popupElement,
        positioning: 'bottom-center',
        stopEvent: false,
    });
}

export class CarLocationDrawer {

    constructor(map, popupDrawer) {
        this.map = map;
        this.popupDrawer = popupDrawer;
        this.vectorLayer = getVectorLayer();
        this.map.addLayer(this.vectorLayer);
    }

    addToMap(carsData) {
        let vectorSource = this.vectorLayer.getSource();
        let popupDrawer = this.popupDrawer;
        vectorSource.clear();
        popupDrawer.clear();

        carsData.cars.forEach((carInfo) => {
            const coordinates = [carInfo.location.longitude, carInfo.location.latitude];
            const carPoint = new Feature(new Point(coordinates));
            const popupDrawer = this.popupDrawer;
            carPoint.setStyle(carIconStyle);
            vectorSource.addFeature(carPoint);
            popupDrawer.addPopup(carInfo)
        })
    }


}