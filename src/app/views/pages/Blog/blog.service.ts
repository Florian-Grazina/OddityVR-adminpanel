import { Injectable } from '@angular/core';
import { Blog, FormAuthor, Author, Article } from './model/blog';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClient: HttpClient) { }


  // CRUD author
  // ------------------------------

  postCreateAuthor(form: Author){
    
    return this.httpClient.post<Author[]>("http://localhost:8081/api/v1/create_author", form)
  }

  getAllAuthors(){
    
    return this.httpClient.get<Author[]>("http://localhost:8081/api/v1/get_all_authors")
  }

  deleteAuthor(author: Author){

    return this.httpClient.get<Author[]>(`http://localhost:8081/api/v1/delete_author/${author.ID}`)
  }


  // CRUD author
  // ------------------------------

  postCreateArticle(form: Article){
    
    return this.httpClient.post<Article[]>("http://localhost:8081/api/v1/create_article", form)
  }

  getAllArticles(){
    
    return this.httpClient.get<Article[]>("http://localhost:8081/api/v1/get_all_articles")
  }

  postUpdateArticle(form: Article) {
    console.log(form);
    
    return this.httpClient.post<Article[]>(`http://localhost:8081/api/v1/update_article`, form)
  }

  deleteArticle(article: Article){
    
    return this.httpClient.get<Article[]>(`http://localhost:8081/api/v1/delete_article/${article.ID}`)
  }
}
