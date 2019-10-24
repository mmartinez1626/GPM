import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

    displayDialog: boolean;

    cat: any = {};

    selectedCat: any;

    newCat: boolean;

    cats: any[];

    cols: any[];

    constructor(private categoryService: CategoriesService) { }

    ngOnInit() {
        this.getCategories();

        this.cols = [
            { field: 'name', header: 'Name' }
        ];
    }

    getCategories() {
        this.categoryService.GetCategories().subscribe(result => {
            this.cats = result;
            console.log(this.cats);
        });
    }

    showDialogToAdd() {
        this.newCat = true;
        this.cat = {};
        this.displayDialog = true;
    }

    save() {
        let cats = [...this.cats];
        if (this.newCat) {
            cats.push(this.cat);
            this.categoryService.PostCategories(this.cat).subscribe(result => {
                console.log(result);
                this.getCategories();
            });
        }
        else {
            cats[this.cats.indexOf(this.selectedCat)] = this.cat;
        }

        this.cats = cats;
        this.cat = null;
        this.displayDialog = false;
    }

    delete() {
        this.categoryService.DeleteCategory(this.selectedCat.id).subscribe(result => {
            console.log(result);
            if (result !== null || result !== undefined) {
                let index = this.cats.indexOf(this.selectedCat);
                this.cats = this.cats.filter((val, i) => i != index);
                this.cat = null;
                this.displayDialog = false;
                this.getCategories();
            }
        });
    }

    onRowSelect(event) {
        this.newCat = false;
        this.cat = this.cloneCar(event.data);
        this.displayDialog = true;
    }

    cloneCar(c: any): any {
        let cat = {};
        for (let prop in c) {
            cat[prop] = c[prop];
        }
        return cat;
    }

    update() {
        console.log(this.selectedCat);
        console.log(this.cat);
        this.categoryService.UpdateCategory(this.cat.id, this.cat).subscribe(result => {
            console.log(result);
            this.displayDialog = false;
            this.getCategories();
        })
    }

}
