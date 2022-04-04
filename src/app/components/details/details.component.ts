import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit,OnDestroy {
product:any ={};
id!:number
//a Subscription was defined for the unsubscribe.
sub!:Subscription;
  cartList: any;
  constructor(private snackBarser:SnackbarService,private cartservice:CartService,private productService:ProductService,private activatedRout:ActivatedRoute,private cartSer:CartService,private translocoService: TranslocoService) { }
  //when component was destroyed,lastly this function have will be call.
  ngOnDestroy(): void {
    //unsubscribe operation
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit(): void {

    this.cartservice.getProductList().subscribe((res) => {
      this.cartList = res;

    });
    //url parameter was taken for the product details
    this.sub = this.activatedRout.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });
    this.productService.getProductDetail(this.id).subscribe(res=>{
      this.product=res;
      this.productControl(this.product);
console.log(this.productControl(this.product));


    })
  }
  addtocart(product: Product) {
    this.cartSer.addtoCart(product);
    this.snackBarser.createSnackbar('success',this.translocoService.translate('productCart'));

  }
  productControl(product: Product) {
    this.cartservice.getProductList().subscribe((res) => {
      this.cartList = res;
    });
    if (this.cartList.includes(product)) {
      return true;
    }
    return false;
  }
  removeCart(product: Product) {
    this.cartservice.removeCartItem(product);
    this.snackBarser.createSnackbar('success',this.translocoService.translate('productRemovednoId'));
  }

}
