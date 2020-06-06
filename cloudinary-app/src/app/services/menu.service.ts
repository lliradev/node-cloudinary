import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu } from '../models/menu';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  selectedMenu: Menu;
  menus: Menu[] = [];
  /*added from product service.ts from cart*/
  _menus = [];
  _cart = [];
  menusSub;
  cartSub;
  readonly API = '/menus';
  readonly APICHECK = '/orders';

  constructor(private http: HttpClient) {
    this.selectedMenu = new Menu;
    /*added from product service.ts from cart*/
    this.cartSub = new BehaviorSubject<any[]>(this._cart);
    this.menusSub = new BehaviorSubject<any[]>(this.menus);
  }

  findAll() {
    return this.http.get(environment.URL_API + this.API);
  }

  /*added from product service.ts from cart*/
  fetchProducts() {
    this.http.get<any[]>(environment.URL_API + this.API).subscribe(data => {
      this.menus = [...data];
      this.menusSub.next([...this.menus]);
    });
  }
  /*added from product service.ts from cart*/
  getMenus() {
    return this.menusSub.asObservable();
  }

  getMenu(_id: string) {
    return this.http.get<Menu>(environment.URL_API + this.API + `/${_id}`);
  }

  postMenu(Menu) {
    return this.http.post(environment.URL_API + this.API, Menu);
  }

  putMenu(menu, _id: string) {
    return this.http.put<any>(environment.URL_API + this.API + `/${_id}`, menu);
  }

  deleteMenu(_id: string) {
    return this.http.delete(environment.URL_API + this.API + `/${_id}`);
  }

  /*added from product service.ts from cart*/
  getCart() {
    return this.cartSub.asObservable();
  }
  addToCart(id) {
    const menu = this.findItemInMenus(id);
    if (menu.length !== 0) {
      if (this.findItemInCart(id).length) {
        this.removeFromCart(id);
      } else {
        this._cart.push(menu[0]);
      }
      this.cartSub.next([...this._cart]);
    }
  }
  removeFromCart(id) {
    if (this.findItemInCart(id).length) {
      const item = this.findItemInCart(id)[0];
      const index = this._cart.indexOf(item);
      this._cart.splice(index, 1);
    }
    this.cartSub.next([...this._cart]);
  }
  clearCart() {
    this.cartSub.next([]);
  }
  findItemInCart(id) {
    const item = this._cart.filter(menu => menu._id === id);
    return item;
  }
  findItemInMenus(id) {
    const item = this.menus.filter(menu => menu._id === id);
    return item;
  }

  checkout(data) {
    console.log(data);
    return this.http.post(environment.URL_API + this.APICHECK, data);
  }

  getOrders() {
    return this.http.get<any>(environment.URL_API + this.APICHECK);
  }
  

}//End class
