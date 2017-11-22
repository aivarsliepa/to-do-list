import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ListComponent } from './components/list/list.component';
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ItemFormComponent } from './components/item-form/item-form.component';


describe('AppComponent', () => {
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
                { provide: AuthService, useValue: {} }
            ]
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
