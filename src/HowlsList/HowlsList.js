import React, { useContext, useState, useEffect } from 'react';
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
                })
                return includeHowl;
            });
        } 
        if (typeOfMeetingP) {
            filteredHowls = filteredHowls.filter(howl => howl.meeting_type === typeOfMeetingP);
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