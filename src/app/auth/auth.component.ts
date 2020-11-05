import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import { AlertComponent } from './../shared/alert/alert.component';
import { AuthResponseData, AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }

  isLogging = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static:false}) alertHost: PlaceholderDirective; 

  closesub : Subscription;

  onSwitchMode() {
    this.isLogging = !this.isLogging;
  }

  onSubmit(form: NgForm) {

    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;

    if (this.isLogging) {
      authObs = this.authService.login(email, password)
    } else {
      authObs = this.authService.signup(email, password)
    }

    authObs.subscribe(resData => {
      // console.log(resData)
      this.isLoading = false;
      this.router.navigate(['recipes'])
    }, errorMessage => {
      // console.log(errorMessage)
      this.error = errorMessage;
      this.showAlertBox(errorMessage);
      this.isLoading = false;
    });

    form.reset();
  }

  onHandleError(){
    this.error = null;
  }

  ngOnDestroy(){
    if (this.closesub){
      this.closesub.unsubscribe();
    }
  }

  private showAlertBox(message: string){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear()

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

   componentRef.instance.message = message;

   this.closesub = componentRef.instance.close.subscribe(()=>{
     this.closesub.unsubscribe;
     hostViewContainerRef.clear();
   })
  }

}