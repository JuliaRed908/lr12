import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { MyWorkerType, MyWorker } from 'src/app/shared/worker.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Service } from 'src/app/shared/worker.service';

interface ChangeForm {
  name:string;
  surname:string;
  date:string;
  type?:string;
  patronimic:string;
  email:string;
  telephone:string;
}

@Component({
  selector: 'app-add-form',
  templateUrl: './addform-worker.component.html',
  styleUrls: ['./addform-worker.component.css']
})
export class AddFormComponent implements OnInit {

  myWorkerType = MyWorkerType;
  name: string;
  surname: string;
  workers: MyWorker[]=[];
  date:string;
  @Output() updateWorker = new EventEmitter<boolean>();
  patronimic:string;
  email:string;
  telephone:string;
  type=0;


  ChangeForm: FormGroup;

  constructor(public worker:Service) {
    this.ChangeForm = new FormGroup({
    name: new FormControl(null,[Validators.required]),
    surname: new FormControl(null,[Validators.required]),
    date: new FormControl(null,[Validators.required]),
    patronimic: new FormControl(null,[Validators.required]),
    email: new FormControl(null,[Validators.required]),
    telephone: new FormControl(null,[Validators.required]),
  }); 
  this.getData();
  }

  ngOnInit(): void {}

  onAddWorker() {
    
    
      let push=this.ChangeForm.value;
      push.type=this.type;
      console.log(push);
       this.addWorker(push);
      
    
  }

  

  async addWorker(worker) {
    let id =
      this.workers.length > 0
        ? this.workers[this.workers.length - 1].id + 1
        : 0;
    worker.id = id;
    try {
      await this.worker.onAddWorker(worker);
      this.updateWorker.emit(true);
      this.ChangeForm.reset();
      this.getData();
    } catch (error) {
      console.log(error);
    }
  }

  async getData() {
    try {
      this.workers = await this.worker.getData();
    } catch (error) {
      console.log(error)
    }
  }

}