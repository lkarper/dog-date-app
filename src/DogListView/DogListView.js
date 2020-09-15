import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './DogListView.css';

const DogListView = (props) => {

    const { 
        profile_img_url, 
        name, 
        id 
    } = props.dog;

    const image = profile_img_url 
        ?
            <img
                className='DogListView__profile-pic' 
                src={profile_img_url} 
                alt={`Avatar of the dog named ${name}.`} 
            />
        :
            <img
                className='DogListView__profile-pic' 
                src='/images/photo_not_available.png' 
                alt={`Avatar of the dog named ${name} not available.`} 
            />
    ;

    if (!id) {
        return (
            <li className='DogListView__li'>
                <p
                    className='DogListView__p error'
                >
                    Error: Check your connection and the URL and try again.
                </p>
            </li>
        );
    }

    return (
        <li className='DogListView__li'>
            <Link
                className='DogListView__profile-link link'
                to={`/dog-profile/${id}`}
            >
                <div 
                    className='DogListView__dog-container'
                >
                    {image}
                    <p
                        className='DogListView__p'
                    >
                        View {name}'s profile
                    </p>
                </div>
            </Link>
        </li>
    );
}

DogListView.defaultProps = {
    dog: {
        profile_img_url: '', 
        name: '', 
        id: '' 
    },
};

DogListView.propTypes = {
    dog: PropTypes.shape({
        profile_img_url: PropTypes.string, 
        name: PropTypes.string,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),         
    }).isRequired,
}

export default DogListView;
