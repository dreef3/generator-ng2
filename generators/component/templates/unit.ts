import {ComponentFixture, TestBed} from '@angular/core/testing';
import {<%= name %>Module} from './<%= nameLower %>.module';
import {Component, ViewChild} from '@angular/core';
import {<%= name %>Component} from './<%= nameLower %>.component';

describe('<%= name %>Component', () => {

    //#region Test Setup
    @Component({
        template: `<<%= selector %></<%= selector %>>`
    })
    class TestComponent {
        @ViewChild(<%= name %>Component) component;
    }

    let component: <%= name %>Component;
    let testComponent: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [<%= name %>Module],
            declarations: [TestComponent]
        });

        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
        component = testComponent.component;
    });

    //#endregion

    it('компонент должен существовать', () => {
        expect(component).toBeTruthy();
        expect(component instanceof <%= name %>Component).toBeTruthy();
    });
});
