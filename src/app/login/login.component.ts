import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup
  submitted = false;
  constructor(
    private formBuilder : FormBuilder,
    private http : HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email:['', Validators.required],
      password:['', [Validators.required, Validators.minLength(8)]]
    })
  }
  get f():{[key:string]: AbstractControl} {
    return this.form.controls;  
  }
  submit() : void{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    // console.log(this.form.getRawValue())
     this.http.post('http://localhost:5000/auth/login', this.form.getRawValue()).subscribe(
    result => {
      console.log(result)
    },
    err=> {
      console.log(err.error)
    }
    
    )
  }

}
