import React, { useEffect } from 'react';

const ValidateTime = (props) => {
    const { 
        meetingType = '', 
        oneTimeMeetingWindows = {}, 
        recurringMeetingWindows = [], 
        timeWindows = [],
        setTimeError 
    } = props;

    useEffect(() => {
        if (meetingType === 'search') {
            setTimeError(false);
            timeWindows.forEach(window => {
                if (!window.startTime || !window.endTime) {
                    setTimeError(true);
                }
            });
        } else if (meetingType === 'search-recurring') {
            setTimeError(false);
            recurringMeetingWindows.forEach(window => {
                if (!window[Object.keys(window)[0]].startTime || !window[Object.keys(window)[0]].endTime) {
                    setTimeError(true);
                }
            });
        } else if (meetingType === 'once') {
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
    }, [meetingType, timeWindows, oneTimeMeetingWindows, recurringMeetingWindows, setTimeError]);

    if (meetingType === 'search') {
        return (
            <div>
                <ol>
                    {timeWindows.map((window, i) =>
                        <li key={i}>
                            <p
                                className={`ValidateTime__validator ${window.startTime ? 'valid' : 'error'}`} 
                                id={`start-time-validator-${i + 1}`}
                            >
                                {
                                    window.startTime 
                                    ? `Start time ${i + 1} set` 
                                    : `You must set start time ${i + 1}`
                                }
                            </p>
                            <p 
                                className={`ValidateTime__validator ${window.endTime ? 'valid' : 'error'}`} 
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
    } else if (meetingType === 'search-recurring') {
        return (
            <div>
                <ol>
                    {recurringMeetingWindows.map((window, i) =>
                        <li key={[Object.keys(window)[0]]}>
                            <p 
                                className={`ValidateTime__validator ${window[Object.keys(window)[0]].startTime ? 'valid' : 'error'}`} 
                                id={`start-time-validator-${[Object.keys(window)[0]]}`}
                            >
                                {
                                    window[Object.keys(window)[0]].startTime 
                                    ? `Start time ${i + 1} set` 
                                    : `You must set start time ${i + 1}`
                                }
                            </p>
                            <p 
                                className={`ValidateTime__validator ${window[Object.keys(window)[0]].endTime ? 'valid' : 'error'}`}
                                id={`end-time-validator-${[Object.keys(window)[0]]}`}
                            >
                                {
                                    window[Object.keys(window)[0]].endTime 
                                    ? `End time ${i + 1} set` 
                                    : `You must set End time ${i + 1}`
                                }
                            </p>
                        </li>
                    )}
                </ol>
            </div>
        );
    } else if (meetingType === 'once') {
        return (
            <div>
                <p
                    className={`ValidateTime__validator ${oneTimeMeetingWindows.date ? 'valid' : 'error'}`}
                    id={`date-validator`}
                >
                    {oneTimeMeetingWindows.date 
                        ? 'Date set' 
                        : 'You must select a date'
                    }
                </p>
                <ol>
                    {oneTimeMeetingWindows.timeWindows.map((window, i) =>
                        <li key={i}>
                            <p 
                                className={`ValidateTime__validator ${window.startTime ? 'valid' : 'error'}`}
                                id={`start-time-validator-${i + 1}`}
                            >
                                {
                                    window.startTime 
                                    ? `Start time ${i + 1} set` 
                                    : `You must set start time ${i + 1}`
                                }
                            </p>
                            <p 
                                className={`ValidateTime__validator ${window.endTime ? 'valid' : 'error'}`}
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
                                className={`ValidateTime__validator ${window.dayOfWeek ? 'valid' : 'error'}`}
                                id={`day-validator-${i}`}
                            >
                                {
                                    window.dayOfWeek 
                                    ? `Day ${i + 1} set`
                                    : `You must set day ${i + 1}`
                                }
                            </p>
                            <p 
                                className={`ValidateTime__validator ${window.startTime ? 'valid' : 'error'}`}
                                id={`start-time-validator-${i}`}
                            >
                                {
                                    window.startTime 
                                    ? `Start time ${i + 1} set` 
                                    : `You must set start time ${i + 1}`
                                }
                            </p>
                            <p 
                                className={`ValidateTime__validator ${window.endTime ? 'valid' : 'error'}`}
                                id={`end-time-validator-${i}`}
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
