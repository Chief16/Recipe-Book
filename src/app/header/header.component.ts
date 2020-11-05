import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
  })
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false
  private userSub: Subscription;

  constructor(private dataDtorage: DataStorageService, private authService: AuthService){}

  ngOnInit(){
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
      // console.log(!user);
      // console.log(!!user)
    })
  }

  onSave(){
    this.dataDtorage.storeRecipes()
  }

  onFetch(){
    this.dataDtorage.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe()
  }

}