import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  map,
  Observable,
  of,
  retry,
} from 'rxjs';
import { Order } from '../models/order';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products:any=[];

  //the beahivorsubject was defined for category and search operations.
  public category = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<any>('');
  public formState = new BehaviorSubject<any>(false);
  lengt!: number;
  constructor(private http: HttpClient) {}
  //this function was defined for the get all the products.
  getProducts<Product>(): Observable<Product> {
    return this.http
      .get<Product>('https://patika-server-app.herokuapp.com/products')
      .pipe();
  }
  getProductsArray(){
    this.http
      .get<Product>('https://patika-server-app.herokuapp.com/products')
      .subscribe((res)=>{
        this.products=res;
      });
  }
  //this function was defined for the get product detail.

  getProductDetail<Product>(id: number): Observable<Product> {
    return this.http
      .get<Product>('https://patika-server-app.herokuapp.com/products/' + id)
      .pipe();
  }
  productDelete<Product>(id: number): Observable<Product> {
    return this.http
      .delete<Product>('https://patika-server-app.herokuapp.com/products/' + id)
      .pipe();
  }
  //this function was defined for the ordering.

  order<Order>(order: Order): Observable<Order> {
    return this.http
      .post<Order>('https://patika-server-app.herokuapp.com/orders', order)
      .pipe();
  }
  //this function was defined for the user order.

  getUserOrder<Order>(): Observable<Order> {
    return this.http
      .get<Order>('https://patika-server-app.herokuapp.com/orders')
      .pipe();
  }

  newProduct<T>(req:any):Observable<T>{
    return this.http.post<T>("https://patika-server-app.herokuapp.com/products",req).pipe();
  }
  editProduct<T>(id:any,product:any):Observable<T>{
    return this.http.patch<T>("https://patika-server-app.herokuapp.com/products/"+id,product).pipe();
  }

}
