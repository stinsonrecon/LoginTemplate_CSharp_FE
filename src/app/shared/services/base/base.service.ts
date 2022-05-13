import { throwError, Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Company, User, UserExtend } from '@app/shared/models';
import { MessageConstants } from '@app/shared/constants';

export abstract class BaseService
{
    constructor() {}

    protected get apiUrl(): string {
        return `${environment.apiUrl}`;
    }
    
    protected get apiDefault(): string {
        return this.apiUrl + '/api';
    }

    get localCompany(): Company {
        return JSON.parse(localStorage.getItem('company'));
    }

    get localUser(): User {
        return JSON.parse(localStorage.getItem('user'));
    }

    get localUserExtend(): UserExtend {
        return JSON.parse(localStorage.getItem('userExtend'));
    }

    protected handleError(errorResponse: any): Observable<any> {
        // Doi voi loi return tu Code
        if (errorResponse.status === 500) {
            return throwError(MessageConstants.SYSTEM_ERROR_MSG);
        }
        if (errorResponse.status === 401 || errorResponse.status === 403) {
            return throwError(MessageConstants.LOGIN_AGAIN_MSG);
        }
        if (errorResponse?.error?.message) {
            return throwError(errorResponse.error.message || MessageConstants.SYSTEM_ERROR_MSG);
        }
        return throwError(MessageConstants.SYSTEM_ERROR_MSG);
    }
}