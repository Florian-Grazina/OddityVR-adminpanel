import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients.component';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    children: [
      {
        path: 'company',
        component: CompanyComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    ClientsComponent,
    CompanyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClientsModule { }
