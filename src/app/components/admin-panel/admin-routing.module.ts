import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { UnsavedGuard } from "src/app/guards/unsaved.guard";
import { AdminPanelComponent } from "./admin-panel.component";

const routes:Routes=[{path:'',component:AdminPanelComponent , canDeactivate: [UnsavedGuard] }]
@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class AdminRoutingModule{}
