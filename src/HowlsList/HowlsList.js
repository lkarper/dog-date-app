import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import HowlListItem from '../HowlListItem/HowlListItem';
import HowlsPageFilterForm from '../HowlsPageFilterForm/HowlsPageFilterForm';
import HowlsService from '../services/howls-service';
import './HowlsList.css';

const HowlsList = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [props]);

    const [howls, setHowls] = useState([]);
    const [searched, setSearched] = useState(false);
    const [stateP, setStateP] = useState('');
    const [zipcodeP, setZipcodeP] = useState('');
    const [ratingFilterP, setRatingFilterP] = useState('');
    const [typeOfMeetingP, setTypeOfMeetingP] = useState('');
    const [daysOfWeekP, setDaysOfWeekP] = useState([]);
    const [recurringMeetingWindowsP, setRecurringMeetingWindowsP] = useState([]);
    const [dateP, setDateP]= useState('');
    const [timeWindowsP, setTimeWindowsP] = useState([]);
    const [apiError, setApiError] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setApiError(false);
        setShowLoading(true);

        // Create query string that will be used to search howls in database
        const queryParams = [];
        if (stateP) {
            queryParams.push(`state=${stateP}`);
        }
        if (zipcodeP) {
            queryParams.push(`zipcode=${zipcodeP}`);
        }
        if (ratingFilterP) {
            queryParams.push(`rating_filter=${ratingFilterP}`);
        } 
        if (typeOfMeetingP) {
            queryParams.push(`type_of_meeting=${typeOfMeetingP}`)
        }
        if (daysOfWeekP.length !== 0) {
            queryParams.push(`days_of_week=${daysOfWeekP.join('|')}`);
        }
        if (daysOfWeekP.length !== 0 && recurringMeetingWindowsP.length !== 0) {
            const recurringMeetingString = recurringMeetingWindowsP
                .map(win => `${Object.keys(win)[0]},${win[Object.keys(win)[0]].dayOfWeek},${win[Object.keys(win)[0]].startTime},${win[Object.keys(win)[0]].endTime}`)
                .join('|');
            queryParams.push(`recurring_meeting_windows=${recurringMeetingString}`)
        }
        if (dateP) {
            queryParams.push(`date=${dateP}`);
        }
        if (dateP && timeWindowsP.length !== 0) {
            const timeWindowsString = timeWindowsP
                .map(win => `${win.startTime},${win.endTime}`)
                .join('|');
            queryParams.push(`time_windows=${timeWindowsString}`);
        }
        const queryString = queryParams.join('&');
        HowlsService.searchHowls(queryString)
            .then(howls => {
                setShowLoading(false);
                setSearched(true);
                setHowls(howls);
                window.scrollTo(0, document.querySelector('.HowlsList__results-div').offsetTop - document.querySelector('.Header__header').offsetHeight);
            })
            .catch(error => {
                console.log(error);
                setShowLoading(false);
                setSearched(true);
                setApiError(true);
                window.scrollTo(0, document.querySelector('.HowlsList__results-div').offsetTop - document.querySelector('.Header__header').offsetHeight);
            });
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
            <div
                className='HowlsList__results-div' 
                role='alert'
            >
                {searched && 
                    <section className='HowlsList__section section'>
                        {!apiError && 
                            <header>
                                <h2>Dogs howling for a playmate</h2>
                            </header>
                        }
                        {apiError &&
                                <>
                                    <h2>Error</h2>
                                    <p>Looks like something went wrong.  Check your connection and try again.</p>
                                </>
                        }
                        {!apiError && 
                            <p
                                className='HowlsList__num-results'
                            >
                                Now showing <b>{howls.length}</b> {howls.length === 1 ? 'howl' : 'howls'}
                            </p>
                        }
                        {howls.length === 0 
                            ?
                                <p>No howls found that match those search criteria. Adjust your parameters and try again.</p>
                            :
                                <ol className='HowlsList__list'>
                                    {howls.map(howl => 
                                        <HowlListItem 
                                            key={howl.id} 
                                            howl={howl} 
                                        />
                                    )}
                                </ol>
                        }
                    </section>
                }
            </div>
            {showLoading && 
                <div className='HowlsList__loading-container'>
                    <FontAwesomeIcon 
                        className='HowlsList__loading' 
                        icon={faSpinner} 
                        spin 
                    />
                </div>
            }
        </>
    );
}

export default HowlsList;
