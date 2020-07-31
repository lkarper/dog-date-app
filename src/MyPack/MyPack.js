import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import DogListView from '../DogListView/DogListView';

const MyPack = (props) => {

    const context = useContext(UserContext);
    const { packMembers } = context;
    const pack = packMembers.map(pm => 
        context.allDogs.find(dog => 
            dog.id === pm.pack_member_id)
        );

    return (
        <section>
            <header>
                <h3>My Pack</h3>
            </header>
            {pack.length 
                ?             
                    <ul>
                        {pack.map(dog => <DogListView key={dog.id} dog={dog} />)}
                    </ul>
                :
                    <p>No pack members yet.</p>
            }

        </section>
    );
}

export default MyPack;