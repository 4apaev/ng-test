import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class PopupComponent implements OnInit {
  @Input() save: Function;
  @Input() classes: string[];
  
  ngOnInit() {}
  
  add(name:string) {
    this.classes.unshift(name);
    this.save();
    return false;
  }
  
  del(name) {
    for (let i=this.classes.length; i--; ) {
      if (this.classes[ i ]===name) {
        this.classes.splice(i, 1)
        this.save();
        return true
      }
    }
    return false
  }

}
