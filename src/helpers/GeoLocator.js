export default class GeoLocator {

  constructor(){
    if (this.apiSupported()){
      this.navigator = navigator;
      this.isSupported = true;
    } else {
      this.isSupported = false;
    }
  }

  apiSupported() {
    return 'geolocation' in navigator;
  }

  getCurrentPosition(){
    return new Promise((resolve, reject) => {
      this.navigator.geolocation.getCurrentPosition(position => {
        resolve(position);
      }, () => {
        reject("Unable to get location");
      }, {
        enableHighAccuracy: true
      })
    });
  }
}