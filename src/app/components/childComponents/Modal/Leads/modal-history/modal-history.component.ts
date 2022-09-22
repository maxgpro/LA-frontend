import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Lead } from 'src/app/models/lead';
import { LeadComment } from 'src/app/models/leadComment';
import { Status } from 'src/app/models/status';
import { LeadCommentService } from 'src/app/services/lead-comment.service';
import { LeadsService } from 'src/app/services/leads.service';
import { SourcesService } from 'src/app/services/sources.service';
import { StatusService } from 'src/app/services/status.service';
import { UnitsService } from 'src/app/services/units.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-modal-history',
  templateUrl: './modal-history.component.html',
  styleUrls: ['./modal-history.component.sass']
})
export class ModalHistoryComponent implements OnInit {
  form: FormGroup;
  statuses: Status[];
  leadComments: LeadComment[];
  leadComment: LeadComment;
  
  constructor(
    private leadService : LeadsService, 
    private leadCommentService : LeadCommentService,
    private unitsService: UnitsService, 
    private sourcesService : SourcesService, 
    private userService : UsersService,
    private statusService : StatusService,
    private toastService: MatSnackBar,
    private dialogRef: MatDialogRef<ModalHistoryComponent>,

    @Inject(MAT_DIALOG_DATA) public data: {
      nLeads : Lead[],
      processingLeads : Lead[],
      dLeads : Lead[],
      lead   : Lead,
      leads  : Lead[],
      index  : number
    }
  ) { }

  @Output() onQuality = new EventEmitter();

  get f() { return this.form.controls }

  ngOnInit(): void {
    if(!this.data.lead) {
      this.data.lead = new Lead();
    }

    setTimeout(() => {
      this.getStatuses();
      this.getLeadComments();
    },10);
    
    this.form = new FormGroup({
      text : new FormControl(""),
      status_id : new FormControl(this.data.lead.status_id),
    });
  }
  
  getLeadComments() {
    this.leadCommentService.getComments(this.data.lead.id).subscribe((data: LeadComment[]) => {
      this.leadComments = data;
    });
  }

  getStatuses() {
    this.statusService.getStatuses().subscribe((data: Status[]) => {
      this.statuses = data;
    });
  }

  onSubmit() {
    if(this.form.invalid) {
      return;
    }
    this.storeLeadComment();
    this.dialogRef.close();
  }

  storeLeadComment() {
    this.leadComment = Object.assign(this.form.value);
    this.leadComment.lead_id = this.data.lead.id;


    this.leadCommentService.storeLeadComment(this.leadComment).subscribe((data) => {
      this.toastService.open('Saved','Close',{
        duration: 2000
      });

      let newLeadResult: Lead = data;
      this.data.leads.splice(this.data.index, 1);

      if(newLeadResult.status_id == 1) {
        this.data.nLeads.push(newLeadResult);
      }
      else if(newLeadResult.status_id == 2) {
        this.data.processingLeads.push(newLeadResult);
      }
      else if(newLeadResult.status_id == 3) {
        this.data.dLeads.push(newLeadResult);

        this.onQuality.emit(newLeadResult);
      }
    }); 
  }

}
