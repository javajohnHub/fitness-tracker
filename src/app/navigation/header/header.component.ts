import { Component, OnInit, EventEmitter, Output, OnDestroy  } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth = false;
  authSub: Subscription;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.authSub = this.auth.authChange.subscribe(status => {
      this.isAuth = status;
    })
  }

  ngOnDestroy(){
    this.authSub.unsubscribe();
  }
  onToggle(){
    this.sidenavToggle.emit();
  }

  logout() {
    this.auth.logout()
  }

}
