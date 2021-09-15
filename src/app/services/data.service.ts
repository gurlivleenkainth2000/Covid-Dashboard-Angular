import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as urls from './../base-urls';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  countriesSub = new BehaviorSubject<any[]>(null);
  countriesRetrived: boolean = false;

  countriesNameSub = new BehaviorSubject<string[]>(null);

  constructor(
    private http: HttpClient
  ) { }

  getCountriesStats() {
    if(!this.countriesRetrived) {
      this.http.get(urls.ALL_COUNTRIES)
        .toPromise()
        .then((value) => {
          let objValues = Object.assign([], value);
          this.countriesSub.next(objValues);
          this.countriesNameSub.next(objValues.map(e => e["country"]))
          this.countriesRetrived = true;
        }, (error) => { console.log(error); });
    }
  }
}
