import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import {
  ListItem,
  TIME_FORMAT,
  COLOR_DONE,
  COLOR_MISSED,
  COLOR_NORMAL,
  ICON_CLOSE,
  ICON_EDIT
} from '../../interfaces/main';


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
  }

  updateItem(item: ListItem) {
    this.listService.updateItem(item);
  }

  updateCurrentItem() {
    this.itemToEdit.date = this.form.controls['date'].value;
    this.itemToEdit.title = this.form.controls['title'].value;
    this.updateItem(this.itemToEdit);
    this.cancelEdit();
  }

  toggleDone(item: ListItem) {
    item.done = !item.done;
    this.updateItem(item);
  }

  deleteItem() {
    this.listService.deleteItem(this.itemToEdit);
    this.cancelEdit();
  }

  cancelEdit() {
    this.itemToEdit = null;
    this.form = null;
  }

  toggleEditState(item: ListItem) {
    if (this.itemToEdit === item) {
      this.itemToEdit = null;
    } else {
      this.itemToEdit = item;
      const date = moment(item.date).format(TIME_FORMAT);
      this.form = new FormGroup({
        title: new FormControl(item.title),
        date: new FormControl(date)
      });
    }
  }

  getBg(item: ListItem) {
    if (item.done) {
      return COLOR_DONE;
    } else if (new Date(item.date) < new Date()) {
      return COLOR_MISSED;
    } else {
      return COLOR_NORMAL;
    }
  }

  getIconClass(item: ListItem) {
    if (this.itemToEdit === item) {
      return ICON_CLOSE;
    } else {
      return ICON_EDIT;
    }
  }
}
