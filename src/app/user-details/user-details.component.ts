import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  public imageURL = {
    image:
      'https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg',
  };

  public userId!: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // this.route.params.subscribe((data) => {
    //   console.log(data['id']);
    // });

    this.userId = this.route.snapshot.params['id'];
    console.log(this.userId);
  }

  goToEdit() {
    this.router.navigate(['edit-user', this.userId]);
  }
}
