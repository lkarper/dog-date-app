import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// This component fires a callback function whenever a click registers outside of its children prop

const NativeClickListener = (props) => {    
    const globalClickHandler = (nativeEvent) => {
        
        /* Checking whether the element outside of which the click registers 
        has height prevents callbacks from firing if the element is not actually displayed.
        This is primarily a concern for drop-down menus that are designed to close 
        when the user clicks anywhere outside of them. */

        if (document.querySelector(`#${props.id}`).offsetHeight !== 0 && !document.querySelector(`#${props.id}`).contains(nativeEvent.target)) {
            return props.onClick(nativeEvent);
        }
    }

    useEffect(() => {
        document.addEventListener('click', globalClickHandler);
        return () => {
            document.removeEventListener('click', globalClickHandler);
        };
    });

    return (
        <div
            id={props.id} 
            className={props.className}
            role='alert'
        >
            {props.children}
        </div>
    );
}

NativeClickListener.defaultProps = {
    id: `default-${new Date().toJSON()}`,
};

NativeClickListener.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.element.isRequired,
};

export default NativeClickListener;
