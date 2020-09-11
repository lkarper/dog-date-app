import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import TimeWindow from '../TimeWindow/TimeWindow';
import './HowlListItem.css';

const HowlListItem = (props) => {

    const { howl } = props;

    const howlDateTime = howl.meeting_type === 'once'
        ?
            (            
                <div>
                    <h4>One-time playdate</h4>
                    <p
                        className='HowlListItem__date'
                    >{moment(howl.date).format("dddd, MMMM Do, YYYY")}</p>
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
                            ))}
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

export default HowlListItem;
