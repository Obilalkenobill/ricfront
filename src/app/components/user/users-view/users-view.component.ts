import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/Models/role.model';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent implements OnInit {

  displayedColumns: string[] = ['id', 
  'nom',
  'prenom',
  'login',
  'email', 
  'is_active',
  'creation_date',
  'is_verified',
  'nn',
  'actions'];
  dataSource!: MatTableDataSource<User>;
  public usersList!: User[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UsersService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh()
  {
    this.userService.getAll().subscribe(users => 
    {
      this.usersList = users;
      this.updateDataSource();
    });
  }

  formatRole(role:Role[]){
    let output="";
    role.forEach((element:any)=>{
      output+=element.label+' ';
    })
    return output;
  }


  updateDataSource()
  {
    this.dataSource = new MatTableDataSource(this.usersList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  deleteUser(id:any,user:any)
  {
    if (confirm("Are sur to delete user: "+user.nom+" "+user.prenom+" wich login is :"+user.login)) {
    this.userService.deleteUser(id).subscribe(result=>{this.refresh();},error=>{
      alert("Cet utilisateur a participé au projet, il ne peut pas être supprimé !")
    });
    //window.location.reload();
    }
  }
}
