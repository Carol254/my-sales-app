import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './category.dto';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) {}

   public getAll():Observable<Category[]>{
    return this.http.get<Category[]>(environment.api + "categories");
   }

   
  getCategoryById(id: number): Observable<Category> {
    // Assuming your backend endpoint to fetch category data by ID is '/api/categories/:id'
    return this.http.get<Category>(environment.api + "categories"+ {id});
  }

   public save(category:Category):Observable<Category>{
    if(category.id)
      return this.http.put<Category>(
        environment.api + "categories/" + category.id,
        category
    )
    return this.http.post<Category>(environment.api + "categories", category);
   }

   public delete(id: number) {
    return this.http.delete(environment.api + 'categories/' + id);
    }
}
