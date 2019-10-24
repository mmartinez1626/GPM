import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

    url: string;

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
        this.url = baseUrl;
    }

    public GetCategories() : any {
        return this.http.get<any>(this.url + 'api/Categories');
    }

    public PostCategories(category: any): any {
        return this.http.post<any>(this.url + 'api/Categories', category);
    }

    public DeleteCategory(id: any): any {
        return this.http.delete<any>(this.url + 'api/Categories/' + id);
    }

    public UpdateCategory(id: any, category: any) {
        return this.http.put<any>(this.url + 'api/Categories/' + id, category);
    }
}
