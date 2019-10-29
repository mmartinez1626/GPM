import { Component, OnInit } from '@angular/core';
import { SubCategoriesService } from '../services/sub-categories.service';

import { SelectItem } from 'primeng/api';

interface Category {
    name: string;
    categoryId: any;
}

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
    displayDialog: boolean;

    subCat: any = {};

    selectedSubCat: any;

    newSubCat: boolean;

    subCats: any[] = [];

    tempCat: any[] = [];

    cats: any[] = [];

    cols: any[];

    tempResult: any;

    tempCategories: Category[] = [];

    categories: Category[] = [];

    selectedCategory: Category;

    parentCategory: any;

    constructor(private subCategoryService: SubCategoriesService) {
        this.getDropdownData();
    }

    ngOnInit() {
        this.getCategories();

        this.cols = [
            { field: 'subCatsName', header: 'Name' },
            { field: 'cats', header: 'Parent Category'}
        ];

        
    }

    getDropdownData() {
        this.subCategoryService.GetCategories().subscribe(data => {
            //console.log(data);
            for (var i = 0; i < data.length; i++) {
                var tempCategory = {
                    name: data[i].name,
                    categoryId: data[i].id,
                }
                //console.log(tempCategory);
                this.tempCategories.push(tempCategory);
            }

            if (this.tempCategories != null || this.tempCategories != undefined || this.tempCategories.length != 0) {
                this.categories = this.tempCategories;
                this.parentCategory = this.tempCategories[0];
            }
        });
    }

    getCategories() {
        this.subCategoryService.GetSubCategories().subscribe(result => {
            if (result != null || result != undefined) {
                this.tempResult = result;
                
                for (var i = 0; i < result.length; i++) {
                    console.log(result[i]);
                    this.subCategoryService.GetSpecificCategories(result[i].categoryId).subscribe(data => {
                        //console.log(data);
                        this.tempCat.push(data.name);
                    }); 
                }
                this.delay(1000).then(_ => {
                    for (var i = 0; i < this.tempResult.length; i++) {
                        //console.log(this.tempResult);
                        var tempSubCats = {
                            subCatsName: this.tempResult[i].name,
                            cats: this.tempCat[i],
                            subCatsId: this.tempResult[i].id
                        }
                        this.subCats.push(tempSubCats);
                    }
                   });
            }
        });
    }

    async delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    showDialogToAdd() {
        this.newSubCat = true;
        this.subCat = {};
        this.displayDialog = true;
    }

    save() {
        console.log(this.parentCategory.categoryId);
        console.log(this.subCat.subCatsName);
        var pCategory = {
            name: this.subCat.subCatsName,
            categoryId: this.parentCategory.categoryId
        };
        this.subCategoryService.PostSubCategories(pCategory).subscribe(result => {
            this.subCats = [];
          console.log(result);
          this.getCategories();
        });
        this.subCat = null;
        this.displayDialog = false;
    }

    delete() {
        console.log(this.subCat);
        this.subCategoryService.DeleteSubCategory(this.subCat.subCatsId).subscribe(result => {
            console.log(result);
            if (result !== null || result !== undefined) {
                this.subCats = [];
                this.subCat = null;
                this.displayDialog = false;
                this.getCategories();
            }
        });
    }

    onRowSelect(event) {
        //console.log(event.data);
        this.newSubCat = false;
        this.subCat = this.cloneCar(event.data);
        this.displayDialog = true;
    }

    cloneCar(c: any): any {
        let subCat = {};
        for (let prop in c) {
            subCat[prop] = c[prop];
        }
        return subCat;
    }

    update() {
        console.log(this.subCat);
        console.log(this.parentCategory);
        var tempSubCat = {
            name: this.subCat.subCatsName,
            categoryId: this.parentCategory.categoryId,
            id: this.subCat.subCatsId
        }
        this.subCategoryService.UpdateSubCategory(this.subCat.subCatsId, tempSubCat).subscribe(result => {
            console.log(result);
            this.subCats = [];
            this.displayDialog = false;
            this.getCategories();
        });
    }

}
