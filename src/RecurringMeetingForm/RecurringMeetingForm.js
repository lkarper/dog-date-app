import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './RecurringMeetingForm.css';

const RecurringMeetingForm = (props) => {
    const { 
        index, 
        currentData, 
        updateRecurringMeetingWindows, 
        removeRecurringMeetingWindow,
        type, 
    } = props;

    const [dayOfWeek, setDayOfWeek] = useState(props.dayOfWeek || currentData.dayOfWeek);
    const [startTime, setStartTime] = useState(currentData.startTime);
    const [endTime, setEndTime] = useState(currentData.endTime);

    // Updates recurring meeting windows in parent component for submission with form
    useEffect(() => {
        if (currentData.dayOfWeek !== dayOfWeek || 
            currentData.startTime !== startTime || 
            currentData.endTime !== endTime) {
            updateRecurringMeetingWindows(
                index, 
                dayOfWeek, 
                startTime, 
                endTime
            );
        }
    }, [
        dayOfWeek, 
        startTime, 
        endTime, 
        index, 
        currentData,
        updateRecurringMeetingWindows
    ]);

    // When the type prop is set to 'search', the component is being used to search for howls, rather than create one
    return (
        <li>
            <fieldset className="sub-fieldset">
                <legend>I'm open for dog dates during the following windows of time:</legend>
                {type !== 'search'
                    &&
                        <div className='RecurringMeetingForm__input-container'>
                            <label htmlFor={`window-day-${index}`}>Day of the week:</label>
                            <select 
                                id={`window-day-${index}`}
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
                        </div>
                }
                <div className='RecurringMeetingForm__input-container'>
                    <label htmlFor={`window-start-time-${index}`} >I'm available from:</label>
                    <input 
                        type="time" 
                        id={`window-start-time-${index}`} 
                        name={`window-start-time-${index}`} 
                        placeholder="10:30" 
                        value={startTime}
                        aria-describedby={`start-time-validator-${index}`}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </div>
                <div className='RecurringMeetingForm__input-container'>
                    <label htmlFor={`window-end-time-${index}`}>I'm available until:</label>
                    <input 
                        type="time" 
                        id={`window-end-time-${index}`} 
                        name={`window-end-time-${index}`}
                        placeholder="16:00"
                        min={startTime}
                        value={endTime}
                        aria-describedby={`end-time-validator-${index}`}
                        onChange={(e) => setEndTime(e.target.value)} 
                        required
                    />
                </div>
                {type === 'search' && 
                    <button
                        className='RecurringMeetingForm__button button' 
                        type='button' 
                        onClick={() => removeRecurringMeetingWindow(index)}
                    >
                        Remove this window
                    </button>
                }
                {(index !== 0 && type !== 'search')
                    && 
                        <button 
                            className='RecurringMeetingForm__button button' 
                            type='button' 
                            onClick={() => removeRecurringMeetingWindow(index)}
                        >
                            Remove this window
                        </button>
                }
            </fieldset>
        </li>
    );
}

RecurringMeetingForm.defaultProps = {
    currentData: {
        dayOfWeek: '',
        startTime: '',
        endTime: '',
    }, 
    updateRecurringMeetingWindows: () => {}, 
    removeRecurringMeetingWindow: () => {},
    type: '', 
};

RecurringMeetingForm.propTypes = {
    index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), 
    currentData: PropTypes.shape({
        dayOfWeek: PropTypes.string,
        startTime: PropTypes.string,
        endTime: PropTypes.string,
    }).isRequired, 
    updateRecurringMeetingWindows: PropTypes.func.isRequired, 
    removeRecurringMeetingWindow: PropTypes.func,
    type: PropTypes.string, 
};

export default RecurringMeetingForm;
