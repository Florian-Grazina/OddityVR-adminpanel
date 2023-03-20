import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Author, Article } from '../model/blog';
import { BlogService } from '../blog.service';
import { ContentChange, SelectionChange } from 'ngx-quill';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-crud-blog',
  templateUrl: './crud-blog.component.html',
  styleUrls: ['./crud-blog.component.scss']
})
export class CrudBlogComponent implements OnInit {
  creationFormBlog: FormGroup;
  updateFormBlog: FormGroup;
  listOfAuthors: Author[];
  listOfArticles: Article[];

  htmlText = `<p> If You Can Think It, You Can Do It. </p>`
  quillConfig = {
     toolbar: {
       container: [
         ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
         ['code-block'],
        //  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
         [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
         [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        //  [{ 'direction': 'rtl' }],                         // text direction

        //  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
         [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

         [{ 'align': [] }],

        //  ['clean'],                                         // remove formatting button

        //  ['link'],
         ['link', 'image', 'video']
       ],
     },
  }

  constructor(private fb: FormBuilder, private blogS: BlogService, private modalService: NgbModal) { }

  openXlModal(content: TemplateRef<any>) {
    this.modalService.open(content, {size: 'xl'}).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => {});
  }

  ngOnInit(): void {
    this.creationFormBlog = this.fb.group({
      Title: "",
      Author: "",
      Content: "",
      Id: Number,
    }),

    this.blogS.getAllAuthors().subscribe(result => {
      this.listOfAuthors = result
    })

    this.blogS.getAllArticles().subscribe(result => {
      this.listOfArticles = result
      console.log(result);
    })
  }

  initUpdateForm(article: Article){
    this.updateFormBlog = this.fb.group({
      Title: [article.Title],
      Author: [article.Author],
      Content: [article.Content],
      ID: [article.ID]
    })
  }

  onSelectionChanged = (event: SelectionChange) => {
    if(event.oldRange == null) {
      this.onFocus();
    }
    if(event.range == null) {
      this.onBlur();
    }
  }

  onContentChanged = (event: ContentChange) => {
    event.html;
  }

  onFocus = () => {
    console.log("On Focus");
  }
  onBlur = () => {
    console.log("Blurred");
  }

  creatArticle(){

    this.blogS.postCreateArticle(this.creationFormBlog.value)
    .subscribe(result => {

      this.creationFormBlog.reset();
      this.listOfArticles = result;

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Article created successfully'
      })
    })
  }

  updateArticle(){

    this.blogS.postUpdateArticle(this.updateFormBlog.value)
    .subscribe(result => {
      this.listOfArticles = result;

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Article updated successfully'
      })
    })
  }

  deleteArticle(article: Article){

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
        
      this.blogS.deleteArticle(article)
      .subscribe(result => {
      this.listOfArticles = result;
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )})
      }
    })
  }
}




