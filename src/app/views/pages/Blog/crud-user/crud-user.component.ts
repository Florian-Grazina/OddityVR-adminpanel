import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-crud-user',
  templateUrl: './crud-user.component.html',
  styleUrls: ['./crud-user.component.scss']
})
export class CrudUserComponent implements OnInit {
  creationFormUser: FormGroup;

  constructor(private fb: FormBuilder, private blogS: BlogService) { }

  ngOnInit(): void {
    this.creationFormUser = this.fb.group({
      Email: "",
      Password: "",
      Age: ""
    })
  }

  createUser(){
    console.log(this.creationFormUser.value);
    
    if (Object.values(this.creationFormUser.value)
    .every((elem: any) => elem != "")){
      
      this.blogS.createUser(this.creationFormUser.value).subscribe(result => {
  
        this.creationFormUser.reset();
        this.blogS.popUpSuccess("The user has been created")})
    }
    else {
      this.blogS.popUpError("The form is incomplete")
    }
  }
}
