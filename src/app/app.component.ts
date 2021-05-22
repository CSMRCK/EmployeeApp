import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Employee } from '../app/employee';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataService]
})
export class AppComponent implements OnInit {
  closeResult: string;
  employee: Employee = new Employee();
  employees: Employee[];
  tableMode: boolean = true;
  source: any =
    {
      dataType: 'json',
      dataFields: [
        { name: 'firstName', type: 'string' },
        { name: 'lastName', type: 'string' },
        { name: 'gender', type: 'int' },
        { name: 'city', type: 'string' },
      ],
      id: 'id',
      url:'api/employees'
    };
  dataAdapter: any = new jqx.dataAdapter(this.source);
  columns: any[] =
    [
      { text: 'First Name', dataField: 'firstName' , width: 212 },
      { text: 'Last Name', dataField: 'lastName', width: 212 },
      { text: 'Gender', dataField: 'gender', width: 212 },
      { text: 'City', dataField: 'city', width: 212 },

    ];

  constructor(private dataService: DataService, private modalService: NgbModal) { }

  getWidth(): any {
    if (document.body.offsetWidth < 850) {
      return '90%';
    }
    return 850;
  }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.dataService.getEmployees().subscribe((data: Employee[]) => this.employees = data);
  }

  save() {
    if (this.employee.id == null) {
      this.dataService.createEmployee(this.employee).subscribe((data: Employee) => this.employees.push(data));
    }
    else {
      this.dataService.updateEmployee(this.employee).subscribe(data => this.loadEmployees());
    }
    this.cancel();
  }

  editEmployee(e: Employee) {
    this.employee = e;
  }

  open(content, employee) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.delete(employee);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  cancel() {
    this.employee = new Employee();
    this.tableMode = true;
  }

  delete(e: Employee) {
    this.dataService.deleteEmployee(e.id).subscribe(data => this.loadEmployees());
  }

  add() {
    this.cancel();
    this.tableMode = false;
  }
}
