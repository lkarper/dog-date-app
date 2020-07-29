import React from 'react';
import { Link } from 'react-router-dom';
import './DogListView.css';

const DogListView = (props) => {

    const { profile_img_url, name, id } = props.dog;

    return (
        <li className='DogListView__li'>
            <div>
                <img
                    className='DogListView__profile-pic' 
                    src={profile_img_url} 
                    alt={`Profile picture for the dog named ${name}.`} 
                />
                <Link
                    to={`/dog-profile/${id}`}
                >
                    {name}
                </Link>
            </div>
        </li>
    );
}

export default DogListView;