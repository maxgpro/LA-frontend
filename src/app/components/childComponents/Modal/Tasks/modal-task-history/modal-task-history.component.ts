import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Status } from 'src/app/models/status';
import { Task } from 'src/app/models/task';
import { TaskComment } from 'src/app/models/taskComment';
import { User } from 'src/app/models/user';
import { StatusService } from 'src/app/services/status.service';
import { TaskCommentService } from 'src/app/services/task-comment.service';
import { TasksService } from 'src/app/services/tasks.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-modal-task-history',
  templateUrl: './modal-task-history.component.html',
  styleUrls: ['./modal-task-history.component.sass']
})
export class ModalTaskHistoryComponent implements OnInit {

  form: FormGroup;
  taskComment:  TaskComment;
  taskComments: TaskComment[];
  statuses: Status[];
  users: User[];

  constructor(
    private tasksService: TasksService,
    private taskCommentService: TaskCommentService,
    private statusService: StatusService,
    private usersService: UsersService,
    private toastService: MatSnackBar,
    private dialogRef: MatDialogRef<ModalTaskHistoryComponent>,
    
    @Inject(MAT_DIALOG_DATA) public data: {
      nTasks : Task[],
      pTasks : Task[],
      dTasks : Task[],
      task   : Task,
      tasks  : Task[],
      index  : number
    }
  ) { }
  
  get f() { return this.form.controls }

  ngOnInit(): void {
    setTimeout(() => {
      this.getStatuses();
      this.getTaskComments();
      this.getUsers();
    },10);

    this.form = new FormGroup({
      text : new FormControl(""),
      status_id : new FormControl(this.data.task.status_id),
      responsible_id : new FormControl(this.data.task.responsible_id),
    });
  }
  getStatuses() {
    this.statusService.getStatuses().subscribe((data: Status[]) => {
      this.statuses = data;
    });
  }
  getTaskComments() {
    this.taskCommentService.getComments(this.data.task.id).subscribe((data: TaskComment[]) => {
      this.taskComments = data;
    });
  }
  getUsers() {
    this.usersService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  onSubmit(): void {
    if(this.form.invalid) {
      return;
    }

    this.taskComment = Object.assign(this.form.value);
    this.taskComment.task_id = this.data.task.id;

    this.storeTaskComment();
    this.dialogRef.close();
  }

  storeTaskComment() {
    this.taskCommentService.storeTaskComment(this.taskComment).subscribe((data: Task) => {
      this.toastService.open('Saved','Close',{
        duration: 5000
      });

      this.data.tasks.splice(this.data.index, 1); /*вырезаем лид*/
      
      //this.task = data.task;
      if(data.status_id == 1) {
        this.data.nTasks.push(data);
      }
      else if(data.status_id == 2) {
        this.data.pTasks.push(data);
      }
      else if(data.status_id == 3) {
        this.data.dTasks.push(data);
      }
    }); 
  }

}
