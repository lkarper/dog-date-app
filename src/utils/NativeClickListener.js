import React, { useEffect, useRef } from 'react';

const NativeClickListener = (props) => {
    
    const globalClickHandler = (nativeEvent) => {
        if (container && !container.contains(nativeEvent.target)) {
            return props.onClick(nativeEvent);
        }
    }

    useEffect(() => {
        document.addEventListener('click', globalClickHandler);
        return () => {
            document.removeEventListener('click', globalClickHandler);
        };
    });

    let container = useRef(null);

    const setRef = (el) => {
        container = el;
    }

    return (
        <div 
            className={props.className}
            ref={el => setRef(el)} 
            role='alert'
        >
            {props.children}
        </div>
    )
}

export default NativeClickListener;