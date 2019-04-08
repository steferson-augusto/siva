import { NgModule } from '@angular/core'
import { MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatButtonModule,
    MatSnackBarModule, MatProgressSpinnerModule, MatCardModule, MatGridListModule,
    MatMenuModule, MatIconModule, MatToolbarModule, MatTooltipModule, MatTableModule,
    MatPaginatorModule, MatSortModule, MatRadioModule, MatDatepickerModule, MatTabsModule,
    MatNativeDateModule, MatDividerModule, MatExpansionModule, MatDialogModule, MatSelectModule
} from '@angular/material'

@NgModule({
    imports: [
        MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatButtonModule,
        MatSnackBarModule, MatProgressSpinnerModule, MatCardModule, MatGridListModule,
        MatMenuModule, MatIconModule, MatToolbarModule, MatTooltipModule, MatDialogModule,
        MatTableModule, MatPaginatorModule, MatSortModule, MatRadioModule, MatDatepickerModule,
        MatNativeDateModule, MatDividerModule, MatExpansionModule, MatTabsModule, MatSelectModule
    ],
    exports: [
        MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatButtonModule,
        MatSnackBarModule, MatProgressSpinnerModule, MatCardModule, MatGridListModule,
        MatMenuModule, MatIconModule, MatToolbarModule, MatTooltipModule, MatDialogModule,
        MatTableModule, MatPaginatorModule, MatSortModule, MatRadioModule, MatDatepickerModule,
        MatNativeDateModule, MatDividerModule, MatExpansionModule, MatTabsModule, MatSelectModule
    ]
})

export class MaterialModule {}
