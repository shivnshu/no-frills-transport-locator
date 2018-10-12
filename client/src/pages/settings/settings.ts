import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  serverIp;
  serverPort;
  authForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,private storage: Storage) {
    this.navCtrl = navCtrl;
 
    this.authForm = formBuilder.group({
        ip: ['', Validators.compose([])],
        port: ['', Validators.compose([])]
    });
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  onSubmit(value: any): void { 
    if(this.authForm.valid) {
        /*window.localStorage.setItem('username', value.username);
        window.localStorage.setItem('password', value.password);
        window.localStorage.setItem('carnum', value.carnum);
        window.localStorage.setItem('mess', value.mess);*/
        this.serverIp=value.ip;
        this.serverPort=value.port;
        this.storage.set('port',this.serverPort);
        this.storage.set('ip',this.serverIp);

    }
}  

}
