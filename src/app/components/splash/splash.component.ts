import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  constructor() { }
  windowWidth!: string;
  showSplash = true;
  ngOnInit(): void {
    setTimeout(() => {
      this.windowWidth = "-" + window.innerWidth + "px";
///splash screen time is 4 seconds.after that, splash screen wil be invisible.
      setTimeout(() => {
        this.showSplash = !this.showSplash;
      }, 300);
    }, 4000);
  }

}
