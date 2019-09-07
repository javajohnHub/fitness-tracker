import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import {  UIService } from 'src/app/shared/ui.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  private isLoadingSub: Subscription;
  constructor(private _fb: FormBuilder, private auth: AuthService, private uiService: UIService, private store: Store<{ui: fromRoot.State}>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.isLoadingSub = this.uiService.loadingStateChanged.subscribe((state) => {
    //   this.isLoading = state;
    // })
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

  // ngOnDestroy(){
  //   if(this.isLoadingSub){
  //   this.isLoadingSub.unsubscribe();
  //   }
  // }
  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }
}
