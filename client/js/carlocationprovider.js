
export class CarLocationProvider {

    constructor(url) {
        this.url = url;
        this.callbacks = []
        this.timer = null;
    }

    onNewLocation(callback) {
        this.callbacks.push(callback);
    }

    getLocations(url, callbacks) {
        fetch(url)
            .then((data) => data.json())
            .then((data) => callbacks.forEach((c) => c(data)))
            .catch((e) => console.log(e))
    }

    start() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setInterval(() => this.getLocations(this.url, this.callbacks), 2 * 1000);
    }

    stop() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }


}