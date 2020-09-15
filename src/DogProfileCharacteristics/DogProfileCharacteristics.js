import React from 'react';
import PropTypes from 'prop-types';

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

    if (!energy || ! temperment || !obedience) {
        return (
            <ul>
                <li>Error: Could not load characteristics.  Check your connection and the URL and try again.</li>
            </ul>
        );
    }

    return (
        <ul>
            <li>{energy === 'Not very...' ? 'Not very energetic...' : energy}</li>
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

DogProfileCharacteristics.defaultProps = {
    dog_profile: {
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
    },
};

DogProfileCharacteristics.propTypes = {
    dog_profile: PropTypes.shape({
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
    }).isRequired,
}

export default DogProfileCharacteristics;
