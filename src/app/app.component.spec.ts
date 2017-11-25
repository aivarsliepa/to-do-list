import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ListComponent } from './components/list/list.component';
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { authServiceMock, getUserSubject, mockUser, listServiceMock } from './testing/mocks';
import { ListService } from './services/list.service';


describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let app;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [
                AppComponent,
                LoginComponent,
                ListComponent,
                ItemFormComponent
            ],
            providers: [
                { provide: AuthService, useValue: authServiceMock },
                { provide: ListService, useValue: listServiceMock }
            ]
        }).compileComponents();
    }));
    beforeEach(async(() => {
        fixture = TestBed.createComponent(AppComponent);
        app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    }));

    it('should create the app', () => {
        expect(app).toBeTruthy();
    });

    it('should create the app with logged in user', () => {
        getUserSubject.next(mockUser);
        fixture.detectChanges();
        expect(app).toBeTruthy();
    });
});
