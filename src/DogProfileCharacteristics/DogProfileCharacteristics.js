import React from 'react';

const DogProfileCharacteristics = (props) => {

    const { dog_profile } = props;

    const {
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
    } = dog_profile;

    return (
        <ul>
            <li>{energy}</li>
            <li>{temperment}</li>
            <li>{obedience}</li>
            {dislikes_puppies ? <li>Dislikes puppies</li> : ''}
            {dislikes_men ? <li>Dislikes men</li> : ''}
            {dislikes_women ? <li>Dislikes women</li> : ''}
            {dislikes_children ? <li>Dislikes children</li> : ''}
            {recently_adopted ? <li>Recently adopted</li> : ''}
            {prefers_people ? <li>Prefers people to dogs</li> : ''}
            {leash_aggression ? <li>Has leash aggression</li> : ''}
            {elderly_dog ? <li>Elderly dog</li> : ''}
            {little_time_with_other_dogs ? <li>Has spent little time with other dogs</li> : ''}
            {much_experience_with_other_dogs ? <li>Has much experience with other dogs</li> : ''}
            {aggressive ? <li>Aggressive dog</li> : ''}
        </ul>
    );

}

export default DogProfileCharacteristics;