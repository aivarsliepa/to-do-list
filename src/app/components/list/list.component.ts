import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Observable } from 'rxjs/Observable';
import { ListItem } from '../../interfaces/main';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  itemToEdit: ListItem;
  list: ListItem[];
  form: FormGroup;
  constructor(private listService: ListService) { }

  ngOnInit() {
    this.listService.getList().subscribe(list => {
      this.list = list;
    });
    // this.form = new FormGroup(null);
  }

  editItem(item: ListItem) {
    this.itemToEdit = item;
    const date = moment(item.date).format('YYYY-MM-DDThh:mm');
    this.form = new FormGroup({
      title: new FormControl(item.title),
      date: new FormControl(date)
    });
  }

  updateItem(item: ListItem) {
    item.date = this.form.controls['date'].value;
    item.title = this.form.controls['title'].value;
    this.listService.updateItem(item);
    this.cancelEdit();
  }

  cancelEdit() {
    this.itemToEdit = null;
    this.form = null;
  }
}
