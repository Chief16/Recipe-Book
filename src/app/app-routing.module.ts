import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';


const appRoutes: Routes = [
  { path: '', redirectTo:"recipes", pathMatch:'full'},
  { path: 'auth', component: AuthComponent},
]

@NgModule({
  imports:[RouterModule.forRoot(appRoutes)],
  exports:[RouterModule]
})
export class AppRoutingModule{}