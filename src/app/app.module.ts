import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {JwtModule} from'@auth0/angular-jwt';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
// import {  MatNativeDateModule} from "@angular/material";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
// import {  MatRippleModule} from "@angular/material/r";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatStepperModule } from "@angular/material/stepper";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';

import { AuthService } from './services/auth.service';
import { ServerService } from './services/server.service';
import { UsersService } from './services/users.service';
import { UsersCommonService } from './services/users-common.service';
import { AdminGuard, AuthGuard } from './services/auth-guard.service';

import { FourhofourComponent } from './components/fourhofour/fourhofour.component';

import { RoleService } from './services/role.service';
import { ProjetViewComponent } from './components/projet/projet-view/projet-view.component';
import { ValidateComponent } from './components/user/validate/validate.component';
import { ImageValidateComponent } from './components/user/image-validate/image-validate.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { RolesViewComponent } from './components/role/roles-view/roles-view.component';
import { CreateRoleComponent } from './components/role/create-role/create-role.component';
import { UsersViewComponent } from './components/user/users-view/users-view.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { CreateProjetComponent } from './components/projet/create-projet/create-projet.component';
import { DetailsProjetComponent } from './components/projet/details-projet/details-projet.component';
import { OwnProjectComponent } from './components/projet/own-project/own-project.component';
import { HomeComponent } from './components/home/home.component';
import { ProjetFollowComponent } from './components/projet-follow/projet-follow.component';
import { MatCommentEditComponent } from './components/projet/comment-edit/comment-edit.component';
import { CharteComponent } from './components/charte/charte.component';




export function tokenGetter(){
  return sessionStorage.getItem('id_token');
}

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CreateUserComponent,
    UsersViewComponent,
    FourhofourComponent,
    CreateRoleComponent,
    RolesViewComponent,
    EditUserComponent,
    ImageValidateComponent,
    ValidateComponent,
    ProjetViewComponent,
    CreateProjetComponent,
    DetailsProjetComponent,
    OwnProjectComponent,
    HomeComponent,
    ProjetFollowComponent,
    MatCommentEditComponent,
    CharteComponent
  ],
  imports: [
    BrowserModule,
    MatSelectModule,
    AppRoutingModule,    
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule, 
    MatCheckboxModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatListModule,
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule, 
    MatIconModule,
    MatSlideToggleModule, 
    MatDialogModule, 
    MatSnackBarModule, 
    MatRadioModule,
    MatTabsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains:["localhost:8000"]
      }
    })
  ],
  providers: [AuthService,ServerService,UsersService, UsersCommonService,AuthGuard,AdminGuard,RoleService],
  entryComponents:[MatCommentEditComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
