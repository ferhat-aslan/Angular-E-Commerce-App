import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-grid-view-card',
  templateUrl: './grid-view-card.component.html',
  styleUrls: ['./grid-view-card.component.css']
})
export class GridViewCardComponent implements OnInit,OnDestroy {
//communications between  components

  @Input() product!:Product;//This component takes a parameter.


sub1!:Subscription;//a subscription defined for unsubscribe for components destroy.
  cartList: any;

  constructor(private productService: ProductService,

    private cartService: CartService,
    private snackBarser:SnackbarService,private translocoService: TranslocoService) { }
      //when app on destroyed, this func will be start.

  ngOnDestroy(): void {
    if(this.sub1){
this.sub1.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.cartService.getProductList().subscribe((res) => {
      this.cartList = res;
    });
  }
    //a function for adding item into cart process.

  addtocart(product: Product):void {
    this.cartService.addtoCart(product);


    this.snackBarser.createSnackbar('success',this.translocoService.translate('producttocart',{productid:product.id}));
  }
  //Check if the product is in the shopping cart and change the button color and button name accordingly.
  productControl(product: Product):boolean {
    this.sub1= this.cartService.getProductList().subscribe((res) => {
      this.cartList = res;
    });
    if (this.cartList.includes(product)) {
      return true;
    }
    return false;
  }
  //This function is called when we want to remove a product from the shopping cart.
  removeCart(product: Product):void {
    //the function gets a product object as paameter and send it to cartservice.
    this.cartService.removeCartItem(product);
    this.snackBarser.createSnackbar('success',this.translocoService.translate('productremoved',{productid:product.id}));
  }
}
