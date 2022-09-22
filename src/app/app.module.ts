import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './modules/material/material.module';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { NavigationComponent } from './components/layout/navigation/navigation.component';
import { PreloaderComponent } from './components/layout/preloader/preloader.component';
import { SidenavListComponent } from './components/layout/sidenav-list/sidenav-list.component';
import { FormComponent } from './components/form/form.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreloaderInterceptor } from './interceptors/preloader.interceptor';
import { AuthInterceptorInterceptor } from './interceptors/auth-interceptor.interceptor';
import { LogoutInterceptor } from './interceptors/logout.interceptor';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewLeadPipe } from './pipes/new-lead.pipe';
import { ProcessingLeadPipe } from './pipes/processing-lead.pipe';
import { DoneLeadPipe } from './pipes/done-lead.pipe';
import { ModalHistoryComponent } from './components/childComponents/Modal/Leads/modal-history/modal-history.component';
import { EventPipe } from './pipes/event.pipe';
import { ModalQualityComponent } from './components/childComponents/Modal/modal-quality/modal-quality.component';
import { ModalLeadComponent } from './components/childComponents/Modal/Leads/modal-lead/modal-lead.component';
import { LeadArchiveHistoryComponent } from './components/childComponents/Modal/Leads/archive-history/archive-history.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TasksComponent } from './components/tasks/tasks.component';
import { ModalTaskHistoryComponent } from './components/childComponents/Modal/Tasks/modal-task-history/modal-task-history.component';
import { ModalTaskArchiveHistoryComponent } from './components/childComponents/Modal/Tasks/modal-task-archive-history/modal-task-archive-history.component';
import { ModalTaskComponent } from './components/childComponents/Modal/Tasks/modal-task/modal-task.component';
import { LeadsArchiveComponent } from './components/archive/leads-archive/leads-archive.component';
import { TasksArchiveComponent } from './components/archive/tasks-archive/tasks-archive.component';
import { EventTaskPipe } from './pipes/event-task.pipe';
import { SourcesComponent } from './components/sources/sources.component';
import { ModalSourcesComponent } from './components/childComponents/Modal/modal-sources/modal-sources.component';
import { MatDialogRef } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavigationComponent,
    PreloaderComponent,
    SidenavListComponent,
    FormComponent,
    LoginComponent,
    DashboardComponent,
    NewLeadPipe,
    ProcessingLeadPipe,
    DoneLeadPipe,
    ModalHistoryComponent,
    EventPipe,
    ModalQualityComponent,
    ModalLeadComponent,
    LeadsArchiveComponent,
    LeadArchiveHistoryComponent,
    AnalyticsComponent,
    TasksComponent,
    TasksArchiveComponent,
    ModalTaskComponent,
    ModalTaskArchiveHistoryComponent,
    ModalTaskHistoryComponent,
    EventTaskPipe,
    SourcesComponent,
    ModalSourcesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PreloaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogoutInterceptor,
      multi: true
    },
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
