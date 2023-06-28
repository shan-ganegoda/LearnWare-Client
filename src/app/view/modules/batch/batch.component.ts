import {Component, ViewChild} from '@angular/core';
import {Employee} from "../../../entity/employee";
import {Batch} from "../../../entity/batch";
import {MatTableDataSource} from "@angular/material/table";
import {Batchstatus} from "../../../entity/batchstatus";
import {Day} from "../../../entity/day";
import {UiAssist} from "../../../util/ui/ui.assist";
import {Batchstatusservice} from "../../../service/batchstatusservice";
import {Dayservice} from "../../../service/dayservice";
import {Batchservice} from "../../../service/batchservice";
import {MatPaginator} from "@angular/material/paginator";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent {

  csearch!:FormGroup;

  columns: string[] = ['number', 'course', 'name', 'cordinator', 'batchstatus'];
  headers: string[] = ['Number', 'Course', 'Batch Name', 'Cordinator', 'Batch Status'];
  binders: string[] = ['number', 'course.name', 'name', 'employee.callingname', 'batchstatus.name'];

  cscolumns: string[] = ['cscourse', 'csnumber', 'csname', 'cscordinator', 'csbatchstatus'];
  csprompts: string[] = ['Search by Course', 'Search by Number', 'Search by Name',
                          'Search by Cordinator', 'Search by Status'];

  batches!:Array<Batch>;
  data!: MatTableDataSource<Batch>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  imageurl: string = '';

  batchstatuses!:Array<Batchstatus>;
  days!:Array<Day>;

  uiassist: UiAssist;

  constructor(
    private fb:FormBuilder,
    private bt:Batchstatusservice,
    private ds:Dayservice,
    private bs:Batchservice,) {


    this.csearch = this.fb.group({
      "cscourse": new FormControl(),
      "csnumber": new FormControl(),
      "csname": new FormControl(),
      "cscordinator": new FormControl(),
      "csbatchstatus": new FormControl(),
    });

    this.uiassist = new UiAssist(this);

  }

  ngOnInit(){
   this.initialize();
  }


  initialize() {

    this.createView();

    this.bt.getAllList().then((bst:Batchstatus[])=>{
      this.batchstatuses = bst;
    });

    this.ds.getAllList().then((dys:Day[])=>{
      this.days = dys;
    });

  }

  createView() {
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
  }

  loadTable(query: string) {

    this.bs.getAll(query)
      .then((bch: Batch[]) => {
        this.batches = bch;
        this.imageurl = 'assets/fullfilled.png';
      })
      .catch((error) => {
        console.log(error);
        this.imageurl = 'assets/rejected.png';
      })
      .finally(() => {
        this.data = new MatTableDataSource(this.batches);
        console.log(JSON.stringify(this.batches));
        this.data.paginator = this.paginator;
      });

  }

}
