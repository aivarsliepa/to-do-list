import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ItemFormComponent } from './item-form.component';
import { ListService } from '../../services/list.service';
import { ListItem } from '../../interfaces/main';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AbstractControl, FormGroup } from '@angular/forms/src/model';

describe('ItemFormComponent', () => {
  let component: ItemFormComponent;
  let fixture: ComponentFixture<ItemFormComponent>;
  const ITEM_TITLE = '1234';
  const ITEM_DATE = new Date();
  const testIem = {
    done: false,
    date: ITEM_DATE,
    title: ITEM_TITLE
  };

  const listServiceMock = {
    addNewItem: (item: ListItem) => { }
  };

  let listService;
  let form: FormGroup;
  let titleInput: AbstractControl;
  let dateInput: AbstractControl;
  let submitBtn: HTMLButtonElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ItemFormComponent],
      providers: [{ provide: ListService, useValue: listServiceMock }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    listService = TestBed.get(ListService);
    form = component.form;
    dateInput = form.controls['date'];
    titleInput = form.controls['title'];
    submitBtn = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be initially invalid', () => {
    expect(form.valid).toBeFalsy();
  });

  it('date should be initially invalid', () => {
    expect(dateInput.valid).toBeFalsy();
    expect(dateInput.errors['required']).toBeTruthy();
  });

  it('title should be initially invalid', () => {
    expect(titleInput.valid).toBeFalsy();
    expect(titleInput.errors['required']).toBeTruthy();
  });

  it('form should be invalid, if only date is valid', () => {
    dateInput.setValue(ITEM_DATE);
    expect(form.valid).toBeFalsy();
  });

  it('form should be invalid, if only title is valid', () => {
    titleInput.setValue(ITEM_TITLE);
    expect(form.valid).toBeFalsy();
  });

  it('form should not call service, when submitted, if it is invalid', () => {
    spyOn(listService, 'addNewItem');
    submitBtn.click();
    expect(listService.addNewItem).toHaveBeenCalledTimes(0);
  });

  it('form should call service, when submitted, if it is valid', () => {
    spyOn(listService, 'addNewItem');
    titleInput.setValue(ITEM_TITLE);
    dateInput.setValue(ITEM_DATE);
    submitBtn.click();
    expect(listService.addNewItem).toHaveBeenCalled();
  });

  it('onSubmit() should add item with correct values', () => {
    spyOn(listService, 'addNewItem');
    titleInput.setValue(ITEM_TITLE);
    dateInput.setValue(ITEM_DATE);
    submitBtn.click();
    expect(listService.addNewItem).toHaveBeenCalledWith(testIem);
  });
});
