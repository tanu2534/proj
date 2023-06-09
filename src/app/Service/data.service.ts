import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  RequestData(){
      return this.http.get('https://api.coingecko.com/api/v3/exchanges');
  }

  postingData(data:any){
    return this.http.post('http://localhost:3000/login', data)
  }
  
}
