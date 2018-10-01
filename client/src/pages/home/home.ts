import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HomeService } from './home.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HomeService]
})
export class HomePage {
  rockets: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private geolocation: Geolocation,private homeService: HomeService ) {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('lat');
      console.log('long');
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });

     this.homeService.getData()
    .subscribe((data) => {
      this.rockets = data;
      console.log(this.rockets);
    })

    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RocketsPage');
  }
  
 


}
