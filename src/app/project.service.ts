import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) { }

  /* getRepos(namesArray: string[]){
    let jsons: Observable<any>[] = [];
    namesArray.forEach(element => {
      jsons.push(this.http.get<any>(`https://api.github.com/repos/${element}`));
    });
    return jsons;
  } */
    getRepoData(repoNames: string[]): Observable<any[]> {
      const requests = repoNames.map(name => 
        this.http.get(`https://api.github.com/repos/${name}`).pipe(
          map(data => {
            sessionStorage.setItem(name, JSON.stringify(data));
            return data;
          })
        )
      );
      return forkJoin(requests);
    }
}
