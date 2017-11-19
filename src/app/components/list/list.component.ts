import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Observable } from 'rxjs/Observable';
import { ListItem } from '../../interfaces/main';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list: ListItem[] = [];
  constructor(private listService: ListService) { }

  ngOnInit() {
    this.listService.getList().subscribe(list => this.list = list);
  }

}
