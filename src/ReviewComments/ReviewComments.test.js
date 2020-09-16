import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ReviewComments from './ReviewComments';

describe('ReviewComments component', () => {
    it('renders the UI without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ReviewComments />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const wrapper = mount(<ReviewComments />);
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });
});
