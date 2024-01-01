import { Component } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {

  showSummary: boolean = false;

  currentDate = new Date();
  day = this.currentDate.getDate();
  year = this.currentDate.getFullYear();
  month = this.currentDate.getMonth();

  minimumScheduleTime = 60 * 1;

  selectedDate = this.currentDate;

  days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
  months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  avilableDays = [
    [],                                   // Domingo
    ['15:00', '16:00'],                   // Lunes
    ['12:00', '13:30', '15:00', '16:00'], // Martes
    ['12:00', '13:30', '15:00', '16:00'], // Miercoles
    ['12:00', '13:30', '15:00', '16:00'], // Jueves
    ['12:00', '13:30', '15:00'], // Viernes
    ['12:00', '13:30', '16:00'],                   // Sabado
  ];

  unavailableDates: {[key: string]: string[]} = {
    '03/01/2024': ['12:00', '13:30', '15:00', '16:00'],
    '11/01/2024': ['12:00', '13:30'],
  };

  selectedMonth = this.months[this.month];


  ngOnInit(){
    this.updateCalendar();
    this.selectDate(this.getFirstFreeDate())
    
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
      button.setAttribute('data-date', this.formatDate(new Date(this.year, this.month, i)));
      
      if(!this.isDateAvailable(new Date(this.year, this.month, i))){
        button.classList.add('text-gray-300', 'cursor-default');
      }else{
        button.classList.add('text-gray-700', 'cursor-pointer');
        button.addEventListener('click', () => {
          calendar.querySelectorAll('button').forEach(day => {
            day.classList.remove('bg-blue-500', 'text-white');
          });
          
          button.classList.add('bg-blue-500', 'text-white');
          this.selectedDate = new Date(this.year, this.month, i);
          this.updateHours(true);
          this.selectFreeHour(this.selectedDate);          
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

  updateHours(available: boolean){
    const availableHours = document.getElementById('availableHours')! as HTMLDivElement;
    if(available){
      if(this.getAvailablesHours(this.selectedDate).length > 0){
        let hoursFragment = document.createDocumentFragment();
  
        let hours = this.getAvailablesHours(this.selectedDate)!;

        hours.forEach(hour => {
          let button = document.createElement('button');
          button.innerHTML = hour + ' hrs';
          button.setAttribute('data-hour', hour);

          button.classList.add('py-2', 'px-5', 'text-sm', 'rounded-3xl', 'bg-slate-200', 'text-gray-700');
          button.addEventListener('click', () => {
            availableHours.querySelectorAll('button').forEach(hour => {
              if(hour.classList.contains('bg-blue-500')){
                hour.classList.remove('bg-blue-500', 'text-white');
                hour.classList.add('bg-slate-200', 'text-gray-400');
              }                
            });
  
            button.classList.remove('bg-slate-200', 'text-white');
            button.classList.add('bg-blue-500', 'text-white');
          })
  
          hoursFragment.append(button);
        })
  
        availableHours.innerHTML = '';
        availableHours.appendChild(hoursFragment);
      }
    }else{
      availableHours.innerHTML = '';
    }
    
  }

  isDateAvailable(date: Date){
    let available = true;

    if((date.getFullYear() < this.currentDate.getFullYear()) || 
      ((date.getFullYear() == this.currentDate.getFullYear()) && (date.getMonth() < this.currentDate.getMonth())) || 
      ((date.getFullYear() <= this.currentDate.getFullYear()) && (date.getMonth() <= this.currentDate.getMonth()) && (date.getDate() < this.currentDate.getDate()))){
      available = false;
    }else available = this.isHourAvailable(date);

    return available;
  }


  isHourAvailable(date: Date){
    let available = true;
    let formatedDate = this.formatDate(date);

    if(this.avilableDays[date.getDay()].length > 0){
      let hoursAvailables = this.avilableDays[date.getDay()];

      if(this.unavailableDates[formatedDate]){
        hoursAvailables = this.avilableDays[date.getDay()].filter(element => !this.unavailableDates[formatedDate].includes(element));
        if(hoursAvailables.length > 0) available = true;
        else available = false;
      }

      if(date.getFullYear() == this.currentDate.getFullYear() && date.getMonth() == this.currentDate.getMonth() && date.getDate() == this.currentDate.getDate()){          
        hoursAvailables = hoursAvailables.filter((hour) => {
          let hourDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(hour.slice(0,2)), parseInt(hour.slice(3,5)));
          hourDate.setMinutes(hourDate.getMinutes() - this.minimumScheduleTime);
          return hourDate > this.currentDate
        });

        if(hoursAvailables.length > 0) available = true;
        else available = false;
      }
    }else available = false;

    return available;
  }

  getAvailablesHours(date: Date){
    if(this.isHourAvailable(date)){
      let formatedDate = this.formatDate(date);
      let hoursAvailables = this.avilableDays[date.getDay()];

      if(this.unavailableDates[formatedDate])
      hoursAvailables = this.avilableDays[date.getDay()].filter(element => !this.unavailableDates[formatedDate].includes(element));

      if(date.getFullYear() == this.currentDate.getFullYear() && date.getMonth() == this.currentDate.getMonth() && date.getDate() == this.currentDate.getDate()){          
        hoursAvailables = hoursAvailables.filter((hour) => {
          let hourDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(hour.slice(0,2)), parseInt(hour.slice(3,5)));
          hourDate.setMinutes(hourDate.getMinutes() - this.minimumScheduleTime);
          return hourDate > this.currentDate
        });
      }

      return hoursAvailables;

    }else return [];
  }

  selectDate(date: any){
    if(date != false){
      const calendar = document.getElementById('calendar')! as HTMLDivElement;
      let formatedDate = this.formatDate(date);

      while(date.getFullYear() != this.year || date.getMonth() != this.month) this.nextMonth();
      (calendar.querySelector('[data-date="'+ formatedDate + '"]') as HTMLButtonElement).click();      
    }else{
      this.updateHours(false);
    }

  }

  selectFreeHour(date: Date){
    if(this.isHourAvailable(date)){
      const availableHours = document.getElementById('availableHours')! as HTMLDivElement;
      let hour = this.getAvailablesHours(date)[0];
      (availableHours.querySelector('[data-hour="'+ hour + '"]') as HTMLButtonElement).click();
    }
  }

  getFirstFreeDate(){
    let date = this.currentDate;
    if(!this.isDateAvailable(date)){
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate())
      while(!this.isDateAvailable(date)){
        date.setDate(date.getDate() + 1);
      }
    }
    return date;
  }

  getFirstFreeDateInMonth(){
    let date = new Date(this.year, this.month, 1);
    if(!this.isDateAvailable(date)){
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate())
      while(!this.isDateAvailable(date)){
        date.setDate(date.getDate() + 1);
        if(date.getDate() == 1) return false;
      }
    }
    return date;
  }


  formatDate(date: Date){
    let day = date.getDate().toString();
    if(date.getDate() < 10) day = '0' + date.getDate();

    let month = (date.getMonth() + 1).toString();
    if((date.getMonth() + 1) < 10) month = '0' + (date.getMonth() + 1);


    return day + '/' + month + '/' + date.getFullYear();
  }


  nextMonth(){
    if(this.month == 11){
      this.month = 0;
      this.year++;
    }
    else this.month++;

    this.selectedMonth = this.months[this.month];
    this.updateCalendar();

    this.selectDate(this.getFirstFreeDateInMonth());
  }
  
  previousMonth(){
    if(this.month == 0){
      this.month = 11;
      this.year--;
    }
    else this.month--;
    
    

    this.selectedMonth = this.months[this.month];
    this.updateCalendar();

    this.selectDate(this.getFirstFreeDateInMonth());
  }



  scheduleAppointment(){
    if(!this.showSummary) this.showSummary = true;
    else console.log('Agendar Turno')
  }

  hideSummary(){
    this.showSummary = false;
  }


}
