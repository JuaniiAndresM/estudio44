import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConnectionService } from 'src/app/services/connection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private connection: ConnectionService, private router: Router) { }

  ngOnInit(){
    let offersLength = document.getElementById('offersContainer')!.querySelectorAll('.offer').length;
    const fragment = document.createDocumentFragment();

    this.loadCategories();

    if(offersLength > 1){
      for(let i = 0; i < offersLength; i++){
        let span = document.createElement('span');
        span.classList.add('w-3', 'h-3', 'rounded-full', 'block', 'transition-colors', 'pagination', 'cursor-pointer');
  
        if(i === 0) span.classList.add('bg-blue-500');
        else span.classList.add('bg-gray-300')
  
        span.setAttribute('data-pagination', i.toString());
        span.addEventListener('click', () => {
          document.getElementById('offersContainer')!.querySelector('[data-pagination="'+i+'"')!.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });  
        })
  
        fragment.append(span);
      }
  
      document.getElementById('offersPagination')!.appendChild(fragment);
      
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
           if(entry.isIntersecting){
            document.getElementById('offersPagination')?.querySelectorAll('.pagination').forEach(pagination => {
              if(pagination.getAttribute('data-pagination') !== entry.target.getAttribute('data-pagination')){
                pagination.classList.add('bg-gray-300');
                pagination.classList.remove('bg-blue-500');
              }else{
                pagination.classList.add('bg-blue-500');
                pagination.classList.remove('bg-gray-300');
              }
            })
           }
        })
      }, {
        root: document.getElementById('offersContainer'),
        rootMargin: "0px",
        threshold: 0.8,
      });
  
      document.getElementById('offersContainer')!.querySelectorAll('.offer').forEach(element => {
        observer.observe(element);
      })
    }    
  }

  loadCategories(){
    const categoriesList = document.getElementById('categoriesList')! as HTMLDivElement;
    const fragment = document.createDocumentFragment();
    this.connection.getHomeCategories().subscribe(response => {
      let categories = response;
      categories.forEach((categorie: any) => {
        let button = document.createElement('button');
        button.setAttribute('class', 'flex flex-col justify-center items-center gap-2');
        button.addEventListener('click', ()=>{
          this.router.navigate(["/categoria/" + categorie.id]);
        })

        button.innerHTML = `
        <div class="w-[70px] h-[70px] p-5 rounded-full flex justify-center items-center bg-blue-100">
            ${categorie.icon}
        </div>
        <span class="font-semibold text-gray-700 text-sm">${categorie.name}</span>
        `

        fragment.appendChild(button);
      })
      categoriesList.innerHTML = '';
      categoriesList.append(fragment);
    })
  }
}
