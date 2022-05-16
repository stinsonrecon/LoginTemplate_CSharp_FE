import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BaseService } from '..';

@Injectable({
    providedIn: 'root'
})
export class RoleService extends BaseService {

    private sharedHeaders = new HttpHeaders();
    constructor(private _http: HttpClient) {
        super();
        this.sharedHeaders = this.sharedHeaders.set(
            "Content-Type",
            "application/json"
        );
    }

    getRole(): any {
        let params = new HttpParams();
        return this._http
            .get<any>(`${this.apiDefault}/role/getAll`, {
                headers: this.sharedHeaders,
                params: params,
            })
            .pipe(catchError(this.handleError));
    }
}
