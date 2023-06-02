import { Component } from '@angular/core';
import { DataService } from '../Service/data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  constructor(private dataService : DataService){
    this.requestingData();
  }

  ArrayOfExchanges: any = []
  
  requestingData(){
    this.dataService.RequestData().subscribe((Arr) => {
       this.ArrayOfExchanges = Arr;
       console.log(this.ArrayOfExchanges)
    })
  }
 
  
}
