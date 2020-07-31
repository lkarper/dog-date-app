import React, { useState } from 'react';
import DogReviewForm from '../DogReviewForm/DogReviewForm';

const DogReviewPage = (props) => {
    const { dog_id } = props.match.params;

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

    return (
        <section>
            <header>
                <h2>Use this form to leave a review of Seymour</h2>
            </header>
            <DogReviewForm
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
            />
        </section>
    )
}

export default DogReviewPage;