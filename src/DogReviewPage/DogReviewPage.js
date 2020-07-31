import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import UserContext from '../contexts/UserContext';
import DogReviewForm from '../DogReviewForm/DogReviewForm';
import DogListView from '../DogListView/DogListView';

const DogReviewPage = (props) => {

    const { dog_id } = props.match.params;

    const context = useContext(UserContext);

    const dog = context.allDogs.find(dog => dog.id === dog_id);

    const [friendlinessDogsP, setFriendlinessDogsP] = useState('');
    const [friendlinessPeopleP, setFriendlinessPeopleP] = useState('');
    const [playingInterestP, setPlayingInterestP] = useState('');
    const [obedienceP, setObedienceP] = useState('');
    const [profileAccuracyP, setProfileAccuracyP] = useState('');
    const [locationSuitabilityP, setLocationSuitabilityP] = useState('');
    const [coordinatesP, setCoordinatesP] = useState({});
    const [locationP, setLocationP] = useState({
        address: '',
        city: '',
        state: '',
        zipcode: '',
    });
    const [personalMessageP, setPersonalMessageP] = useState('');
    const [whenP, setWhenP] = useState({
        date: '',
        startTime: '',
        endTime: '',
    });
    const [reviewAdded, setReviewAdded] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newReview = {
            id: uuidv4(),
            date_created: new Date().toJSON(),
            dog_id,
            reviewer: context.user.username,
            friendliness_dogs: parseInt(friendlinessDogsP),
            friendliness_people: parseInt(friendlinessPeopleP),
            playing_interest: parseInt(playingInterestP),
            obedience: parseInt(obedienceP),
            profile_accuracy: parseInt(profileAccuracyP),
            location_suitability: parseInt(locationSuitabilityP),
            location: {
                ...locationP,
                ...coordinatesP,
            },
            when: whenP,
            personal_message: personalMessageP
        };
        context.addReview(newReview);
        setReviewAdded(true);
        // What to do when review has been added?
    }

    if (!dog) {
        const pack = context.packMembers.map(pm => 
            context.allDogs.find(dog => 
                dog.id === pm.pack_member_id)
            );

        return (
            <section>
                <header>
                    <h2>Dog not found</h2>
                </header>
                <p>We couldn't find the dog that you're attempting to review.</p>
                {pack.length 
                ?             
                    <div>
                        <h3>Would you like to review one of your pack members?</h3>
                        <ul>
                            {pack.map(dog => 
                                <div key={dog.id}>
                                    <DogListView dog={dog} />
                                    <Link to={`/leave-review/${dog.id}`}>Click here to review {dog.name}</Link>
                                </div>
                            )}
                        </ul>
                    </div>
                :
                    <Link>Search for dogs</Link>
            }
            </section>
        );
    }

    return (
        <section>
            <header>
                <h2>Use this form to leave a review of {dog.name}</h2>
            </header>
            <DogReviewForm
                dogName={dog.name}
                friendlinessDogsP={friendlinessDogsP}
                setFriendlinessDogsP={setFriendlinessDogsP}
                friendlinessPeopleP={friendlinessPeopleP}
                setFriendlinessPeopleP={setFriendlinessPeopleP}
                playingInterestP={playingInterestP}
                setPlayingInterestP={setPlayingInterestP}
                obedienceP={obedienceP}
                setObedienceP={setObedienceP}
                profileAccuracyP={profileAccuracyP}
                setProfileAccuracyP={setProfileAccuracyP}
                locationSuitabilityP={locationSuitabilityP}
                setLocationSuitabilityP={setLocationSuitabilityP}
                coordinatesP={coordinatesP}
                setCoordinatesP={setCoordinatesP}
                locationP={locationP}
                setLocationP={setLocationP}
                personalMessageP={personalMessageP}
                setPersonalMessageP={setPersonalMessageP}
                whenP={whenP}
                setWhenP={setWhenP}
                handleSubmit={handleSubmit}
            />
        </section>
    );
}

export default DogReviewPage;