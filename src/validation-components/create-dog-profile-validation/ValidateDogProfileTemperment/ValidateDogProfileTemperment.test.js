import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ValidateDogProfileTemperment from './ValidateDogProfileTemperment';

describe('ValidateDogProfileTemperment component', () => {
    it('renders the UI without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ValidateDogProfileTemperment />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const wrapper = mount(<ValidateDogProfileTemperment />);
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });
});
