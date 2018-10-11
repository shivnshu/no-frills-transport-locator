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
  this.SearchParameter=0.1;
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
        alert("Your Location");
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);

      /*var popup = leaflet.popup({
          closeButton: false,
          autoClose: false
        })
        .setLatLng([e.latitude,e.longitude])
        .setContent('<p>You</p>')
        .openOn(this.map);*/

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
      SearchParameter:this.SearchParameter
      
      //Latitude:"125.32",
      //Longitude:"120.41",
      //SearchParameter:"10"
    };
   // console.log(JSON.stringify(body));
    this.http.post('http://localhost:8000/get_nearby_transports',JSON.stringify(body),{headers:headers}).map(res => res.json()).subscribe(data=>{
      console.log(data);
    for(var i=0;i<data.length;i++)
    {
      let markerGroup = leaflet.featureGroup();
      /*var long=data[i].Longitude;
      var lat=data[i].Latitude;
      var name=data[i].Name;
      var carnum=data[i].CarNumber;
      var mes=data[i].Message;
      var mobile=data[i].PhoneNumber;
      var ts=data[i].TimeStamp;*/
      let marker: any = leaflet.marker([data[i].Latitude,data[i].Longitude]).bindPopup("Latitude="+data[i].Latitude+"<br>Longitude="+data[i].Longitude+"<br>Last Seen="+data[i].TimeStamp+"<br>Name="+data[i].Name+"<br>Carnum="+data[i].CarNumber+"<br>mobile="+data[i].PhoneNumber+"<br><b>SpecialMessage=</b>"+data[i].Message);                       
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);

      /*var popup = leaflet.popup({
          closeButton: false,
          autoClose: false
        })
        .setLatLng([data[i].Latitude,data[i].Latitude])
        .setContent('<p>Driver 1</p>')
        .openOn(this.map);*/
      
    }
     

    });
    
      
  }

}
