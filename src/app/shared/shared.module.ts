import { NgModule } from '@angular/core';
import { SearchInputComponent } from './search-input/search-input.component';
import { ButtonComponent } from './button/button.component';
import { DialogComponent } from './dialog/dialog.component';
import { ListItemComponent } from './list-item/list-item.component';
import { CheckBoxComponent } from './check-box/check-box.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { AppMaterialModule } from '../core/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        SearchInputComponent,
        ButtonComponent,
        DialogComponent,
        ListItemComponent,
        CheckBoxComponent,
        PaginatorComponent,
    ],
    imports: [
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    entryComponents: [DialogComponent],
    exports: [
        SearchInputComponent,
        ButtonComponent,
        DialogComponent,
        ListItemComponent,
        CheckBoxComponent,
        PaginatorComponent
    ]
})
export class SharedModule { }
