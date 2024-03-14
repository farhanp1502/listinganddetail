import { Component, OnInit } from '@angular/core';
import { FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-editmovie',
  templateUrl: './editmovie.component.html',
  styleUrls: ['./editmovie.component.scss'],
})
export class EditmovieComponent implements OnInit {
  data: any;
  // isToastOpen = false;
  id:any;

  constructor(
    private formbuilder: FormBuilder,
    private service: MainService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.id = this.service.movieid;
    this.service.getmovie(this.id).subscribe((res) => {
      this.data = res;
      this.editform.patchValue({
        name: this.data.name || '',
        category: this.data.category || '',
        url: this.data.url || '',
        cast: this.data.cast ? this.data.cast.join(',') : '',
      });
    });
  }

  editform = this.formbuilder.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    url: ['', Validators.required],
    cast: ['', [Validators.required, this.commaSeparatedListValidator(2)]],
  });

  cancel() {
    return this.modalCtrl.dismiss('cancel');
  }

  confirm() {
    // this.isToastOpen = isOpen;
    if (this.editform.valid) {
      const castValue = this.editform.get('cast')?.value;
      let castarr = castValue?.split(',');
      let newdata = {
        ...this.editform.value,
        cast: castarr,
      };
      // this.service.addmovie(newdata).subscribe((res) => {});
      this.modalCtrl.dismiss( 'confirm');
      this.service.updatemovie(this.id, newdata).subscribe((res) =>{
        // console.log(res);
        this.service.showSuccess('Success','Movie updated successfully');

      });
      // this.editform.reset();
    }
  }

  // Custom validator function to check if the value is a list separated by commas with minimum 2 elements
  commaSeparatedListValidator(minLength: number): ValidatorFn {
    return (control) => {
      const value: string = control.value;
      const list: string[] = value.split(',').map((item) => item.trim());
      return list.length >= minLength ? null : { commaSeparatedListMinLength: { value } };
    };
  }
}
