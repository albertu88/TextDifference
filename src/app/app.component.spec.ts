import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [AppComponent],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('compareTexts()', () => {
    it('should show message when texts are identical', () => {
      component.text1 = 'same text';
      component.text2 = 'same text';

      component.compareTexts();

      expect(component.comparisonMessage).toBe('Both texts are alike');
      expect(component.diffHtml1).toBe('');
      expect(component.diffHtml2).toBe('');
    });

    it('should highlight differences when texts differ', () => {
      component.text1 = 'hello world';
      component.text2 = 'hello big';

      component.compareTexts();

      expect(component.comparisonMessage).toBe('');
      expect(component.diffHtml1).toContain('<span class="removed">');
      expect(component.diffHtml2).toContain('<span class="added">');
    });
  });

  describe('clearAll()', () => {
    it('should clear all fields', () => {
      component.text1 = 'a';
      component.text2 = 'b';
      component.diffHtml1 = 'x';
      component.diffHtml2 = 'y';
      component.comparisonMessage = 'Some message';

      component.clearAll();

      expect(component.text1).toBe('');
      expect(component.text2).toBe('');
      expect(component.diffHtml1).toBe('');
      expect(component.diffHtml2).toBe('');
      expect(component.comparisonMessage).toBe('');
    });
  });

  describe('escapeHtml()', () => {
    it('should escape &, <, and > characters', () => {
      // @ts-ignore: accessing private method for test purposes
      const result = component.escapeHtml('<script>alert("x") & test</script>');
      expect(result).toBe('&lt;script&gt;alert("x") &amp; test&lt;/script&gt;');
    });
  });

});
