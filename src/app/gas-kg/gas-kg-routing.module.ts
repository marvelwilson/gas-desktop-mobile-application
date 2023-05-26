import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GasKgPage } from './gas-kg.page';

const routes: Routes = [
  {
    path: '',
    component: GasKgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GasKgPageRoutingModule {}
