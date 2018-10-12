import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ClientPage } from '../client/client';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import {Http,Headers} from '@angular/http';
import { SettingsPage } from '../settings/settings';
/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  lat;
  long;
  constructor(public navCtrl: NavController, public navParams: NavParams,private geolocation: Geolocation,private storage: Storage,private http:Http) {
    this.geolocation.getCurrentPosition().then((resp) => {
      //console.log('lat');
      //console.log('long');
      this.lat=resp.coords.latitude;
      this.long=resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }
  opendriver(){
    this.navCtrl.push(HomePage);
  }
  openclient(){
    this.navCtrl.push(ClientPage);
  }
  opensettings(){
    this.navCtrl.push(SettingsPage);

  }
  update(){
   // this.storage.remove('mobile');
    this.storage.get('mobile').then((val) => {
      if(!val)
      {
        alert("You are not regisered yet");
      }
      else{
        let headers=new Headers();   
        headers.append('Access-Control-Allow-Origin','*');
        headers.append('Access-Control-Allow-Headers' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept','application/json');
        headers.append('Access-Control-Allow-Credentials','*');
        headers.append('content-type','application/json');
        
        this.storage.get('port').then((val) => {
          this.storage.get('ip').then((val1) => {
        let body={
          ID:parseInt(val),
          Latitude:this.lat,
          Longitude:this.long,
          //Latitude:"125.32",
          //Longitude:"120.41",
          //SearchParameter:"10"    
        };
        this.http.post('http://'+val1+':'+val+'/update_transport_location',JSON.stringify(body),{headers:headers}).subscribe(data=>{
          console.log(data);
        });
      });
    });


      }
      
    });
  }

}
