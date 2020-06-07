import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MyWorkerType, MyWorker } from 'src/app/shared/worker.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Service } from 'src/app/shared/worker.service';
import { RouterLink, Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/routing/routing';


//отключение кнопки при неправильном заполнении

@Component({
  selector: 'app-table-workers',
  templateUrl: './table-workers.component.html',
  styleUrls: ['./table-workers.component.css'],
})

export class TableWorkersComponent {
  @Input() title: string;
  @Input() workers: MyWorker[] = [];
  myWorkerType = MyWorkerType;

  numb=0;
  type=0;

  Hidden = [];

  @Output() deleteWorker = new EventEmitter<number>();
  
  ChangeForm: FormGroup;

  constructor(public worker:Service,public router: Router) {
  }

  async onInfo(worker){
    await this.worker.set(worker);
    this.router.navigate(["/ChangeForm"]);
  }

  Type(type){
    if (type==0){return "IT отдел"}
    else if (type==1){return "Отдел продаж"}
    else if (type==2){return "Отдел доставки"}
    else if (type==3){return "Юридический отдел"}
  }

  onDeleteWorker(id: number) {
    this.deleteWorker.emit(id);
  }

  

  CheckHidden(id:number){
    for(let i of this.Hidden){
      if (i==id){return false}
    }
    return true
  }

  getAge(Dr){
    let date=new Date;
    let year:number;
    let month:number;
    let day:number;
    let count=0;
    let i=-1;
    while (count!=2){
      i++;
      if (Dr.slice(i,i+1)=="-"){
        count++;
        if (count==1){year=Dr.slice(0,i);}
        if (count==2){
          month=Dr.slice(year.toString().length+1,i);
          day=Dr.slice(i+1,i+3);
        }
      }
    }
    // console.log(year);
    // console.log(month);
    // console.log(day);
    let age=date.getFullYear()-year;
    if (date.getMonth()+1<month){age--;}
    else if ((date.getMonth()+1==month)&&(date.getDate()<day)){age--;}

    
    return age;
  }
}
