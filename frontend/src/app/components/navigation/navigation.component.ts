import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  @Input() selected: any;

  ngOnInit(){
    if(this.selected){
      const button = document.querySelector('[data-id="'+this.selected+'"]')!;

      button.querySelector('span')!.classList.remove('hidden');
      button.querySelector('a')!.classList.remove('text-gray-400');
      button.querySelector('a')!.classList.add('text-blue-400');
    }
  }
}
