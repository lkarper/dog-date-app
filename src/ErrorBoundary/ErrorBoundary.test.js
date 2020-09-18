import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ErrorBoundary from './ErrorBoundary';

const Test = () => null;

describe('Error boundary', () => {
    it('renders the UI without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <ErrorBoundary>
                <p>Test</p>
            </ErrorBoundary>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('catches errors in children', () => {
        const wrapper = mount(
            <ErrorBoundary>
                <Test />
            </ErrorBoundary>
        );
        const error = new Error('test');
        wrapper.find(Test).simulateError(error);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});
