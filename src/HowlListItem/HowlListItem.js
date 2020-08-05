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
                    >{moment(howl.one_time_windows.date).format("dddd, MMMM Do, YYYY")}</p>
                    <p>Available during the following times:</p>
                    <ul>
                        {howl.one_time_windows.timeWindows
                            .sort((a,b) => parseInt(a.startTime.split(':')[0]) - parseInt(b.startTime.split(':')[0]))
                            .map((window, i) => (
                                <li key={i}>
                                    <TimeWindow 
                                        startTime={window.startTime}
                                        endTime={window.endTime}
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
                        {howl.recurring_windows.map((window, i) => (
                            <li key={i}>
                                <p>{window.dayOfWeek}</p>
                                <TimeWindow
                                    startTime={window.startTime}
                                    endTime={window.endTime}
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