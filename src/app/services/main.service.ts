import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient,private toastr:ToastrService) { }
  movieid:string | undefined;
  showSuccess(title:any, message:any){
    this.toastr.success(message,title);
  }
  getData() {
    return this.http.get<any[]>('http://localhost:5004/movies');
  }

  getmovie(id: any) {
    // console.log(id);
    // return this.getData().pipe(
    //   map((movies: any[]) => {
    //     const filteredMovies = movies.filter((movie: any) => movie.id === id);
    //     if (filteredMovies.length === 0) {
    //       throw new Error('Movie not found');
    //     }
    //     return filteredMovies[0];
    //   })
    // );
    return this.http.get(`http://localhost:5004/movies/${id}`).pipe(map(response => response));
  }
  addmovie(data: any){
    return this.http.post("http://localhost:5004/movies",data);
  }
  updatemovie(id: string, data: any) {
    return this.http.put(`http://localhost:5004/movies/${id}`, data);
  }
  deletemovie(id:string){
    return this.http.delete(`http://localhost:5004/movies/${id}`);
  }
}
