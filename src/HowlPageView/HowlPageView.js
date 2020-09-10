import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import UserContext from '../contexts/UserContext';
import StaticMap from '../StaticMap/StaticMap';
import HowlPageDogProfile from '../HowlPageDogProfile/HowlPageDogProfile';
import TimeWindow from '../TimeWindow/TimeWindow';
import './HowlPageView.css';
import HowlPageUserButtons from '../HowlPageUserButtons/HowlPageUserButtons';
import CreateHowl from '../CreateHowl/CreateHowl';
import HowlsService from '../services/howls-service';

const HowlPageView  = (props) => {

    const context = useContext(UserContext);

    const { user } = context;

    const { howl_id } = props.match.params;

    const [showEdit, setShowEdit] = useState(false);
    const [howl, setHowl] = useState();
    const [howlNotFound, setHowlNotFound] = useState(false);
    const [update, setUpdate] = useState(null);

    useEffect(() => {
        if (!showEdit) {
            window.scrollTo(0, 0);
        }
    }, [showEdit]);

    useEffect(() => {
        window.scrollTo(0, 0);
        HowlsService.getHowlById(howl_id)
            .then(howl => {
                setHowl(howl);
            })
            .catch(error => {
                console.log(error);
                setHowlNotFound(true);
            })
    }, [props, howl_id, setHowl, setHowlNotFound, update]);

    let howlDateTime;
    
    if (howl) {
        if (howl.meeting_type === 'once') {
            howlDateTime = (            
                <div className='HowlPageView__time-list'>
                    <p>Date: {moment(howl.date).format("dddd, MMMM Do, YYYY")}</p>
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
            );
        } else {
            howlDateTime = (
                <div className='HowlPageView__time-list'>
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
        }
    }

    if (howlNotFound) {
        return (
            <section
                className='HowlPageView__section section'
            >
                <header>
                    <h1>Howl not found</h1>
                </header>
                <p>Looks likes something went wrong.</p>
                <p>Check the address and try again.</p>
            </section>
        );
    }

    if (howl) {
        return (
            <section 
                className='HowlPageView__outer-section'
                aria-live='polite'
            >
                <header>
                    <h1>Look Who's Howling</h1>
                </header>
                <section
                    className='HowlPageView__section section'
                >
                    <header className='HowlPageView__header'>
                        <h2>{howl.howl_title}</h2>
                        <p>{howl.personal_message}</p>
                        <HowlPageUserButtons 
                            howl={howl} 
                            showEdit={showEdit}
                            setShowEdit={setShowEdit} 
                        />
                    </header>
                </section>
                <div
                    className='HowlPageView__edit-div'
                    aria-live='polite'
                >
                    {showEdit && 
                        <CreateHowl 
                            howl={howl} 
                            suffix='edit' 
                            setShowEdit={setShowEdit} 
                            forceUpdate={setUpdate}
                        />
                    }
                </div>
                {!showEdit && 
                    <>
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
                            {(howl.location.lat && howl.location.lon ) && (howl.location.lat !== '0' && howl.location.lon !== '0') 
                                ? 
                                    <StaticMap 
                                        lat={howl.location.lat}
                                        lon={howl.location.lon}
                                    />
                                : <p>Map not available for this location.</p>
                            }
                        </section>
                        <section 
                            className='HowlPageView__section section'
                        >
                            <header
                                className='HowlPageView__header'
                            >
                                <h2>About the Howler</h2>
                            </header>
                            <ul
                                className='HowlPageView__contact-info-ul'
                            >
                                <li>
                                    <p>Username: {user.username}</p>
                                </li>
                                <li>
                                    <p>Phone: {user.phone || '(Not given.)'}</p>
                                </li>
                                <li>
                                    <p>Email:{' '} 
                                        <a
                                            className='link'
                                            target='_blank'
                                            rel="noopener noreferrer"
                                            href={`mailto:${user.email}`}
                                        >
                                            {user.email}
                                        </a>
                                    </p>
                                </li>
                            </ul>
                        </section>
                        <section 
                            className='HowlPageView__section section'
                            aria-live='polite'    
                        >
                            <header>
                                <h2>Dogs in this howl</h2>
                            </header>
                            {howl.dogs.length !== 0
                                ? 
                                    <ul className='HowlPageView__dog-list'>
                                        {howl.dogs
                                            .map(dog =>
                                                <HowlPageDogProfile 
                                                    key={dog.dog_id}
                                                    dog_id={dog.dog_id} 
                                                    dog_profile={dog.profile}
                                                    owner={dog.owner} 
                                                />
                                            )
                                        }
                                    </ul>
                                :
                                    <p>No dogs listed for this howl.</p>
                            }
                        </section>
                    </>
                }
            </section>
        );
    }

    return (
        <section aria-live='polite'>
            <p>Loading...</p>
        </section>
    );
}

export default HowlPageView;
