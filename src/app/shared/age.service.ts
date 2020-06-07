import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgeService {

  constructor() { }

  age(Dr:String){
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
        if (count==1){year=parseInt(Dr.slice(0,i));}
        if (count==2){
          month=parseInt(Dr.slice(year.toString().length+1,i));
          day=parseInt(Dr.slice(i+1,i+3));
        }
      }
    }
    
    let age=date.getFullYear()-year;
    if (date.getMonth()+1<month){age--;}
    else if ((date.getMonth()+1==month)&&(date.getDate()<day)){age--;}
    return age
    }

  


}
