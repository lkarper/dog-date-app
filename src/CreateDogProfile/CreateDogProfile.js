import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import BasicInfo from '../CreateDogProfileFormComponents/BasicInfo/BasicInfo';
import DogDescription from '../CreateDogProfileFormComponents/DogDescription/DogDescription';
import UploadDogProfilePhoto from '../CreateDogProfileFormComponents/UploadDogProfilePhoto/UploadDogProfilePhoto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import DogProfilesService from '../services/dog-profiles-service';
import './CreateDogProfile.css';

const CreateDogProfile = (props) => {

    useEffect(() => {
        if (!Object.keys(props).includes('suffix')) {
            window.scrollTo(0, 0);
        }
    }, [props]);

    const { dog_profile = {}, suffix = '' } = props;

    const { 
        id = '',
        name = '',
        profile_img_url = '',
        age_years = 0,
        age_months = 0,
        sex = '',
        breed = '',
        weight = 0,
        energy = '',
        temperment = '',
        obedience = '',
        dislikes_puppies = false,
        dislikes_men = false,
        dislikes_women = false,
        dislikes_children = false,
        recently_adopted = false,
        prefers_people = false,
        leash_aggression = false,
        elderly_dog = false,
        little_time_with_other_dogs = false,
        much_experience_with_other_dogs = false,
        aggressive = false,
        owner_description = '',
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

    const handleInfoSubmit = (event) => {
        event.preventDefault();
        setInfoForm(false);
    }

    const uploadDogProfile = () => {
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

        if (Object.keys(dog_profile).length === 0) {
            DogProfilesService.createDogProfile(newDogProfile)
                .then(profile => {
                    context.addDogProfile(profile);
                    props.history.push(`/dog-profile/${profile.id}`);
                })
                .catch(error => {
                    console.log(error);
                    setShowLoading(false);
                });
        } else {
            DogProfilesService.updateDogProfile(dog_profile.id, newDogProfile)
                .then(() => {
                    setShowLoading(false);
                    props.setShowEdit(false);
                    props.triggerNewApiCall(new Date().toJSON());
                })
                .catch(error => {
                    setShowLoading(false);
                    console.log(error);
                });
        }
    }

    useEffect(() => {
        if (imgDataP || imgDataP === null) {
            uploadDogProfile();
        }
    }, [imgDataP]);

    const useNoImg = () => {
        setImgUrlP('');
        setImgDataP(null);
    }

    if (infoForm) {
        return (
            <>
                <header 
                    className={`CreateDogProfile__header${suffix}`}
                    aria-hidden={suffix ? true : false}
                >
                    <h1>Create a Profile</h1>
                </header>
                <section className={`CreateDogProfile__outer-section${suffix}`}>
                    <header>
                        <h2>{suffix ? `Edit your dog's profile` : 'Start barking about your dog!'}</h2>
                    </header>
                    {suffix && <button className={`CreateDogProfile__close-button${suffix}`}onClick={() => props.setShowEdit(false)}>&#10006;</button>}
                    <form 
                        onSubmit={handleInfoSubmit}
                        className='profile-creation-form'
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
                    </form>
                </section>
            </>
        );
    } else {
        if (!imgUploadForm) {
            return (
                <>
                    <header className={`CreateDogProfile__header${suffix}`}>
                        <h1>Create a Profile</h1>
                    </header>
                    <section className={`CreateDogProfile__outer-section${suffix}`}>
                        <header>
                            <h2>Would you like your dog's profile to feature a photo?</h2>
                        </header>
                        <button onClick={() => setImgUploadForm(true)}>Yes</button>
                        <button onClick={useNoImg}>No</button>
                        {showLoading && 
                            <div className='CreateDogProfilePhoto__loading-container'>
                                <FontAwesomeIcon 
                                    className='CreateDogProfilePhoto__loading' 
                                    icon={faSpinner} 
                                    spin 
                                />
                            </div>
                        }
                    </section>
                </>
            )
        }
        return (
            <>
                <header className={`CreateDogProfile__header${suffix}`}>
                    <h1>Create a Profile</h1>
                </header>
                <UploadDogProfilePhoto 
                    imgDataP={imgDataP}
                    setImgDataP={setImgDataP}
                    imgUrlP={imgUrlP}
                    setImgUrlP={setImgUrlP}
                    uploadDogProfile={uploadDogProfile}
                    suffix={suffix}
                />
                {showLoading && 
                    <div className='CreateDogProfilePhoto__loading-container'>
                        <FontAwesomeIcon 
                            className='CreateDogProfilePhoto__loading' 
                            icon={faSpinner} 
                            spin 
                        />
                    </div>
                }
            </>
        );
    }
}

export default withRouter(CreateDogProfile);