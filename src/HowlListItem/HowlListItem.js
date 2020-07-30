import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const HowlListItem = (props) => {

    const { howl } = props;

    const howlDateTime = howl.meeting_type === 'once'
        ?
            (            
                <div>
                    <p>Date: {moment(howl.one_time_windows.date).format("dddd, MMMM Do, YYYY")}</p>
                    <ul>
                        {howl.one_time_windows.timeWindows.map((window, i) => (
                            <li key={i}>
                                <p>Start time: {window.startTime}</p>
                                <p>End time: {window.endTime}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        :
            (
                <div>
                    <ul>
                        {howl.recurring_windows.map((window, i) => (
                            <li key={i}>
                                <p>{window.dayOfWeek}</p>
                                <p>Start time: {window.startTime}</p>
                                <p>End time: {window.endTime}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            );

    return (
        <li>
            <h3>
                <Link
                    to={`/howls/${howl.id}`}
                >
                    {howl.howl_title}
                </Link>
            </h3>
            {howlDateTime}
            <p>Location:</p>
            <ul>
                <li>{howl.location.address}</li>
                <li>{howl.location.city}, {howl.location.state}{' '}{howl.location.zipcode}</li>
            </ul>
            {/* {Add number of dogs interested here} */}
        </li>
    );
}

export default HowlListItem;