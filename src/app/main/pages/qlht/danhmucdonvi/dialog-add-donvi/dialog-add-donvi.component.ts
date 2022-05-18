import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { DonViService } from '@app/shared/services/qlht/donvi.service';


@Component({
    selector: 'app-dialog-add-donvi',
    templateUrl: './dialog-add-donvi.component.html',
    styleUrls: ['./dialog-add-donvi.component.scss']
})
export class DialogAddDonViComponent extends BaseClass implements OnInit {
    formControl: FormGroup;
    dsDonViCha: any = [];
    dsCha: any = [];
    constructor(private formBuilder: FormBuilder, public dialog: MatDialog, public dialogRef: MatDialogRef<DialogAddDonViComponent>, private donViService: DonViService,
        @Inject(MAT_DIALOG_DATA) public data: any) { super() }

    ngOnInit(): void {
        this.formControl = this.formBuilder.group({
            tenDonVi: ['', [Validators.required]],
            maDonVi: ['', [Validators.required]],
            diaChi: ['', [Validators.required]],
            soDienThoai : [''],
            email: ['', [Validators.required]],
            moTa: [''],
            donViCha: ['', [Validators.required]],
            phongBan: [''],
            trangThai: ['']
        });
        this.getDonViCha();
        if (this.data.item.donViChaId == null) this.data.item.donViChaId = 0;
    }
    
    getDonViCha() {
        this.donViService.getAllDonVi().pipe(this.unsubsribeOnDestroy).subscribe(next => {
            this.dsDonViCha = next.data
        });
    }
    get f() {
        return this.formControl.controls;
    }
    save() {
        this.data.item.trangThai = this.data.item.trangThai ? 1 : 0;
        this.data.item.laPhongBan = this.data.item.laPhongBan ? 1 : 0;
        this.formControl.markAllAsTouched();
        

        if (this.formControl.invalid) {
            return;
        } else {
    
            this.dialogRef.close(true);
        }

    }

}
