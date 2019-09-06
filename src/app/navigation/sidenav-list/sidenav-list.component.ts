import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();
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


  onClose(){
    this.closeSidenav.emit();
  }

  logout(){
    this.onClose();
    this.auth.logout();
  }
}
