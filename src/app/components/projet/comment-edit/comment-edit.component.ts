import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Commentaire } from 'src/app/Models/commentaire.model';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.scss']
})
export class MatCommentEditComponent implements OnInit {
  commentForm!: FormGroup;
  commentCtl!: FormControl;
  comment!: Commentaire;

  constructor(public dialogRef: MatDialogRef<MatCommentEditComponent>, 
      @Inject(MAT_DIALOG_DATA) public data: Commentaire, private formBuilder: FormBuilder) 
  {
    this.initForm();
  }

  initForm()
  {
  
    this.commentCtl = this.formBuilder.control('', [Validators.required]);

    this.commentForm = this.formBuilder.group({
      commentaire: this.commentCtl,
    });
    this.commentForm.patchValue(this.data);
  }

  ngOnInit(): void {
  
  }

  update()
  {
    let dat = this.commentForm.value;
    dat.id=this.data.id;
    if(this.data.commentaire_referent_id_id!=undefined){
      dat.commentaire_referent_id_id=this.data.commentaire_referent_id_id
    }
    this.dialogRef.close(dat);
  }
}
