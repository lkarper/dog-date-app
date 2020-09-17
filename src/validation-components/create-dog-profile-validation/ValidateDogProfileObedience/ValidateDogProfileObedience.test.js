import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ValidateDogProfileObedience from './ValidateDogProfileObedience';

describe('ValidateDogProfileObedience component', () => {
    it('renders the UI without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ValidateDogProfileObedience />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const wrapper = mount(<ValidateDogProfileObedience />);
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });
});
