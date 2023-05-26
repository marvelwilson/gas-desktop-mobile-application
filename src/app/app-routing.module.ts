import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'staff-login',
    loadChildren: () => import('./staff-login/staff-login.module').then( m => m.StaffLoginPageModule)
  },
  {
    path: 'admin-login',
    loadChildren: () => import('./admin-login/admin-login.module').then( m => m.AdminLoginPageModule)
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then( m => m.AdminDashboardPageModule)
  },
  {
    path: 'staffs',
    loadChildren: () => import('./staffs/staffs.module').then( m => m.StaffsPageModule)
  },
  {
    path: 'inventory',
    loadChildren: () => import('./inventory/inventory.module').then( m => m.InventoryPageModule)
  },
  {
    path: 'edit-staff/:id',
    loadChildren: () => import('./edit-staff/edit-staff.module').then( m => m.EditStaffPageModule)
  },
  {
    path: 'edit-inventory/:id',
    loadChildren: () => import('./edit-inventory/edit-inventory.module').then( m => m.EditInventoryPageModule)
  },
  {
    path: 'gas-kg',
    loadChildren: () => import('./gas-kg/gas-kg.module').then( m => m.GasKgPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'gas-sales',
    loadChildren: () => import('./gas-sales/gas-sales.module').then( m => m.GasSalesPageModule)
  },
  {
    path: 'staff-dashboard',
    loadChildren: () => import('./staff-dashboard/staff-dashboard.module').then( m => m.StaffDashboardPageModule)
  },
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then( m => m.CustomersPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'server',
    loadChildren: () => import('./server/server.module').then( m => m.ServerPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
