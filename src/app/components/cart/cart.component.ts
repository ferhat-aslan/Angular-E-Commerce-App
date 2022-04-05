import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Route, Router, RouterLinkActive } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart', ///when we use this component at the parent component we will use this name.
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit,OnDestroy {
  constructor(private cartService: CartService,private routen:Router,private prSer:ProductService,private translocoService: TranslocoService) {}
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

OrderList:Order[]=[];
  leng: number=0;
  totalPrice:number=0;
  cartItems:any =[];
  sub!:Subscription;
  //was taken user data from localstorage
  lstorage:any=localStorage.getItem('user')
  user=JSON.parse(this.lstorage)
  ngOnInit(): void {
        //getproductlist is a observable. if we want to pull data, we have to use the subscribe.

  this.sub=  this.cartService.getProductList().subscribe((res) => {
      this.cartItems=res
      this.leng = res.length;
      res.map((a:any)=>{
        this.totalPrice= a.price+this.totalPrice
      });

    });
  }
  //a function was defined for removing from cart
  removeCart(product:any){
    this.cartService.removeCartItem(product)
    this.leng=this.cartItems.length
    this.totalPrice=0

    this.cartItems.map((a:any)=>{

      this.totalPrice= a.price+this.totalPrice
    });
  }
  //a function for order process
  order(){

    this.OrderList=this.cartItems.map((item:any)=>{
      //all cart items convert to Order model
      return{
        userName:`${this.user.firstname} ${this.user.lastname}` ,
        user_id:this.user.id,
        orders:{product_id:item.id,count:1}
      }
    });

for (let index = 0; index < this.OrderList.length; index++) {
  const element = this.OrderList[index];
  //and pushed the server
  this.prSer.order(element).subscribe(res=>{

  },err=>{

  })
}

//a confirm dialog package was used.
    Swal.fire({
      title: 'Adress and Credit Cart',
      inputPlaceholder: '"typeYourAdress" | transloco',
      html:
    '<input id="swal-input1" class="swal2-input" placeholder="Address...">' +
    '<input id="swal-input2" class="swal2-input" placeholder="Credit Card...">',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.translocoService.translate('yesOrder')
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          this.translocoService.translate('ordered'),
          this.translocoService.translate('orderAccepted'),
          this.translocoService.translate('success')
        );
        this.routen.navigate(['home'])
//after all order process, the cart list was cleared.
    this.cartService.productList.next([])
      }
    })



  }
  adminControl() {


    if ((JSON.parse(localStorage.getItem('user') as string))?.isAdmin==="true") {
      return true;
    }
    return false;
  }
}
