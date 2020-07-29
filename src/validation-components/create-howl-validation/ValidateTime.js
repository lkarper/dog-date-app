import React, { useEffect } from 'react';

const ValidateTime = (props) => {
    const { 
        meetingType, 
        oneTimeMeetingWindows, 
        recurringMeetingWindows, 
        timeError, 
        setTimeError 
    } = props;

    useEffect(() => {
        if (meetingType === 'once') {
            if (!oneTimeMeetingWindows.date) {
                setTimeError(true);
            } else {
                setTimeError(false);
                oneTimeMeetingWindows.timeWindows.forEach(window => {
                    if (!window.startTime || !window.endTime) {
                        setTimeError(true);
                    }
                });
            }
        } else {
            setTimeError(false);
            recurringMeetingWindows.forEach(window => {
                if (!window.dayOfWeek || !window.startTime || !window.endTime) {
                    setTimeError(true);
                }
            });
        }
    }, [meetingType, oneTimeMeetingWindows, recurringMeetingWindows, setTimeError]);

    if (meetingType === 'once') {
        return (
            <div>
                <p
                    id={`date-validator`}
                >{oneTimeMeetingWindows.date ? 'Date set' : 'You must select a date'}</p>
                <ol>
                    {oneTimeMeetingWindows.timeWindows.map((window, i) =>
                        <li key={i}>
                            <p 
                                id={`start-time-validator-${i + 1}`}
                            >
                                {
                                    window.startTime 
                                    ? `Start time ${i + 1} set` 
                                    : `You must set start time ${i + 1}`
                                }
                            </p>
                            <p 
                                id={`end-time-validator-${i + 1}`}
                            >
                                {
                                    window.endTime 
                                    ? `End time ${i + 1} set` 
                                    : `You must set end time ${i + 1}`
                                }
                            </p>
                        </li>
                    )}
                </ol>
            </div>
        );
    } else {
        return (
            <div>
                <ol>
                    {recurringMeetingWindows.map((window, i) =>
                        <li key={i}>
                            <p
                                id={`day-validator-${i + 1}`}
                            >
                                {
                                    window.dayOfWeek 
                                    ? `Day ${i + 1} set`
                                    : `You must set day ${i + 1}`
                                }
                            </p>
                            <p 
                                id={`start-time-validator-${i + 1}`}
                            >
                                {
                                    window.startTime 
                                    ? `Start time ${i + 1} set` 
                                    : `You must set start time ${i + 1}`
                                }
                            </p>
                            <p 
                                id={`end-time-validator-${i + 1}`}
                            >
                                {
                                    window.endTime 
                                    ? `End time ${i + 1} set` 
                                    : `You must set End time ${i + 1}`
                                }
                            </p>
                        </li>
                    )}
                </ol>
            </div>
        );
    }
}

export default ValidateTime;