import {Course} from "./course";
import {Day} from "./day";
import {Employee} from "./employee";
import {Batchstatus} from "./batchstatus";

export class Batch {

  public id !: number;
  public course!:Course;
  public day!:Day;
  public number !: string;
  public name !: string;
  public dostart!:string;
  public doend!:string;
  public tostart!:string;
  public tofinish!:string;
  public employeeByCordinatorId!:Employee;
  public description!:Text;
  public batchstatus!:Batchstatus;

  constructor(
    id: number, course: Course,day:Day,number:string,name:string,dostart:string,doend:string,
    tostart:string,tofinish:string,employeeByCordinatorId:Employee,description:Text,batchstatus:Batchstatus

  ){

    this.id = id;
    this.course = course;
    this.day = day;
    this.number = number;
    this.name = name;
    this.dostart = dostart;
    this.doend = doend;
    this.tostart = tostart;
    this.tofinish = tofinish;
    this.employeeByCordinatorId = employeeByCordinatorId;
    this.description = description;
    this.batchstatus = batchstatus;
  }

}
