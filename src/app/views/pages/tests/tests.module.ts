import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TestsComponent } from './tests.component';
import { ListTestComponent } from './list-test/list-test.component';
import { TestDetailsComponent } from './test-details/test-details.component';

const routes: Routes = [
  {
    path: '',
    component: TestsComponent,
    children: [
      {
        path: 'list-test',
        component: ListTestComponent,
      },
      {
        path: 'test-details/:id',
        component: TestDetailsComponent,
      }
    ]
  }
]


@NgModule({
  declarations: [
    ListTestComponent,
    TestDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class TestsModule { }
