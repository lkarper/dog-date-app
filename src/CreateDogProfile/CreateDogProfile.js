import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import UserContext from '../contexts/UserContext';
import BasicInfo from '../CreateDogProfileFormComponents/BasicInfo/BasicInfo';
import DogDescription from '../CreateDogProfileFormComponents/DogDescription/DogDescription';
import UploadDogProfilePhoto from '../CreateDogProfileFormComponents/UploadDogProfilePhoto/UploadDogProfilePhoto';

const CreateDogProfile = (props) => {

    const context = useContext(UserContext);

    const [infoForm, setInfoForm] = useState(true);
    const [imgUploadForm, setImgUploadForm] = useState(false);
    const [nameP, setNameP] = useState('');
    const [nameErrorP, setNameErrorP] = useState('');
    const [ageYearsP, setAgeYearsP] = useState('');
    const [ageMonthsP, setAgeMonthsP] = useState('');
    const [ageErrorP, setAgeErrorP] = useState('');
    const [sexP, setSexP] = useState('');
    const [sexErrorP, setSexErrorP] = useState('');
    const [breedP, setBreedP] = useState('');
    const [weightP, setWeightP] = useState('');
    const [energyP, setEnergyP] = useState('');
    const [energyErrorP, setEnergyErrorP] = useState('');
    const [tempermentP, setTempermentP] = useState('');
    const [tempermentErrorP, setTempermentErrorP] = useState('');
    const [obedienceP, setObedienceP] = useState('');
    const [obedienceErrorP, setObedienceErrorP] = useState('');
    const [dislikesPuppiesP, setDislikesPuppiesP] = useState('');
    const [dislikesMenP, setDislikesMenP] = useState('');
    const [dislikesWomenP, setDislikesWomenP] = useState('');
    const [noChildrenP, setNoChildrenP] = useState('');
    const [recentlyAdoptedP, setRecentlyAdoptedP] = useState('');
    const [lovesPeopleP, setLovesPeopleP] = useState('');
    const [leashAggressionP, setLeashAggressionP] = useState('');
    const [elderlyDogP, setElderlyDogP] = useState('');
    const [littleExperienceP, setLittleExperienceP] = useState('');
    const [muchExperienceP, setMuchExperienceP] = useState('');
    const [foodAggressionP, setFoodAggressionP] = useState('');
    const [personalMessageP, setPersonalMessageP] = useState('');
    const [personalMessageErrorP, setPersonalMessageErrorP] = useState('');
    const [imgUrlP, setImgUrlP] = useState('');

    const handleInfoSubmit = (event) => {
        event.preventDefault();
        setInfoForm(false);
    }

    const uploadDogProfile = () => {
        const newDogProfile = {
            id: uuidv4(),
            owner_id: context.user.id,
            name: nameP,
            profile_img_url: imgUrlP,
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

        context.addDogProfile(newDogProfile);
        props.history.push(`/dog-profile/${newDogProfile.id}`);
    }

    if (infoForm) {
        return (
            <>
                <header>
                    <h1>Create a Profile</h1>
                </header>
                <section>
                    <header>
                        <h2>Start barking about your dog!</h2>
                    </header>
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
                    <header>
                        <h1>Create a Profile</h1>
                    </header>
                    <section>
                        <header>
                            <h2>Would you like to upload a photo for your dog's profile?</h2>
                        </header>
                        <button onClick={() => setImgUploadForm(true)}>Yes</button>
                        <button onClick={uploadDogProfile}>No</button>
                    </section>
                </>
            )
        }
        return (
            <>
                <header>
                    <h1>Create a Profile</h1>
                </header>
                <UploadDogProfilePhoto 
                    imgUrlP={imgUrlP}
                    setImgUrlP={setImgUrlP}
                    uploadDogProfile={uploadDogProfile}
                />
            </>
        );
    }
}

export default CreateDogProfile;