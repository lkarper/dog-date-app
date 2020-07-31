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
                    alt={`Avatar of the dog named ${name}.`} 
                />
                <Link
                    to={`/dog-profile/${id}`}
                >
                    View {name}'s profile
                </Link>
            </div>
        </li>
    );
}

export default DogListView;