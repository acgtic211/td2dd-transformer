import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dd-m2t';
  services = {};
  
  handleServicesNeeded($event){
    console.log($event);
    this.services = $event;
  }
  
}
