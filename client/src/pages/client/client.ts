import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import leaflet from 'leaflet';
import {Http,Headers} from '@angular/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the ClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client',
  templateUrl: 'client.html',
})
export class ClientPage {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  lat: any;
  long:any;
  SearchParameter:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private geolocation: Geolocation,private http:Http, public formBuilder: FormBuilder) {
  this.SearchParameter=10;
  this.geolocation.getCurrentPosition().then((resp) => {
    //console.log('lat');
    //console.log('long');
    this.lat=resp.coords.latitude;
    this.long=resp.coords.longitude;
    console.log("Lat"+this.lat);
    console.log("Long"+this.long);
   }).catch((error) => {
     console.log('Error getting location', error);
   });
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientPage');
  }
  ionViewDidEnter() {
    this.loadmap();
  }
 
  loadmap() {
    this.map = leaflet.map("map", { closePopupOnClick: false}).fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'www.tphangout.com',
      maxZoom: 18
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
      let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
        alert("latitude:"+e.latitude+" Longitude:"+e.longitude);
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);

      var popup = leaflet.popup({
          closeButton: false,
          autoClose: false
        })
        .setLatLng([e.latitude,e.longitude])
        .setContent('<p>Your Location</p>')
        .openOn(this.map);

      }).on('locationerror', (err) => {
        alert(err.message);
      })
  }
  SendLocation(){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    let body={
      Latitude:this.lat,
      Longitude:this.long,
      SearchParameter:parseInt(this.SearchParameter)
      
      //Latitude:"125.32",
      //Longitude:"120.41",
      //SearchParameter:"10"
    };
    this.http.post('http://localhost:8000/get_nearby_transports',JSON.stringify(body),{headers:headers}).subscribe(data=>{
      console.log(data);
    });
    let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([this.lat, this.long]).on('click', () => {
        alert("latitude:"+this.lat+" Longitude:"+this.long);
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);

      var popup = leaflet.popup({
          closeButton: false,
          autoClose: false
        })
        .setLatLng([this.lat,this.long])
        .setContent('<p>Driver 1</p>')
        .openOn(this.map);

      
  }

}
