import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faAngleRight, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { TdValidatorService } from '../td-validator.service'
import { DdInfraBuilderService } from '../dd-infra-builder.service';

var FileSaver = require('file-saver');
var JSZip = require("jszip");

@Component({
  selector: 'app-wot-form',
  templateUrl: './wot-form.component.html',
  styleUrls: ['./wot-form.component.css'],
  providers:  [ TdValidatorService, DdInfraBuilderService ]
})
export class WotFormComponent implements OnInit {

  faAngleRight = faAngleRight;
  faExclamation = faExclamation;
  showError = false;
  tdForm;
  
  constructor(private formBuilder: FormBuilder, private tdValidatorService: TdValidatorService, private ddInfraBuilderService: DdInfraBuilderService){

    this.tdForm = this.formBuilder.group({
      td:'',
    });

  }

  onSubmit(formData) {
    
    var zip = new JSZip();
    
    if(this.tdValidatorService.validate(formData.td)){
      this.showError = false;
      var dockerc = this.ddInfraBuilderService.buildCommon();
      zip.file("/sub/docker-compose.yml", dockerc);
      zip.file("dc.yml", dockerc);
      zip.generateAsync({type:"blob"})
      .then(function (blob) {
          FileSaver.saveAs(blob, "hello.zip");
      });
    }else{
      
      this.showError = true;
    }
    

  }
  ngOnInit(): void {
  }

}
