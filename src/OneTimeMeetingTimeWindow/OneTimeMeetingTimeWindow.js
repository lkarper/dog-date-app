import React, { useState, useEffect } from 'react';

const OneTimeMeetingTimeWindow = (props) => {

    const { index, initialData, updateTimeWindows, removeTimeWindow } = props;

    const [startTime, setStartTime] = useState(initialData.startTime);
    const [endTime, setEndTime] = useState(initialData.endTime);

    useEffect(() => {
        if (initialData.startTime !== startTime) {
            updateTimeWindows(index, startTime, endTime);
        }
        if (initialData.endTime !== endTime) {
            updateTimeWindows(index, startTime, endTime);
        }
    
    }, [startTime, endTime, index, initialData, updateTimeWindows]);

    return (
        <li>
            <label htmlFor={`once-start-time-${index + 1}`}>I'm available from:</label>
            <input 
                type="time" 
                id={`once-start-time-${index + 1}`} 
                name={`once-start-time-${index + 1}`} 
                placeholder="10:30"
                value={startTime}
                aria-describedby={`start-time-validator-${index + 1}`} 
                onChange={(e) => setStartTime(e.target.value)}
            />
            <label htmlFor={`once-end-time-${index + 1}`}>I'm available until:</label>
            <input 
                type="time" 
                id={`once-end-time-${index + 1}`} 
                name={`once-end-time-${index + 1}`} 
                min={startTime}
                placeholder="16:00" 
                value={endTime}
                aria-describedby={`end-time-validator-${index + 1}`}
                onChange={(e) => setEndTime(e.target.value)}
            />
            {index !== 0 ? <button type='button' onClick={() => removeTimeWindow(index)}>Remove window</button> : ''}
        </li>   
    );
}

export default OneTimeMeetingTimeWindow;