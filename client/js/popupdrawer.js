import {Overlay} from "ol";

const popupElement = document.getElementById('popup');
const popup = new Overlay({
    element: popupElement,
    positioning: 'bottom-center',
    stopEvent: false
});

export class PopupDrawer {

    constructor(map) {
        this.map = map;
        this.map.addOverlay(popup);
        this.popover = undefined;
    }

    clear() {
        if (this.popover) this.popover.dispose();
        this.popover = undefined;
    }

    addPopup(carInfo) {
        const coordinates = [carInfo.location.longitude, carInfo.location.latitude];
        popup.setPosition(coordinates);
        this.popover = new bootstrap.Popover(popupElement, {
            placement: 'top',
            html: true,
            content: `<div><p>${carInfo.name}</p> <br/> <img width="50px" height="50px" src="${carInfo.imageUrl}"/> </br> <p>Status: ${carInfo.status}</p></div>`,
        });
        this.popover.show();

    }
}