import { summaryForJitFileName } from '@angular/compiler/src/aot/util';

export interface MyWorker {
  id: number;
  name: string;
  surname: string;
  patronimic:string;
  date:string;
  email:string;
  telephone: string;
  type: number;
}

export enum MyWorkerType {
  ItDepartment,
  Selldepartment,
  DeliveryDepartment,
  LegalDepartment,
}