import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import DogProfileCharacteristics from './DogProfileCharacteristics';

describe('DogProfileCharacteristics component', () => {
    it('renders the UI without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<DogProfileCharacteristics />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const wrapper = mount(<DogProfileCharacteristics />);
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });
});
