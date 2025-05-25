import { Component } from '@angular/core';
import * as Diff from 'diff';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  text1: string = '';
  text2: string = '';
  diffHtml1: string = '';
  diffHtml2: string = '';
  comparisonMessage: string = '';
  

  public compareTexts(): void {
    const diffs = Diff.diffWordsWithSpace(this.text1, this.text2);

    const hasDifferences = diffs.some(part => part.added || part.removed);

    if (!hasDifferences) {
    this.comparisonMessage = 'Both texts are alike';
    this.diffHtml1 = '';
    this.diffHtml2 = '';
    return;
  }

    this.diffHtml1 = diffs.map(part => {
      const escaped = this.escapeHtml(part.value);
      if (part.removed) {
        return `<span class="removed">${escaped}</span>`;
      } else if (!part.added) {
        return `<span class="unchanged">${escaped}</span>`;
      } else {
        return '';  
      }
    }).join('');

    this.diffHtml2 = diffs.map(part => {
      const escaped = this.escapeHtml(part.value);
      if (part.added) {
        return `<span class="added">${escaped}</span>`;
      } else if (!part.removed) {
        return `<span class="unchanged">${escaped}</span>`;
      } else {
        return ''; 
      }
    }).join('');

  }

  public clearAll():void {
    this.text1 = '';
    this.text2 = '';
    this.diffHtml1 = '';
    this.diffHtml2 = '';
    this.comparisonMessage = '';
  }

  private escapeHtml(text: string): string {
  return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

}
