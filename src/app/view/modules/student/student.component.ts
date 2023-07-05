import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Class} from "../../../entity/Class";
import {MatPaginator} from "@angular/material/paginator";
import {Student} from "../../../entity/student";
import {UiAssist} from "../../../util/ui/ui.assist";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {StudentService} from "../../../service/studentservice";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit{

  columns:string[] = ['name','phoneno','gaurdianname','dob','studentstatus'];
  headers: string[] = ['Name', 'Mobile', 'Guardian Name', 'Birth Date', 'Status'];
  binders: string[] = ['name', 'phoneno', 'gaurdianname', 'dob', 'studentstatus.name'];

  cscolumns:string[] = ['csname','csphoneno','csguardianname','csdob','csstudentstatus'];
  csprompts: string[] = ['Search by Name', 'Search by Mobile', 'Search by Guardian','Search by DOB', 'Search by Status'];

  data!: MatTableDataSource<Student>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  imageurl: string = '';

  uiassist: UiAssist;

  students !: Array<Student>;

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  constructor(private fb:FormBuilder,
              private ss:StudentService
              ) {

    this.csearch = this.fb.group({
      "csname": new FormControl(),
      "csphoneno": new FormControl(),
      "csguardianname": new FormControl(),
      "csdob": new FormControl(),
      "csstudentstatus": new FormControl(),
    });

    this.uiassist = new UiAssist(this);
  }

  ngOnInit() {

    this.initialize();
  }

  initialize(){
    this.createView();
  }

  createView(){
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
  }

  loadTable(query:string){
    this.ss.getAll(query)
      .then((std: Student[]) => {
        this.students = std;
        this.imageurl = 'assets/fullfilled.png';
      })
      .catch((error) => {
        console.log(error);
        this.imageurl = 'assets/rejected.png';
      })
      .finally(() => {
        this.data = new MatTableDataSource(this.students);
        this.data.paginator = this.paginator;
      });
  }

  filterTable(): void {

    const cserchdata = this.csearch.getRawValue();

    this.data.filterPredicate = (student: Student, filter: string) => {
      return (cserchdata.csname == null || student.name.toLowerCase().includes(cserchdata.csname)) &&
        (cserchdata.csphoneno == null || student.phoneno.toLowerCase().includes(cserchdata.csphoneno)) &&
        (cserchdata.csguardianname == null || student.gaurdianname.toLowerCase().includes(cserchdata.csguardianname)) &&
        (cserchdata.csdob == null || student.dob.toLowerCase().includes(cserchdata.csdob)) &&
        (cserchdata.csstudentstatus == null || student.studentstatus.name.toLowerCase().includes(cserchdata.csstudentstatus));
    };

    this.data.filter = 'xx';

  }

}
