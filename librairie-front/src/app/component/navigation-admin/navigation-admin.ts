import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation-admin',
  imports: [RouterModule, CommonModule],
  templateUrl: './navigation-admin.html',
  styleUrl: './navigation-admin.css',
})
export class NavigationAdmin implements OnInit{
  protected role = "";
  constructor(private authService : AuthService, private router : Router) {}

  ngOnInit(): void {
    this.role = this.authService.role;
  }

  public deconnecter(){
    this.authService.unAuth();
    this.router.navigate([ '/matiere' ]);

  }
}

