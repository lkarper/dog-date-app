import React, { useState, useEffect, createContext } from 'react';
import STORE from '../STORE';

const UserContext = createContext({
    user: {},
    dogs: [],
    allDogs: [],
    howls: [],
    userSavedHowls: [],
    packMembers: [],
    reviews: [],
    addReview: () => {},
    addHowl: () => {},
    addPackMember: () => {},
    removePackMember: () => {},
    setUser: () => {},
    addDogProfile: () => {},
    updateDogProfile: () => {},
    addSavedHowl: () => {},
    removeSavedHowl: () => {},
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
    const [reviews, setReviews] = useState(STORE.reviews);
    const [userSavedHowls, setUserSavedHowls] = useState([
        {
            "id": "0eada3bf-43a9-48c0-9458-c6bfccb4e790",
            "user_id": "61a8a24a-3f30-4f4b-ba1e-68474f25a4d1",
            "howl_id": "6b731f04-75b7-4dd7-98e4-cf71fafd5a70",
        },
        {
            "id": "11e3d68c-fca9-4792-9c86-11799cb4ca38",
            "user_id": "61a8a24a-3f30-4f4b-ba1e-68474f25a4d1",
            "howl_id": "8d4bc1f2-f0b5-47ef-a551-91c69e924528",
        },
    ]);
    const [packMembers, setUserPackMembers] = useState([
        {
            "id": "c5029d40-a4a1-45ea-8b58-8dbbaf16679f",
            "user_id": "61a8a24a-3f30-4f4b-ba1e-68474f25a4d1",
            "pack_member_id": "1eb7a4e4-ab97-4225-b764-12f72b659971"
        },
        {
            "id": "ceeae974-26dc-4d46-9963-71fcb177a774",
            "user_id": "61a8a24a-3f30-4f4b-ba1e-68474f25a4d1",
            "pack_member_id": "7cb90576-b26c-4344-bb0b-915429e4fc2b"
        },
        {
            "id": "58594361-57e4-4980-b895-c4d5c6e6c760",
            "user_id": "61a8a24a-3f30-4f4b-ba1e-68474f25a4d1",
            "pack_member_id": "cb6e6549-faac-45ae-9170-b11c869cd239"
        },
    ]);
    
    useEffect(() => {
        if (Object.keys(user).length) {
            const dogs = STORE.dog_profiles.filter(dog => dog.owner_id === user.id);
            setDogs(dogs);
            const savedHowls = STORE.user_saved_howls.filter(howl => howl.user_id === user.id);
            setUserSavedHowls(savedHowls);
            const userPackMembers = STORE.pack_members.filter(pm => pm.user_id === user.id);
            setUserPackMembers(userPackMembers);
        }
    }, [user]);

    const addHowl = (newHowl) => {
        const updatedHowls = [...howls, newHowl];
        setHowls(updatedHowls);
    }

    const addReview = (newReview) => {
        const updatedReviews = [ ...reviews, newReview];
        setReviews(updatedReviews);
    }

    const addPackMember = (newPackMember) => {
        const updatedPackMembers = [...packMembers, newPackMember ];
        setUserPackMembers(updatedPackMembers);
    }

    const removePackMember = (id_to_remove) => {
        const updatedPackMembers = packMembers.filter(pm => pm.pack_member_id !== id_to_remove);
        setUserPackMembers(updatedPackMembers);
    }

    const addDogProfile = (newDogProfile) => {
        const updateDogs = [...dogs, newDogProfile];
        setDogs(updateDogs);
        const updateAllDogs = [...allDogs, newDogProfile];
        setAllDogs(updateAllDogs);
    }

    const updateDogProfile = (newDogProfile) => {
        const updatedDogs = dogs.filter(dog => dog.id !== newDogProfile.id);
        updatedDogs.push(newDogProfile);
        setDogs(updatedDogs);
        const updatedAllDogs = allDogs.filter(dog => dog.id !== newDogProfile.id);
        updatedAllDogs.push(newDogProfile);
        setAllDogs(updatedAllDogs);
    }

    const addSavedHowl = (newHowl) => {
        const updatedHowls = [...userSavedHowls, newHowl];
        setUserSavedHowls(updatedHowls);
    }

    const removeSavedHowl = (idToRemove) => {
        const updatedHowls = userSavedHowls.filter(howl => howl.howl_id !== idToRemove);
        setUserSavedHowls(updatedHowls);
    }

    const value = {
        user,
        dogs,
        allDogs,
        howls,
        userSavedHowls,
        packMembers,
        reviews,
        addReview,
        setUser,
        addHowl,
        addPackMember,
        removePackMember,
        addDogProfile,
        updateDogProfile,
        addSavedHowl,
        removeSavedHowl,
    };

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
}