import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import UserContactInfo from '../UserContactInfo/UserContactInfo';
import MyDogs from '../MyDogs/MyDogs';
import HowlListItem from '../HowlListItem/HowlListItem';

const Homepage = (props) => {

    const context = useContext(UserContext);

    return (
        <>
            <header>
                <h3>My Dog Dating Life</h3>
            </header>
            <UserContactInfo />
            <MyDogs />
            <section>
                <header>
                    <h3>My pack</h3>
                </header>
                <ul>
                    <li>
                        <div>
                            <p>[<em>placeholder for pack member profile pic</em>]</p>
                            <p>Pack member 1</p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>[<em>placeholder for pack member profile pic</em>]</p>
                            <p>Pack member 2</p>
                        </div>
                    </li>
                </ul>
            </section>
            <section>
                <header>
                    <h3>My saved howls</h3>
                </header>
                <ul>
                    {context.userSavedHowls
                        .map(savedHowl => (
                            context.howls
                            .find(howl => howl.id === savedHowl.howl_id)
                        ))
                        .map(howl => <HowlListItem key={howl.id} howl={howl} />)
                    }
                </ul>            
            </section>
            <section>
                <header>
                    <h3>My howls</h3>
                </header>
                <ul>
                    {context.howls
                        .filter(howl => howl.user_id === context.user.id)
                        .map(howl => (
                            <HowlListItem key={howl.id} howl={howl} />
                        ))
                    }
                    
                </ul>
            </section>
            <section>
                <header>
                    <h3>Recent reviews of my dogs</h3>
                </header>
                <ul>
                    <li>
                        <h3>Review of Seymour</h3>
                        <p>Left by: B. Simpson</p>
                        <p>From Seymour's playdate with Santos L. Halper on February 10, 2020</p>
                    </li>
                </ul>
            </section>
        </>
    );
}

export default Homepage;