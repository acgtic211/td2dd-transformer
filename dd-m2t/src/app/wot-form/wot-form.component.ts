import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faAngleRight, faExclamation} from '@fortawesome/free-solid-svg-icons';
import { TdValidatorService } from '../td-validator.service'
import { DdBuilderService } from '../dd-builder.service';



@Component({
  selector: 'app-wot-form',
  templateUrl: './wot-form.component.html',
  styleUrls: ['./wot-form.component.css'],
})
export class WotFormComponent implements OnInit {

  @Output() eventServicesNeeded = new EventEmitter();
  faAngleRight = faAngleRight;
  faExclamation = faExclamation;
  showError = false;
  tdForm;
  servicesNeeded;
  
  constructor(private formBuilder: FormBuilder, private tdValidatorService: TdValidatorService, private ddBuilderService: DdBuilderService){

    this.tdForm = this.formBuilder.group({
      td:'',
    });

  }

  onSubmit(formData) {
    
    if(this.tdValidatorService.validate(formData.td)){
    
      this.servicesNeeded = this.ddBuilderService.servicesNeeded(formData.td);
      this.eventServicesNeeded.emit(this.servicesNeeded);
    
    }
    

  }

  validate(formData){
    
    if(this.tdValidatorService.validate(formData.td)){
      this.showError = false;
      
          
    }else{
      
      this.showError = true;
    }
  }
  ngOnInit(): void {
  }

}
