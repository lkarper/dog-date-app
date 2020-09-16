import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import DogReviewForm from './DogReviewForm';

describe('DogReviewForm component', () => {
    it('renders the UI without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <DogReviewForm />
            </BrowserRouter>, 
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const wrapper = mount(
            <BrowserRouter>
                <DogReviewForm />
            </BrowserRouter>
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });
});
