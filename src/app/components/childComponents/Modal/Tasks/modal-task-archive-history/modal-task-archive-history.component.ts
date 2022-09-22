import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/models/task';
import { TaskComment } from 'src/app/models/taskComment';
import { TaskCommentService } from 'src/app/services/task-comment.service';

@Component({
  selector: 'app-modal-task-archive-history',
  templateUrl: './modal-task-archive-history.component.html',
  styleUrls: ['./modal-task-archive-history.component.sass']
})
export class ModalTaskArchiveHistoryComponent implements OnInit {

  form : FormGroup;
  taskComments: TaskComment[];

  constructor(
    private taskCommentService : TaskCommentService, 
    @Inject(MAT_DIALOG_DATA) public data : {
      task : Task;
    }
  ) {
    this.taskComments = [];
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  getTaskComments() {
    this.taskCommentService.getComments(this.data.task.id).subscribe((data: TaskComment[]) =>  {
      this.taskComments = data;
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.getTaskComments();
    },10);    
  }

}
