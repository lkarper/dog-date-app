import React, { useState, useEffect } from 'react';

const RecurringMeetingForm = (props) => {

    const { index, currentData, updateRecurringMeetingWindows, removeRecurringMeetingWindow } = props;

    const [dayOfWeek, setDayOfWeek] = useState(currentData.dayOfWeek);
    const [startTime, setStartTime] = useState(currentData.startTime);
    const [endTime, setEndTime] = useState(currentData.endTime);

    useEffect(() => {
        updateRecurringMeetingWindows(index, dayOfWeek, startTime, endTime);
    }, [dayOfWeek, startTime, endTime])

    return (
        <li>
            <fieldset className="sub-fieldset">
                <legend>I'm open for dog dates during the following windows of time:</legend>
                <label htmlFor={`window-day-${index + 1}`}>Day of the week:</label>
                <select 
                    id={`window-day-${index + 1}`}
                    value={dayOfWeek}
                    onChange={(e) => setDayOfWeek(e.target.value)}
                    aria-describedby={`day-validator-${index + 1}`}
                    required
                >
                    <option value="">--Select a day--</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                </select>
                <label htmlFor={`window-start-time-${index + 1}`} >I'm available from:</label>
                <input 
                    type="time" 
                    id={`window-start-time-${index + 1}`} 
                    name={`window-start-time-${index + 1}`} 
                    placeholder="10:30" 
                    value={startTime}
                    aria-describedby={`start-time-validator-${index + 1}`}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                />
                <label htmlFor={`window-end-time-${index + 1}`}>I'm available until:</label>
                <input 
                    type="time" 
                    id={`window-end-time-${index + 1}`} 
                    name={`window-end-time-${index + 1}`}
                    placeholder="16:00"
                    min={startTime}
                    value={endTime}
                    aria-describedby={`end-time-validator-${index + 1}`}
                    onChange={(e) => setEndTime(e.target.value)} 
                    required
                />
                {index !== 0 
                    ? <button type='button' onClick={() => removeRecurringMeetingWindow(index)}>Remove this window</button>
                    : ''
                }
            </fieldset>
        </li>
    );
}

export default RecurringMeetingForm;