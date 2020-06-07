import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyWorker } from './worker.model';


@Injectable({
  providedIn: 'root'
})

export class Service {

  onWorker:MyWorker;

  path="http://localhost:3000/workers";

  constructor(public http: HttpClient) {
  }

  getData(): Promise<any> {
    return this.http.get(this.path).toPromise();
  }

  onAddWorker(data: MyWorker) {
    return this.http.post(this.path, data).toPromise();
  }

  onDeleteById(id: number) {
    const url = `${this.path}/${id}`; 
    return this.http.delete(url).toPromise()
  }

  changeWorker(worker: MyWorker){
    const url = `${this.path}/${worker.id}`;
    return this.http.put(url, worker).toPromise()
  }

  set(worker){
    this.onWorker=worker;
  }

  get(){
    return this.onWorker;
  }

}
