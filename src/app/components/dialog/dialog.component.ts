import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Main } from 'src/app/interfaces/main';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  form: FormGroup;
  value = '';

  // @ViewChild('number') number!: ElementRef;

  optionsToSelect: Main[] = [
    {value: 'punto', viewValue: 'Punto ( . )'},
    {value: 'coma', viewValue: 'Coma ( , )'},
  ];

  constructor ( private fb: FormBuilder )
  {
    this.form = this.fb.group({
      optionSelected: [''],
      number: [''],
      options: this.optionSelected,
    })

  }

  optionSelected = new FormControl(this.optionsToSelect[0].value);


  modifyNumber(event: any) {

    const numberNow = event.target.value;
    let dato = this.optionSelected.value;
    let number = this.form.get('number')?.value;


    if( dato === 'coma') {
      number = this.agregarSeparadorComa(number);
      
      console.log( number )
    }

    if( dato === 'punto') {
      number = this.agregarSeparadorPunto(number)
      console.log( number )
    }

    this.form.get('number')?.patchValue(number);

  }

  submitModal() {
    
  }

  agregarSeparadorComa(num: number) {
    let newNumber = num.toString().split('.');

    newNumber[0] = newNumber[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return newNumber.join('.')
  }

  agregarSeparadorPunto(num: number) {
    let newNumber = num.toString().split(',');
    
    newNumber[0] = newNumber[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return newNumber.join(',')
  }

  
}
