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
                    to={`/howls/${howl.id}`}
                >
                    {howl.howl_title}
                </Link>
            </h3>
            {howlDateTime}
            <h4>Location</h4>
            <ul>
                <li className='HowlListItem__location-li'>{howl.location.address}</li>
                <li className='HowlListItem__location-li'>{howl.location.city}, {howl.location.state}{' '}{howl.location.zipcode}</li>
            </ul>
            {/* {Add number of dogs interested here} */}
        </li>
    );
}

export default HowlListItem;
