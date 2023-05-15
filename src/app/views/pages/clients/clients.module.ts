import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients.component';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyDetailsComponent } from './company-details/company-details.component';
// import {MatFormFieldModule} from '@angular/material/form-field';


const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    children: [
      {
        path: 'company',
        component: CompanyComponent,
      },
      {
        path: 'company-details/:id',
        component: CompanyDetailsComponent,
      }
    ]
  }
]

@NgModule({
  declarations: [
    ClientsComponent,
    CompanyComponent,
    CompanyDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ClientsModule { }
