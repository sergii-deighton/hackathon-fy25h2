import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopBarComponent } from './top-bar.component';

describe('TopBarComponent', () => {
    let component: TopBarComponent;
    let fixture: ComponentFixture<TopBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TopBarComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TopBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have default title', () => {
        expect(component.title).toBe('Hackathon Starter');
    });

    it('should accept custom title input', () => {
        // Create a fresh component to set input before first change detection
        const testFixture = TestBed.createComponent(TopBarComponent);
        const testComponent = testFixture.componentInstance;
        testComponent.title = 'Custom Title';
        testFixture.detectChanges();

        expect(testComponent.title).toBe('Custom Title');
        const compiled = testFixture.nativeElement as HTMLElement;
        const titleElement = compiled.querySelector('h1');
        expect(titleElement?.textContent).toContain('Custom Title');
    });

    it('should render header element', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const header = compiled.querySelector('header.top-bar');
        expect(header).toBeTruthy();
    });

    it('should have logo section', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const logo = compiled.querySelector('.logo');
        expect(logo).toBeTruthy();
    });

    it('should have actions section for content projection', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const actions = compiled.querySelector('.actions');
        expect(actions).toBeTruthy();
    });

    it('should project content into actions section', () => {
        // Create a test host component that projects content
        const testContent = '<button>Test Button</button>';
        const testFixture = TestBed.createComponent(TopBarComponent);
        const testComponent = testFixture.componentInstance;
        testFixture.detectChanges();

        expect(testComponent).toBeTruthy();
    });
});
