import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialExportModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CdkTableModule } from '@angular/cdk/table';
import { FhTableComponent } from './components/fh-table/fh-table.component';
import { FhPaginatorComponent } from './components/fh-table/fh-paginator/fh-paginator.component';
import { GetKeysPipe } from './components/fh-table/getKeys.pipe';
import { FHDataService } from './fhdata.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    CdkTableModule,
    MaterialExportModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    FhTableComponent,
    FhPaginatorComponent,
    GetKeysPipe,
  ],
  providers: [FHDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
