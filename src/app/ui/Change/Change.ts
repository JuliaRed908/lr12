import { Component, OnInit } from '@angular/core';
import {
  MyWorker,
  MyWorkerType
 } from 'src/app/shared/worker.model';
import { AgeService } from 'src/app/shared/age.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Service } from 'src/app/shared/worker.service';
import { Router } from '@angular/router';

interface ChangeForm {
  name: string;
  surname: string;
  patronimic:string;
  date:number;
  email:string;
}

@Component({
  selector: 'app-change-form',
  templateUrl: './Change.html',
  styleUrls: ['./Change.css']
})
export class ChangeFormComponent implements OnInit {
  workers: MyWorker[]=[];
  myWorkerType = MyWorkerType;

  numb=0;

  OpenWorker:MyWorker;

  ChangeName;
  ChangeSurname;
  ChangePatronimic;
  CangeAge;
  CangeDate;
  CangeEmail;
  CangeTelephone;
  type;

  onChange=false;
  
  ChangeForm: FormGroup;
  users: ChangeForm[]=[];

  constructor(public worker:Service,public router: Router) { 
    this.ChangeForm = new FormGroup({
      name: new FormControl(null,[Validators.required]),
      surname: new FormControl(null,[Validators.required]),
      patronimic: new FormControl(null,[Validators.required]),
      date: new FormControl(null,[Validators.required]),
      email: new FormControl(null,[Validators.required]),
    });
    this.OpenWorker=this.worker.get();
    this.getData();
  }


  async getData() {
    try {
      this.workers = await this.worker.getData();
    } catch (error) {
      console.log(error)
    }
  }

  async onDeleteById(id: number) {
    try {
      await this.worker.onDeleteById(id);
      this.getData();
    } catch (error) {
      console.log(error);
    }
    this.router.navigate(["/WorkerBD"]);
  }

  async onChangeById(worker){
    try {
      await this.worker.changeWorker(worker);
      this.getData();
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit(): void {}

  Type(type){
    if (type==0){return "IT отдел"}
    else if (type==1){return "Отдел продаж"}
    else if (type==2){return "Отдел доставки"}
    else if (type==3){return "Юридический отдел"}
  }

  onChangeWorker(){
    this.ChangeName=this.OpenWorker.name;
    this.ChangeSurname=this.OpenWorker.surname;
    this.ChangePatronimic=this.OpenWorker.patronimic;
    this.CangeDate=this.OpenWorker.date;
    this.CangeEmail=this.OpenWorker.email;
    this.CangeTelephone=this.OpenWorker.telephone;
    this.type=this.OpenWorker.type;
    this.CangeAge=this.getAge(this.CangeDate);

    this.onChange=true;
  }

  back(){
    this.onChange=false;
  }

  UpdateAge(Dr){
    this.CangeAge=this.getAge(Dr);
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
    let age=date.getFullYear()-year;
    if (date.getMonth()+1<month){age--;}
    else if ((date.getMonth()+1==month)&&(date.getDate()<day)){age--;}

    return age;
  }

  onSubmitChanges() {
    let age=new AgeService();
    
      this.onChange=false;
      let push:MyWorker=this.ChangeForm.value;
      push.id=this.OpenWorker.id;
      push.type=this.type;
      push.telephone=this.CangeTelephone;
      this.onChangeById(push)
      this.OpenWorker=push;
      this.ChangeForm.reset();
    
      
  }

}
