import React, { useState, useEffect } from 'react';
import OneTimeMeetingTimeWindow from '../OneTimeMeetingTimeWindow/OneTimeMeetingTimeWindow';

const OneTimeMeetingForm = (props) => {

    const { currentData, setOneTimeMeetingWindows } = props;
    
    const [date, setDate] = useState(currentData.date);
    const [timeWindows, setTimeWindows] = useState(currentData.timeWindows);

    useEffect(() => {

        if (currentData.date !== date) {
            setOneTimeMeetingWindows({
                date,
                timeWindows
            });
        }

        let update = false;

        if (timeWindows.length !== currentData.timeWindows.length) {
            update = true;
        }

        timeWindows.forEach(window => {
            if (!currentData.timeWindows.find(tw => tw.startTime === window.startTime && tw.endTime === window.endTime)) {
                update = true;
            }
        });

        if (update) {
            setOneTimeMeetingWindows({
                date,
                timeWindows
            });
        }

    }, [date, timeWindows, currentData, setOneTimeMeetingWindows]);

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
        <fieldset className="sub-fieldset">
            <legend>Looking for a one-time meeting on a specific date:</legend>
            <label htmlFor="once-date">Date:</label>
            <input 
                type="date" 
                id="once-date" 
                name="once-date" 
                placeholder="yyyy-mm-dd" 
                min={minDate}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                aria-describedby='date-validator'
            />
            <ol>
                {timeWindows.map((window, i) => 
                    <OneTimeMeetingTimeWindow 
                        key={i}
                        index={i}
                        initialData={window}
                        updateTimeWindows={updateTimeWindows}
                        removeTimeWindow={removeTimeWindow}
                    />) 
                }
            </ol>
           <button type="button" onClick={addTimeWindow}>Add another time window on this date</button>
        </fieldset>
    );
}

export default OneTimeMeetingForm;