import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { CreateuserblogComponent } from './createuserblog/createuserblog.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CrudBlogComponent } from './crud-blog/crud-blog.component'
import { QuillModule } from 'ngx-quill';
import { CrudUserComponent } from './crud-user/crud-user.component';




const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: 'create-user-blog',
        component: CreateuserblogComponent
      },
      {
        path: 'crud-blog',
        component: CrudBlogComponent
      },
      {
        path: 'crud-user',
        component: CrudUserComponent
      }
    ]
  }
]

@NgModule({
  declarations: [BlogComponent, CreateuserblogComponent, CrudBlogComponent, CrudUserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuillModule.forRoot(), // ngx-quill
  ]
})
export class BlogModule { 

}
