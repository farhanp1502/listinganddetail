import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { MainService } from '../services/main.service';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.scss'],
})
export class AddmovieComponent   {

  // constructor() { }


    data: any;
    isToastOpen = false;

    constructor(private formbuilder: FormBuilder,private service:MainService,private modalCtrl: ModalController) {}

    // Custom validator function to check if the value is a list separated by commas with minimum 2 elements
    commaSeparatedListValidator(minLength: number): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const value: string = control.value;
        const list: string[] = value.split(',').map((item) => item.trim());
        return list.length >= minLength
          ? null
          : { commaSeparatedListMinLength: { value } };
      };
    }

    addmovieform = this.formbuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      url: ['', Validators.required],
      cast: ['', [Validators.required, this.commaSeparatedListValidator(2)]]
    });


    cancel() {
      return this.modalCtrl.dismiss('cancel');
    }

    confirm() {
      if (this.addmovieform.valid) {
        const castValue = this.addmovieform.get('cast')?.value;
        let castarr = castValue?.split(',');
        let newdata = {
          ... this.addmovieform.value,
          cast: castarr,
        }
        this.modalCtrl.dismiss( 'confirm');
        this.service.addmovie(newdata).subscribe((res)=>{
          // this.isToastOpen = isOpen;
          this.service.showSuccess('Success','Movie added successfully');

        })
      //   // this.addmovieform.reset();
      }
    }

  }
