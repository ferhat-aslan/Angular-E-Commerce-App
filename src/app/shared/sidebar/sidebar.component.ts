import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  status: boolean = false;
  clickEvent(){
      this.status = !this.status;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
