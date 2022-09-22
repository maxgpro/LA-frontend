import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/models/task';
import { TasksService } from 'src/app/services/tasks.service';
import { ModalTaskArchiveHistoryComponent } from '../../childComponents/Modal/Tasks/modal-task-archive-history/modal-task-archive-history.component';

@Component({
  selector: 'app-tasks-archive',
  templateUrl: './tasks-archive.component.html',
  styleUrls: ['./tasks-archive.component.sass']
})
export class TasksArchiveComponent implements OnInit {

  page: number;
  tasks: Task[];

  constructor(
    private tasksService: TasksService, 
    private modalService: MatDialog
  ) {
    this.page = 1;
    this.tasks = [];
   }

  ngOnInit(): void {
    this.getArchiveTasks();
  }
  
  getArchiveTasks() {
    this.tasksService.getArchiveTasks(this.page).subscribe((data)=>{
      let tmpTasks : Task[] = this.tasks;
      data.forEach(function(item) {
        tmpTasks.push(item);
      });
      this.tasks = tmpTasks;
    });
  }

  loadTasks() {
    ++this.page;
    this.getArchiveTasks();
  }

  openHistory(event, task: Task): void {
    this.modalService.open(ModalTaskArchiveHistoryComponent,
      {
        width : "80%",
        data: {
          task : task
        }
      });
  }

}
