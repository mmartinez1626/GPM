import { Component, OnInit } from '@angular/core';


export interface Car {
    vin;
    year;
    brand;
    color;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

    cars: Car[];

    constructor() {
        //this.cars = [{
        //    vin: 'Hey',

        //}]
    }

  ngOnInit() {
  }

}
