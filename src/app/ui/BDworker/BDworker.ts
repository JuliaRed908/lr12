import { Component, OnInit } from '@angular/core';
import { 
  MyWorker,
  MyWorkerType
} from 'src/app/shared/worker.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Service } from 'src/app/shared/worker.service';


interface search {
  id: number;
  name: string;
  surname: string;
  patronimic:string;
  date:number;
  email:string;
  telephone: string;
  type: number;
}

@Component({
  selector: 'app-worker-list',
  templateUrl: './BDworker.html',
  styleUrls: ['./BDworker.css']
})
export class WorkerListComponent {

  title = 'Список сотрудников';
  workers: MyWorker[]=[];
  myWorkerType = MyWorkerType;
  search: FormGroup;
  
  searchMode=true;
  workerType0=2;
  workerType1=1;


  constructor(public worker:Service){
    this.search= new FormGroup({
      id: new FormControl(null,[Validators.required]),
      name: new FormControl(null,[Validators.required]),
      surname: new FormControl(null,[Validators.required]),
      patronimic: new FormControl(null,[Validators.required]),
      date: new FormControl(null,[Validators.required]),
      email: new FormControl(null,[Validators.required]),
      telephone: new FormControl(null,[Validators.required]),
    });
    this.getData();  
  }

  onButton(id){
    if (id==0){
      this.workerType1=0;
      if(this.workerType0<2){this.workerType0++}
      else{this.workerType0=1}
    }
    else if (id==1){
      this.workerType0=0;
      if(this.workerType1<2){this.workerType1++}
      else{this.workerType1=1}
    }
  }

  ButtonController(id){
    
    if (id==0){return this.workerType0}
    else if (id==1){return this.workerType1}
  }

  async getData() {
    try {
      this.workers = await this.worker.getData();
    } catch (error) {
      console.log(error)
    }
  }

  getByType(type: number) {
    return this.workers.filter((worker) => worker.type === type);
  }

  getList(){
    let res=this.workers;
    
    return res;
  }

  async onDeleteById(id: number) {
    try {
      await this.worker.onDeleteById(id);
      this.getData();
    } catch (error) {
      console.log(error);
    }
    
  }

  async onChangeById(worker){
    try {
      await this.worker.changeWorker(worker);
      this.getData();
    } catch (error) {
      console.log(error);
    }
  }

  async onAddWorker(worker) {
    let id =
      this.workers.length > 0
        ? this.workers[this.workers.length - 1].id + 1
        : 0;
    worker.id = id;
    try {
      await this.worker.onAddWorker(worker);
      this.getData();
    } catch (error) {
      console.log(error);
    }
  }

}
