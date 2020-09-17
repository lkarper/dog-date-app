import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { mount } from 'enzyme';
import NativeClickListener from './NativeClickListener';
import PublicOnlyRoute from './PublicOnlyRoute';
import PrivateOnlyRoute from './PrivateOnlyRoute';

const Test = () => <div />;
const Test2 = () => <span />;

describe('NativeClickListener component', () => {
    it('renders the UI without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <NativeClickListener>
                <div />
            </NativeClickListener>, 
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('PublicOnlyRoute component', () => {
    describe('Given that there is no auth token', () => {
        it('renders the UI without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(
                <BrowserRouter>
                    <PublicOnlyRoute
                        path='/'
                        component={Test}
                    />
                </BrowserRouter>,
                div
            );
            ReactDOM.unmountComponentAtNode(div);
        });
    });
});

describe('PrivateOnlyRouter component', () => {
    describe('Given that there is no auth token', () => {
        it('redirects and renders the UI without crashing', () => {
            const wrapper = mount(
                <BrowserRouter>
                    <Route 
                        path='/login'
                        component={Test2}
                    />
                    <PrivateOnlyRoute
                        exact path='/'
                        component={Test}
                    />
                </BrowserRouter>
            );
            wrapper.unmount();
        });
    });
});