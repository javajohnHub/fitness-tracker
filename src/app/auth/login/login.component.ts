import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import {  UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  private isLoadingSub: Subscription;
  constructor(private _fb: FormBuilder, private auth: AuthService, private uiService: UIService) { }

  ngOnInit() {
    this.isLoadingSub = this.uiService.loadingStateChanged.subscribe((state) => {
      this.isLoading = state;
    })
    this._createForm();
  }

  private _createForm(){
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onSubmit(){
    this.auth.login(this.loginForm.value)
  }

  ngOnDestroy(){
    if(this.isLoadingSub){
    this.isLoadingSub.unsubscribe();
    }
  }
  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }
}
