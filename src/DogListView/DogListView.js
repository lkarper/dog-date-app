import React from 'react';
import './DogListView.css';

const DogListView = (props) => {

    const { profile_img_url, name } = props.dog;

    return (
        <li className='DogListView__li'>
            <div>
                <img
                    className='DogListView__profile-pic' 
                    src={profile_img_url} 
                    alt={`Profile picture for the dog named ${name}.`} 
                />
                <p>{name}</p>
            </div>
        </li>
    );
}

export default DogListView;