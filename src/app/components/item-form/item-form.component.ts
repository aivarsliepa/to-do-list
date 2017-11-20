import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css'],
})
export class ItemFormComponent implements OnInit {

  form: FormGroup;
  constructor(private listService: ListService) { }

  ngOnInit() {
    this.form = new FormGroup(
      {
        title: new FormControl('', Validators.required),
        date: new FormControl('', Validators.required)
      }
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.listService.addNewItem(
        {
          title: this.form.value.title,
          date: this.form.value.date,
          done: false
        }
      );
      this.form.reset();
    }
  }
}
