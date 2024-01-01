import { Component } from '@angular/core';
import { ConnectionService } from 'src/app/services/connection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  constructor(private connection: ConnectionService, private router: Router) { }

  ngOnInit(){
    this.loadCategories();
  }


  loadCategories(){
    const categoriesList = document.getElementById('categoriesList')! as HTMLDivElement;
    const fragment = document.createDocumentFragment();
    this.connection.getActiveCategories().subscribe(response => {
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
