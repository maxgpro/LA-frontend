import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Source } from 'src/app/models/source';
import { Task } from 'src/app/models/task';
import { Unit } from 'src/app/models/unit';
import { User } from 'src/app/models/user';
import { SourcesService } from 'src/app/services/sources.service';
import { TasksService } from 'src/app/services/tasks.service';
import { UnitsService } from 'src/app/services/units.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.sass']
})
export class ModalTaskComponent implements OnInit {

  form : FormGroup;
  units: Unit[];
  sources: Array<Source>;
  users: Array<User>;
  task : Task;
  
  constructor(
    private taskService : TasksService, 
    private toastService: MatSnackBar,
    private unitsService: UnitsService, 
    private sourcesService : SourcesService, 
    private userService : UsersService,
    private dialogRef: MatDialogRef<ModalTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data : {
      tasks : Task[],
    }
  ) {}

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

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

  ngOnInit() {
    setTimeout(() => {
      this.getUnits();
      this.getSources();
      this.getUsers();
    },10);
    
    this.form = new FormGroup({
      linkPhone : new FormGroup({
        link : new FormControl(''),
        phone : new FormControl(''),
      }
      , this.MustMatch()),
      source_id : new FormControl('', Validators.required),
      unit_id : new FormControl('', Validators.required),
      responsible_id : new FormControl('', Validators.required),
      text : new FormControl(""),
    });
  }

  getUsers () {
    this.userService.getUsers()
      .subscribe((data: any) =>  {
        this.users = data;
      });
  }

  MustMatch(): ValidatorFn {
    return (group: FormGroup):  ValidationErrors => {

      const link = group.controls['link'];
      const phone = group.controls['phone'];

      if(!link || !phone) {
        return null;
      }

      if((!link.value && !phone.value) || (link.value  && phone.value )) {
        link.setErrors({'mustMatch': true});
        phone.setErrors({'mustMatch': true});
        return {'mustMatch': true};
      }

      else {
        link.setErrors(null);
        phone.setErrors(null);
        return null;
      }
    };
  }

  onSubmit () {

    if (this.form.invalid) {
      return;
    }

    this.task = Object.assign(this.form.value, this.form.get('linkPhone').value);
    this.storeTask();

    Object.keys(this.form.controls).forEach(key => {
      this.resetControlls(this.form.get(key));
    });

    this.resetControlls(this.f.linkPhone.get('link'));
    this.resetControlls(this.f.linkPhone.get('phone'));
    this.resetControlls(this.form);
    this.dialogRef.close();
  }

  storeTask() {
    this.taskService.storeTask(this.task).subscribe((data) => {
      this.toastService.open("Saved","Close", {
        duration: 2000
      });
      this.data.tasks.push(data);
    });
  }

  resetControlls (obj: AbstractControl) {
    obj.setErrors(null) ;
    obj.markAsUntouched();
    obj.markAsPristine();
  }

}
