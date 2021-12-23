import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/Models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-image-validate',
  templateUrl: './image-validate.component.html',
  styleUrls: ['./image-validate.component.scss']
})
export class ImageValidateComponent implements OnInit {
UserId!:number;
user!:User;
imgURLPhotoVerif!:any;
imgURLRectoCarte!:any;
imgURLVersoCarte!:any;
userCurr:any;
userCurrId:any;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService : UsersService,
    private sanitizer: DomSanitizer,
    private jwt: JwtHelperService) {
  }

  ngOnInit(): void {
    this.userCurr=this.authService.getCurrentUser();
    let token=sessionStorage.getItem('id_token');
    if (typeof token == 'string') {this.UserId=this.jwt.decodeToken(token).id;}
    this.onUploadRefresh();
  }


  onFileSelected1(event:any){
    const file:File = event.target.files[0];
    const formData = new FormData();

    formData.append("filephotoverif",file);
    this.userService.validateUser(formData,this.UserId).subscribe(m => { this.onUploadRefresh();});

    //window.location.reload();
  }
  onFileSelected2(event:any){
    const file:File = event.target.files[0];
    const formData = new FormData();

    formData.append("filerectocarteid",file);
    this.userService.validateUser(formData,this.UserId).subscribe(m => {this.onUploadRefresh();});

    //window.location.reload();
  }
  onFileSelected3(event:any){
    const file:File = event.target.files[0];
    const formData = new FormData();

    formData.append("fileversocarteid",file);
    this.userService.validateUser(formData,this.UserId).subscribe(m => {this.onUploadRefresh();});

    //window.location.reload();
  }

onUploadRefresh(){
  if(this.route.snapshot.params["id"])
  {
    this.userService.getOneByID(this.route.snapshot.params["id"]).subscribe(m =>
      {
        if(m)
        {
          this.user = m;
          console.log(this.user);
          this.imgURLPhotoVerif=this.sanitizer.bypassSecurityTrustUrl("data:"+this.user.mimeTypephotoverif+";base64,"+this.user.photoverif);
          this.imgURLRectoCarte=this.sanitizer.bypassSecurityTrustUrl("data:"+this.user.mimeTyperectocarteid+";base64,"+this.user.rectocarteid);
          this.imgURLVersoCarte=this.sanitizer.bypassSecurityTrustUrl("data:"+this.user.mimeTypeversocarteid+";base64,"+this.user.versocarteid);

        }
  });
}

}
}
