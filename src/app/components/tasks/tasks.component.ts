import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from 'src/app/models/task';
import { User } from 'src/app/models/user';
import { TasksService } from 'src/app/services/tasks.service';
import { ModalTaskHistoryComponent } from '../childComponents/Modal/Tasks/modal-task-history/modal-task-history.component';
import { ModalTaskComponent } from '../childComponents/Modal/Tasks/modal-task/modal-task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnInit {

  nTasks: Task[];
  pTasks: Task[];
  dTasks: Task[];
  user: User;

  constructor(
    private tasksService: TasksService,
    private toastService: MatSnackBar,
    private modalService: MatDialog,
    private bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe((data) => {
      this.nTasks = data.new;
      this.pTasks = data.process;
      this.dTasks = data.done;
    });

    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  public openSourceModal() {
    this.modalService.open(ModalTaskComponent,
      {
        data: {
          tasks: this.nTasks
        },
        width: '80%'
      });
  }
  
  openHistory(event, task: Task, index: number, tasks: Task[]): void {
    this.modalService.open(ModalTaskHistoryComponent,
      {
        width : "80%",
        data: {
          nTasks : this.nTasks,
          pTasks : this.pTasks,
          dTasks : this.dTasks,
          task : task,
          tasks : tasks,
          index : index,
        }
      });
  }

}
