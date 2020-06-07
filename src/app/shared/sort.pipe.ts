import { Pipe, PipeTransform } from '@angular/core';
import { MyWorker } from './worker.model';
import { AgeService } from './age.service';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  res:number = 1;

  transform(workerList, search1,filterID,filterAge){
      let res=this.sort(workerList);
      let search=this.sort(search1)

    	

      if (search.name != null&&search.name != ""){
        res = res.filter(
          function (element){
            return element.name.indexOf(search.name)==0;
          }); 
      }

      if (search.surname != null&&search.surname != ""){
        res = res.filter(
          function (element){
            return element.surname.indexOf(search.surname)==0;
          }); 
      }

      

      

      res=this.filterID(res,filterID);
      res=this.filterAge(res,filterAge);
      
      return res;
  }

  sort(search){
    if ((search.name!=null)&&(search.name.search(" ")!=-1)){
      let bufer=search.name.slice(search.name.search(" ")+1,search.name.length);
      search.name=search.name.slice(0,search.name.search(" "))
      search.surname=bufer;
    }
  return search
  }

  filterID(workerList,filterID){
  let res=workerList
  if (filterID == 1) {
    res.sort(function(a,b){
      return a.id - b.id
    })
  }
  if (filterID == 2){
    res.sort(function(a,b){
      return b.id - a.id
    })
  }
  return res;
  }

  filterAge(workerList,filterAge){
  let res: MyWorker[]=workerList;
  if (filterAge == 1) {
    res.sort(function(a,b){
      let age=new AgeService();
      return age.age(a.date)-age.age(b.date);
    })
  }
  if (filterAge == 2) {
    res.sort(function(a,b){
      let age=new AgeService();
      return age.age(b.date)-age.age(a.date);
    })
  }
  return res;
  }


}
