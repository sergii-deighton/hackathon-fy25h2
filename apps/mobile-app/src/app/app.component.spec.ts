import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  it('should create the app', async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideNoopAnimations()]
    }).compileComponents();
    
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
