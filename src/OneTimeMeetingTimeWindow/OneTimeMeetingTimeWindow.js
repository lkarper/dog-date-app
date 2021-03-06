import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './OneTimeMeetingTimeWindow.css';

const OneTimeMeetingTimeWindow = (props) => {
    const { 
        index, 
        initialData, 
        updateTimeWindows, 
        removeTimeWindow,
        type, 
    } = props;

    const [startTime, setStartTime] = useState(initialData.startTime);
    const [endTime, setEndTime] = useState(initialData.endTime);

    // Updates time windows in parent component
    useEffect(() => {
        if (initialData.startTime !== startTime) {
            updateTimeWindows(index, startTime, endTime);
        }
        if (initialData.endTime !== endTime) {
            updateTimeWindows(index, startTime, endTime);
        }
    }, [startTime, endTime, index, initialData, updateTimeWindows]);

    if (index !== 0 && !index) {
        return (
            <li className='OneTimeMeetingTimeWindow__li error'>
                <p>
                    Error: Something went wrong. Check your connection and try again.
                </p>
            </li>
        )
    }

    return (
        <li className='OneTimeMeetingTimeWindow__li'>
            <div className='OneTimeMeetingTimeWindow__time-input-container'>
                <label htmlFor={`once-start-time-${index + 1}`}>I'm available from: </label>
                <input 
                    type='time' 
                    id={`once-start-time-${index + 1}`} 
                    name={`once-start-time-${index + 1}`} 
                    placeholder='10:30'
                    value={startTime}
                    aria-describedby={`start-time-validator-${index + 1}`} 
                    onChange={(e) => setStartTime(e.target.value)}
                />
            </div>
            <div className='OneTimeMeetingTimeWindow__time-input-container'>
                <label htmlFor={`once-end-time-${index + 1}`}>I'm available until: </label>
                <input 
                    type='time' 
                    id={`once-end-time-${index + 1}`} 
                    name={`once-end-time-${index + 1}`} 
                    min={startTime}
                    placeholder='16:00' 
                    value={endTime}
                    aria-describedby={`end-time-validator-${index + 1}`}
                    onChange={(e) => setEndTime(e.target.value)}
                />
            </div>
            {index !== 0 || type === 'search' 
                ? 
                    <button 
                        className='OneTimeMeetingTimeWindow__button button'
                        type='button' 
                        onClick={() => removeTimeWindow(index)}
                    >
                        Remove window
                    </button> 
                : 
                    ''
                }
        </li>   
    );
}

OneTimeMeetingTimeWindow.defaultProps = {
    initialData: {
        startTime: '',
        endTime: '',
    }, 
    updateTimeWindows: () => {}, 
    removeTimeWindow: () => {},
    type: '', 
};

OneTimeMeetingTimeWindow.propTypes = {
    initialData: PropTypes.shape({
        startTime: PropTypes.string,
        endTime: PropTypes.string,
    }).isRequired,
    updateTimeWindows: PropTypes.func.isRequired,
    removeTimeWindow: PropTypes.func,
    type: PropTypes.string,
    index: PropTypes.number,
};

export default OneTimeMeetingTimeWindow;
