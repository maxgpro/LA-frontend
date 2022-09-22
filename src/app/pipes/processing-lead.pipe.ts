import { Pipe, PipeTransform } from '@angular/core';
import { Lead } from '../models/lead';

@Pipe({
  name: 'processingLead'
})
export class ProcessingLeadPipe implements PipeTransform {

  transform(processingLeads: Lead[], processingLeadProcess: boolean): Lead[] {
    if(processingLeads && processingLeads.length === 0) {
      return processingLeads;
    }

    if(processingLeadProcess) {
      return processingLeads.filter((lead) => lead.is_processed == processingLeadProcess);
    }

    return processingLeads;
  }
}
