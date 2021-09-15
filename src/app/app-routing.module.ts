import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './countries/countries.component';
import { CountryStatsComponent } from './country-stats/country-stats.component';

const routes: Routes = [
  { path: "", redirectTo: "countries", pathMatch: 'full' },
  { path: "countries", component: CountriesComponent },
  { path: "country-stats", component: CountryStatsComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
