import { Component, OnDestroy, OnInit, } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductModalComponent } from '../edit-modal/product-modal.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product';
import { TranslocoService } from '@ngneat/transloco';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit,OnDestroy {




  displayedColumns: string[] = ['No', 'Title', 'Category', 'Price','Action'];
  formstate:boolean=false;//if form is dirty (formstate=true) we will show a dialog.
  products: any;
  sub1!: Subscription;
  sub2!: Subscription;  //for the unsubscribe process
  sub3!: Subscription;
  constructor(
    public productSer: ProductService,
    private snackSer: SnackbarService,
    public dialog: MatDialog,private translocoService: TranslocoService

  ) {}
  //when we left from this component ,Lastly this function will run. And will do unsubscribe.
  ngOnDestroy(): void {
   if(this.sub1){
    this.sub1.unsubscribe()
   }
   if(this.sub2){
    this.sub2.unsubscribe()
   }
   if(this.sub3){
    this.sub3.unsubscribe()
   }
  }

  ngOnInit(): void {
        //This function runs first when a component is run. So the functions inside this function also work.

    this.productSer.getProductsArray();
    this.sub1 = this.productSer.getProducts().subscribe((res) => {
      this.products = res;

    });

  }

//some configurations of the chart
  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    elements: {
      line: {
        tension: 0.5,
      },
    },
  };

  public lineChartType = 'line';
  public barChartLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  public barChartType = 'line';
  public barChartLegend = true;

  public barChartData = [
    {
      data: [0, 5, 4, 2, 6, 4, 23, 12, 5],
      label: this.translocoService.translate('income'),
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      fill: 'origin',
    },
  ];
  //This function is called when the Delete button is pressed. and the product-id is sent as a parameter.
  productDelete(id: any) {
    this.sub2= this.productSer.productDelete(id).subscribe((res) => {
      //if the operation is successful, the following functions will be called.
      this.productSer.getProductsArray();
      this.snackSer.createSnackbar('success', this.translocoService.translate('productDeleted',{productid:id}));


    });
  }
    //This function is called when the Edit button is pressed. and the product is sent as a parameter to modal.

  editProduct(product:Product){
    const dialogRef = this.dialog.open(ProductModalComponent, { width: '400px' ,data:product});

    /*dialogRef.afterClosed().subscribe((result) => {
      console.log("kapandı");

      this.productSer.getProducts().subscribe((res) => {
        this.products = res;
        this.snackSer.createSnackbar('success', 'Product Was edited.');
      });
    });*/
  }
    //This function is called when the create button is pressed. and The modal will be opened..
    createproduct(){
    const dialogRef = this.dialog.open(ProductModalComponent, { width: '400px'});

  }
  //optional// there is no need this function and button.
  update(){
    this.productSer.getProductsArray();
    this.snackSer.createSnackbar("success",this.translocoService.translate('productListUpdated'))

  }
  //if there are unsaved changes(so if formstate==true), a confirmation popup will appear
  canExit(): boolean {


    this.sub3= this.productSer.formState.subscribe(res=>{
      this.formstate=res;
    })

    if (this.formstate) {
      if (confirm(this.translocoService.translate('unsaved'))) {
        this.productSer.formState.next(false);
        this.formstate=false;
        return true;
      }
      return false;
    }
    else{
      this.formstate=false;
      return true;
    }

  }
}
