import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Lead } from 'src/app/models/lead';
import { LeadsService } from 'src/app/services/leads.service';
import { ModalHistoryComponent } from '../childComponents/Modal/Leads/modal-history/modal-history.component';
import { ModalLeadComponent } from '../childComponents/Modal/Leads/modal-lead/modal-lead.component';
import { ModalQualityComponent } from '../childComponents/Modal/modal-quality/modal-quality.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  nLeads:            Lead[];
  dLeads:            Lead[];
  processingLeads:   Lead[];

  leadExpress:       boolean = false;
  leadProcess:       boolean = false;
  
  dLeadQuality:      boolean = false;
  dLeadQualityFalse: boolean = false;
  
  processingLeadProcess: boolean = false;
  
  constructor(
    private leadService:  LeadsService,
    private toastService: MatSnackBar,
    private modalService: MatDialog,
    private bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit(): void {
    this.leadService.getLeads().subscribe((data) => {
      this.nLeads = data.new;
      this.dLeads = data.done;
      this.processingLeads = data.process;
    });
  }


  openHistory(event, lead: Lead, index: number, leads: Lead[]): void {
    let modalComponentRef = this.modalService.open(ModalHistoryComponent, {
      width : "80%",
      data: {
        nLeads : this.nLeads,
        processingLeads : this.processingLeads,
        dLeads : this.dLeads,
        lead : lead,
        leads : leads,
        index : index,
      }
    });

    /// event subscribe
    modalComponentRef.componentInstance.onQuality.subscribe((data: Lead) => {
      this.bottomSheet.open(ModalQualityComponent,{
        data : {
          lead : data,
          dLeads : this.dLeads,
        }
      });
    });
    
  }

  datecheck(created_at: Date, numb: number, type: string) : boolean {
    if(type == 'less') {
      return this.dateHelper('h', new Date(created_at), new Date()) < numb;
    }
    if(type == 'more') {
      return this.dateHelper('h', new Date(created_at), new Date()) > numb;
    }
    return false;
  }
  
  dateHelper(datePart: string, fromDate: any, today: any) : number {
    datePart = datePart.toLowerCase();
    let diff = today - fromDate;
    let divideBy = {
      w: 604800000,
      d: 86400000,
      h: 3600000,
      n: 60000,
      s: 1000
    };
    return Math.floor(diff/divideBy[datePart]);
  }

  timeStr(fromDate: Date) : string {
    let resultDate = this.dateHelper('h', new Date(fromDate), new Date());
    let result = "";
    if(resultDate < 24) {
      result = "до 24 часов";
    }
    else if(resultDate >= 24 && resultDate <= 48) {
      result = "24-48 часа";
    }
    else if(resultDate > 48 && resultDate <= 72) {
      result = "48-72 часа";
    }
    else if(resultDate > 72) {
      result = "72 часа и более";
    }
    return result;
  }

  openSourceModal (): void {
    this.modalService.open(ModalLeadComponent, {
      data : {
        leads : this.nLeads,
        processingLeads : this.processingLeads,
        dLeads : this.dLeads
      },
      width : '80%'
    });
  }

}
