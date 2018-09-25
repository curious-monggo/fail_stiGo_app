
import { Injectable } from '@angular/core';
import { Hotspot } from '@ionic-native/hotspot';
import { AttendanceProvider } from './../attendance/attendance';
/*
  Generated class for the HotspotProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HotspotProvider {

  constructor(private hotspot: Hotspot, private attendanceProvider: AttendanceProvider) {
    console.log('Hello HotspotProvider Provider');
  }

  createHotspot(ssid:string, password:string){
    this.hotspot.createHotspot(ssid, 'WPA', password).then((onCreateHotspotSuccess => {
      console.log(onCreateHotspotSuccess);
    }), error => {
      console.log(error);
    });
  }
  removeWifiNetwork(ssid){
    this.hotspot.removeWifiNetwork(ssid);
  }

  connectToHotspot(ssid:string, password:string){
    this.hotspot.connectToWifi(ssid, password).then((onConnectToHotspotSuccess => {
      console.log(onConnectToHotspotSuccess);
      // this.attendanceProvider.signForAttendance();
    }),
    onRejected => {
      console.log(onRejected);
    })
  }

  getListOfHotspotDevices(){
    this.hotspot.getAllHotspotDevices().then((devices => {
      console.log(devices);
    }), onError => {
      console.log(onError);
    });
  }

}
