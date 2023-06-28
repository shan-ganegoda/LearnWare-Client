import {Component, OnInit, ViewChild} from '@angular/core';
import {ClassService} from "../../../service/classservice";
import {Class} from "../../../entity/Class";
import {ClassstatusService} from "../../../service/classstatusservice";
import {Lesson} from "../../../entity/lesson";
import {Classstatus} from "../../../entity/Classstatus";
import {LessonService} from "../../../service/lessonservice";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UiAssist} from "../../../util/ui/ui.assist";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Employee} from "../../../entity/employee";
import {EmployeeService} from "../../../service/employeeservice";
import {Batch} from "../../../entity/batch";
import {Batchservice} from "../../../service/batchservice";
import {ConfirmComponent} from "../../../util/dialog/confirm/confirm.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit{

  columns:string[] = ['batch','lesson','teacher','tostart','toend'];
  headers: string[] = ['Batch', 'Lesson', 'Teacher', 'Time Of Start', 'Time Of End'];
  binders: string[] = ['batch.name', 'lessonByLessonId.name', 'teacher.callingname', 'tostart', 'toend'];

  cscolumns:string[] = ['csbatch','cslesson','csteacher','cstostart','cstoend'];
  csprompts: string[] = ['Search by Batch', 'Search by lesson', 'Search by Teacher','Search by To Created', 'Search by To End'];

  classes: Array<Class> = [];
  lessons: Array<Lesson> = [];
  teachers: Array<Employee> = []
  classstatuses: Array<Classstatus> = [];
  batches: Array<Batch> = [];

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  imageurl: string = '';

  data!: MatTableDataSource<Class>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  uiassist: UiAssist;

  selectedrow: any;

  constructor(private  fb:FormBuilder,
              private cs:ClassService,
              private ct:ClassstatusService,
              private ls:LessonService,
              private es:EmployeeService,
              private bs:Batchservice,
              private dg:MatDialog

  ) {


    this.csearch = this.fb.group({
      "csbatch": new FormControl(),
      "cslesson": new FormControl(),
      "csteacher": new FormControl(),
      "cstostart": new FormControl(),
      "cstoend": new FormControl(),
    });

    this.ssearch = this.fb.group({
      "ssbatch": new FormControl(),
      "ssteacher": new FormControl()
    });

    this.uiassist = new UiAssist(this);

  }

  ngOnInit() {
    this.initialize();
  }

  initialize(){

    this.createView();

    this.ct.getAll().then((stts:Classstatus[])=>{
      this.classstatuses = stts;
    });

    this.ls.getAll().then((lsn:Lesson[])=>{
      this.lessons = lsn;
    });

    this.es.getAll("").then((emp:Employee[])=>{
      this.teachers = emp;
    });

    this.bs.getAll("").then((bat:Batch[])=>{
      this.batches = bat;
    });

  }

  createView(){
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
  }

  loadTable(query:string){

    this.cs.getAll(query)
      .then((cls: Class[]) => {
        this.classes = cls;
        this.imageurl = 'assets/fullfilled.png';
      })
      .catch((error) => {
        console.log(error);
        this.imageurl = 'assets/rejected.png';
      })
      .finally(() => {
        this.data = new MatTableDataSource(this.classes);
        this.data.paginator = this.paginator;
      });

  }

  filterTable(): void {

    const cserchdata = this.csearch.getRawValue();

    this.data.filterPredicate = (clazz: Class, filter: string) => {
      return (cserchdata.csbatch == null || clazz.Batch.name.toLowerCase().includes(cserchdata.csbatch)) &&
        (cserchdata.cslesson == null || clazz.lessonByLessonId.name.toLowerCase().includes(cserchdata.cslesson)) &&
        (cserchdata.csteacher == null || clazz.teacher.callingname.toLowerCase().includes(cserchdata.csteacher)) &&
        (cserchdata.cstostart == null || clazz.tostart.toLowerCase().includes(cserchdata.cstostart)) &&
        (cserchdata.cstoend == null || clazz.toend.toLowerCase().includes(cserchdata.cstoend));
    };

    this.data.filter = 'xx';

  }

  btnSearchMc(): void {

    const sserchdata = this.ssearch.getRawValue();


    let batchid = sserchdata.ssbatch;
    let teacherid = sserchdata.ssteacher;

    let query = "";

    if (batchid != null) query = query + "&batchid=" + batchid;
    if (teacherid != null) query = query + "&teacherid=" + teacherid;

    if (query != "") query = query.replace(/^./, "?")

    this.loadTable(query);

  }


  btnSearchClearMc(){
    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {heading: "Search Clear", message: "Are you sure to Clear the Search?"}
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        this.ssearch.reset();
        this.loadTable("");
      }
    });
  }

  fillForm(){

  }


}
