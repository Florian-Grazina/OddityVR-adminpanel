import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients.component';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { DepartmentDetailsComponent } from './department-details/department-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


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
      },
      {
        path: 'department-details/:id',
        component: DepartmentDetailsComponent,
      }
    ]
  }
]

@NgModule({
  declarations: [
    ClientsComponent,
    CompanyComponent,
    CompanyDetailsComponent,
    DepartmentDetailsComponent,
  ],
  imports: [
    NgbModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ClientsModule { }
