import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Coursestatus} from "../../../entity/coursestatus";
import {Coursecategory} from "../../../entity/coursecategory";
import {Devision} from "../../../entity/devision";
import {Employee} from "../../../entity/employee";
import {UiAssist} from "../../../util/ui/ui.assist";
import {EmployeeService} from "../../../service/employeeservice";
import {RegexService} from "../../../service/regexservice";
import {MatDialog} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {CourseService} from "../../../service/courseservice";
import {CourscategoryService} from "../../../service/courscategoryservice";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Course} from "../../../entity/course";
import {CoursestatusService} from "../../../service/coursestatusservice";
import {DevisionService} from "../../../service/devisionservice";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit{

  columns: string[] = ['code', 'name', 'dointroduced', 'duration','credit', 'fee', 'coursecategory'];
  headers: string[] = ['Code', 'Course Name', 'Introduce Date', 'Duration', 'Credit', 'Fee','Course Categiory', 'Modification'];
  binders: string[] = ['code', 'name', 'dointroduced', 'durationtheory','credit', 'fee' ,'coursecategory.name', 'getModi()'];

  cscolumns: string[] = ['cscode', 'csname', 'cscategory','csmodi'];
  csprompts: string[] = ['Search by Code', 'Search by Name', 'Search by Category', 'Search by Modi'];

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  devision!: Devision;
  course!: Array<Course>;
  oldcourse!: Course;

  coursestatuses: Array<Coursestatus> = [];
  coursecategorys: Array<Coursecategory> = [];
  divisions: Array<Devision> = [];

  courses: Array<Course> = [];

  enaadd:boolean = false;
  enaupd:boolean = false;
  enadel:boolean = false;


  regexes: any;

  data!: MatTableDataSource<Course>;

  selectedrow: any;

  uiassist: UiAssist;

  imageurl: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  imageempurl: string = 'assets/default.png'

  constructor(
    private cs:CourseService,
    private css:CoursestatusService,
    private dv:DevisionService,
    private cc:CourscategoryService,
    private es: EmployeeService,
    private rs: RegexService,
    private fb: FormBuilder,
    private dg: MatDialog,
    private dp: DatePipe) {

    this.uiassist = new UiAssist(this);

    this.csearch = this.fb.group({
      "cscode": new FormControl(),
      "csname": new FormControl(),
      "cscategory": new FormControl(),
      "csmodi": new FormControl(),
    });

    this.ssearch = this.fb.group({
      "sscode": new FormControl(),
      "ssname": new FormControl(),
      "ssstatus": new FormControl(),
      "sscategory": new FormControl()
    });

    this.form = this.fb.group({
      "division": new FormControl('', [Validators.required]),
      "coursecategory": new FormControl('', [Validators.required]),
      "coursestatus": new FormControl('', [Validators.required]),
      "code": new FormControl('', [Validators.required]),
      "name": new FormControl('', [Validators.required]),
      "description": new FormControl('', [Validators.required]),
      "dointroduced": new FormControl('', [Validators.required]),
      "credit": new FormControl('', [Validators.required]),
      "fee": new FormControl('', [Validators.required]),
      "durationtheory": new FormControl('', [Validators.required]),
      "durationpractical": new FormControl('', [Validators.required]),
    }, {updateOn: 'change'});

  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {

    this.createView();

    this.cs.getAll('').then((css:Course[])=>{
      this.course = css;
      console.log(this.course);
    });

    this.css.getAllList().then((csstatus: Coursestatus[]) => {
      this.coursestatuses = csstatus;
    });

    this.cc.getAllList().then((curscat: Coursecategory[]) => {
      this.coursecategorys = curscat;
    });

    this.dv.getAllList().then((cursdv: Devision[]) => {
      this.divisions = cursdv;
    });

    this.rs.get('course').then((regs: []) => {
      this.regexes = regs;
    });

  }

  createView() {
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
  }


  loadTable(query: string) {

    this.cs.getAll(query)
      .then((courses: Course[]) => {
        this.courses = courses;
        this.imageurl = 'assets/fullfilled.png';
      })
      .catch((error) => {
        console.log(error);
        this.imageurl = 'assets/rejected.png';
      })
      .finally(() => {
        this.data = new MatTableDataSource(this.courses);
        this.data.paginator = this.paginator;
      });

  }


  btnSearchMc() {

    const sserchdata = this.ssearch.getRawValue();

    let name = sserchdata.ssname;
    let code = sserchdata.sscode;
    let coursestatusid = sserchdata.ssstatus;
    let coursecategoryid = sserchdata.sscategory;

    let query = "";

    if (name != null && name.trim() != "") query = query + "&name=" + name;
    if (code != null && code.trim() != "") query = query + "&code=" + code;
    if (coursestatusid != null) query = query + "&coursestatusid=" + coursestatusid;
    if (coursecategoryid != null) query = query + "&coursecategoryid=" + coursecategoryid;


    if (query != "") query = query.replace(/^./, "?")

    this.loadTable(query);

  }

  filterTable(): void {

  }
}
