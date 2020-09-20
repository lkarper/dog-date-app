import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
import ReviewsService from '../services/reviews-service';
import StarRating from '../StarRating/StarRating';
import './ReviewPage.css';

const ReviewPage = (props) => {
    const { id } = props.match.params;

    const context = useContext(UserContext);

    const [review, setReview] = useState();
    const [reviews, setReviews] = useState();
    const [comments, setComments] = useState([]);
    const [apiError, setApiError] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [forceUpdate, setForceUpdate] = useState();
    const [couldNotDelete, setCouldNotDelete] = useState();

    useEffect(() => {
        if (!showEdit) {
            window.scrollTo(0, 0);
        }
    }, [showEdit]);

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
            setComments(review.comments);

            // Get other reviews for the same dog that present review is about
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
                        setCouldNotDelete(true);
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

        // Set buttons to edit or delete review if the user is the author of the review
        if (Object.keys(context.user).length) {
            if (context.user.username === review.reviewer) {
                userButtons = (
                    <div 
                        className='ReviewPage__user-buttons-container'
                    >
                        <button
                            className='ReviewPage__button button' 
                            onClick={() => setShowEdit(!showEdit)}
                        >
                            {showEdit ? 'Cancel edit' : 'Edit'}
                        </button>
                        <button
                            className='ReviewPage__button button' 
                            onClick={checkRemoveReview}
                        >
                            Delete
                        </button>
                        {couldNotDelete && <p>Error: Could not delete your review at this time.  Please check your connection and try again.</p>}
                    </div>
                );
            }
        }

        return (
            <section 
                className='ReviewPage__outer-section'
                aria-live='polite'
            >
                <header
                    className='ReviewPage__outer-header'
                >
                    <h1>A Review of {dog_profile.name}</h1>
                </header>
                <section
                    className='ReviewPage__section section'
                >
                    <header 
                        className='ReviewPage__main-header'
                    >
                        <h2>{review_title}</h2>
                        {review.dog_profile.profile_img_url
                            ?
                                <img
                                    className='ReviewPage__img' 
                                    src={review.dog_profile.profile_img_url} 
                                    alt={`Avatar of the dog named ${review.dog_profile.name}.`} 
                                />
                            :
                                <img
                                    className='ReviewPage__img' 
                                    src='/images/photo_not_available.png'
                                    alt={`Avatar of the dog named ${review.dog_profile.name} not available.`} 
                                />
                        }
                        <p>Reviewed by: {reviewer}</p>
                        <p>On: {moment(date_created).format("MMMM Do YYYY, h:mm a")}</p>
                        <div
                            className='ReviewPage__star-div'
                        >
                            <p>Overall rating:</p>
                            <StarRating 
                                rating={averageRating.toFixed(2)}
                            />
                        </div>
                        {userButtons}
                    </header>
                </section>
                <div
                    className='ReviewPage__edit-div'
                    aria-live='polite'
                >
                    {showEdit &&
                        <DogReviewForm 
                            dogName={dog_profile.name} 
                            dog_id={dog_profile.id} 
                            suffix='edit' 
                            review={review} 
                            setShowEdit={setShowEdit}
                            forceUpdate={setForceUpdate} 
                        />
                    }
                </div>
                {!showEdit && 
                    <>
                        <section className='ReviewPage__section section'>
                            <header>
                                <h2>About {dog_profile.name}</h2>
                            </header>
                                <ul>
                                    <li>
                                        <div
                                            className='ReviewPage__star-div'
                                        >
                                            <p>Friendliness towards other dogs: </p>
                                            <StarRating rating={friendliness_dogs} />
                                        </div>
                                    </li>
                                    <li>
                                        <div
                                            className='ReviewPage__star-div'
                                        >
                                            <p>Friendliness towards people: </p>
                                            <StarRating rating={friendliness_people} />
                                        </div>
                                    </li>
                                    <li>
                                        <div
                                            className='ReviewPage__star-div'
                                        >
                                            <p>Interest in playing: </p>
                                            <StarRating rating={playing_interest} />
                                        </div>
                                    </li>
                                    <li>
                                        <div
                                            className='ReviewPage__star-div'
                                        >
                                            <p>Obedience: </p>
                                            <StarRating rating={obedience} />
                                        </div>
                                    </li>
                                    <li>
                                        <div
                                            className='ReviewPage__star-div'
                                        >
                                            <p>Accuracy of profile: </p>
                                            <StarRating rating={profile_accuracy} />
                                        </div>        
                                    </li>
                                </ul>
                                <h3>This is what {reviewer} had to say about {dog_profile.name}</h3>
                                <blockquote>{personal_message}</blockquote>
                        </section>
                        <section className='ReviewPage__section section'>
                            <header>
                                <h2>About the playdate:</h2>
                            </header>
                            <h3>Location</h3>
                            <div
                                className='ReviewPage__star-div'
                            >
                                <p>Location suitabilty for a playdate: </p>
                                <StarRating rating={location_suitability} />
                            </div>
                            <p>Location: {location.address}, {location.city}, {location.state}{' '}{location.zipcode}</p>
                            {(location.lat && location.lon ) && (location.lat !== '0' && location.lon !== '0')
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
                            <ReviewComments 
                                comments={comments} 
                                setComments={setComments} 
                            />
                            {Object.keys(context.user).length && <AddCommentForm reviewId={id} comments={comments} setComments={setComments} />}
                        </section>
                        <section className='ReviewPage__section section'>
                            <header>
                                <h2>Other reviews of {dog_profile.name}</h2>
                            </header>
                            {/* No need to display a link to leave a review if the user is the owner of the dog being reviewed */}
                            {context.user.id === dog_profile.owner_id || <Link to={`/leave-review/${dog_profile.id}`}>Leave your own review of {dog_profile.name}</Link>}
                            {(reviews && reviews.length > 1) 
                                && 
                                    <div>
                                        <DogAverageRating 
                                            reviews={reviews}
                                        />
                                        <ul className='ReviewPage__reviews-list'>
                                            {reviews
                                                .filter(review => review.id !== parseInt(id))
                                                .map(review => <DogReviewListItem key={review.id} review={review} />)
                                            }
                                        </ul>
                                    </div>
                            }
                            {(reviews && reviews.length === 1) && <p>This is the only review of {dog_profile.name}.</p>}
                            {!reviews && <p>Loading...</p>}
                        </section>
                    </>
                }
            </section>
        );
    }
    
    if (apiError || !id) {
        return (
            <section 
                aria-live='polite'
                className='section'
            >
                <header
                    className='ReviewPage__outer-header'
                >
                    <h1>Woof...</h1>
                </header>
                <p>Looks like something went wrong. Check the url and try again.</p>
            </section>
        );
    }

    return (
        <section aria-live='polite'>
            <p>Loading...</p>
        </section>
    );
}

ReviewPage.defaultProps = {
    match: {
        params: {
            id: '',
        },
    },
    history: {
        push: () => {},
    }
}

ReviewPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string,
        }),
    }).isRequired,
    history: PropTypes.object,
};

export default ReviewPage;
