import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  formData?:FormGroup;
  ngOnInit(): void {
    this.formData = new FormGroup({
      fname: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
      lname: new FormControl('', [Validators.maxLength(10)]),
      age: new FormControl('', [Validators.required, Validators.max(20),Validators.min(10)]),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      phone: new FormControl('', [Validators.required, Validators.pattern('[0-9.]+'), Validators.maxLength(10), Validators.minLength(10)]),
      city: new FormControl('', [this.cityValidate()]),
      gender: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      repassword: new FormControl('', [Validators.required, this.passwordValidator()]),
    })
  }

  cityValidate():ValidatorFn {
    return (control:AbstractControl):ValidationErrors| null=>{
      if(control){
        if(control.value == 'mumbai' || control.value == 'kolkata' || control.value == 'delhi' ){
          return null;
        }
        return {invalidCity:true};
      }
      return null;
    }
  }
  passwordValidator():ValidatorFn {
    return (control:AbstractControl):ValidationErrors| null=>{
        if(control.value == this.formData?.get('password')?.value ){
          return null;
        }
        return {passMisMatch:true};
      }
  }
} 
