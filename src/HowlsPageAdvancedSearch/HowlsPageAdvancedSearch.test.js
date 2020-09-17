import React from 'react';
import ReactDOM from 'react-dom';
import HowlsPageAdvancedSearch from './HowlsPageAdvancedSearch';

describe('HowlsPageAdvancedSearch component', () => {
    it('renders the UI without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<HowlsPageAdvancedSearch />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
