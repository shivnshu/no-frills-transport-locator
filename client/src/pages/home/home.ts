import {OnInit, Component} from "@angular/core";
import { IonicPage, LoadingController,NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HomeService } from './home.service';
import {Http,Headers} from '@angular/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import crypto2 from 'crypto2';
import 'rxjs/add/operator/map';

import { JSEncrypt } from 'jsencrypt';
import { Injectable } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HomeService]
})
export class HomePage  {
  lat: any;
  long:any;
  name:any;
  message:any;
  mobile:any;
  carnum:any;
  authForm: FormGroup;
  loading:any;
  
  constructor(private loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams,private geolocation: Geolocation,private homeService: HomeService,private http:Http, public formBuilder: FormBuilder,private storage: Storage ) {
    this.geolocation.getCurrentPosition().then((resp) => {
      //console.log('lat');
      //console.log('long');
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
     
     this.navCtrl = navCtrl;
 
        this.authForm = formBuilder.group({
            username: ['', Validators.compose([Validators.required, Validators.pattern('[a-z A-Z]*')])],
            password: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*'),Validators.minLength(10), Validators.maxLength(10)])],
            carnum: ['', Validators.compose([Validators.required])],
            mess: ['', Validators.compose([])]
        });

        this.loading = this.loadingCtrl.create({
          content: 'Registering You!'
        });

        
    
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad RocketsPage');
   
  }
  

  SendLocation(){
    this.loading.present();
    let headers=new Headers();
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Access-Control-Allow-Headers' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Access-Control-Allow-Credentials','*');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');
    this.storage.get('port').then((val) => {
      this.storage.get('ip').then((val1) => {
    
    //console.log(st); 
    crypto2.createKeyPair().then(({ privateKey, publicKey })=>{
      //console.log(privateKey);
      
      let body={
        ID:parseInt(this.mobile),
        Latitude:this.lat,
        Longitude:this.long,
        Name:String(this.name),
        Message:String(this.message),
        PhoneNumber:String(this.mobile),
        CarNumber:String(this.carnum),
        PublicKey:privateKey
        //Latitude:"125.32",
        //Longitude:"120.41",
        //SearchParameter:"10"
  
      };
      
        
      
          
          this.http.post('http://'+val1+':'+val+'/add_new_transport',JSON.stringify(body),{headers:headers}).subscribe(data=>{
            var content=String(data.text());
            var matched="Signup failed. Try signing in."; 
            if(content==matched){
              this.loading.dismiss();
              alert("Already registered!");
            }
            else{
              this.storage.set('mobile',this.mobile);
              this.storage.set('key',publicKey);
              this.loading.dismiss();
              alert("Successfully registed!");
            }      
            
      
          
          
        });
           
      
    });

   
    
  
  });
  });

  }

  onSubmit(value: any): void { 
    if(this.authForm.valid) {
        /*window.localStorage.setItem('username', value.username);
        window.localStorage.setItem('password', value.password);
        window.localStorage.setItem('carnum', value.carnum);
        window.localStorage.setItem('mess', value.mess);*/
        this.carnum=value.carnum;
        this.message=value.mess;
        this.name=value.username;
        this.mobile=value.password;

        this.SendLocation();
    }
}   
  
 


}
