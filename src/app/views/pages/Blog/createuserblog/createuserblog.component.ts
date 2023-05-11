import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { BlogService } from '../blog.service';
import { Author } from '../model/blog';


@Component({
  selector: 'app-createuserblog',
  templateUrl: './createuserblog.component.html',
  styleUrls: ['./createuserblog.component.scss']
})
export class CreateuserblogComponent implements OnInit {
  creationFormAuthor : FormGroup;
  listOfAuthors: Author[];

  constructor(private fb : FormBuilder, private blogS : BlogService) {
  }
  
  ngOnInit() {
    this.creationFormAuthor = this.fb.group({
      Name: "",
      FirstName: "", 
      Sex: ""});

    this.blogS.getAllAuthors().subscribe(result => {
      this.listOfAuthors = result;
      console.log(result);
      
    });
  }

  creatAuthor() {
    console.log(this.creationFormAuthor.value);
    
    if(Object
      .values(this.creationFormAuthor.value)
      .some((elem: any) => elem == null)){
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'All fields must but filled',
          showConfirmButton: false,
          timer: 1500});
    }
    
    else {
      this.blogS.postCreateAuthor(this.creationFormAuthor.value).subscribe(result => {
        
        this.listOfAuthors = result;
        this.creationFormAuthor.reset();

        Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500});
        
      })
    }
  }

  deleteAuthor(author: Author){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        
      this.blogS.deleteAuthor(author)
      .subscribe(result => {
      this.listOfAuthors = result;
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )})
      }
    })
  }
}

