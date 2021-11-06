import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Projet } from 'src/app/Models/projet.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-projet-view',
  templateUrl: './projet-view.component.html',
  styleUrls: ['./projet-view.component.scss']
})
export class ProjetViewComponent implements OnInit {


  displayedColumns: string[] = [
  'titre',
  'descriptif',
  'nbr_vote_pour',  
  'nbr_vote_contre',
  'nbr_vote_null', 
  'date_adm', 
  'date_rej',
  'creation_date',

  'actions'];
  dataSource!: MatTableDataSource<Projet>;
  public projetList!: Projet[];
  UserId!:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private projetService: ProjetService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.UserId=this.authService.getCurrentUser()?.id;
    this.refresh();
  }

  refresh()
  {
    this.projetService.getAll().subscribe(projets => 
    {
   
      this.projetList = projets;
      this.updateDataSource();
    });
  }

  updateDataSource()
  {
    this.dataSource = new MatTableDataSource(this.projetList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  redirectCreateProjet(){
   this.UserId=this.authService.getCurrentUser()?.id;
   this.router.navigate(['/create-projet',this.UserId]);
  }

deleteProj(Projet_id:any,User_id:any){
  if( this.authService.IsUserProjet(Projet_id, User_id) )
  {
    this.projetService.deleteProjet(Projet_id).subscribe();
  }
}
  // deleteUser(id:any,user:any)
  // {
  //   if (confirm("Are sur to delete user: "+user.nom+" "+user.prenom+" wich login is :"+user.login)) {
  //   this.userService.deleteUser(id).subscribe();
  //   window.location.reload();
  //   }
  // }
}
