import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <section className='section'>
                    <header>
                        <h1>Error</h1>
                    </header>
                    <p>Looks like something went wrong.  Check the address, check your connection, and try again.</p>
                </section>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;