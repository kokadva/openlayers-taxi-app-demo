import {Overlay} from "ol";
import {transformCoordinates} from "./utils";

const popupElement = document.getElementById('popup');
const popup = new Overlay({
    element: popupElement,
    positioning: 'bottom-center',
    stopEvent: false
});

const getPopupContent = (carInfo) => {
    const box = document.createElement("div");
    box.setAttribute("class", "popup-window")

    const img = document.createElement("img");
    img.setAttribute("src", carInfo.imageUrl);
    box.appendChild(img);

    const name = document.createElement("div")
    name.innerHTML = `Name: ${carInfo.name}`;
    box.appendChild(name)


    const status = document.createElement("div")
    status.innerHTML = `Status: ${carInfo.status}`;
    box.appendChild(status)

    const date = document.createElement("div")
    date.innerHTML = `Date: ${carInfo.date}`;
    box.appendChild(date)

    return box.outerHTML;
}

export class PopupDrawer {

    constructor(map) {
        this.map = map;
        this.map.addOverlay(popup);
        this.popover = undefined;
        this.feature = null;
        this.carInfo = null;
    }

    clear() {
        if (this.popover) this.popover.dispose();
        this.popover = undefined;
    }

    addPopup(carInfo, feature) {
        let coordinates = [carInfo.location.longitude, carInfo.location.latitude];
        coordinates = transformCoordinates(coordinates);
        console.log(coordinates);
        popup.setPosition(coordinates);
        this.feature = feature;
        this.carInfo = carInfo;
        this.popover = new bootstrap.Popover(popupElement, {
            placement: 'top',
            html: true,
            content: getPopupContent(carInfo),
        });
        this.popover.show();
    }

    update() {
        this.clear();
        if (this.feature)
            this.addPopup(this.carInfo, this.feature);
    }
}