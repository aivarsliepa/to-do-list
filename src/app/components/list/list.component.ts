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
}
