import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import UserContext from '../contexts/UserContext';
import StaticMap from '../StaticMap/StaticMap';
import STORE from '../STORE';
import HowlPageDogProfile from '../HowlPageDogProfile/HowlPageDogProfile';
import TimeWindow from '../TimeWindow/TimeWindow';
import './HowlPageView.css';
import HowlPageUserButtons from '../HowlPageUserButtons/HowlPageUserButtons';
import CreateHowl from '../CreateHowl/CreateHowl';

const HowlPageView  = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [props]);

    const context = useContext(UserContext);

    const { howl_id } = props.match.params;

    const [showEdit, setShowEdit] = useState(false);

    const howl = context.howls.find(howl => howl.id === howl_id);

    let user;

    if (howl) {
        user = STORE.users.find(user => user.id === howl.user_id);
    }

    let howlDateTime;
    
    if (howl) {
        if (howl.meeting_type === 'once') {
            howlDateTime = (            
                <div className='HowlPageView__time-list'>
                    <p>Date: {moment(howl.one_time_windows.date).format("dddd, MMMM Do, YYYY")}</p>
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
            );
        } else {
            howlDateTime = (
                <div className='HowlPageView__time-list'>
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
        }
    }

    if (!howl) {
        return (
            <>
                <header>
                    <h1>Howl not found</h1>
                </header>
                <p>Looks likes something went wrong and the howl could not be found.</p>
                <p>Check the address and try again.</p>
            </>
        );
    }

    return (
        <>
            <header className='HowlPageView__header'>
                <h1>{howl.howl_title}</h1>
                <HowlPageUserButtons howl={howl} setShowEdit={setShowEdit} />
            </header>
            {showEdit && <CreateHowl howl={howl} suffix='-edit' setShowEdit={setShowEdit} />}
            <section className='HowlPageView__section section'>
                <header>
                    <h2>About this howl:</h2>
                </header>
                <p>{howl.personal_message}</p>
            </section>
            <section className='HowlPageView__section section'>
                <header>
                    <h2>Availability</h2>
                </header>
                {howlDateTime}
            </section>
            <section className='HowlPageView__section section'>
                <header>
                    <h2>Location</h2>
                </header>
                <div className='HowlPageView__address'>
                    <p>{howl.location.address}</p>
                    <p>{howl.location.city}</p>
                    <p>{howl.location.state}{', '}{howl.location.zipcode}</p>
                </div>
                {howl.location.lat && howl.location.lon 
                    ? 
                        <StaticMap 
                            lat={howl.location.lat}
                            lon={howl.location.lon}
                        />
                    : <p>Map not available for this location.</p>
                }
            </section>
            <section className='HowlPageView__section section'>
                <header>
                    <h2>Contact info for {user.username}</h2>
                </header>
                <p>Phone: {user.phone || '(Not given.)'}</p>
                <p>Email: {user.email}</p>
            </section>
            <section className='HowlPageView__section section'>
                <header>
                    <h2>Dogs in this howl</h2>
                </header>
                <ul className='HowlPageView__dog-list'>
                    {howl.dog_ids
                        .map(id => context.allDogs.find(dog => dog.id === id))
                        .map(dog_profile => 
                            <HowlPageDogProfile 
                                key={dog_profile.id} 
                                dog_profile={dog_profile} 
                            />
                        )
                    }
                </ul>
            </section>
        </>
    );
}

export default HowlPageView;