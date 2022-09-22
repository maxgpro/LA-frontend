import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { Lead } from 'src/app/models/lead';
import { Source } from 'src/app/models/source';
import { Task } from 'src/app/models/task';
import { Unit } from 'src/app/models/unit';
import { User } from 'src/app/models/user';

import { LeadsService } from 'src/app/services/leads.service';
import { SourcesService } from 'src/app/services/sources.service';
import { TasksService } from 'src/app/services/tasks.service';
import { UnitsService } from 'src/app/services/units.service';
import { UsersService } from 'src/app/services/users.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {

  form:    FormGroup;
  units:   Unit[];
  sources: Source[];
  users:   User[];

  isLead: boolean;
  addSaleCount: number = 0;

  lead: Lead;
  task: Task;

  constructor(
    private unitsService: UnitsService,
    private sourcesService: SourcesService,
    private leadsService: LeadsService,
    private tasksService: TasksService,
    private usersService: UsersService,
    private toastService: MatSnackBar,
  ) {
      this.lead = new Lead();
      this.task = new Task();
   }

   get f() {return this.form.controls}

  ngOnInit(): void {
    this.getUnits();
    this.getSources();
    this.getUsers();
    this.getAddSaleCount();

    this.isLead = true;

    
    this.form = new FormGroup({

        linkPhone: new FormGroup({
          link:  new FormControl(""),
          phone: new FormControl(""),
      }, this.RequireLinkPhone()),

      source_id: new FormControl("", Validators.required),
      unit_id:   new FormControl("", Validators.required),
      
      is_processed:        new FormControl("0", Validators.required),
      is_express_delivery: new FormControl("0", Validators.required),
      is_add_sale:         new FormControl("0", Validators.required),

      text :          new FormControl(""),
      responsible_id: new FormControl(""),
      is_lead:        new FormControl(true)
    });
    
    this.onChangesIsLead();
  }
  
  onChangesIsLead() {
    this.form.get('is_lead').valueChanges.subscribe(val => {
      this.isLead = val;
      this.form.controls['responsible_id'].setValidators(null);
      if(!val) {
        this.form.controls['responsible_id'].setValidators([Validators.required]);
      }
      this.form.controls['responsible_id'].updateValueAndValidity();
    });
  }

  RequireLinkPhone(): import("@angular/forms").ValidatorFn | import("@angular/forms").ValidatorFn[] | import("@angular/forms").AbstractControlOptions {
    return (group : FormGroup) : ValidationErrors => {
      const link = group.controls['link'];
      const phone = group.controls['phone'];
      if((!link.value && !phone.value) || (link.value && phone.value)) {
          link.setErrors({RequireLinkPhone : true});
          phone.setErrors({RequireLinkPhone : true});
          return {RequireLinkPhone : true}
      }
      else {
        link.setErrors(null);
        phone.setErrors(null);
        return null;
      }
    }
  }

  getUnits() {
    this.unitsService.getUnits().subscribe((data: Unit[])=>{
        this.units = data;
    });
  }
  getSources() {
    this.sourcesService.getSources().subscribe((data: Source[])=>{
      this.sources = data;
    });
  }
  getUsers() {
    this.usersService.getUsers().subscribe((data: User[])=>{
      this.users = data;
    });
  }
  
  getAddSaleCount() {
    this.leadsService.addSaleCount().subscribe((data: number)=>{
      this.addSaleCount = data;
    });
  }

  onSubmit() {
    if(this.form.invalid) {
      return;
    }

    if(this.isLead) {
        // lead
        this.lead = Object.assign(this.form.value, this.form.get('linkPhone').value);
        this.checkLead();
    }
    else {
      // task
      this.task = Object.assign(this.form.value, this.form.get('linkPhone').value);
      this.storeTask();
    }

    this.form.reset({
      is_processed :"0",
      is_express_delivery :"0",
      is_add_sale :"0",

      text : "",
      responsible_id : "",
      is_lead : true
    });

    //this.form.markAsUntouched();
    //this.form.markAsPristine();
    //this.form.updateValueAndValidity();
    
    Object.keys(this.form.controls).forEach(key => {
      this.resetControlls(this.form.get(key));
    });
    this.resetControlls(this.f.linkPhone.get('link'));
    this.resetControlls(this.f.linkPhone.get('phone'));
    this.resetControlls(this.form);
  }

  resetControlls (obj: AbstractControl) {
    obj.setErrors(null) ;
    obj.markAsUntouched();
    obj.markAsPristine();
  }


  checkLead() {
    this.leadsService.checkLead(this.lead).subscribe((data) => {
      if(data.exist) {
        this.lead.id = data.item.id;
        this.updateLead();
      }
      else {
        this.storeLead();
      }
    });
  }
  storeLead() {
    this.leadsService.storeLead(this.lead).subscribe((data) => {
      this.toastService.open("Saved","Close", {
        duration: 5000
      });
    })
  }
  updateLead() {
    this.leadsService.updateLead(this.lead).subscribe((data) => {
      this.toastService.open("Saved","Close", {
        duration: 5000
      });
    })
  }
  storeTask() {
    this.tasksService.storeTask(this.task).subscribe((data) => {
      this.toastService.open("Saved","Close", {
        duration: 5000
      });
    })
  }
}
