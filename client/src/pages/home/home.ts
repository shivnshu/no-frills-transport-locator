import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HomeService } from './home.service';
import {Http,Headers} from '@angular/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HomeService]
})
export class HomePage {
  lat: any;
  long:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private geolocation: Geolocation,private homeService: HomeService,private http:Http ) {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('lat');
      console.log('long');
      this.lat=resp.coords.latitude;
      this.long=resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });

     //this.homeService.getData()
    //.subscribe((data) => {
     // this.rockets = data;
     // console.log(this.rockets);
    //})

    
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RocketsPage');
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    let body={
      lattitude:String(this.lat),
      longitude:String(this.long)

    };
    this.http.post('http://httpbin.org/post',JSON.stringify(body),{headers:headers}).subscribe(data=>{
      console.log(data);
    });
  }
  
 


}
