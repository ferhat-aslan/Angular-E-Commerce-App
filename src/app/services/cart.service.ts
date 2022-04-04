import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartList:any =[]
public productList = new BehaviorSubject<any>([])
  constructor() { }
  getProductList(){
    return this.productList.asObservable();
  }

  addtoCart(product:Product){
    this.cartList.push(product);
    this.productList.next(this.cartList)
  }
  removeCartItem(product:Product){
    this.cartList.map((a:any,index:any)=>{
      if(product.id===a.id){
        this.cartList.splice(index,1)
      }
    });
    this.productList.next(this.cartList)
  }
  removeAllCart(){
    this.cartList=[];
    this.productList.next(this.cartList)
  }
}
