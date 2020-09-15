import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import UploadDogProfilePhoto from './UploadDogProfilePhoto';

describe('UploadDogProfile component', () => {
    it('renders the UI without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<UploadDogProfilePhoto />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const wrapper = mount(<UploadDogProfilePhoto />);
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    })
});