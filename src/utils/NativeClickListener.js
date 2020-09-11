import React, { useEffect } from 'react';

const NativeClickListener = (props) => {
    
    const globalClickHandler = (nativeEvent) => {
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

export default NativeClickListener;
