import { NgModule } from '@angular/core';

import { FleggSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [FleggSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [FleggSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class FleggSharedCommonModule {}
