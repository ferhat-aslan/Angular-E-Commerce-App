import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminPanelComponent } from './admin-panel.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ProductModalComponent } from '../edit-modal/product-modal.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import { TranslocoRootModule } from '../../transloco-root.module';



@NgModule({
  declarations: [
    AdminPanelComponent,
    ProductModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    AdminRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatTabsModule,
    TranslocoRootModule
  ]
})
export class AdminModule { }
