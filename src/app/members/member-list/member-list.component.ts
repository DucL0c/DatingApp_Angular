import { Component, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { Observable, take } from 'rxjs';
import { Pagination } from '../../_models/pagination';
import { UserParams } from '../../_models/userParams';
import { AccountService } from '../../_services/account.service';
import { User } from '../../_models/user';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
})
export class MemberListComponent implements OnInit {
  members: Member[] = [];
  pagination?: Pagination;
  pageNumber? = 1;
  userParams?: UserParams;
  user?: User;
  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Female' },
  ];

  constructor(
    private memberService: MembersService,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user!;
      this.userParams = new UserParams(user!);
    });
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers(this.userParams!).subscribe((response) => {
      this.members = response.result ?? [];
      this.pagination = response.pagination;
      this.pageNumber = this.pagination?.currentPage;
    });
  }

  pageChanged(event: any) {
    if (this.userParams) {
      this.userParams.pageNumber = event.page;
    }
    this.loadMembers();
  }

  resetFilters() {
    this.userParams = new UserParams(this.user!);
    this.loadMembers();
  }
}
