import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import leaflet from 'leaflet';
import {Http,Headers} from '@angular/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import Encrypt from 'jsencrypt';
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
  loading;

  constructor(private loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams,private geolocation: Geolocation,private http:Http, public formBuilder: FormBuilder,private storage: Storage) {
    //this.presentLoading();
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

  
  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading map...'
    });

    this.loading.present()  }
 
  loadmap() {
    this.map = leaflet.map("map", { closePopupOnClick: false,enableHighAccuracy:false,timeout:60000,maximumAge:Infinity}).fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'www.tphangout.com',
      maxZoom: 18
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
      let markerGroup = leaflet.featureGroup();
      //this.loading.dismiss(); //Stop showing the loading spinner once the map is loaded.
      
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
 
calculateDistance(lat1:number,lat2:number,long1:number,long2:number){
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((long1- long2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    return dis;
  }
  SendLocation(){
    let headers=new Headers();
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Access-Control-Allow-Headers' , '*');
    headers.append('Access-Control-Allow-Credentials','*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT'); 
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');
    let body={
      Latitude:this.lat,
      Longitude:this.long,
      SearchParameter:this.SearchParameter
      
      //Latitude:"125.32",
      //Longitude:"120.41",
      //SearchParameter:"10"
    };
   // console.log(JSON.stringify(body));
   this.storage.get('port').then((val) => {
    this.storage.get('ip').then((val1) => {
      console.log(val);
      console.log(val1);
      console.log('http://'+val1+':'+val+'/get_nearby_transports');
    this.http.post('http://'+val1+':'+val+'/get_nearby_transports',JSON.stringify(body),{headers:headers}).map(res => res.json()).subscribe(data=>{
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
      var d=new Date(0);
      var e=d.setUTCSeconds(data[i].TimeStamp);
      var f=d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()+'  '+d.getHours()+':'+d.getMinutes();
      var distance=this.calculateDistance(this.lat,data[i].Latitude,this.long,data[i].Longitude);
      let marker: any = leaflet.marker([data[i].Latitude,data[i].Longitude]).bindPopup("<b>Distance</b>="+distance.toFixed(2)+"km"+"<br><b>Last Seen=</b>"+f+"<br><b>Name=</b>"+data[i].Name+"<br><b>Carnum=</b>"+data[i].CarNumber+"<br><b>mobile=</b>"+data[i].PhoneNumber+"<br><b>SpecialMessage=</b>"+data[i].Message);                       
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
});
     

    });
    
      
  }

}
