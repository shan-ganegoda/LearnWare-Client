import {Employee} from "../entity/employee";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Course} from "../entity/course";
import {Class} from "../entity/Class";

@Injectable({
  providedIn: 'root'
})
export class ClassService {

 constructor(private http: HttpClient) { }

  async getAll(query:string): Promise<Array<Class>> {
    const classes = await this.http.get<Array<Class>>('http://localhost:8080/classes'+ query).toPromise();
    if(classes == undefined){
      return [];
    }
    return classes;
  }

}
