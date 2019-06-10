import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { AlertifyService } from 'src/services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model:any={};
  registerForm:FormGroup;

  @Output() cancelRegister = new EventEmitter();
  //FormBuilder easier than new FormControl and more basic syntax than FormGroup
  constructor(private authService:AuthService,private alertify:AlertifyService,private fb:FormBuilder) { }

  ngOnInit() {
    
    //create the form
    //our formgroup contains controlls (n ket rast inputat ton)
    //FormGroup or FormControll takes parameter for validation /validators
    this.registerForm = new FormGroup({
      //we make the email required, hello will be displayed inside textbox as default value
      email: new FormControl('',Validators.required),
      //we pass two validators (array of validators
      password: new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]),
      confirmPassword: new FormControl('',Validators.required)
    },this.passwordMatchValidator);
  }

  //CustomValidator
  passwordMatchValidator(fg:FormGroup){
    //we specify whitch controll we want to get and compare, then we return true or false, if true form status
    // IS VALID else INVALID
    return fg.get('password').value === fg.get('confirmPassword').value ? null : {'mismatch':true};
  }
  createRegisterForm(){
    //this is same as new FormGroup
    this.registerForm=this.fb.group({
      email:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword:['',Validators.required]
    },{validator:this.passwordMatchValidator});
  }
  register(){
    /*
    this.authService.register(this.model).subscribe(()=>{
      this.alertify.success("Registration successful");
    },error =>{
      this.alertify.error(error);
    });
    */
   //test if its getting values from input
   console.log(this.registerForm.value);
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
