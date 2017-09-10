import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit {
  save: Function;
  active: Student;
  store: Student[];
  @Input() type: string;
  
  constructor(private sync:DataService) {
    this.store = [];
    this.save = () => this.update()
  }
  
  ngOnInit() {
    this.sync.list(this.type).then(x => this.store = x);
  }
  
  update() {
    this.sync.update(this.type, this.active)
    return false;
  }
  
  create(name:string) {
    this.sync.create(this.type, { name, classes: [] }).then(x => this.store.unshift(x));
    return false;
  }
  
  remove(id:string) {
    this.sync.remove(this.type, id).then(x => this.drop(id));
    return false;
  }
  
  show(id?:string) {
    this.active = this.store.find(x => x._id===id)
    return false;
  }
  
  drop(id: string): boolean {
    for (let i=this.store.length; i--; ) {
      if (this.store[ i ]._id===id) {
        this.store.splice(i, 1)
        return true
      }
    }
    return false
  }
  
}

interface Student {
  _id: string,
  name: string,
  classes: string[]
}
