import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddmovieComponent } from '../addmovie/addmovie.component';
import { EditmovieComponent } from '../editmovie/editmovie.component';
// import { AddmoviePage } from '../addmovie/addmovie.page';
// import { MatDialog } from '@angular/material/dialog';


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
    private modalCtrl: ModalController
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
  async addmovie(){
    // this.router.navigate(['addmovie']);
    // async openModal() {
      const modal = await this.modalCtrl.create({
        component: AddmovieComponent,
      });
      modal.present();

      const {  role } = await modal.onWillDismiss();

      if (role === 'cancel'|| role === "confirm") {
        this.getdata();

      }
      else{

        this.getdata();
      }

  }
  isToaOpen = false;
  toster(x:boolean){
    this.isToaOpen = x;
  }
  deletefun(id:any){
    let result = confirm("please confirm to delete");
    if(result==true){
      this.service.deletemovie(id).subscribe((res)=>{
        this.getdata();
        this.toster(true);
      })
    }
  }

  async editmovie(id:string){
      this.service.movieid = id;
      const modal = await this.modalCtrl.create({
        component: EditmovieComponent,
      });
      modal.present();

      const {  role } = await modal.onWillDismiss();

      if (role === 'cancel'|| role === "confirm") {
        this.getdata();

      }
      else{

        this.getdata();
      }

  }
}
