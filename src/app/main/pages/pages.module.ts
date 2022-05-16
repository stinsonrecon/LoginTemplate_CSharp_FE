import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { SharedDirectivesModule } from '@app/shared/directives/shared-directives.module';

const routes : Routes = [
    {
        path: 'qlht',
        loadChildren: () => import('./qlht/qlht.module').then(m => m.QlhtModule),
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        SharedDirectivesModule,
        SharedDirectivesModule,
        MatCardModule,
        MatTableModule,
        
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        MatIconModule,
        MatInputModule
    ],
    declarations: []
})
export class PagesModule
{
}