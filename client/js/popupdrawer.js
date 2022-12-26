import {Overlay} from "ol";

const popupElement = document.getElementById('popup');
const popup = new Overlay({
    element: popupElement,
    positioning: 'bottom-center',
    stopEvent: false
});

const getPopupContent = (carInfo) => {
    const box = document.createElement("div");

    box.setAttribute("class", "popup-window")
    box.setAttribute('height', "200px")
    box.setAttribute('width', "200px")
    const name = document.createElement("p")
    name.innerHTML = `Name: ${carInfo.name}`;
    box.appendChild(name)

    const img = document.createElement("img");
    img.setAttribute("src", carInfo.imageUrl);
    img.setAttribute("height", "25px");
    img.setAttribute("width", "25px");
    box.appendChild(img);

    const status = document.createElement("p")
    status.innerHTML = `Name: ${carInfo.status}`;
    box.appendChild(status)

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
        const coordinates = [carInfo.location.longitude, carInfo.location.latitude];
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