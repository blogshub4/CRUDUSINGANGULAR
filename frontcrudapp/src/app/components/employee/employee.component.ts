import { Component, OnInit  } from '@angular/core';
import { Employee } from 'src/app/employee';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {

// export class EmployeeComponent {
  employees:any;
  employee = new Employee();

  constructor(private dataService:DataService) { }

  ngOnInit(){
    this.getEmployeesdata();
  }

  getEmployeesdata() {
    this.dataService.getData().subscribe(res =>{
      this.employees = res;
    });
  }

  deleteData(id:any){
    this.dataService.deleteData(id).subscribe(res => {
      this.getEmployeesdata();
    })
  }

  insertData(){
    this.dataService.insertData(this.employee).subscribe(res =>{
      this.getEmployeesdata();
    });
  }

}
