import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponent } from '../shared/First/First';
import { WorkerListComponent } from '../ui/BDworker/BDworker';
import { ChangeFormComponent } from '../ui/Change/Change';


 
 
const routes: Routes = [
    { path: '', redirectTo: '/First', pathMatch: 'full' },
    { path: 'First', component: FirstComponent },
    { path: 'WorkerBD', component: WorkerListComponent },
     { path: 'ChangeForm', component: ChangeFormComponent }
];
 
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
 
export class AppRoutingModule { }
