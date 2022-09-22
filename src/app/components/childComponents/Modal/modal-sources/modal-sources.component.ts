import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Source } from 'src/app/models/source';
import { SourcesService } from 'src/app/services/sources.service';

@Component({
  selector: 'app-modal-sources',
  templateUrl: './modal-sources.component.html',
  styleUrls: ['./modal-sources.component.sass']
})
export class ModalSourcesComponent implements OnInit {

  form: FormGroup;
  source: Source;

  constructor(
    private sourcesService: SourcesService,
    private toastService: MatSnackBar,
    private ref: MatDialogRef<ModalSourcesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
	    source: Source;
	    sources: Source[];
  }
  ) {
    this.source = this.data.source;
    if(!this.source) {
      this.source = new Source();
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  @Output() onChange = new EventEmitter();

  ngOnInit(): void {
    this.form = new FormGroup({
      title : new FormControl(this.source.title)
    })
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.source = Object.assign(this.source, this.form.value);

    if (this.source.id) {
      this.updateSource();
    }
    else {
      this.storeSource();
    }

    this.form.reset();
    this.ref.close();
  }

  storeSource(): void {
    this.sourcesService.storeSource(this.source).subscribe((source) => {
      this.data.sources.push(source);
      this.toastService.open("Saved","Close", {
        duration: 5000
      });
      this.onChange.emit();
    });
  }  

  updateSource(): void {
    this.sourcesService.updateSource(this.source).subscribe((source) => {
      this.toastService.open("Saved","Close", {
        duration: 5000
      });

      for (let index = 0; index < this.data.sources.length; index++) {
        if (this.data.sources[index].id == source.id) {
          this.data.sources.splice(index, 1, source);
        }
      }

      this.onChange.emit();
    });
  }

}
