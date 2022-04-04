import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Product } from 'src/app/models/product';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css'],
})
export class ProductModalComponent implements OnInit {
  formstate:any=false;
  editForm!: FormGroup;
newProduct:Product={
  title: '',
  price: '',
  description: '',
  category: '',
  image: '',
  rating: { rate: 0, count: 0 },
  comments: [{username:"new",comment:"new"}]
};
  constructor(
    private dialogRef: MatDialogRef<ProductModalComponent>,
    private fb: FormBuilder,
    private snakser:SnackbarService,
    private productser: ProductService,
    private translocoService: TranslocoService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {}

  ngOnInit(): void {

    this.editForm = this.fb.group({
      title: [this.data?.title ||'', [Validators.required]],
      price: [this.data?.price ||'', [Validators.required]],
      description: [this.data?.description ||'', [Validators.required]],
      image: [this.data?.image ||'', [Validators.required]],
      category: [this.data?.category ||'electronics', [Validators.required]],

    });
    this.editForm.valueChanges.subscribe(value=>{
      this.productser.formState.next(true);
      this.formstate=true;
    })
  }

  createProduct() {
        //When this function is called, it create a new the product based with the form values  to the product service.

   this.newProduct={...this.newProduct,
     title:this.editForm.value.title as string,
     price:this.editForm.value.price as string,
     image:this.editForm.value.image as string,
     description:this.editForm.value.description as string,
     category:this.editForm.value.category as string,
   }
   console.log(this.newProduct);
//after that, send this new product object to product services then http request
    this.productser.newProduct(this.newProduct).subscribe((res) => {
      //if this request  to be success then product list will be refresh
      this.productser.getProductsArray();

      this.snakser.createSnackbar('success',this.translocoService.translate('productCreated'));
      this.productser.formState.next(false);
      this.formstate=false;

      this.dialogRef.close();
    });
  }
  editProduct(){
    //When this function is called, it sends the product-id and the new product parameters to the product service.
this.productser.editProduct(this.data.id,this.editForm.value).subscribe(res=>{
  //after that, the products list will be refreshed.
  this.productser.getProductsArray();

  //
  this.productser.formState.next(false);
  this.formstate=false;
  this.dialogRef.close();


})
  }
  //modal cancel function
  close(){
    if(this.formstate){
      if(confirm(this.translocoService.translate('unsaved'))){
        this.productser.formState.next(false);
        this.formstate=false;
        this.dialogRef.close()
      }

    }
    else{this.dialogRef.close()}

  }
}
