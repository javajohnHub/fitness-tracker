import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate = new Date();
  isLoading = false;
  private isLoadingSub: Subscription;
  constructor(private auth: AuthService, private uiService: UIService) { }

  ngOnInit() {
    this.isLoadingSub = this.uiService.loadingStateChanged.subscribe((state) => {
      this.isLoading = state;
    })
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm){
    this.auth.registerUser(form.value);
  }
  ngOnDestroy(){
    this.isLoadingSub.unsubscribe();
  }
}
