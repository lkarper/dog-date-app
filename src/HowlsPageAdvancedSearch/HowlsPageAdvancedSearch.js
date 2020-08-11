import React, { useState, useEffect } from 'react';

const HowlsPageAdvancedSearch = (props) => {

    const {
        typeOfMeetingP,
        setTypeOfMeetingP,
        daysOfWeekP,
        setDaysOfWeekP,
        dateP,
        setDateP,
    } = props.data;

    const [typeOfMeeting, setTypeOfMeeting] = useState(typeOfMeetingP);
    const [daysOfWeek, setDaysOfWeek] = useState(daysOfWeekP);
    const [date, setDate] = useState(dateP);

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
                    </div>
                ))}
            </fieldset>
            <fieldset className='HowlsPageFilterForm__sub-fieldset'>
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
            </fieldset>
        </>
    );
}

export default HowlsPageAdvancedSearch;