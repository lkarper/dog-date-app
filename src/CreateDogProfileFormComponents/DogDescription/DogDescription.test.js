import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import DogDescription from './DogDescription';

describe('DogDescription component', () => {
    it('renders the UI without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<DogDescription />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const wrapper = mount(<DogDescription />);
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });
});