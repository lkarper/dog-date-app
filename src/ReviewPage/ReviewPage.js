import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import DogAverageRating from '../DogAverageRating/DogAverageRating';
import DogReviewListItem from '../DogReviewListItem/DogReviewListItem';
import StaticMap from '../StaticMap/StaticMap';
import TimeWindow from '../TimeWindow/TimeWindow';
import ReviewComments from '../ReviewComments/ReviewComments';
import AddCommentForm from '../AddCommentForm/AddCommentForm';
import DogReviewForm from '../DogReviewForm/DogReviewForm';
import './ReviewPage.css';

const ReviewPage = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [props]);

    const context = useContext(UserContext);

    const [showEdit, setShowEdit] = useState(false);

    const { id } = props.match.params;
    const review = context.reviews.find(review => review.id === id);
    
    let dog_profile;
    let reviews;
    let userButtons = <></>;

    const checkRemoveReview = () => {
        const confirmation = window.confirm(`Are you sure that you'd like to delete this review?`);
        if (confirmation) {
            context.removeReview(review.id);
            props.history.push('/home');
        }
    }

    if (review) {

        const { 
            reviewer,
            date_created,
            friendliness_dogs,
            friendliness_people,
            playing_interest,
            obedience,
            profile_accuracy,
            location_suitability,
            location,
            when,
            personal_message,
            dog_id
        } = review;
    
        const averageRating = (
            friendliness_dogs +
            friendliness_people +
            playing_interest +
            obedience +
            profile_accuracy + 
            location_suitability 
        ) / 6;

        dog_profile = context.allDogs.find(dog => dog.id === dog_id);
        reviews = context.reviews.filter(review => review.dog_id === dog_profile.id);
        if (Object.keys(context.user)) {
            if (context.user.username === review.reviewer) {
                userButtons = (
                    <div className='ReviewPage__user-buttons-container'>
                        <button onClick={() => setShowEdit(true)}>Edit</button>
                        <button onClick={checkRemoveReview}>Delete</button>
                    </div>
                );
            }
        }

        return (
            <>
                <header className='ReviewPage__header'>
                    <h1>Review of {dog_profile.name}</h1>
                    <p>Reviewed by: {reviewer}</p>
                    <p>On: {moment(date_created).format("MMMM Do YYYY, h:mm a")}</p>
                    <p>Overall rating: {averageRating.toFixed(2)} stars</p>
                    {userButtons}
                </header>
                <section className='ReviewPage__section section'>
                    {showEdit 
                        ?
                            <section className='ReviewPage__edit-container'>
                                <header>
                                    <h2>Edit your review</h2>
                                </header>
                                <button 
                                    className='ReviewPage__edit-cancel-button'
                                    onClick={() => setShowEdit(false)}
                                >
                                    &#10006;
                                </button>
                                <DogReviewForm 
                                    dogName={dog_profile.name} 
                                    dog_id={dog_profile.id} 
                                    suffix='-edit' 
                                    review={review} 
                                    setShowEdit={setShowEdit} 
                                />
                            </section> 
                        : ''
                    }
                    <header>
                        <h2>About {dog_profile.name}</h2>
                    </header>
                        <ul>
                            <li>Friendliness towards other dogs: {friendliness_dogs}</li>
                            <li>Friendliness towards people: {friendliness_people}</li>
                            <li>Interest in playing: {playing_interest}</li>
                            <li>Obedience: {obedience}</li>
                            <li>Accuracy of profile: {profile_accuracy}</li>
                        </ul>
                        <h3>This is what {reviewer} had to say about {dog_profile.name}</h3>
                        <blockquote>{personal_message}</blockquote>
                </section>
                <section className='ReviewPage__section section'>
                    <header>
                        <h2>About the playdate:</h2>
                    </header>
                    <h3>Location</h3>
                    <p>Location suitabilty for a playdate: {location_suitability}</p>
                    <p>Location: {location.address}, {location.city}, {location.state}{' '}{location.zipcode}</p>
                    {location.lat && location.lon 
                        ?
                            <StaticMap 
                                lat={location.lat}
                                lon={location.lon}
                            />
                        : <p>Sorry, no map available.</p>
                    }
                    <h3>Date and time:</h3> 
                    <p>{moment(when.date).format("dddd, MMMM Do, YYYY")}</p>
                    {<TimeWindow startTime={when.startTime} endTime={when.endTime} />}
                </section>
                <section className='ReviewPage__section section'>
                    <header>
                        <h2>Comments</h2>
                    </header>
                    <ReviewComments reviewId={id} />
                    {Object.keys(context.user).length && <AddCommentForm reviewId={id} />}
                </section>
                <section className='ReviewPage__section section'>
                    <header>
                        <h2>Other reviews of {dog_profile.name}</h2>
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
                                <ul className='ReviewPage__reviews-list'>
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
            <p>Review not found.  Check the url and try again.</p>
        </section>
    );

}

export default ReviewPage;