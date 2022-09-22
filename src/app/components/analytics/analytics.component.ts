import { Component, OnInit } from '@angular/core';
import { Analytic } from 'src/app/models/analytic';
import { LeadsService } from 'src/app/services/leads.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.sass']
})
export class AnalyticsComponent implements OnInit {

  constructor(
    private leadService: LeadsService
  ) { }

  dateStart : Date;
  dateEnd: Date;
  analiticsData : Analytic[];
  path : string = environment.apiUrl;

  ngOnInit(): void {
    this.dateStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    this.dateEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    this.getAnalytics();
  }

  getAnalytics(): void {
    this.leadService.getAnalytics(this.dateHelper(this.dateStart), this.dateHelper(this.dateEnd)).subscribe((data : Analytic[]) => {
        this.analiticsData = data;
    });
  }

  dateHelper(date: Date): string {
    /// d.m.Y
    if(date) {
      return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
    }
    return '';
  }

}
