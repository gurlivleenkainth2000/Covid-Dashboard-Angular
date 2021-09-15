import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-country-stats',
  templateUrl: './country-stats.component.html',
  styleUrls: ['./country-stats.component.scss'],
})
export class CountryStatsComponent implements OnInit {

  fetching: boolean = false;
  previousRecord: boolean = false;
  country: string = null;
  days: number = 30;
  countries: string[] = [];

  countryObj: any;
  totalCases: any[] = [];
  totalDeaths: any[] = [];
  totalRecovered: any[] = [];
  labels: any[] = [];

  lineChartData_CASES: ChartDataSets[];
  lineChartData_DEATHS: ChartDataSets[];
  lineChartData_RECOVERED: ChartDataSets[];

  lineChartOptions_CASES: ChartOptions = { responsive: true };
  lineChartOptions_DEATHS: ChartOptions = { responsive: true };
  lineChartOptions_RECOVERED: ChartOptions = { responsive: true };

  lineChartColors_CASES: Color[] = [{ backgroundColor: 'rgba(255,0,0,0.3)', borderColor: 'rgba(255,0,0)', borderWidth: 1 }];
  lineChartColors_DEATHS: Color[] = [{ backgroundColor: 'rgba(0,255,0,0.3)', borderColor: 'rgba(0,255,0)', borderWidth: 1 }];
  lineChartColors_RECOVERED: Color[] = [{ backgroundColor: 'rgba(0,0,255,0.3)', borderColor: 'rgba(0,0,255)', borderWidth: 1 }];

  lineChartLabels: Label[];
  lineChartType = 'line';
  lineChartPlugins = [];
  lineChartLegend = false;

  pieChartData: number[];
  pieChartLabels: Label[];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartOptions: ChartOptions = { responsive: true };
  pieChartColors: Color[] = [{
    backgroundColor: ['#FFFF00', '#FF3D00', '#76FF03']
  }];
  pieChartPlugins = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private data: DataService
  ) {
    this.router.events.subscribe((e: any) => {
      if(e instanceof NavigationEnd || e instanceof NavigationStart) {
        this.fetchStats()
      }
    })
  }

  ngOnInit(): void {
  }

  fetchStats() {
    this.route.queryParams.subscribe((res) => {
      this.country = res['country'];
      this.days = res['days'] || 30;
    });
    this.getCountryStats();
  }

  getPieChartData(death_recovered: number, cases: number) {
    let percentage: number = parseInt(((death_recovered / cases) *100).toFixed(2));
    let remainigPercentage: number = 100 - percentage;
    return [percentage, remainigPercentage];
    // return percentage;
  }

  getCountryStats() {
    this.fetching = true;
    this.data.getCountriesStats();
    this.data.countriesSub.subscribe((res) => {
      if (res != null) {
        this.countryObj = res.find((x) => x['country'] == this.country);
        // this.pieChartLabels = ['Cases', 'Deaths', 'Recovered'];
        // this.pieChartData = [
        //   this.countryObj['cases'],
        //   this.countryObj['deaths'],
        //   this.countryObj['recovered']
        // ];
        // this.pieChartOptions = {
        //   title: {
        //     text: 'Overall Percentage',
        //     display: true,
        //     fontSize: 20
        //   },
        //   legend: {
        //     position: 'right'
        //   }
        // };
      }
    });
    this.data.countriesNameSub.subscribe(res => {
      this.countries = res;
    })
    this.http.get(`https://corona.lmao.ninja/v2/historical/${this.country}?lastdays=${this.days}`)
      .toPromise()
      .then((res) => {
        this.fetching = false;
        this.previousRecord = true;
        this.labels = Object.keys(res['timeline']['cases']);
        this.totalCases = Object.values(res['timeline']['cases']);
        this.totalDeaths = Object.values(res['timeline']['deaths']);
        this.totalRecovered = Object.values(res['timeline']['recovered']);
        this.configureLineChart();
      }, (error) => {
        console.log(error);
        this.fetching = false;
      });
  }

  configureLineChart() {
    this.lineChartLabels = this.labels;
    // this.lineChartOptions_CASES = {
    //   title: {
    //     text: 'Cases',
    //     fontSize: 20,
    //     display: true,
    //   },
    // };
    // this.lineChartOptions_DEATHS = {
    //   title: {
    //     text: 'Deaths',
    //     fontSize: 20,
    //     display: true,
    //   },
    // };
    // this.lineChartOptions_RECOVERED = {
    //   title: {
    //     text: 'Recovered',
    //     fontSize: 20,
    //     display: true,
    //   },
    // };
    this.lineChartData_CASES = [{ data: this.totalCases, label: 'Cases' }];
    this.lineChartData_DEATHS = [{ data: this.totalDeaths, label: 'Deaths' }];
    this.lineChartData_RECOVERED = [{ data: this.totalRecovered, label: 'Recovered' }];

  }

  changeCountry(value) {
    // console.log(value);
    this.country = value;
    this.router.navigate([], { queryParams: { country: value }, queryParamsHandling: 'merge'});
    this.getCountryStats();
  }

  changeDays(value) {
    this.router.navigate([], { queryParams: { days: value }, queryParamsHandling: 'merge'});
    this.getCountryStats();
  }
}
