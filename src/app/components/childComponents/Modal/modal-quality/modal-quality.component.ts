import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Lead } from 'src/app/models/lead';
import { LeadsService } from 'src/app/services/leads.service';

@Component({
  selector: 'app-modal-quality',
  templateUrl: './modal-quality.component.html',
  styleUrls: ['./modal-quality.component.sass']
})
export class ModalQualityComponent implements OnInit {
  constructor(
    private leadService : LeadsService, 
    private toastService: MatSnackBar,
    private dialogRef: MatBottomSheetRef<ModalQualityComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {
      lead : Lead,
      dLeads : Lead[]
    }
  ) { }

  ngOnInit(): void {

  }

  addQuality() {
    this.leadService.addQuality(this.data.lead).subscribe((data: Lead) => {
      this.toastService.open('Saved','Close',{
        duration: 2000
      });

      let ind: number = undefined;
      this.data.dLeads.forEach(function(item, i) {
        if(item.id == data.id) {
          ind = i
        }
      });

      if(ind != undefined) {
        this.data.dLeads.splice(ind, 1, data);
      }

      this.dialogRef.dismiss();
    });
  }

  closeModal () {
    this.dialogRef.dismiss();
  }

}
