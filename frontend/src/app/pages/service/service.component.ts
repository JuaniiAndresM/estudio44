import { Component } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {

  currentDate = new Date();
  day = this.currentDate.getDate();
  year = this.currentDate.getFullYear();
  month = this.currentDate.getMonth();

  selectedDate = this.currentDate;

  months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  unavailableDays = [0, 6];
  selectedMonth = this.months[this.month];


  ngOnInit(){
    this.updateCalendar();
  }

  updateCalendar(){
    const calendar = document.getElementById('calendar')! as HTMLDivElement;
    let calendarFragment = document.createDocumentFragment();

    let lastMonthDate = new Date(this.year, this.month + 1, 0).getDate();
    let dayOneDate = new Date(this.year, this.month, 0).getDay();

    if(dayOneDate == 6) dayOneDate = 0;
    else dayOneDate++;

    for(let i = 0; i < dayOneDate; i++){
      let button = document.createElement('button');
      calendarFragment.append(button);
    }

    for(let i = 1; i <= lastMonthDate; i++){
      let button = document.createElement('button');
      button.innerText = i.toString();
      button.classList.add('w-10', 'h-10', 'flex', 'justify-center', 'items-center', 'rounded-full');
      button.setAttribute('data-date', i + '/' + (this.month + 1) + '/' + this.year)
      
      if(!this.isAvailable(new Date(this.year, this.month, i))){
        button.classList.add('text-gray-300', 'cursor-default');
      }else{
        button.classList.add('text-gray-700', 'cursor-pointer');
        button.addEventListener('click', () => {
          calendar.querySelectorAll('button').forEach(day => {
            day.classList.remove('bg-blue-500', 'text-white');
          })

          button.classList.add('bg-blue-500', 'text-white')

          console.log(button.getAttribute('data-date'))
        })
      }

      if(this.year == this.currentDate.getFullYear() && this.month == this.currentDate.getMonth() && i == this.currentDate.getDate()){
        button.classList.add('rounded-full', 'border', 'border-blue-500');
      }

      calendarFragment.append(button);
    }

    calendar.innerHTML = 
    `
      <span class="text-gray-700">Dom</span>
      <span class="text-gray-700">Lun</span>
      <span class="text-gray-700">Mar</span>
      <span class="text-gray-700">Mie</span>
      <span class="text-gray-700">Jue</span>
      <span class="text-gray-700">Vie</span>
      <span class="text-gray-700">Sab</span>
    `;
    calendar.appendChild(calendarFragment)
  }

  isAvailable(date: Date){
    let available = true;

    if((date.getFullYear() < this.currentDate.getFullYear()) || 
      ((date.getFullYear() == this.currentDate.getFullYear()) && (date.getMonth() < this.currentDate.getMonth())) || 
      ((date.getFullYear() <= this.currentDate.getFullYear()) && (date.getMonth() <= this.currentDate.getMonth()) && (date.getDate() < this.currentDate.getDate()))){
      available = false;
    }else{
      if(this.unavailableDays.length > 0)
      this.unavailableDays.forEach(day => {
        if(day == date.getDay()) available = false;
      });
    }
    return available;
  }


  nextMonth(){
    if(this.month == 11){
      this.month = 0;
      this.year++;
    } 
    else this.month++;
    this.selectedMonth = this.months[this.month];
    this.updateCalendar();
  }
  
  previousMonth(){
    if(this.month == 0){
      this.month = 11;
      this.year--;
    }
    else this.month--;
    this.selectedMonth = this.months[this.month];
    this.updateCalendar();
  }


}
