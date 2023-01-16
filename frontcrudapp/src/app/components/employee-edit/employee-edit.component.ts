import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { Employee } from 'src/app/employee';


@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  id:any;
  data:any;
  employee = new Employee();
  
  constructor(private route:ActivatedRoute, private dataService: DataService){}

  ngOnInit(){
    console.log(this.route.snapshot.params.id);
    this.id = this.route.snapshot.params.id;
    this.getData();
  }

  getData(){
    this.dataService.getEmployeeByID(this.id).subscribe(res => {
      this.data = res;
      this.employee  = this.data;
    });
  }

  updateEmployee(){
    this.dataService.updateData(this.id,this.employee).subscribe(res => {
      
    })
  }
}
