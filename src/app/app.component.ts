import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'firstName', 
    'lastName', 
    'email',  
    'dob', 
    'gender',
    'education', 
    'experience',
    'package',
    'action'
  ];
  
  dataSource!: MatTableDataSource<any>; //MatTableDataSource là 1 lớp có sẵn trong angular material để quản lí dữ liệu bảng
 
  @ViewChild(MatPaginator) paginator!: MatPaginator; // quản lí phân trang
  @ViewChild(MatSort) sort!: MatSort; // sắp xếp

  title = 'CRUD-app';

  constructor(
    private _dialog: MatDialog, 
    private _coreService: CoreService,
    private _empService: EmployeeService) {}
  
  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getEmployeeList();
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  // phương thức loc
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar("Delete employee Successfully", "done")
        this.getEmployeeList();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  // open form update employee
  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getEmployeeList();
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
