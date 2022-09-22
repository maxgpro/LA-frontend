import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Lead } from 'src/app/models/lead';
import { Source } from 'src/app/models/source';
import { Unit } from 'src/app/models/unit';
import { LeadsService } from 'src/app/services/leads.service';
import { SourcesService } from 'src/app/services/sources.service';
import { UnitsService } from 'src/app/services/units.service';

@Component({
  selector: 'app-modal-lead',
  templateUrl: './modal-lead.component.html',
  styleUrls: ['./modal-lead.component.sass']
})
export class ModalLeadComponent implements OnInit {

  units: Unit[];
  sources: Source[];
  form : FormGroup;
  lead : Lead;

  constructor(
    private leadsService: LeadsService,
    private toastService: MatSnackBar,
    private unitsService: UnitsService,
    private sourcesService: SourcesService,
    private dialogRef: MatDialogRef<ModalLeadComponent>,
    @Inject(MAT_DIALOG_DATA) public data : {
      leads: Lead[],
      processingLeads: Lead[],
      dLeads: Lead[],
    }

  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getUnits();
      this.getSources()
    },10);

    this.form = new FormGroup({
      
      linkPhone : new FormGroup({
        link: new FormControl(""),
        phone: new FormControl(""),
      }, this.RequireLinkPhone()),

      source_id: new FormControl("", Validators.required),
      unit_id: new FormControl("", Validators.required),
      
      is_processed: new FormControl("0", Validators.required),
      is_express_delivery: new FormControl("0", Validators.required),
      is_add_sale: new FormControl("0", Validators.required),

      text : new FormControl(""),
      
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

  get f() {return this.form.controls}

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

  onSubmit() {
    if(this.form.invalid) {
      return;
    }
    this.lead = new Lead();

    // lead
    this.lead = Object.assign(this.form.value, this.form.get('linkPhone').value);
    this.checkLead();
    
    this.form.reset({
      is_processed :"0",
      is_express_delivery :"0",
      is_add_sale :"0",
      text : "",
      responsible_id : "",
      is_lead : true
    });

    Object.keys(this.form.controls).forEach(key => {
      this.resetControlls(this.form.get(key));
    });

    this.resetControlls(this.f.linkPhone.get('link'));
    this.resetControlls(this.f.linkPhone.get('phone'));
    this.resetControlls(this.form);
    this.dialogRef.close();
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
    this.leadsService.storeLead(this.lead).subscribe((data : Lead) => {
      this.toastService.open("Saved","Close", {
        duration: 5000
      });
      this.data.leads.push(data);
    })
  }

  updateLead() {
    this.leadsService.updateLead(this.lead).subscribe((data) => {
      this.toastService.open("Saved","Close", {
        duration: 5000
      });
      this.removeAndPushLead(data);
    })
  }

  removeAndPushLead(data: Lead) {  
    this.checkRemove(data, this.data.leads);
    this.checkRemove(data, this.data.processingLeads);
    this.checkRemove(data, this.data.dLeads);

    this.data.leads.push(data);
  }

  checkRemove(data: Lead, leads: Lead[]) {
    let ind : number = undefined;
    leads.forEach(function (item, index) {
      if(item.id == data.id) {
        ind = index;
      }
    });
    if(ind != undefined) {
      leads.splice(ind, 1);
    }
  }
}
