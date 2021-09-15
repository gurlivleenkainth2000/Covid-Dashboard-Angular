import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './../services/data.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  countries: any[] = [];
  countriesNames: string[] = [];

  constructor(
    private data: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.data.getCountriesStats();
    this.data.countriesSub.subscribe(response => {
      if(response != null) {
        this.countries = response;
      }
    })

    this.data.countriesNameSub.subscribe(res => this.countriesNames = res);
  }

  seeCountryStats(country: string) {
    this.router.navigate(['country-stats'], { queryParams: { country: country } })
  }

}
