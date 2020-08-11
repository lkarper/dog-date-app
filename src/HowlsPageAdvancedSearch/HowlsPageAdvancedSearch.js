import React, { useState, useEffect } from 'react';
import OneTimeMeetingTimeWindow from '../OneTimeMeetingTimeWindow/OneTimeMeetingTimeWindow';
import ValidateTime from '../validation-components/create-howl-validation/ValidateTime';
import RecurringMeetingForm from '../RecurringMeetingForm/RecurringMeetingForm';

const HowlsPageAdvancedSearch = (props) => {

    const {
        typeOfMeetingP,
        setTypeOfMeetingP,
        daysOfWeekP,
        setDaysOfWeekP,
        dateP,
        setDateP,
        timeWindowsP,
        setTimeWindowsP,
        timeErrorP,
        setTimeErrorP,
        recurringMeetingWindowsP,
        setRecurringMeetingWindowsP,
    } = props.data;

    const [typeOfMeeting, setTypeOfMeeting] = useState(typeOfMeetingP);
    const [daysOfWeek, setDaysOfWeek] = useState(daysOfWeekP);
    const [date, setDate] = useState(dateP);
    const [timeWindows, setTimeWindows] = useState(timeWindowsP);
    const [timeError, setTimeError] = useState('');
    const [recurringMeetingWindows, setRecurringMeetingWindows] = useState(recurringMeetingWindowsP);

    useEffect(() => {
        const keysToRemove = [];
        console.log(recurringMeetingWindows)
        if (recurringMeetingWindows.length !== 0) {
            recurringMeetingWindows.forEach(window => {
                console.log(window)
                if (!daysOfWeek.includes(window[Object.keys(window)[0]].dayOfWeek)) {
                    if (!window[Object.keys(window)[0]].startTime || !window[Object.keys(window)[0]].endTime) {
                        keysToRemove.push(Object.keys(window)[0]);
                    }
                }
            });
        }
        if (keysToRemove.length !== 0) {
            const updatedWindows = recurringMeetingWindows.filter(window => !keysToRemove.includes(Object.keys(window)[0]));
            setRecurringMeetingWindows(updatedWindows);
        }
    }, [daysOfWeek, recurringMeetingWindows, setRecurringMeetingWindows]);


    useEffect(() => {
        setRecurringMeetingWindowsP(recurringMeetingWindows);
    }, [recurringMeetingWindows, setRecurringMeetingWindowsP])

    useEffect(() => {
        if (timeError !== timeErrorP) {
            setTimeErrorP(timeError);
        }
    }, [timeError, timeErrorP, setTimeErrorP]);

    useEffect(() => {
        setTimeWindowsP(timeWindows);
    }, [timeWindows, setTimeWindowsP]);

    useEffect(() => {
        if (typeOfMeeting !== typeOfMeetingP) {
            setTypeOfMeetingP(typeOfMeeting);
        }
    }, [typeOfMeeting, typeOfMeetingP, setTypeOfMeetingP]);

    useEffect(() => {
        setDaysOfWeekP(daysOfWeek);
    }, [daysOfWeek, setDaysOfWeekP]);

    useEffect(() => {
        if (date !== dateP) {
            setDateP(date);
        }
    }, [date, dateP, setDateP]);

    const checkDayOfWeek = (day, add) => {
        if (add) {
            const updatedDays = [...daysOfWeek, day];
            setDaysOfWeek(updatedDays);
        } else {
            const updatedDays = [...daysOfWeek.filter(d => d !== day)];
            setDaysOfWeek(updatedDays);
        }
    }

    const updateRecurringMeetingWindows = (index, dayOfWeek, startTime, endTime) => {
        const updatedWindow = {
            [index]: {
                dayOfWeek,
                startTime,
                endTime,
            }
        };

        const newRecurringMeetingWindows = [...recurringMeetingWindows.filter(window => Object.keys(window)[0] !== index), updatedWindow];
        setRecurringMeetingWindows(newRecurringMeetingWindows);
    }

    const addRecurringMeetingWindow = (day) => {
        const newRecurringMeetingWindows = [
            ...recurringMeetingWindows, 
            {
                [`${day}-${recurringMeetingWindows.filter(window => window[Object.keys(window)[0]].dayOfWeek === day).length}`]:
                {
                    dayOfWeek: day,
                    startTime: '',
                    endTime: '',
                },
            }
        ];
        setRecurringMeetingWindows(newRecurringMeetingWindows);
    }

    const removeRecurringMeetingWindow = (index) => {
        console.log(index)
        const newRecurringMeetingWindows = [...recurringMeetingWindows];
        setRecurringMeetingWindows(newRecurringMeetingWindows.filter(window => Object.keys(window)[0] !== index));
    }

    const updateTimeWindows = (index, startTime, endTime) => {
        const updatedTimeWindow = {
            startTime,
            endTime,
        };

        const newTimeWindows = [...timeWindows];
        newTimeWindows.splice(index, 1, updatedTimeWindow);
        setTimeWindows(newTimeWindows);
    }

    const removeTimeWindow = (index) => {
        const updatedTimeWindows = [...timeWindows];
        updatedTimeWindows.splice(index, 1);
        setTimeWindows(updatedTimeWindows);
    }

    const addTimeWindow = () => {
        const newTimeWindow = {
            startTime: '',
            endTime: '',
        };

        const newTimeWindows = [...timeWindows, newTimeWindow];
        setTimeWindows(newTimeWindows);
    }

    const today = new Date();
    const minDate = `${today.getFullYear()}-${today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1}-${today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()}`;

    return (
        <>
            <fieldset className='HowlsPageFilterForm__sub-fieldset'>
                <legend>Type of meeting</legend>
                <div>
                    <input 
                        type='radio'
                        id='sort-howls-type-any'
                        name='sort-howls-type'
                        value=''
                        checked={typeOfMeeting === ''}
                        onChange={(e) => setTypeOfMeeting(e.target.value)}
                    />
                    <label htmlFor='sort-howls-type-any'>Show all types</label>
                </div>
                <div>
                    <input 
                        type='radio'
                        id='sort-howls-type-recurring'
                        name='sort-howls-type'
                        value='recurring'
                        checked={typeOfMeeting === 'recurring'}
                        onChange={(e) => setTypeOfMeeting(e.target.value)}
                    />
                    <label htmlFor='sort-howls-type-recurring'>Recurring meetings only</label>
                </div>
                <div>
                    <input 
                        type='radio'
                        id='sort-howls-type-once'
                        name='sort-howls-type'
                        value='once'
                        checked={typeOfMeeting === 'once'}
                        onChange={(e) => setTypeOfMeeting(e.target.value)}
                    />
                    <label htmlFor='sort-howls-type-once'>One time meetings only</label>
                </div>
            </fieldset>
            <fieldset className='HowlsPageFilterForm__sub-fieldset'>
                <legend>Only show howls on the following days of the week (optional)</legend>
                {[
                    'Monday', 
                    'Tuesday', 
                    'Wednesday', 
                    'Thursday', 
                    'Friday', 
                    'Saturday', 
                    'Sunday'
                ].map(day => (
                    <div key={day}>
                        <input 
                            type='checkbox'
                            id={day}
                            name={day}
                            value={day}
                            checked={daysOfWeek.includes(day)}
                            onChange={(e) => checkDayOfWeek(e.target.value, e.target.checked)}
                        />
                        <label htmlFor={day}>{day}</label>
                        {daysOfWeek.includes(day) && 
                            <>
                                <ol>
                                    {recurringMeetingWindows
                                        .filter(window => window[Object.keys(window)[0]].dayOfWeek === day)
                                        .map(window => (
                                            <RecurringMeetingForm 
                                                key={Object.keys(window)[0]} 
                                                index={Object.keys(window)[0]} 
                                                currentData={window[Object.keys(window)[0]]}
                                                type='search'
                                                dayOfWeek={day} 
                                                updateRecurringMeetingWindows={updateRecurringMeetingWindows} 
                                                removeRecurringMeetingWindow={removeRecurringMeetingWindow}    
                                            />)
                                        )
                                    }
                                </ol>
                                <div role='alert'>
                                    <ValidateTime 
                                        meetingType='search-recurring'
                                        recurringMeetingWindows={recurringMeetingWindows.filter(window => window[Object.keys(window)[0]].dayOfWeek === day)}
                                        setTimeError={setTimeError}
                                    />
                                </div>
                            </>
                        }
                        {daysOfWeek.includes(day) &&
                            <button 
                                onClick={() => addRecurringMeetingWindow(day)} 
                                type="button"
                            >
                                Click to add a time window
                            </button>
                        }
                    </div>
                ))}
            </fieldset>
            <fieldset className='HowlsPageFilterForm__fieldset'>
                <legend>Only show howls on this date (optional)</legend>
                <label htmlFor="once-date">Date:</label>
                <input 
                    type="date" 
                    id="once-date" 
                    name="once-date" 
                    placeholder="yyyy-mm-dd" 
                    min={minDate}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <button onClick={() => setDate('')}>Reset Date</button>
                {date && 
                    <fieldset className='HowlsPageFilterForm__sub-fieldset'>
                        <legend>Only show howls that overlap with the following time frames on this date (optional)</legend>
                        <ol>
                            {timeWindows.map((window, i) => (
                                <OneTimeMeetingTimeWindow 
                                    key={i}
                                    index={i}
                                    initialData={window}
                                    updateTimeWindows={updateTimeWindows}
                                    removeTimeWindow={removeTimeWindow}
                                    type='search'
                                />) 
                            )}
                        </ol>
                        <button type="button" onClick={addTimeWindow}>Add a time window</button>
                        <div role='alert'>
                            <ValidateTime 
                                meetingType='search'
                                timeWindows={timeWindows}
                                setTimeError={setTimeError}
                            />
                        </div>
                    </fieldset>
                }
            </fieldset>
        </>
    );
}

export default HowlsPageAdvancedSearch;