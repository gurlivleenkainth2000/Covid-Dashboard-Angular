import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from './services/data.service';
import { CountryStatsComponent } from './country-stats/country-stats.component';
import { CountriesComponent } from './countries/countries.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryStatsComponent,
    CountriesComponent,
    PieChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DataService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
