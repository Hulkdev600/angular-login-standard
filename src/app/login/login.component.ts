import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup
  constructor(
    private formBuilder : FormBuilder,
    private http : HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email:'',
      password:''
    })
  }

  submit() : void{
    
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
