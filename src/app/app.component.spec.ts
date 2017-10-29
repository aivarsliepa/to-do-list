import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            imports: [
                AngularFirestoreModule
            ]
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
