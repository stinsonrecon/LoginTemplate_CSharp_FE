import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { DonViService } from '@app/shared/services/qlht/donvi.service';
import { DialogAddDonViComponent } from './dialog-add-donvi/dialog-add-donvi.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { convertViToEn } from '@app/shared/constants/util';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-danhmucdonvi',
    templateUrl: './danhmucdonvi.component.html',
    styleUrls: ['./danhmucdonvi.component.scss']
})
export class DanhMucDonViComponent extends BaseClass implements OnInit {
    @ViewChild("paginator") paginator: MatPaginator;
    totalRecord: any;

    displayedColumns = ["stt", "maDonVi", "tenDonVi", "donViCha", "phongBan", "soDienThoai", "email", "moTa", "diaChi", "trangThai", "thaoTac"];
    tableData: any = ['', '', '', '']
    dsDonVi: any;
    tuKhoaChange: any = "";
    trangThaiChange: any = -99;
    searchItem: any = {
        tuKhoa: '',
        trangThai: -99,
        pageSize: 10,
        pageIndex: 1
    }
    constructor(public dialog: MatDialog, public _notification: NotificationService, private formBuilder: FormBuilder, private donViService: DonViService) { super() }

    ngOnInit(): void {
        this.getDonVi();
    }
    getDonVi(e?: any) {
        if (e && e.pageIndex !== "" && e.pageIndex !== undefined) {
            this.searchItem.pageIndex = e.pageIndex + 1;
        }
        if (e && e.pageSize !== "" && e.pageSize !== undefined) {
            this.searchItem.pageSize = e.pageSize;
        }
        this.donViService.getAllDonVi(this.searchItem).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            this.dsDonVi = next.data;
            this.dsDonVi.forEach((element,index) => {
                element.stt = (this.searchItem.pageIndex * this.searchItem.pageSize - this.searchItem.pageSize) + index + 1;
            });

            this.totalRecord = next ? next.totalRecord : 0;

        })
    }

    changeTrangThai(data) {
        let params = {
            "id": data.id,
            "tenDonVi": data.tenDonVi,
            "maDonVi": data.maDonVi,
            "diaChi": data.diaChi,
            "soDienThoai": data.soDienThoai,
            "email": data.email,
            "moTa": data.moTa,
            "donViChaId": data.donViChaId,
            "donViChaTieuDe": data.donViChaTieuDe,
            "nguoiTaoId": data.nguoiTaoId,
            "thoiGianTao": data.thoiGianTao,
            "laPhongBan": data.laPhongBan,
            "trangThai": data.trangThai === 1 ? 0 : 1,
            "stt": data.stt
        }

        this.donViService.updateDonVi(params).subscribe(resp =>{
            if (resp.statusCode == 200) {
                this._notification.open(
                    "Cập nhật trạng thái thành công!",
                    mType.success
                );
                this.getDonVi();
            } else {
                this._notification.open(
                    "Cập nhật trạng thái thất bại!",
                    mType.error
                );
            }
            this.getDonVi();
        })
    }

    openDialogAddDonVi() {
        let item: any = {
            maDonVi: null,
            tenDonVi: null,
            diaChi: null,
            soDienThoai: null,
            email: null,
            moTa: null,
            donViChaId: null,
            laPhongBan: null,
            trangThai: true
        };

        const dialogRef = this.dialog.open(DialogAddDonViComponent, {
            width: '700px',
            autoFocus: false,
            data: {
                item
            }
        });
        dialogRef.afterClosed().subscribe((response: any) => {
            if (response === true) {
                item.trangThai = item.trangThai  ? 1 : 0;
                var param = {
                    ...item
                }
                this.donViService.createDonVi(param).subscribe(resp =>{
                    if (resp.statusCode == 200) {
                        this._notification.open(
                            "Thêm mới thành công!",
                            mType.success
                        );
                        this.getDonVi();
                    } else {
                        this._notification.open(
                            "Thêm mới thất bại!",
                            mType.error
                        );
                    }
                })
            }
        });
    }
    openDialogUpdateDonVi(element: any) {
        let item: any = {

        };
        item = JSON.parse(JSON.stringify(element));
        const dialogRef = this.dialog.open(DialogAddDonViComponent, {
            width: '700px',
            autoFocus: false,
            data: {
                item
            }
        });
        dialogRef.afterClosed().subscribe((response: any) => {
            if (response === true) {
                item.trangThai = item.trangThai  ? 1 : 0;
                var param = {
                    ...item
                }
                this.donViService.updateDonVi(param).subscribe(resp =>{
                    if (resp.statusCode == 200) {
                        this._notification.open(
                            "Cập nhật thành công!",
                            mType.success
                        );
                        this.getDonVi();
                    } else {
                        this._notification.open(
                            "Cập nhật thất bại!",
                            mType.error
                        );
                    }
                })
            }
        });
    }
    deleteDonViById(id: any) {
        const confirmDialog = this.dialog.open(ConfirmDialogComponent, { disableClose: false })
        confirmDialog.componentInstance.title = 'Xác nhận xóa?';
        confirmDialog.afterClosed().subscribe(result => {
            if (result) {
                this.donViService.deleteDonVi(id).subscribe(resp =>{
                    if (resp.statusCode == 200) {
                        this._notification.open(
                            "Xóa thành công!",
                            mType.success
                        );
                        this.getDonVi();
                    } else {
                        this._notification.open(
                            "Xóa thất bại!",
                            mType.error
                        );
                    }
                })
            }
        });
    }
    editPhongBan(element: any) {
        let item: any = {

        };
        item = JSON.parse(JSON.stringify(element));
        if(item.laPhongBan) {
            item.laPhongBan = 1;
        }
        else {
            item.laPhongBan = 0;
        }
        this.donViService.updateDonVi(item).subscribe(resp =>{
            if (resp.statusCode == 200) {
                this.getDonVi();
            } else {
            }
        });
    }
    toHeadPage() {
        if(this.searchItem.tuKhoa != this.tuKhoaChange) {
            this.paginator.firstPage();
            this.tuKhoaChange = this.searchItem.tuKhoa;
        }
        if(this.searchItem.trangThai != this.trangThaiChange) {
            this.paginator.firstPage();
            this.trangThaiChange = this.searchItem.trangThai;
        }
    }
}
