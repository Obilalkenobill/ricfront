import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Projet } from 'src/app/Models/projet.model';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-create-projet',
  templateUrl: './create-projet.component.html',
  styleUrls: ['./create-projet.component.scss']
})
export class CreateProjetComponent implements OnInit {

  projetForm!: FormGroup;
  titreCtl!: FormControl;
  descriptifCtl!: FormControl;
  projet!: Projet;

  constructor(private projetService: ProjetService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder, private router: Router)   {
    this.initForm();
  }

  ngOnInit(): void {

  }

  initForm(): void
  {

    this.titreCtl = this.formBuilder.control('', [Validators.required],);
    this.descriptifCtl = this.formBuilder.control('', [Validators.required] );


    this.projetForm = this.formBuilder.group({
      titre: this.titreCtl,
      descriptif: this.descriptifCtl,
      personne_id_id:this.route.snapshot.params["id"]
    });
  }


  onSubmit()
  {
    const formVal = this.projetForm.value;

      const newProjet = new Projet(formVal);
      this.projetService.addProjet(newProjet).subscribe(m => {
        this.router.navigate(['/projets-view'])
      });
  }
}
