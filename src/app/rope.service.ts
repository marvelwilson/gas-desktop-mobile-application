import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RopeService {

  ip: any;

  url; any;
  ourl: any;

  constructor(public http: HttpClient) {
    this.ip = JSON.parse(localStorage.getItem('ip'));
    this.url = "http://"+this.ip+"/gas/";
    this.ourl = "https://agesindependentpowerplantltd.com/gas/";
    console.log(this.url);
   }

  login(data){
    return this.http.post(this.url+'login.php',data);
  }

  create_staff(data){
    return this.http.post(this.url+'create_staff.php',data);
  }

  change_passowrd(data){
    return this.http.post(this.url+'change_passowrd.php',data);
  }

  edit_staff(data){
    return this.http.post(this.url+'edit_staff.php',data);
  }

  del(data){
    return this.http.get(this.url+'get_history.php?del='+data);
  }
  delete_staff(data){
    return this.http.post(this.url+'delete_staff.php',data);
  }

  get_staffs(){
    return this.http.get(this.url+'get_staffs.php');
  }

  getmonthlysales(){
    return this.http.get(this.url+'getmonthlysales.php');
  }

  get_customers(){
    return this.http.get(this.url+'get_customers.php');
  }

  create_inventory(data){
    return this.http.post(this.url+'create_inventory.php',data);
  }

  get_inventories(){
    return this.http.get(this.url+'get_inventories.php');
  }

  get_staff(data){
    return this.http.get(this.url+'get_staff.php?id='+data);
  }

  get_inventory(data){
    return this.http.get(this.url+'get_inventory.php?id='+data);
  }

  edit_inventory(data){
    return this.http.post(this.url+'edit_inventory.php',data);
  }

  delete_inventory(data){
    return this.http.post(this.url+'delete_inventory.php',data);
  }

  edit_gas(data){
    return this.http.post(this.url+'edit_gas.php',data);
  }

  edit_g(data){
    return this.http.post(this.url+'edit_g.php',data);
  }

  get_gas_value(){
    return this.http.get(this.url+'get_gas_value.php');
  }

  get_gas_value_online(){
    return this.http.get(this.ourl+'get_gas_value.php');
  }

  sync_gas_online(){
    return this.http.get(this.ourl+'sync_gas_online.php');
  }

  get_info_online(){
    return this.http.get(this.ourl+'get_info_online.php');
  }

  sync_info_online(){
    return this.http.get(this.ourl+'sync_info_online.php');
  }

  get_history(){
    return this.http.get(this.url+'get_history.php');
  }

  staff_login(data){
    return this.http.post(this.url+'staff_login.php',data);
  }

  add_cylinder(data){
    return this.http.post(this.url+'add_cylinder.php',data);
  }

  add_gprice(data){
    return this.http.post(this.url+'add_gprice.php',data);
  }

  get_pricesperkg(){
    return this.http.get(this.url+'get_pricesperkg.php');
  }

  get_pricesperkg_online(){
    return this.http.get(this.ourl+'get_pricesperkg_online.php');
  }

  sync_cy_online(){
    return this.http.get(this.ourl+'sync_cy_online.php');
  }

  edit_gaspricesperkg(data){
    return this.http.post(this.url+'edit_gaspricesperkg.php',data);
  }

  edit_info(data){
    return this.http.post(this.url+'edit_info.php',data);
  }

  edit_server(data){
    return this.http.post(this.url+'edit_server.php',data);
  }

  get_cylinders(){
    return this.http.get(this.url+'get_cylinders.php');
  }

  get_info(){
    return this.http.get(this.url+'get_info.php');
  }

  get_cylinder(data){
    return this.http.get(this.url+'get_cylinder.php?id='+data);
  }

  edit_cylinder(data){
    return this.http.post(this.url+'edit_cylinder.php',data);
  }

  confirm_sales(data){
    return this.http.post(this.url+'confirm_sales.php',data);
  }

  search_history(data){
    return this.http.post(this.url+'search_history.php',data);
  }

  search_shistory(data){
    return this.http.post(this.url+'search_shistory.php',data);
  }

  check_tag_no(data){
    return this.http.get(this.url+'check_tag_no.php?tag='+data);
  }

  get_shistory(data){
    return this.http.get(this.url+'get_shistory.php?u='+data);
  }

  get_sync_history(data){
    return this.http.get(this.url+'get_sync_history.php?u='+data);
  }

  sync_local(data){
    return this.http.get(this.url+'sync_local.php?u='+data);
  }

  sync_db(data){
    return this.http.post(this.url+'sync_db.php',data);
  }

  get_customer(data){
    return this.http.get(this.url+'search_customer.php?cd='+data);
  }

  getpast(data){
    return this.http.get(this.url+'getpast.php?u='+data);
  }

  getbardata(data){
    return this.http.get(this.url+'getbardata.php?bd='+data);
  }

  conf(data){
    return this.http.post(this.url+'conf.php',data);
  }

  //udpate history api call
  updateHistory(data){
    return this.http.post(this.url+'updatehistory.php',data)
  }
}
