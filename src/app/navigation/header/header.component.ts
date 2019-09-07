import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  constructor(private auth: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth)
  }
  onToggle(){
    this.sidenavToggle.emit();
  }

  logout() {
    this.auth.logout();
  }

}
