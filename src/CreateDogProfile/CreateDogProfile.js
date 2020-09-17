import React, { useState, useContext, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import UserContext from '../contexts/UserContext';
import BasicInfo from '../CreateDogProfileFormComponents/BasicInfo/BasicInfo';
import DogDescription from '../CreateDogProfileFormComponents/DogDescription/DogDescription';
import UploadDogProfilePhoto from '../CreateDogProfileFormComponents/UploadDogProfilePhoto/UploadDogProfilePhoto';
import DogProfilesService from '../services/dog-profiles-service';
import './CreateDogProfile.css';

const CreateDogProfile = (props) => {
    useEffect(() => {
        if (props.suffix === '') {
            window.scrollTo(0, 0);
        }
    }, [props]);

    const { 
        dog_profile, 
        suffix
    } = props;

    const { 
        name,
        profile_img_url,
        age_years,
        age_months,
        sex,
        breed,
        weight,
        energy,
        temperment,
        obedience,
        dislikes_puppies,
        dislikes_men,
        dislikes_women,
        dislikes_children,
        recently_adopted,
        prefers_people,
        leash_aggression,
        elderly_dog,
        little_time_with_other_dogs,
        much_experience_with_other_dogs,
        aggressive,
        owner_description,
    } = dog_profile;

    const context = useContext(UserContext);

    const [infoForm, setInfoForm] = useState(true);
    const [imgUploadForm, setImgUploadForm] = useState(false);
    const [nameP, setNameP] = useState(name);
    const [nameErrorP, setNameErrorP] = useState('');
    const [ageYearsP, setAgeYearsP] = useState(age_years);
    const [ageMonthsP, setAgeMonthsP] = useState(age_months);
    const [ageErrorP, setAgeErrorP] = useState('');
    const [sexP, setSexP] = useState(sex);
    const [sexErrorP, setSexErrorP] = useState('');
    const [breedP, setBreedP] = useState(breed);
    const [weightP, setWeightP] = useState(weight);
    const [energyP, setEnergyP] = useState(energy);
    const [energyErrorP, setEnergyErrorP] = useState('');
    const [tempermentP, setTempermentP] = useState(temperment);
    const [tempermentErrorP, setTempermentErrorP] = useState('');
    const [obedienceP, setObedienceP] = useState(obedience);
    const [obedienceErrorP, setObedienceErrorP] = useState('');
    const [dislikesPuppiesP, setDislikesPuppiesP] = useState(dislikes_puppies);
    const [dislikesMenP, setDislikesMenP] = useState(dislikes_men);
    const [dislikesWomenP, setDislikesWomenP] = useState(dislikes_women);
    const [noChildrenP, setNoChildrenP] = useState(dislikes_children);
    const [recentlyAdoptedP, setRecentlyAdoptedP] = useState(recently_adopted);
    const [lovesPeopleP, setLovesPeopleP] = useState(prefers_people);
    const [leashAggressionP, setLeashAggressionP] = useState(leash_aggression);
    const [elderlyDogP, setElderlyDogP] = useState(elderly_dog);
    const [littleExperienceP, setLittleExperienceP] = useState(little_time_with_other_dogs);
    const [muchExperienceP, setMuchExperienceP] = useState(much_experience_with_other_dogs);
    const [foodAggressionP, setFoodAggressionP] = useState(aggressive);
    const [personalMessageP, setPersonalMessageP] = useState(owner_description);
    const [personalMessageErrorP, setPersonalMessageErrorP] = useState('');
    const [imgUrlP, setImgUrlP] = useState(profile_img_url);
    const [imgDataP, setImgDataP] = useState();
    const [showLoading, setShowLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const handleInfoSubmit = (event) => {
        event.preventDefault();
        setInfoForm(false);
    }

    const uploadDogProfile = useCallback(() => {
        setApiError(false);
        setShowLoading(true);
        const newDogProfile = {
            owner_id: context.user.id,
            name: nameP,
            profile_img_url: imgUrlP,
            profile_img: imgDataP || null,
            age_years: ageYearsP,
            age_months: ageMonthsP,
            sex: sexP,
            breed: breedP,
            weight: weightP,
            energy: energyP,
            temperment: tempermentP,
            obedience: obedienceP,
            dislikes_puppies: !!dislikesPuppiesP,
            dislikes_men: !!dislikesMenP,
            dislikes_women: !!dislikesWomenP,
            dislikes_children: !!noChildrenP,
            recently_adopted: !!recentlyAdoptedP,
            prefers_people: !!lovesPeopleP,
            leash_aggression: !!leashAggressionP,
            elderly_dog: !!elderlyDogP,
            little_time_with_other_dogs: !!littleExperienceP,
            much_experience_with_other_dogs: !!muchExperienceP,
            aggressive: !!foodAggressionP,
            owner_description: personalMessageP,
        };

        // The suffix prop is only supplied when the component is used to update a profile
        if (suffix === '') {
            DogProfilesService.createDogProfile(newDogProfile)
                .then(profile => {
                    props.history.push(`/dog-profile/${profile.id}`);
                    context.addDogProfile(profile);
                })
                .catch(error => {
                    console.log(error);
                    setApiError(true);
                    setImgDataP(null);
                    setShowLoading(false);
                });
        } else {
            DogProfilesService.updateDogProfile(dog_profile.id, newDogProfile)
                .then(() => DogProfilesService.fetchDogProfileById(dog_profile.id))    
                .then(profile => {
                    context.updateDogProfile(profile);
                    props.setDog(profile);
                    props.setShowEdit(false);
                })
                .catch(error => {
                    setApiError(true);
                    setImgDataP(null);
                    setShowLoading(false);
                    console.log(error);
                });
        }
    }, [
        setApiError,
        setShowLoading,
        suffix,
        context,
        nameP,
        imgUrlP,
        imgDataP,
        ageYearsP,
        ageMonthsP,
        sexP,
        breedP,
        weightP,
        energyP,
        tempermentP,
        obedienceP,
        dislikesPuppiesP,
        dislikesMenP,
        dislikesWomenP,
        noChildrenP,
        recentlyAdoptedP,
        lovesPeopleP,
        leashAggressionP,
        elderlyDogP,
        littleExperienceP,
        muchExperienceP,
        foodAggressionP,
        personalMessageP,
        dog_profile,
        props,
    ]);

    /*
        The profile creation process is split into two forms which do not appear on screen together.
        This useEffect call triggers the api call when the user completes the second form, 
        choosing a profile photo.
    */
    useEffect(() => {
        if ((imgDataP || imgDataP === null) && !showLoading && !apiError) {
            uploadDogProfile();
        }
    }, [imgDataP, uploadDogProfile, showLoading, apiError]);

    /* 
        Used to signify that no image will be used, so the api call is triggered without
        loading the image upload form or before submitting that form
    */ 
    const useNoImg = () => {
        setImgUrlP('');
        setImgDataP(null);
        if (apiError) {
            setApiError(false);
        }
    }

    // State is used to control which form element of the multi-step profile creation process is displayed
    if (infoForm) {
        return (
            <div
                className='CreateDogProfile__outer-div' 
                aria-live='polite'
            >
                <header 
                    className={`CreateDogProfile__header${suffix}`}
                    aria-hidden={suffix ? true : false}
                >
                    <h1>Create a Profile</h1>
                </header>
                <section className={`CreateDogProfile__outer-section${suffix}`}>
                    <header
                        className={`CreateDogProfile__form-header${suffix}`}
                        aria-hidden={suffix ? true : false}
                    >
                        <h2>Start barking about your dog!</h2>
                    </header>
                    <form 
                        onSubmit={handleInfoSubmit}
                        className={`CreateDogProfile__profile-creation-form${suffix}`}
                    >
                        <BasicInfo 
                            data={{
                                nameP,
                                setNameP,
                                nameErrorP,
                                setNameErrorP,
                                ageYearsP,
                                setAgeYearsP,
                                ageMonthsP,
                                setAgeMonthsP,
                                ageErrorP,
                                setAgeErrorP,
                                sexP,
                                setSexP,
                                sexErrorP,
                                setSexErrorP,
                                breedP,
                                setBreedP,
                                weightP,
                                setWeightP,
                            }}
                        />
                        <DogDescription 
                            data={{
                                energyP,
                                setEnergyP,
                                energyErrorP,
                                setEnergyErrorP,
                                tempermentP,
                                setTempermentP,
                                tempermentErrorP,
                                setTempermentErrorP,
                                obedienceP,
                                setObedienceP,
                                obedienceErrorP,
                                setObedienceErrorP,
                                dislikesPuppiesP,
                                setDislikesPuppiesP,
                                dislikesMenP,
                                setDislikesMenP,
                                dislikesWomenP,
                                setDislikesWomenP,
                                noChildrenP,
                                setNoChildrenP,
                                recentlyAdoptedP,
                                setRecentlyAdoptedP,
                                lovesPeopleP,
                                setLovesPeopleP,
                                leashAggressionP,
                                setLeashAggressionP,
                                elderlyDogP,
                                setElderlyDogP,
                                littleExperienceP,
                                setLittleExperienceP,
                                muchExperienceP,
                                setMuchExperienceP,
                                foodAggressionP,
                                setFoodAggressionP,
                                personalMessageP,
                                setPersonalMessageP,
                                personalMessageErrorP,
                                setPersonalMessageErrorP,
                            }}
                        />
                        <button 
                            className='CreateDogProfile__submit button'
                            type="submit"
                            disabled={
                                nameErrorP ||
                                ageErrorP ||
                                sexErrorP ||
                                energyErrorP ||
                                tempermentErrorP ||
                                obedienceErrorP ||
                                personalMessageErrorP
                            }
                        >
                            Submit
                        </button>
                        {suffix && 
                            <button
                                type='button' 
                                className={`CreateDogProfile__close-button${suffix} button`}
                                onClick={() => props.setShowEdit(false)}
                            >
                                Cancel edit
                            </button>}
                    </form>
                </section>
            </div>
        );
    } else {
        if (!imgUploadForm) {
            return (
                <div
                    className='CreateDogProfile__outer-div' 
                    aria-live='polite'
                >
                    <header className={`CreateDogProfile__header${suffix}`}>
                        <h1>Create a Profile</h1>
                    </header>
                    <section className={`CreateDogProfile__outer-section${suffix} photo-container`}>
                        <section
                            className={`CreateDogProfile__section ${suffix ? suffix : 'section'}`}
                        >
                            <header>
                                <h2>Would you like your dog's profile to feature a photo?</h2>
                            </header>
                            <div
                                className='CreateDogProfile__button-div'
                            >
                                <button
                                    className='CreateDogProfile__button button' 
                                    onClick={() => setImgUploadForm(true)}
                                >
                                    Yes
                                </button>
                                <button 
                                    className='CreateDogProfile__button button'
                                    onClick={useNoImg}
                                >
                                    No
                                </button>
                            </div>
                        </section>
                        {showLoading && 
                            <div className='CreateDogProfile__loading-container'>
                                <FontAwesomeIcon 
                                    className='CreateDogProfile__loading' 
                                    icon={faSpinner} 
                                    spin 
                                />
                            </div>
                        }
                        <div role='alert'>
                            {apiError && <p>Error: Looks like something went wrong. Please check your connection and try again.</p>}
                        </div>
                    </section>
                </div>
            )
        }

        return (
            <div
                className='CreateDogProfile__outer-div' 
                aria-live='polite'
            >
                <header className={`CreateDogProfile__header${suffix}`}>
                    <h1>Create a Profile</h1>
                </header>
                <UploadDogProfilePhoto 
                    imgDataP={imgDataP}
                    setImgDataP={setImgDataP}
                    imgUrlP={imgUrlP}
                    setImgUrlP={setImgUrlP}
                    uploadDogProfile={uploadDogProfile}
                    apiError={apiError}
                    setApiError={setApiError}
                    setShowEdit={props.setShowEdit}
                    suffix={suffix}
                />
                {showLoading && 
                    <div className='CreateDogProfile__loading-container'>
                        <FontAwesomeIcon 
                            className='CreateDogProfile__loading' 
                            icon={faSpinner} 
                            spin 
                        />
                    </div>
                }
                <div role='alert'>
                    {apiError && <p>Error: Looks like something went wrong. Please check your connection and try again.</p>}
                </div>
            </div>
        );
    }
}

CreateDogProfile.defaultProps = {
    dog_profile: {
        name: '',
        profile_img_url: '',
        age_years: 0,
        age_months: 0,
        sex: '',
        breed: '',
        weight: 0,
        energy: '',
        temperment: '',
        obedience: '',
        dislikes_puppies: false,
        dislikes_men: false,
        dislikes_women: false,
        dislikes_children: false,
        recently_adopted: false,
        prefers_people: false,
        leash_aggression: false,
        elderly_dog: false,
        little_time_with_other_dogs: false,
        much_experience_with_other_dogs: false,
        aggressive: false,
        owner_description: '',
    },
    suffix: '',
};

CreateDogProfile.propTypes = {
    dog_profile: PropTypes.shape({
        name: PropTypes.string,
        profile_img_url: PropTypes.string,
        age_years: PropTypes.number,
        age_months: PropTypes.number,
        sex: PropTypes.string,
        breed: PropTypes.string,
        weight: PropTypes.number,
        energy: PropTypes.string,
        temperment: PropTypes.string,
        obedience: PropTypes.string,
        dislikes_puppies: PropTypes.bool,
        dislikes_men: PropTypes.bool,
        dislikes_women: PropTypes.bool,
        dislikes_children: PropTypes.bool,
        recently_adopted: PropTypes.bool,
        prefers_people: PropTypes.bool,
        leash_aggression: PropTypes.bool,
        elderly_dog: PropTypes.bool,
        little_time_with_other_dogs: PropTypes.bool,
        much_experience_with_other_dogs: PropTypes.bool,
        aggressive: PropTypes.bool,
        owner_description: PropTypes.string,
    }).isRequired,
    suffix: PropTypes.string.isRequired,
};

export default withRouter(CreateDogProfile);
