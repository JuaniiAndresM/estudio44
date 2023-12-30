import { Component } from '@angular/core';
import { __classPrivateFieldGet } from 'tslib';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent {

  images = [
    { src: './assets/lifting.jpg'},
    { src: './assets/trenzas.jpg'},
    { src: './assets/trenzas.jpg'},
    { src: './assets/lifting.jpg'},
  ]

  imageSelected: boolean = false;
  imageSelectedIndex: number = 0;

  sectionTypes = Object.freeze({
    services: 'services',
    specialist: 'specialist',
    gallery: 'gallery',
    reviews: 'reviews',
  });

  changeCategorieSection(selected: string){

    const clicked = document.getElementById(selected + "Btn") as HTMLButtonElement;

    if(clicked.getBoundingClientRect().x < 0 || clicked.getBoundingClientRect().x + clicked.getBoundingClientRect().width > window.innerWidth)
    clicked.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });


    document.querySelectorAll('.sectionBtn').forEach(button => {
      if(button === clicked){
        button.classList.remove('text-gray-400');
        button.classList.add('text-blue-500', 'before:w-full', 'before:h-[5px]', 'before:rounded-t-xl', 'before:absolute', 'before:bottom-0', 'before:left-0', 'before:block', 'before:bg-blue-500');
      }else{
        button.classList.add('text-gray-400');
        button.classList.remove('text-blue-500', 'before:w-full', 'before:h-[5px]', 'before:rounded-t-xl', 'before:absolute', 'before:bottom-0', 'before:left-0', 'before:block', 'before:bg-blue-500');
      }
    })

    document.querySelectorAll('.section').forEach(section => {
      if(section.getAttribute('id') == selected){
        section.classList.remove('hidden');
      }else section.classList.add('hidden');
    })
  }
  
  imageHandler(index: number){
    document.body.style.overflow = 'hidden'
    this.imageSelectedIndex = index;
    this.imageSelected = true;
  }
  
  closeImage(){
    document.body.style.overflow = 'auto'
    this.imageSelected = false;
  }
}
