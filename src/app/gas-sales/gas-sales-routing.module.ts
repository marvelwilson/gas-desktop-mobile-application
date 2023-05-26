import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GasSalesPage } from './gas-sales.page';

const routes: Routes = [
  {
    path: '',
    component: GasSalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GasSalesPageRoutingModule {}
