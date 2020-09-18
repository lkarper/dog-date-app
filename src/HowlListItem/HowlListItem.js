import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import TimeWindow from '../TimeWindow/TimeWindow';
import './HowlListItem.css';

const HowlListItem = (props) => {
    const { howl } = props;

    if (!howl.id) {
        return (
            <li 
                className='HowlListItem__li error'
            >
                <p>
                    Error: Could not load howl. Check your connection and the URL and try again.
                </p>
            </li>
        );
    } else { 

        // The date and time display will differ depending on whether the howl is a one-time or recurring event
        const howlDateTime = howl.meeting_type === 'once'
            ?
                (            
                    <div>
                        <h4>One-time playdate</h4>
                        <p
                            className='HowlListItem__date'
                        >
                            {moment(howl.date).format("dddd, MMMM Do, YYYY")}
                        </p>
                        <p>Available during the following times:</p>
                        <ul>
                            {howl.time_windows
                                .sort((a, b) => parseInt(a.start_time.split(':')[0]) - parseInt(b.start_time.split(':')[0]))
                                .map((window, i) => (
                                    <li key={i}>
                                        <TimeWindow 
                                            startTime={window.start_time}
                                            endTime={window.end_time}
                                        />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                )
            :
                (
                    <div>
                        <h4>Recurring playdate</h4>
                        <ul>
                            {howl.time_windows.map((window, i) => (
                                <li key={i}>
                                    <p>{window.day_of_week}</p>
                                    <TimeWindow
                                        startTime={window.start_time}
                                        endTime={window.end_time}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                );

        return (
            <li className='HowlListItem__li'>
                <h3 className='HowlListItem__h3'>
                    <Link
                        className='link'
                        to={`/howls/${howl.id}`}
                    >
                        {howl.howl_title}
                    </Link>
                </h3>
                <div
                    className='HowlListItem__photo-div'
                >
                    {howl.dogs
                        .map(dog => {
                            if (dog.profile.profile_img_url) {
                                return (
                                    <img
                                        key={dog.dog_id}
                                        className='HowlListItem__img' 
                                        src={dog.profile.profile_img_url} 
                                        alt={`Avatar of the dog named ${dog.profile.name}.`} 
                                    />
                                );
                            }
                            return (
                                <img
                                    key={dog.dog_id}
                                    className='HowlListItem__img' 
                                    src='/images/photo_not_available.png'
                                    alt={`Avatar of the dog named ${dog.profile.name} not available.`} 
                                />
                            );
                        })
                    }
                </div>
                {howlDateTime}
                <h4>Location</h4>
                <ul>
                    <li className='HowlListItem__location-li'>{howl.location.address}</li>
                    <li className='HowlListItem__location-li'>{howl.location.city}, {howl.location.state}{' '}{howl.location.zipcode}</li>
                </ul>
            </li>
        );
    }
}

HowlListItem.defaultProps = {
    howl: {
        date: '',
        dogs: [],
        howl_title: '',
        id: '',
        location: {
            address: '',
            city: '',
            lat: '',
            lon: '',
            state: '',
            zipcode: '',
        },
        meeting_type: '',
        personal_message: '',
        time_windows: [],
        user_id: '',
    },
};

HowlListItem.propTypes = {
    howl: PropTypes.shape({
        date: PropTypes.string,
        dogs: PropTypes.arrayOf(PropTypes.object),
        howl_title: PropTypes.string,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        location: PropTypes.shape({
            address: PropTypes.string,
            city: PropTypes.string,
            lat: PropTypes.string,
            lon: PropTypes.string,
            state: PropTypes.string,
            zipcode: PropTypes.string,
        }),
        meeting_type: PropTypes.string,
        personal_message: PropTypes.string,
        time_windows: PropTypes.arrayOf(PropTypes.object),
        user_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
};

export default HowlListItem;
