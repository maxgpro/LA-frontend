import { Pipe, PipeTransform } from '@angular/core';
import { Lead } from '../models/lead';

@Pipe({
  name: 'doneLead'
})
export class DoneLeadPipe implements PipeTransform {

  transform(dLeads: Lead[], dLeadQuality: boolean, dLeadQualityFalse: boolean): Lead[] {
    if(dLeads && dLeads.length == 0) {
      return dLeads;
    }

    if(dLeadQuality) {
      return dLeads.filter((lead) => lead.isQualityLead == dLeadQuality);
    }

    if(dLeadQualityFalse) {
      return dLeads.filter((lead) => lead.isQualityLead != dLeadQualityFalse);
    }
    
    return dLeads;
  }
  
}
