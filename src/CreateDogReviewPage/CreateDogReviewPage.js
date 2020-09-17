import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserContext from '../contexts/UserContext';
import DogReviewForm from '../DogReviewForm/DogReviewForm';
import DogListView from '../DogListView/DogListView';
import DogProfilesService from '../services/dog-profiles-service';
import './CreateDogReviewPage.css';

const CreateDogReviewPage = (props) => {
    const { dog_id } = props.match.params;

    const context = useContext(UserContext);

    const [dog, setDog] = useState();

    useEffect(() => {
        window.scrollTo(0, 0);
        DogProfilesService.fetchDogProfileById(dog_id)
            .then(dog => {
                setDog(dog);
            })
            .catch(error => {
                console.log(error);
                setDog(null);
            })
    }, [props, dog_id]);

    if (dog === null) {
        return (
            <section 
                className='CreateDogReviewPage__section section'
                aria-live='polite'
            >
                <header>
                    <h1>Dog not found</h1>
                </header>
                <p>We couldn't find the dog that you're attempting to review. Check the address and your connection before trying again.</p>
                {context.packMembers.length 
                    ?             
                        <div>
                            <h2>Would you like to review one of your pack members?</h2>
                            <ul>
                                {context.packMembers.map(dog => 
                                    <div key={dog.id}>
                                        <DogListView dog={dog.profile} />
                                        <Link to={`/leave-review/${dog.profile.id}`}>Click here to review {dog.profile.name}</Link>
                                    </div>
                                )}
                            </ul>
                        </div>
                    :
                        '' 
                }
            </section>
        );
    }

    if (dog) {
        return (
            <section 
                className='CreateDogReviewPage__section outer-section'
                aria-live='polite'
            >
                <header>
                    <h1>Use this form to leave a review of {dog.name}</h1>
                </header>
                <DogReviewForm
                    dogName={dog.name}
                    dog_id={dog_id}
                />
            </section>
        );
    }

    if (dog_id === '') {
        return (
            <section 
                className='CreateDogReviewPage__section error'
                aria-live='polite'
            >
                <p>Looks like something went wrong.  Check your connection and the url and try again.</p>
            </section>
        );
    }

    return (
        <section 
            className='CreateDogReviewPage__section'
            aria-live='polite'
        >
            <p>Loading...</p>
        </section>
    );
}

CreateDogReviewPage.defaultProps = {
    match: {
        params: {
            dog_id: '',
        }
    }
};

CreateDogReviewPage.propTypes = {
    match: PropTypes.object,
};

export default CreateDogReviewPage;
