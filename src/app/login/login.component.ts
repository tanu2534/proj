import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../Service/data.service';
// import { NgForm , FormBuilder, FormGroup, Validators} from '@angular/forms';
// import { OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {AES} from  'crypto-js';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  name: string = "Name";
  email: string = "Email";
  language: string = "Language";
  image : File | null = null ;
  constructor(private http: HttpClient, private translateService: TranslateService, private dataService: DataService){
    this.name = '';
    this.email = '';
    this.language = 'en';
  }
  ngOnInit(){
    
  }
  OnSelect(event:any){
    this.image = event.target.files[0] ;
  }
  onLnChange(): void{
    this.translateService.use(this.language)
  }
  onSubmit(){
    const formFields = {
      name : this.name,
      email : this.email,
      language : this.language,
      image : this.image
    }

    let EncyptedformFields = this.encypting(formFields);
    // let EFF = JSON.stringify(EncyptedformFields);
    // console.log(EFF);




    const formData = new FormData();
    formData.append('data', EncyptedformFields);
    if (this.image) {
      formData.append('image', this.image);
    }
   
    this.dataService.postingData(formData).subscribe((response)=>{
      console.log("data chala gya bhai..");
      this.name = '';
      this.email = '';
      this.language = '';
      this.image = null;
    })
     
  } 

  private encypting(data:any){
   // const EncyptedJson:any = {};
    
    const k = "i123";
    // const EncyptName = AES.encrypt(data.name, key).toString();
    // const EncyptEmail = AES.encrypt(data.email, key).toString();
    // const EncyptLanguage = AES.encrypt(data.language, key).toString();

    // return {
    //   name : EncyptName,
    //   email: EncyptEmail,
    //   language : EncyptLanguage
    // }






    // for(let key in data){
    //     const EncyptKey = AES.encrypt(key, k).toString();
    //     const Encyptvalue = AES.encrypt(data[key], k).toString();
    //     EncyptedJson[EncyptKey] = Encyptvalue;
    // }
      
    // return EncyptedJson;
    



    const jsonString = JSON.stringify(data);
    const encryptedString = AES.encrypt(jsonString, k).toString();
    return encryptedString;
  }

  private dycrypting(res:any){
    const key = "i123";
    const DycryptName = AES.decrypt(res.name, key);
    const DycryptEmail = AES.decrypt(res.name, key);
    const Dycryptlanguage = AES.decrypt(res.name, key);

    return {
      name : DycryptName,
      email : DycryptEmail,
      language : Dycryptlanguage
    }

  }
  
}
