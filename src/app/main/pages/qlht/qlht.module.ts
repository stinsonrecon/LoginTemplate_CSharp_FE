// angular libs
import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MaterialModule } from '@app/material.module';
import { MatChipsModule } from '@angular/material/chips';
import { AuthGuard } from '@app/shared/guard';
import localeVI from '@angular/common/locales/vi';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// shared folder
import { RoleGuard } from '@app/shared/guard/guard-role.guard';
import { ShareComponentModule } from '@app/shared/component/share-component.module';

// libs
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { GojsAngularModule } from 'gojs-angular';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

// pages
import { QuanLyNguoiDungComponent } from "./quanlynguoidung/quanlynguoidung.component";
import { DialogAddNguoidungComponent } from "./quanlynguoidung/dialog-add-nguoidung/dialog-add-nguoidung.component";
import { DialogUpdatePasswordComponent } from "./quanlynguoidung/dialog-update-password/dialog-update-password.component";
//--------
import { QuanLyNhomQuyenComponent } from "./quanlynhomquyen/quanlynhomquyen.component";
import { NamebyId } from "./quanlynhomquyen/dialog-add-nhomquyen/viewNameById.pipe";
import { DialogAddNhomQuyenComponent } from "./quanlynhomquyen/dialog-add-nhomquyen/dialog-add-nhomquyen.component";
//--------
import { DanhMucDonViComponent } from "./danhmucdonvi/danhmucdonvi.component";
import { DialogAddDonViComponent } from "./danhmucdonvi/dialog-add-donvi/dialog-add-donvi.component";
//--------
import { DanhMucChucNangComponent } from "./danhmucchucnang/danhmucchucnang.component";
import { DialogAddChucnangComponent } from "./danhmucchucnang/dialog-add-chucnang/dialog-add-chucnang.component";

registerLocaleData(localeVI, 'vi-VN');

const routes: Routes = [
    {
        path: 'quanlynguoidung',
        component: QuanLyNguoiDungComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'danhmucdonvi',
        component: DanhMucDonViComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'quanlynhomquyen',
        component: QuanLyNhomQuyenComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'danhmucchucnang',
        component: DanhMucChucNangComponent,
        canActivate: [AuthGuard]
    },
];

@NgModule({
    declarations : [
        QuanLyNguoiDungComponent,
        DialogAddNguoidungComponent,
        DialogUpdatePasswordComponent,

        QuanLyNhomQuyenComponent,
        NamebyId,
        DialogAddNhomQuyenComponent,

        DanhMucDonViComponent,
        DialogAddDonViComponent,

        DanhMucChucNangComponent,
        DialogAddChucnangComponent
    ],
    imports : [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        MatChipsModule,
        MaterialModule,
        FormsModule,
        NgxMatSelectSearchModule,
        TreeViewModule,
        DragDropModule,
        GojsAngularModule,
        ShareComponentModule,
        FlexLayoutModule,
        MatProgressBarModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
    ],
    exports : [

    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
    ]
})
export class QlhtModule
{
}