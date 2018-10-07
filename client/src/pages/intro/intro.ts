import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ClientPage } from '../client/client';
import { Geolocation } from '@ionic-native/geolocation';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,private geolocation: Geolocation) {
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

}
