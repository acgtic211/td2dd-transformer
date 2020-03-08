import { Component, OnInit, Input } from '@angular/core';
import { faDownload, faShapes, faCog, faEye, faDatabase, faVrCardboard, faClone, faBroadcastTower, faSitemap  } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-dd-response',
  templateUrl: './dd-response.component.html',
  styleUrls: ['./dd-response.component.css']
})
export class DdResponseComponent implements OnInit {

  faShapes = faShapes
  faDownload = faDownload
  faCog = faCog
  faEye = faEye
  faDatabase = faDatabase
  faVrCardboard = faVrCardboard
  faClone = faClone
  faBroadcastTower = faBroadcastTower
  faSitemap = faSitemap

  @Input() services;

  constructor() { }

  ngOnInit(): void {
  }

  showField(field){
    return this.services.services.includes(field);
  }

}
