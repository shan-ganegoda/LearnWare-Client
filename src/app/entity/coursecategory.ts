export class Coursecategory {

  public id !: number;
  public name !: string;
  public divisionId!: number;

  constructor(id: number, name: string,divisionId:number) {
    this.id = id;
    this.name = name;
    this.divisionId = divisionId;
  }

}
