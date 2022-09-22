import { Pipe, PipeTransform } from '@angular/core';
import { Lead } from '../models/lead';

@Pipe({
  name: 'newLead'
})
export class NewLeadPipe implements PipeTransform {

  transform(nLeads: Lead[], leadProcess: boolean, leadExpress: boolean): Lead[] {
    if(nLeads && nLeads.length === 0) {
      return nLeads;
    }

    let tmp: Lead[] = nLeads;

    if(leadProcess) {
      tmp = nLeads.filter((lead) => lead.is_processed == leadProcess);
    }

    if(leadExpress) {
      tmp = nLeads.filter((lead) => lead.is_express_delivery == leadExpress);
    }

    return tmp;
  }
}
