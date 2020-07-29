import React from 'react';
import UserContactInfo from '../UserContactInfo/UserContactInfo';

const Homepage = (props) => {
    return (
        <>
            <header>
                <h3>My Dog Dating Life</h3>
            </header>
            <UserContactInfo />
            <section>
                <header>
                    <h3>My dogs</h3>
                </header>
                <ul>
                    <li>
                        <div>
                            <p>[<em>placeholder for dog profile pic</em>]</p>
                            <p>Dog 1</p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>[<em>placeholder for dog profile pic</em>]</p>
                            <p>Dog 2</p>
                        </div>
                    </li>
                </ul>
            </section>
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
                    <li>
                        <h3>Race around the yard with me!</h3>
                        <p>Dog: Santos L. Halper</p>
                        <p>Avg. rating: 4.3 (15 reviews)</p>
                        <p>Availability:</p>
                            <ul className="availability">
                                <li>Saturday, August 10: 10:00 AM - 12:00 PM</li>
                            </ul>
                        <p>Location: 742 Evergreen Terrace, Springfield</p>
                        <p>No dogs interested yet...</p>
                    </li>
                </ul>            
            </section>
            <section>
                <header>
                    <h3>My howls</h3>
                </header>
                <ul>
                    <li>
                        <h3>Looking for 1-3 small dogs for some fetch!</h3>
                        <p>Availability:</p>
                            <ul className="availability">
                                <li>Mondays: 1:00 - 3:00 PM</li>
                                <li>Saturdays: 9:00 AM - 2:00 PM</li>
                            </ul>
                        <p>Location: Central Park, New New York, New York</p>
                        <p>2 dogs are interested!</p>
                    </li>
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