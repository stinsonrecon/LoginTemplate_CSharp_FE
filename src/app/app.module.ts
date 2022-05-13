import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { TranslateModule } from '@ngx-translate/core';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { fuseConfig } from 'app/fuse-config';
import { AppComponent } from 'app/app.component';
import { MaterialModule } from './material.module';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

registerLocaleData(localeVi);

const appRoutes: Routes = [
    {
        path: '',
        loadChildren: './main/login/login.module#LoginModule'

    },
    {
        path: 'login',
        loadChildren: './main/login/login.module#LoginModule'

    },
    {
        path: 'pages',
        loadChildren: './main/pages/pages.module#PagesModule',
    },
    {
        path: 'help',
        loadChildren: () => import('./main/help/help.module').then(m => m.HelpModule)
    },
    {
        path: 'error',
        loadChildren: () => import('./main/error/error.module').then(m => m.ErrorModule)
    },
    { path: '**', redirectTo: 'error/404' },
];
@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'vi-VN' },
    ],
    bootstrap: [AppComponent
    ],
})
export class AppModule { }
