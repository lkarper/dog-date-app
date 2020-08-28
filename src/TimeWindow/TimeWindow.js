import React from 'react';

const TimeWindow = (props) => {

    const { startTime, endTime } = props;

    const displayStart = `${(parseInt(startTime.split(':')[0]) + 11) % 12 + 1}:${startTime.split(':')[1]} ${parseInt(startTime.split(':')[0]) >= 12 ? 'pm' : 'am'}`;
    const displayEnd = `${(parseInt(endTime.split(':')[0]) + 11) % 12 + 1}:${endTime.split(':')[1]} ${endTime.split(':')[0] >= 12 ? 'pm' : 'am'}`;

    return <p>{displayStart}{' - '}{displayEnd}</p>;
}

export default TimeWindow;
