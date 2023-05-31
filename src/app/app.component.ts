import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'OddityVR Dashboard';

  @HostListener("window:onbeforeunload",["$event"])
  clearLocalStorage(){
    localStorage.clear();
  }
}
