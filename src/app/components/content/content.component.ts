import { AfterContentInit, Component, ElementRef, OnDestroy, OnInit,ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonToggle } from '@angular/material/button-toggle';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit, OnDestroy {

  searchKey: string = '';
@ViewChild('toggleGroup1') toogleG!:MatButtonToggle
  filterCategory: any = [];
  products: any = [];
  cartList: any;
  categoryForm!: FormGroup;
  //2 subscriptions defined for unsubscribe when components destroy.

  sub!: Subscription;
  sub2!: Subscription;
  display: number = 1;
  constructor(
    private productService: ProductService,
    public fb: FormBuilder,
    private cartService: CartService,
    private snackBarser:SnackbarService
  ) {}
  //when app on destroyed, this func will be start.

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }
  //when component was init , firstly this function will start.

  ngOnInit(): void {

    //search observable
    this.sub = this.productService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
    //getallproducts observable
    this.sub2 = this.productService.getProducts().subscribe((res) => {
      this.filterCategory = res;
      this.products = res;
      console.log(this.products);


    });
  }
  changeCategory(event: any) {
    this.filter(event.target.value);
  }
  //a function defined for product filtering by categories
  filter(category: string) {
    this.filterCategory = this.products.filter((a: any) => {
      if (a.category == category || category == '') {
        return a;
      }
    });
  }

  //a function for sorting items by Price or Rating into car process.
  sorting(event: any) {
    if (event.target.value === '') {
      this.filterCategory = this.products;
    }
    if (event.target.value === 'price') {
      this.filterCategory = this.filterCategory.sort((a: any, b: any) =>
        Number(a.price) < Number(b.price) ? -1 : Number(a.price > b.price)
      );
    }
    if (event.target.value === 'rating') {
      this.filterCategory = this.filterCategory.sort((a: any, b: any) =>
        Number(a.rating.rate) > Number(b.rating.rate)
          ? -1
          : Number(a.rating.rate < b.rating.rate)
      );
    }
  }


}
