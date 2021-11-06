import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss']
})
export class ValidateComponent implements OnInit {
  user!: User;
  imgURLPhotoVerif!:any;
  imgURLRectoCarte!:any;
  imgURLVersoCarte!:any;
    constructor( private userService: UsersService, private router: Router, 
    private route: ActivatedRoute, private sanitizer: DomSanitizer ) { }

  ngOnInit(): void {
    if(this.route.snapshot.params["id"])
    {
      this.userService.getOneByID(this.route.snapshot.params["id"]).subscribe(m => 
        {
          if(m)
          {   
            this.user = m;
            this.imgURLPhotoVerif=this.sanitizer.bypassSecurityTrustUrl("data:"+this.user.mimeTypephotoverif+";base64,"+this.user.photoverif);
            this.imgURLRectoCarte=this.sanitizer.bypassSecurityTrustUrl("data:"+this.user.mimeTyperectocarteid+";base64,"+this.user.rectocarteid);
            this.imgURLVersoCarte=this.sanitizer.bypassSecurityTrustUrl("data:"+this.user.mimeTypeversocarteid+";base64,"+this.user.versocarteid);

          }
    });
  }
}

validate(user_id:any){
  this.userService.validate(user_id).subscribe(m=>{
    this.router.navigate(['/users-view']);
  });
}


}
