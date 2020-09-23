import React from 'react';
import PropTypes from 'prop-types';

const TimeWindow = (props) => {
    const { 
        startTime, 
        endTime, 
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
        
        // Converts time from 24 hr to 12hr format
        const startTimeHour = (parseInt(startTime.split(':')[0]) + 11) % 12 + 1;
        const startTimeMin = startTime.split(':')[1];
        const startTimeAMPM = parseInt(startTime.split(':')[0]) >= 12 ? 'pm' : 'am';

        const endTimeHour = (parseInt(endTime.split(':')[0]) + 11) % 12 + 1;
        const endTimeMin = endTime.split(':')[1];
        const endTimeAMPM = parseInt(endTime.split(':')[0]) >= 12 ? 'pm' : 'am';

        const displayStart = `${startTimeHour}:${startTimeMin} ${startTimeAMPM}`;
        const displayEnd = `${endTimeHour}:${endTimeMin} ${endTimeAMPM}`;

        return (
            <p
                className='TimeWindow__p'
            >
                {displayStart}{' - '}{displayEnd}
            </p>
        );
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
