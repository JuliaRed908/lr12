import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }   from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { AppComponent } from './app.component';
import { TableWorkersComponent } from './ui/table-workers/table-workers.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {  FirstComponent } from './shared/First/First';
import { AppRoutingModule } from './routing/routing';



import { AddFormComponent } from './ui/addform-worker/addform-worker.component';
import { WorkerListComponent } from './ui/BDworker/BDworker';
import { SortPipe } from './shared/sort.pipe';
import { ChangeFormComponent } from './ui/Change/Change';



export const options: Partial<IConfig> | (() => Partial<IConfig>)=null;

@NgModule({
  declarations: [AppComponent, TableWorkersComponent,  FirstComponent, WorkerListComponent, AddFormComponent, ChangeFormComponent, SortPipe],
  imports: [
    NgxMaskModule.forRoot(),
    BrowserModule,

    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
