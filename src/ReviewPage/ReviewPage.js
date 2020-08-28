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
import ReviewsService from '../services/reviews-service';

const ReviewPage = (props) => {

    const { id } = props.match.params;

    const context = useContext(UserContext);

    const [review, setReview] = useState();
    const [reviews, setReviews] = useState();
    const [comments, setComments] = useState([]);
    const [apiError, setApiError] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [forceUpdate, setForceUpdate] = useState();

    useEffect(() => {
        window.scrollTo(0, 0);
        ReviewsService.getReviewByReviewId(id)
            .then(review => {
                setApiError(false);
                setReview(review);
            })
            .catch(error => {
                setApiError(true);
                console.log(error);
            });
    }, [id, setReview, setApiError, forceUpdate]);

    useEffect(() => {
        if (review) {
            setComments(review.comments)
            ReviewsService.getReviewsByDogId(review.dog_profile.id)
                .then(reviews => {
                    setApiError(false);
                    setReviews(reviews);
                })
                .catch(error => {
                    setApiError(true);
                    console.log(error);
                });
        }
    }, [review, setReviews, setApiError]);
    

    if (review) {
        
        const { 
            reviewer,
            review_title,
            date_created,
            friendliness_dogs,
            friendliness_people,
            playing_interest,
            obedience,
            profile_accuracy,
            location_suitability,
            location,
            date,
            start_time,
            end_time,
            personal_message,
            dog_profile,
        } = review;

        let userButtons = <></>;

        const checkRemoveReview = () => {
            const confirmation = window.confirm(`Are you sure that you'd like to delete this review?`);
            if (confirmation) {
                ReviewsService.deleteReview(id)
                    .then(() => {
                        props.history.push(`/dog-profile/${dog_profile.id}`);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }

        const averageRating = (
            friendliness_dogs +
            friendliness_people +
            playing_interest +
            obedience +
            profile_accuracy + 
            location_suitability 
        ) / 6;

        if (Object.keys(context.user).length) {
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
                    <h1>{review_title}</h1>
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
                                    forceUpdate={setForceUpdate} 
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
                    <p>{moment(date).format("dddd, MMMM Do, YYYY")}</p>
                    {<TimeWindow startTime={start_time} endTime={end_time} />}
                </section>
                <section className='ReviewPage__section section'>
                    <header>
                        <h2>Comments</h2>
                    </header>
                    <ReviewComments comments={comments} setComments={setComments} />
                    {Object.keys(context.user).length && <AddCommentForm reviewId={id} comments={comments} setComments={setComments} />}
                </section>
                <section className='ReviewPage__section section'>
                    <header>
                        <h2>Other reviews of {dog_profile.name}</h2>
                    </header>
                    {context.user.id === dog_profile.owner_id 
                        ? '' 
                        : <Link to={`/leave-review/${dog_profile.id}`}>Leave your own review of {dog_profile.name}</Link>
                    }
                    {(reviews && reviews.length > 1) 
                        && 
                            <div>
                                <DogAverageRating 
                                    reviews={reviews}
                                />
                                <ul className='ReviewPage__reviews-list'>
                                    {reviews.map(review => <DogReviewListItem key={review.id} review={review} />)}
                                </ul>
                            </div>
                    }
                    {(reviews && reviews.length === 1) && <p>This is the only review of {dog_profile.name}.</p>}
                    {(reviews && reviews.length === 0) && <p>No reviews of {dog_profile.name} yet.</p>}
                    {!reviews && <p>Loading...</p>}
                </section>
            </>
        );
    }
    
    if (apiError) {
        return (
            <section className='section'>
                <header>
                    <h1>Woof...</h1>
                </header>
                <p>Looks like something went wrong.  Check the url and try again.</p>
            </section>
        );
    }

    return <p>Loading...</p>;
}

export default ReviewPage;