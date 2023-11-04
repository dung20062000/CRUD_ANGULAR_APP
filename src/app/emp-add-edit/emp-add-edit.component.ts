import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  education: string[] = [
    "Matric",
    "Diploma",
    "Intermediate",
    "Graduate",
    "Post GrGraduate"
  ];
  constructor(
    private _fb: FormBuilder, 
    private _coreService: CoreService,
    private _empService: EmployeeService,
    private _dialog: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.empForm = this._fb.group({
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      gender: "",
      education: "",
      company: "",
      experience: "",
      package: "",
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

  onFormSubmit() {
    if(this.data) {
      this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar("Update employee success")
          this._dialog.close(true);
        },
        error: (error: any) => {
          console.log(error);
        }
      })
    }
    else {
      if(this.empForm.valid) {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar("Employee added successfully")
            this._dialog.close(true);
          },
          error: (error: any) => {
            console.log(error);
          }
        })
      }
    }

  }
}
