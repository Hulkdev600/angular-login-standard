import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import  Validation from '../utils/validation';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form! : FormGroup
  submitted = false;
  constructor(
    private formBuilder : FormBuilder,
    private http : HttpClient,
    private router : Router
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name : ['', Validators.required],
      email: ['',
      [
        Validators.required,
        Validators.email
      ]
        ],
      password: ['', [Validators.required, Validators.minLength(8)] ],
      confirmPassword : ['', Validators.required]
    },
    {
      validators: [Validation.match('password', 'confirmPassword')]
    })
  }

  get f():{[key:string]: AbstractControl} {
    return this.form.controls;  
  }

  onSubmit() : void{
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    
    this.http.post('http://localhost:5000/auth/signup', this.form.getRawValue())
    .subscribe((res)=> {
      console.log(res)
      this.router.navigate(['/login'])
    },
    error => {
      console.log(error.error)
    })
  }
}
