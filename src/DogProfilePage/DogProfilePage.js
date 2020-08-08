import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import DogProfileCharacteristics from '../DogProfileCharacteristics/DogProfileCharacteristics';
import HowlListItem from '../HowlListItem/HowlListItem';
import DogProfilePageHeaderButtons from '../DogProfilePageHeaderButtons/DogProfilePageHeaderButtons';
import DogReviewListItem from '../DogReviewListItem/DogReviewListItem';
import DogAverageRating from '../DogAverageRating/DogAverageRating';
import './DogProfilePage.css';

const DogProfilePage = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [props]);

    const context = useContext(UserContext);

    const { id } = props.match.params;
    const dog_profile = context.allDogs.find(profile => profile.id === id);

    if (dog_profile) {
        const howlsBy = context.howls.filter(howl => howl.dog_ids.includes(id));
        const reviews = context.reviews.filter(review => review.dog_id === id);

        return (
            <>
                <header className='DogProfilePage__header'>
                    <h1>{dog_profile.name}</h1>
                    <img 
                        className='DogProfilePage__profile-img'
                        src={dog_profile.profile_img_url}
                        alt={`Avatar for the dog named ${dog_profile.name}.`} 
                    />
                    <DogProfilePageHeaderButtons 
                        dog_profile={dog_profile}
                    />
                </header>
                <section className='DogProfilePage__about-section'>
                    <header className='DogProfilePage__header'>
                        <h2>About {dog_profile.name}</h2>
                    </header>
                    <p>{dog_profile.owner_description}</p>
                    <p>Age: {dog_profile.age_months ? `${dog_profile.age_years} years, ${dog_profile.age_months}, months` : `${dog_profile.age_years}`}</p>
                    <p>Breed: {dog_profile.breed || `(not listed)`}</p>
                    <p>Weight: {dog_profile.weight ? `${dog_profile.weight} lbs` : `(Not listed)`}</p>
                    <p>Sex: {dog_profile.sex || `(not listed)`}</p>
                </section>
                <section>
                    <header className='DogProfilePage__header'>
                        <h2>Characteristics</h2>
                    </header>
                <DogProfileCharacteristics dog_profile={dog_profile}/>
                </section>
                <section>
                    <header className='DogProfilePage__header'>
                        <h2>Howls about {dog_profile.name}</h2>
                    </header>
                    <ul className='DogProfilePage__howls-list'>
                        {howlsBy.map(howl => <HowlListItem key={howl.id} howl={howl}/>)}
                    </ul>
                </section>
                <section>
                    <header className='DogProfilePage__header'>
                        <h2>Reviews of {dog_profile.name}</h2>
                    </header>
                    {context.user.id === dog_profile.owner_id 
                        ? '' 
                        : <Link to={`/leave-review/${dog_profile.id}`}>Leave your own review of {dog_profile.name}</Link>
                    }
                    {reviews.length 
                        ? 
                            <div>
                                <DogAverageRating 
                                    reviews={reviews}
                                />
                                <ul className='DogProfilePage__reviews-list'>
                                    {reviews.map(review => <DogReviewListItem key={review.id} review={review} />)}
                                </ul>
                            </div>
                        :
                            <p>No reviews of {dog_profile.name} yet.</p>
                }
                </section>
            </>
        );
    }

    return (
        <section className='section'>
            <header>
                <h1>Woof...</h1>
            </header>
            <p>Dog profile not found.  Check the url and try agian.</p>
        </section>
    );
}

export default DogProfilePage;