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

    subCats: any[];

    tempCat: any;

    cats: any[] = [];

    cols: any[];

    tempResult: any;

    tempCategories: Category[] = [];

    categories: Category[] = [];

    selectedCategory: Category;

    constructor(private subCategoryService: SubCategoriesService) {
        this.getDropdownData();
    }

    ngOnInit() {
        this.getCategories();

        this.cols = [
            { field: 'subCats', header: 'Name' },
            { field: 'cats', header: 'Parent Category'}
        ];

        
    }

    getDropdownData() {
        this.subCategoryService.GetCategories().subscribe(data => {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var tempCategory = {
                    name: data[i].name,
                    categoryId: data[i].id
                }
                console.log(tempCategory);
                this.tempCategories.push(tempCategory);
            }

            if (this.tempCategories != null || this.tempCategories != undefined || this.tempCategories.length != 0) {
                this.categories = this.tempCategories;
            }
        });
    }

    getCategories() {
        this.subCategoryService.GetSubCategories().subscribe(result => {
            if (result != null || result != undefined) {
                console.log(result);
                for (var i = 0; i < result.length; i++) {
                    //console.log(result[i]);
                    this.tempResult = result[i];
                    this.subCategoryService.GetSpecificCategories(result[i].categoryId).subscribe(data => {
                        //console.log(data);
                        this.tempCat = data.name;
                        //console.log(this.tempResult);
                        var tempSubCats = {
                            subCats: this.tempResult.name,
                            cats: this.tempCat
                        }
                        this.cats.push(tempSubCats);
                    });
                }
                if (this.cats != null || this.cats != undefined || this.cats.length != 0) {
                    this.subCats = this.cats;
                    //console.log(this.subCats);
                }  
            }
        });
    }

    showDialogToAdd() {
        this.newSubCat = true;
        this.subCat = {};
        this.displayDialog = true;
    }

    save() {
        let subCats = [...this.subCats];
        if (this.newSubCat) {
            subCats.push(this.subCat);
            this.subCategoryService.PostSubCategories(this.subCat).subscribe(result => {
                console.log(result);
                this.getCategories();
            });
        }
        else {
            subCats[this.subCats.indexOf(this.selectedSubCat)] = this.subCat;
        }

        this.subCats = subCats;
        this.subCat = null;
        this.displayDialog = false;
    }

    delete() {
        this.subCategoryService.DeleteSubCategory(this.selectedSubCat.id).subscribe(result => {
            console.log(result);
            if (result !== null || result !== undefined) {
                let index = this.subCats.indexOf(this.selectedSubCat);
                this.subCats = this.subCats.filter((val, i) => i != index);
                this.subCat = null;
                this.displayDialog = false;
                this.getCategories();
            }
        });
    }

    onRowSelect(event) {
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
        console.log(this.selectedSubCat);
        console.log(this.subCat);
        this.subCategoryService.UpdateSubCategory(this.subCat.id, this.subCat).subscribe(result => {
            console.log(result);
            this.displayDialog = false;
            this.getCategories();
        })
    }

}
