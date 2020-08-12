import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import UserContext from '../contexts/UserContext';
import { Link } from 'react-router-dom';
import HowlListItem from '../HowlListItem/HowlListItem';
import { calculateAverageWithArrayOfReviews } from '../DogAverageRating/DogAverageRating';
import HowlsPageFilterForm from '../HowlsPageFilterForm/HowlsPageFilterForm';
import './HowlsList.css';

const HowlsList = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [props]);

    const context = useContext(UserContext);

    const [howls, setHowls] = useState(context.howls);
    const [stateP, setStateP] = useState('');
    const [zipcodeP, setZipcodeP] = useState('');
    const [ratingFilterP, setRatingFilterP] = useState('');
    const [typeOfMeetingP, setTypeOfMeetingP] = useState('');
    const [daysOfWeekP, setDaysOfWeekP] = useState([]);
    const [recurringMeetingWindowsP, setRecurringMeetingWindowsP] = useState([]);
    const [dateP, setDateP]= useState('');
    const [timeWindowsP, setTimeWindowsP] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        let filteredHowls = [...context.howls];
        if (stateP) {
            filteredHowls = filteredHowls.filter(howl => howl.location.state === stateP);
        }
        if (zipcodeP) {
            filteredHowls = filteredHowls.filter(howl => howl.location.zipcode === zipcodeP);
        }
        if (ratingFilterP) {
            const arrayOfPassingDogIds = filteredHowls
                .map(howl => howl.dog_ids)
                .flat()
                .map(dog_id => 
                    context.reviews
                        .filter(review => review.dog_id === dog_id)
                )
                .filter(arrayOfReviews => 
                    calculateAverageWithArrayOfReviews(arrayOfReviews) >= parseInt(ratingFilterP)
                )
                .map(arrayOfReviews => arrayOfReviews[0].dog_id);
            filteredHowls = filteredHowls.filter(howl => {
                let includeHowl = false;
                arrayOfPassingDogIds.forEach(passing_id => {
                    if (howl.dog_ids.includes(passing_id)) {
                        includeHowl = true;
                    }
                });
                return includeHowl;
            });
        } 
        if (typeOfMeetingP) {
            filteredHowls = filteredHowls.filter(howl => howl.meeting_type === typeOfMeetingP);
        }
        if (daysOfWeekP.length !== 0) {
            filteredHowls = filteredHowls.filter(howl => {
                if (howl.meeting_type === 'recurring') {
                    let includeHowl = false;
                    howl.recurring_windows.forEach(window => {
                        if (daysOfWeekP.includes(window.dayOfWeek)) {
                            includeHowl = true;
                        }
                    });
                    return includeHowl;
                } else {
                    return daysOfWeekP.includes(moment(howl.one_time_windows.date).format("dddd"));
                }
            });
        }
        if (daysOfWeekP.length !== 0 && recurringMeetingWindowsP.length !== 0) {
            filteredHowls = filteredHowls.filter(howl => {
                if (howl.meeting_type === 'once') {
                    let includeHowl = false;
                    const day = moment(howl.one_time_windows.date).format("dddd");
                    if (daysOfWeekP.includes(day)) {
                        if (!recurringMeetingWindowsP.find(win => win[Object.keys(win)[0]].dayOfWeek === day)) {
                            includeHowl = true;
                        }
                        howl.one_time_windows.timeWindows.forEach(window => {
                            recurringMeetingWindowsP.forEach(win => {
                                const windowP = win[Object.keys(win)[0]];
                                if (windowP.dayOfWeek === day) {
                                    if ((window.endTime >= windowP.startTime && window.startTime <= windowP.startTime) || 
                                        (window.startTime <= windowP.endTime && window.endTime >= windowP.endTime) ||
                                        (window.startTime >= windowP.startTime && window.endTime <= windowP.endTime)) {
                                            includeHowl = true;
                                    }
                                }
                            });    
                        });
                    }
                    return includeHowl;
                } else {
                    let includeHowl = false;
                    howl.recurring_windows.forEach(window => {
                        if (daysOfWeekP.includes(window.dayOfWeek)) {
                            let found = false;
                            recurringMeetingWindowsP.forEach(win => {
                                if (win[Object.keys(win)[0]].dayOfWeek === window.dayOfWeek) {
                                    found = true;
                                }
                            });
                            if (found) {
                                recurringMeetingWindowsP.forEach(win => {
                                    const windowP = win[Object.keys(win)[0]];
                                    if (windowP.dayOfWeek === window.dayOfWeek) {
                                        if ((window.endTime >= windowP.startTime && window.startTime <= windowP.startTime) || 
                                            (window.startTime <= windowP.endTime && window.endTime >= windowP.endTime) ||
                                            (window.startTime >= windowP.startTime && window.endTime <= windowP.endTime)) {
                                                includeHowl = true;
                                        }
                                    }
                                });    
                            } else {
                                includeHowl = true;
                            }
                        }
                    });
                    return includeHowl;
                }
            });
        }
        if (dateP) {
            filteredHowls = filteredHowls.filter(howl => {
                if (howl.meeting_type === 'once') {
                    return howl.one_time_windows.date === dateP;
                } else {
                    let includeHowl = false;
                    howl.recurring_windows.forEach(window => {
                        if (moment(dateP).format("dddd") === window.dayOfWeek) {
                            includeHowl = true;
                        }
                    });
                    return includeHowl;
                }
            });
        }
        if (dateP && timeWindowsP.length !== 0) {
            filteredHowls = filteredHowls.filter(howl => {
                if (howl.meeting_type === 'once') {
                    let includeHowl = false;
                    if (howl.one_time_windows.date === dateP) {
                        howl.one_time_windows.timeWindows.forEach(window => {
                            timeWindowsP.forEach(windowP => {
                                if ((window.endTime >= windowP.startTime && window.startTime <= windowP.startTime) || 
                                    (window.startTime <= windowP.endTime && window.endTime >= windowP.endTime) ||
                                    (window.startTime >= windowP.startTime && window.endTime <= windowP.endTime)) {
                                        includeHowl = true;
                                    }
                            });    
                        });
                    }
                    return includeHowl;
                } else {
                    let includeHowl = false;
                    howl.recurring_windows.forEach(window => {
                        if (moment(dateP).format("dddd") === window.dayOfWeek) {
                            timeWindowsP.forEach(windowP => {
                                if ((window.endTime >= windowP.startTime && window.startTime <= windowP.startTime) || 
                                    (window.startTime <= windowP.endTime && window.endTime >= windowP.endTime) ||
                                    (window.startTime >= windowP.startTime && window.endTime <= windowP.endTime)) {
                                        includeHowl = true;
                                    }
                            });    
                        }
                    });
                    return includeHowl;
                }
            });
        }
        setHowls(filteredHowls);
    }

    return (
        <>
            <header className='HowlsList__header'>
                <h1
                    className='HowlsList__h1'
                >
                    What are people howling about?
                </h1>
                <Link
                    className='HowlsList__create-link'
                    to='/create-howl'    
                >
                    Start howling yourself!
                </Link>
            </header> 
            <HowlsPageFilterForm 
                data={{
                    stateP,
                    setStateP,
                    zipcodeP,
                    setZipcodeP,
                    ratingFilterP,
                    setRatingFilterP,
                    typeOfMeetingP,
                    setTypeOfMeetingP,
                    daysOfWeekP,
                    setDaysOfWeekP,
                    dateP,
                    setDateP,
                    timeWindowsP,
                    setTimeWindowsP,
                    recurringMeetingWindowsP,
                    setRecurringMeetingWindowsP,
                    handleSubmit,
                }}
            />
            <section className='HowlsList__section section'>
                <header>
                    <h2>Dogs howling for a playmate</h2>
                </header>
                <div role='alert'>
                    <p>Now showing {howls.length} {howls.length === 1 ? 'howl' : 'howls'}</p>
                    {howls.length === 0 
                        ?
                            <p>No howls found that match those search criteria.  Adust your parameters and try again.</p>
                        :
                            <ol className='HowlsList__list'>
                                {howls.map(howl => <HowlListItem key={howl.id} howl={howl} />)}
                            </ol>
                    }
                </div>
            </section>
        </>
    );
}

export default HowlsList;