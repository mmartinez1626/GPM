import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {

    url: string;

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
        this.url = baseUrl;
    }

    public GetSubCategories(): any {
        return this.http.get<any>(this.url + 'api/SubCategories');
    }

    public GetSpecificCategories(id: any): any {
        return this.http.get<any>(this.url + 'api/Categories/' + id);
    }

    public GetCategories() {
        return this.http.get<any>(this.url + 'api/Categories');
    }

    public PostSubCategories(subCategory: any): any {
        return this.http.post<any>(this.url + 'api/SubCategories', subCategory);
    }

    public DeleteSubCategory(id: any): any {
        return this.http.delete<any>(this.url + 'api/SubCategories/' + id);
    }

    public UpdateSubCategory(id: any, subCategory: any) {
        return this.http.put<any>(this.url + 'api/SubCategories/' + id, subCategory);
    }
}
