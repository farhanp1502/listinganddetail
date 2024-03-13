import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  movie: any;

  constructor(private route: ActivatedRoute, private service: MainService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')!;
      this.service.getmovie(id).subscribe(
        data => {
          this.movie = data;
        },
        error => {
          console.error('Error fetching movie:', error);
          this.movie = null;
        }
      );
    });
  }

}
