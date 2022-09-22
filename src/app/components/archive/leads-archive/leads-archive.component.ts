import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LeadArchiveHistoryComponent } from 'src/app/components/childComponents/Modal/Leads/archive-history/archive-history.component';
import { Lead } from 'src/app/models/lead';
import { LeadsService } from 'src/app/services/leads.service';

@Component({
  selector: 'app-leads-archive',
  templateUrl: './leads-archive.component.html',
  styleUrls: ['./leads-archive.component.sass']
})
export class LeadsArchiveComponent implements OnInit {

  page: number;
  leads: Lead[];
  
  dleadQuality: boolean = false;
  dleadQualityFalse : boolean = false;

  constructor(
    private leadsService: LeadsService, 
    private modalService: MatDialog
  ) {
    this.page = 1;
    this.leads = [];
   }

  ngOnInit(): void {
    this.getLeads();
  }
  
  getLeads() {
    this.leadsService.getArchiveLeads(this.page).subscribe((data)=>{
      let tmpLeads : Lead[] = this.leads;
      data.forEach(function(item) {
        tmpLeads.push(item);
      });
      this.leads = tmpLeads;
    });
  }

  loadLead() {
    ++this.page;
    this.getLeads();
  }

  openHistory(event, lead : Lead, i : number, leads : Lead[]) {
    this.modalService.open(LeadArchiveHistoryComponent, {
      data : {
        lead : lead,
      },
      width : '80%'
    });
  }

}
