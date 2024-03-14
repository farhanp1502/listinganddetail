import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddmovieComponent } from '../addmovie/addmovie.component';
import { EditmovieComponent } from '../editmovie/editmovie.component';
// import { AddmoviePage } from '../addmovie/addmovie.page';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
// import { DeleteConfirmationDialogComponent } from '';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  datalist: any;
  filteredMovies!: any[];
  searchQuery: string = '';

  constructor(
    private service: MainService,
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getdata();
  }

  getdata() {
    this.service.getData().subscribe((res) => {
      this.datalist = res;
      this.filteredMovies = this.datalist;
    });
  }

  func(id: number) {
    this.router.navigateByUrl('/movie/' + id);
  }

  searchMovies(query: string) {
    this.filteredMovies = this.datalist.filter(
      (movie: { name: string; category: string; cast: any[] }) => {
        return (
          movie.name.toLowerCase().includes(query.toLowerCase()) ||
          movie.category.toLowerCase().includes(query.toLowerCase()) ||
          movie.cast.some((actor) =>
            actor.toLowerCase().includes(query.toLowerCase())
          )
        );
      }
    );
  }
  async addmovie() {
    // this.router.navigate(['addmovie']);
    // async openModal() {
    const modal = await this.modalCtrl.create({
      component: AddmovieComponent,
    });
    modal.present();

    const { role } = await modal.onWillDismiss();

    if (role === 'cancel' || role === 'confirm') {
      this.getdata();
    } else {
      this.getdata();
    }
  }
  isToaOpen = false;
  toster(x: boolean) {
    this.isToaOpen = x;
  }
  deletefun(id: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deletemovie(id).subscribe(() => {
          this.getdata();
          this.service.showSuccess('Success', 'Movie deleted successfully');
        });
      }
    });
  }

  async editmovie(id: string) {
    this.service.movieid = id;
    const modal = await this.modalCtrl.create({
      component: EditmovieComponent,
    });
    modal.present();

    const { role } = await modal.onWillDismiss();

    if (role === 'cancel' || role === 'confirm') {
      this.getdata();
    } else {
      this.getdata();
    }
  }
}
