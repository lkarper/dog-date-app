import React, { useState, useEffect } from 'react';
import ValidateDogProfileName from '../../validation-components/create-dog-profile-validation/ValidateDogProfileName';
import ValidateDogProfileAge from '../../validation-components/create-dog-profile-validation/ValidateDogProfileAge';
import ValidateDogProfileSex from '../../validation-components/create-dog-profile-validation/ValidateDogProfileSex';

const BasicInfo = (props) => {

    const {
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
        setWeightP
    } = props.data;

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [ageYears, setAgeYears] = useState('');
    const [ageMonths, setAgeMonths] = useState('');
    const [ageError, setAgeError] = useState('');
    const [sex, setSex] = useState('');
    const [sexError, setSexError] = useState('');
    const [breed, setBreed] = useState('');
    const [weight, setWeight] = useState('');

    useEffect(() => {
        if (name !== nameP) {
            setNameP(name);
        }
    }, [name, nameP, setNameP]);

    useEffect(() => {
        if (nameError !== nameErrorP) {
            setNameErrorP(nameError);
        }
    }, [nameError, nameErrorP, setNameErrorP]);

    useEffect(() => {
        if (ageYears !== ageYearsP) {
            setAgeYearsP(ageYears);
        }
    }, [ageYears, ageYearsP, setAgeYearsP]);

    useEffect(() => {
        if (ageMonths !== ageMonthsP) {
            setAgeMonthsP(ageMonths);
        }
    }, [ageMonths, ageMonthsP, setAgeMonthsP]);

    useEffect(() => {
        if (ageError !== ageErrorP) {
            setAgeErrorP(ageError);
        }
    }, [ageError, ageErrorP, setAgeErrorP]);

    useEffect(() => {
        if (sex !== sexP) {
            setSexP(sex);
        }
    }, [sex, sexP, setSexP]);

    useEffect(() => {
        if (sexError !== sexErrorP) {
            setSexErrorP(sexError);
        }
    }, [sexError, sexErrorP, setSexErrorP]);

    useEffect(() => {
        if (breed !== breedP) {
            setBreedP(breed);
        }
    }, [breed, breedP, setBreedP]);

    useEffect(() => {
        if (weight !== weightP) {
            setWeightP(weight);
        }
    }, [weight, weightP, setWeightP]);

    const checkAgeYears = (age) => {
        if (isNaN(age)) {
            setAgeYears(0);
        } else {
            setAgeYears(age);
        }
    }

    const checkAgeMonths = (age) => {
        if (isNaN(age)) {
            setAgeMonths(0);
        } else {
            setAgeMonths(age)
        }
    }

    const checkWeight = (lbs) => {
        if (isNaN(lbs)) {
            setWeight(0);
        } else {
            setWeight(lbs);
        }
    }

    return (
        <fieldset>
            <legend>Basic info:</legend>
            <div>
                <label 
                    htmlFor="dog-name"
                    >
                        Dog's name:
                    </label>
                <input 
                    type="text" 
                    placeholder="Seymour" 
                    id="dog-name" 
                    name="dog-name" 
                    maxLength='72'
                    aria-describedby='name-validator'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div role='alert'>
                <ValidateDogProfileName 
                    name={name}
                    nameError={nameError}
                    setNameError={setNameError}
                />
            </div>
            <fieldset className="sub-fieldset">
                <legend>Age:</legend>
                <div>
                    <label 
                        htmlFor="years"
                    >
                        Years:
                    </label>
                    <input 
                        type="number" 
                        id="years" 
                        name="years" 
                        min="0" 
                        max="30" 
                        value={ageYears}
                        aria-describedby='age-validator'
                        onChange={(e) => checkAgeYears(parseInt(e.target.value))}
                    />
                </div>
                <div>
                    <label 
                        htmlFor="months"
                    >
                        Months:
                    </label>
                    <input 
                        type="number" 
                        id="months" 
                        name="months" 
                        min="0" 
                        max="11" 
                        value={ageMonths}
                        aria-describedby='age-validator'
                        onChange={(e) => checkAgeMonths(parseInt(e.target.value))}
                    />
                </div>
                <div role='alert'>
                    <ValidateDogProfileAge 
                        ageMonths={ageMonths}
                        ageYears={ageYears}
                        ageError={ageError}
                        setAgeError={setAgeError}
                    />
                </div>
            </fieldset>
            <fieldset className="sub-fieldset">
                <legend>Sex:</legend>
                <div>
                    <input 
                        type="radio" 
                        id="male-unneutered" 
                        name="sex" 
                        value="Male, unneutered"
                        checked={sex === 'Male, unneutered'}
                        aria-describedby='sex-validator'
                        onChange={(e) => setSex(e.target.value)} 
                        required
                    />
                    <label htmlFor="male-unneutered">Male, unneutered</label>
                </div>
                <div>
                    <input 
                        type="radio" 
                        id="female-unspayed" 
                        name="sex" 
                        value="Female, unspayed" 
                        checked={sex === 'Female, unspayed'}
                        aria-describedby='sex-validator'
                        onChange={(e) => setSex(e.target.value)}
                        required
                    />
                    <label htmlFor="female-unspayed">Female, unspayed</label>
                </div>
                <div>
                    <input 
                        type="radio" 
                        id="male-neutered" 
                        name="sex" 
                        value="Male, neutered" 
                        checked={sex === 'Male, neutered'}
                        aria-describedby='sex-validator'
                        onChange={(e) => setSex(e.target.value)}
                        required
                    />
                    <label htmlFor="male-neutered">Male, neutered</label>
                </div>
                <div>
                    <input 
                        type="radio" 
                        id="female-spayed" 
                        name="sex" 
                        value="Female, spayed" 
                        checked={sex === 'Female, spayed'}
                        aria-describedby='sex-validator'
                        onChange={(e) => setSex(e.target.value)}
                        required
                    />
                    <label htmlFor="female-spayed">Female, spayed</label>
                </div>
                <div role='alert'>
                    <ValidateDogProfileSex 
                        sex={sex}
                        sexError={sexError}
                        setSexError={setSexError}
                    />
                </div>
            </fieldset>
            <div>
                <label htmlFor="breed">Breed:</label>
                <input 
                    type="text" 
                    id="breed" 
                    name="breed" 
                    maxLength='72'
                    aria-describedby='breed-optional'
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                />
                <p id='breed-optional'>(Optional; max 72 characters.)</p>
            </div>
            <div>
                <label htmlFor="weight">Weight (in lbs):</label>
                <input 
                    type="number" 
                    id="weight" 
                    name="weight" 
                    min="1" 
                    max="300"
                    aria-describedby='weight-optional' 
                    value={weight}
                    onChange={(e) => checkWeight(e.target.value)}
                />
                <p id='weight-optional'>(Optional; max. 300 lbs.)</p>
            </div>
        </fieldset>
    );
}

export default BasicInfo;
