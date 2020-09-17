import React from 'react';
import PropTypes from 'prop-types';

const TimeWindow = (props) => {

    const { 
        startTime, 
        endTime 
    } = props;

    if (!startTime || !endTime) {
        return (
            <p
                className='error'
            >
                Error: Start or end time missing.
            </p>
        );
    } else {
        const displayStart = `${(parseInt(startTime.split(':')[0]) + 11) % 12 + 1}:${startTime.split(':')[1]} ${parseInt(startTime.split(':')[0]) >= 12 ? 'pm' : 'am'}`;
        const displayEnd = `${(parseInt(endTime.split(':')[0]) + 11) % 12 + 1}:${endTime.split(':')[1]} ${endTime.split(':')[0] >= 12 ? 'pm' : 'am'}`;

        return <p>{displayStart}{' - '}{displayEnd}</p>;
    }
}

TimeWindow.defaultProps = {
    startTime: '',
    endTime: '',
};

TimeWindow.propTypes = {
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
}

export default TimeWindow;
