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

registerLocaleData(localeVI, 'vi-VN');

const routes: Routes = [
    {
        path: 'quanlynguoidung',
        component: QuanLyNguoiDungComponent,
        canActivate: [AuthGuard]
    },
];

@NgModule({
    declarations : [
        QuanLyNguoiDungComponent,
        DialogAddNguoidungComponent,
        DialogUpdatePasswordComponent
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
        OwlNativeDateTimeModule
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