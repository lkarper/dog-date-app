import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CreateHowl from './CreateHowl';

describe('CreateHowl component', () => {
    it('renders the UI without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <CreateHowl />
            </BrowserRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const wrapper = mount(
            <BrowserRouter>
                <CreateHowl />
            </BrowserRouter>
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });
});
