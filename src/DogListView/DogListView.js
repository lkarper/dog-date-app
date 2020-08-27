import React from 'react';
import { Link } from 'react-router-dom';
import './DogListView.css';

const DogListView = (props) => {

    const { profile_img_url, name, id } = props.dog;

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

    return (
        <li className='DogListView__li'>
            <Link
                className='DogListView__profile-link'
                to={`/dog-profile/${id}`}
            >
                <div className='DogListView__dog-container'>
                    {image}
                    View {name}'s profile
                </div>
            </Link>
        </li>
    );
}

export default DogListView;