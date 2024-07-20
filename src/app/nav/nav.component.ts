import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_models/user';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  [x: string]: any;
  model = { username: '', password: '' };
  username: string | null = null;
  photoUrl: string | null = null;

  constructor(
    private memberService: MembersService,
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.accountService.currentUser$.subscribe((user) => {
      (this.username = user?.username || null),
        (this.photoUrl = user?.photoUrl || null);
    });
  }
  ngOnInit(): void {}

  login() {
    this.accountService.login(this.model).subscribe((response) => {
      console.log(response);
      this.router.navigateByUrl('/members');
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
