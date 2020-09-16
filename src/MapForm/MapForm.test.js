import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import MapForm from './MapForm';

describe('MapForm component', () => {
    it('renders the UI without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MapForm />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const wrapper = mount(<MapForm />);
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });
});
