import React, { useState, useEffect, createContext } from 'react';
import STORE from '../STORE';

const UserContext = createContext({
    user: {},
    dogs: [],
    allDogs: [],
    howls: [],
    addHowl: () => {},
    setUser: () => {},
});

export default UserContext;

export const UserProvider = (props) => {

    const [user, setUser] = useState({
        "id": '61a8a24a-3f30-4f4b-ba1e-68474f25a4d1',
        "email": "sample@fake-email.com",
        "phone": "123-456-7890",
        "username": "pjfry2000",
    });
    const [dogs, setDogs] = useState([ 
        {
            "id": 'f3586d96-54fc-43bc-9cff-3564ad317ad6',
            "owner_id": '61a8a24a-3f30-4f4b-ba1e-68474f25a4d1',
            "name": "Seymour",
            "profile_img_url": "https://images.unsplash.com/photo-1580579674179-931317ab63fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            "age_years": 15,
            "age_months": 0,
            "sex": "male, unneutered",
            "breed": "mixed-Schnauzer",
            "weight": 20,
            "energy": "About as energetic as the average dog.",
            "temperment": "Outgoing and eager to be friends with most dogs.",
            "obedience": "Some training, but not always obedient.",
            "dislikes_puppies": false,
            "dislikes_men": false,
            "dislikes_women": false,
            "dislikes_children": false,
            "recently_adopted": true,
            "prefers_people": true,
            "leash_aggression": false,
            "elderly_dog": true,
            "little_time_with_other_dogs": false,
            "much_experience_with_other_dogs": true,
            "aggressive": false,
            "owner_description": "Seymour is a sweet dog who loves walking on sunshine, swimming, and eating meatballs.  He enjoys playing with other dogs, though he enjoys smaller dogs more than older ones.  If you see us in Central Park, come say hi!"
        },
        {
            "id": '777e047b-de08-43d7-aa08-a998b4a8430e',
            "owner_id": '61a8a24a-3f30-4f4b-ba1e-68474f25a4d1',
            "name": "Nibbler",
            "profile_img_url": "https://images.unsplash.com/photo-1572297448250-ac6dcaedf2a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1188&q=80",
            "age_years": 5,
            "age_months": 0,
            "sex": "male, unneutered",
            "breed": "Boston Terrier",
            "weight": 25,
            "energy": "Very energetic.",
            "temperment": "Shy, but not skiddish or nervous.",
            "obedience": "Not trained at all and struggles with obedience...",
            "dislikes_puppies": false,
            "dislikes_men": false,
            "dislikes_women": false,
            "dislikes_children": false,
            "recently_adopted": true,
            "prefers_people": true,
            "leash_aggression": false,
            "elderly_dog": false,
            "little_time_with_other_dogs": true,
            "much_experience_with_other_dogs": false,
            "aggressive": true,
            "owner_description": "I recently adopted Nibbler after I found him in the wild on a work trip.  He isn't trained yet, but he's very sweet around people, once he gets to know them.  He's a bit shy around other dogs, very protective of his food, and I suspect that he needs to be socialized.  If your dog is an expert in bringing other dogs out of their shells, send me an email!"
        },
    ]);
    const [allDogs, setAllDogs] = useState(STORE.dog_profiles);
    const [howls, setHowls] = useState(STORE.howls);
    
    useEffect(() => {
        if (Object.keys(user).length) {
            const dogs = STORE.dog_profiles.filter(dog => dog.owner_id === user.id);
            setDogs(dogs);
        }
    }, [user]);

    const addHowl = (newHowl) => {
        const updatedHowls = [...howls, newHowl];
        setHowls(updatedHowls);
    }

    const value = {
        user,
        dogs,
        allDogs,
        howls,
        setUser,
        addHowl,
    };

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
}