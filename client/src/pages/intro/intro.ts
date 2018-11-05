import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ClientPage } from '../client/client';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import {Http,Headers} from '@angular/http';
import { SettingsPage } from '../settings/settings';
import { AlertController } from 'ionic-angular';
import {Injectable} from '@angular/core';
import keypair from 'keypair';
import crypto2 from 'crypto2';
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
  testRadioOpen: boolean;
  testRadioResult;
  constructor(public navCtrl: NavController, public navParams: NavParams,private geolocation: Geolocation,private storage: Storage,private http:Http,public alertCtrl: AlertController) {
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

    //var keypair = require('../../assets/js/keypair/index.js');
    /*var pair = keypair();
    console.log(pair.private);
    console.log(pair.public);*/


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
    this.storage.get('mobile').then((value) => {
      if(!value)
      {
        alert("You are not regisered yet");
      }
      else{
        console.log(value);
        let headers=new Headers();
        headers.append('Access-Control-Allow-Origin','*');
        headers.append('Access-Control-Allow-Headers' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept','application/json');
        headers.append('Access-Control-Allow-Credentials','*');
        headers.append('content-type','application/json');

        this.storage.get('port').then((val) => {
          this.storage.get('ip').then((val1) => {

            let alert = this.alertCtrl.create();
            alert.setTitle('Which planets have you visited?');

            alert.addInput({
              type: 'radio',
              label: 'I am Available',
              value: 'I am Available',
              checked: true
            });

            alert.addInput({
              type: 'radio',
              label: 'I am busy.Sorry.',
              value: 'I am busy.Sorry.'
            });

            alert.addInput({
              type: 'radio',
              label: 'I am available late night.',
              value: 'I am available late night.'
            });

            alert.addInput({
              type: 'radio',
              label: 'I do not work late night',
              value: 'I do not work late night'
            });

            alert.addInput({
              type: 'radio',
              label: 'I would be back Soon',
              value: 'I would be back Soon'
            });


            alert.addButton('Cancel');
            alert.addButton({
              text: 'Okay',
              handler: data => {
                console.log('Checkbox data:', data);
                this.testRadioOpen = false;
                this.testRadioResult = data;
                let body={
                  ID:parseInt(value),
                  Latitude:this.lat,
                  Longitude:this.long,
                  Message: String(data)

                };
                console.log(body);
                this.http.post('http://'+val1+':'+val+'/update_transport_location',JSON.stringify(body),{headers:headers}).subscribe(data=>{

                console.log(data);
                });
              }
            });
            alert.present().then(() => {
              this.testRadioOpen = true;

            });


      });
    });


      }

    });
  }

}
