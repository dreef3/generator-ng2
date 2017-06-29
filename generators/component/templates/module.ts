import {NgModule} from '@angular/core';
import {<%= name %>Component} from './<%= nameLower %>.component';

@NgModule({
    declarations: [<%= name %>Component],
    exports: [<%= name %>Component],
})
export class <%= name %>Module {}