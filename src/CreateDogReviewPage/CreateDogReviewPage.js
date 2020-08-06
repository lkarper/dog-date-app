import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import DogReviewForm from '../DogReviewForm/DogReviewForm';
import DogListView from '../DogListView/DogListView';

const CreateDogReviewPage = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [props]);

    const { dog_id } = props.match.params;

    const context = useContext(UserContext);

    const dog = context.allDogs.find(dog => dog.id === dog_id);

    if (!dog) {
        const pack = context.packMembers.map(pm => 
            context.allDogs.find(dog => 
                dog.id === pm.pack_member_id)
            );

        return (
            <section>
                <header>
                    <h1>Dog not found</h1>
                </header>
                <p>We couldn't find the dog that you're attempting to review.</p>
                {pack.length 
                ?             
                    <div>
                        <h2>Would you like to review one of your pack members?</h2>
                        <ul>
                            {pack.map(dog => 
                                <div key={dog.id}>
                                    <DogListView dog={dog} />
                                    <Link to={`/leave-review/${dog.id}`}>Click here to review {dog.name}</Link>
                                </div>
                            )}
                        </ul>
                    </div>
                :
                    '' 
                    // Maybe add a search link here?
            }
            </section>
        );
    }

    return (
        <section className='DogReviewPage__section section'>
            <header>
                <h1>Use this form to leave a review of {dog.name}</h1>
            </header>
            <DogReviewForm
                dogName={dog.name}
                dog_id={dog_id}
            />
        </section>
    );
}

export default CreateDogReviewPage;