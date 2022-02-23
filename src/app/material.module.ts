import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  exports: [MatPaginatorModule, MatIconModule],
})
export class MaterialExportModule {}
