import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { ListItem } from '../../interfaces/main';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  private item: ListItem = {
    isDone: false,
    dueDate: null,
    title: ''
  };
  constructor(private listService: ListService) { }

  ngOnInit() {
  }

  onSubmit(): void {
    // TODO
  }
}
