import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { LeadsArchiveComponent } from './components/archive/leads-archive/leads-archive.component';
import { TasksArchiveComponent } from './components/archive/tasks-archive/tasks-archive.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormComponent } from './components/form/form.component';
import { LoginComponent } from './components/login/login.component';
import { SourcesComponent } from './components/sources/sources.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'form',
    component: FormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'archives',
    component: LeadsArchiveComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'analytics',
    component: AnalyticsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks_archive',
    component: TasksArchiveComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sources',
    component: SourcesComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
