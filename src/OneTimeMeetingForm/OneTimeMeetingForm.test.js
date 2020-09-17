import React from 'react';
import ReactDOM from 'react-dom';
import OneTimeMeetingForm from './OneTimeMeetingForm';

describe('OneTimeMeetingForm component', () => {
    it('renders the UI without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<OneTimeMeetingForm />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
