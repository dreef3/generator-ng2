import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, ViewChild} from '@angular/core';
import {PageObject} from 'sme-foundation/buildConfigs/test/pageObject';
import {<%= name %>Module} from './<%= nameLower %>.module';
import {<%= name %>Component} from './<%= nameLower %>.component';

describe('<%= name %>Component', () => {

    // region Test Setup
    @Component({
        template: `<<%= selector %>></<%= selector %>>`
    })
    class TestComponent {
        @ViewChild(<%= name %>Component) component;
    }

    class Page extends PageObject<TestComponent> {
    }

    let component: <%= name %>Component;
    let testComponent: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let page: Page;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [<%= name %>Module],
            declarations: [TestComponent]
        });

        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
        component = testComponent.component;
        page = new Page(fixture);
    });

    // endregion

    it('компонент должен существовать', () => {
        expect(component).toBeTruthy();
        expect(component instanceof <%= name %>Component).toBeTruthy();
    });
});
