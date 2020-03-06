import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { TdValidatorService } from '../td-validator.service'


@Component({
  selector: 'app-wot-form',
  templateUrl: './wot-form.component.html',
  styleUrls: ['./wot-form.component.css'],
  providers:  [ TdValidatorService ]
})
export class WotFormComponent implements OnInit {

  faAngleRight = faAngleRight; 
  tdForm;
  
  constructor(private formBuilder: FormBuilder, private tdValidatorService: TdValidatorService){

    this.tdForm = this.formBuilder.group({
      td:'',
    });

  }

  onSubmit(formData) {
    // Process checkout data here
    
    if(this.tdValidatorService.validate(formData.td)){
      
    }
    

  }
  ngOnInit(): void {
  }

}
