import React from 'react';
import { Link } from 'react-router-dom';

const Landing = (props) => {
    return (
        <>
            <section>
                <header>
                    <h2>What is Dog Date?</h2>
                </header>
                <p>Nisi eu et elit laborum anim culpa voluptate incididunt irure. Elit laboris non reprehenderit enim
                    cillum labore aute non. Fugiat sunt consequat incididunt ex voluptate nostrud eu excepteur. Tempor
                    sint voluptate eiusmod anim elit amet magna anim duis cillum nulla occaecat culpa.
                </p>
            </section>
            <section>
                <header>
                    <h2>Create a profile for your dog!</h2>
                </header>
                    <p>[<em>placeholder for screenshot of profile page</em>]</p>
                    <p>Quis aliquip fugiat ullamco eiusmod voluptate anim in enim sit Lorem duis pariatur. Consectetur
                        occaecat laborum voluptate qui velit enim esse commodo veniam consectetur deserunt. Commodo ex
                        deserunt commodo nulla excepteur officia officia. Eu Lorem Lorem irure nisi. Quis consectetur minim
                        sint officia Lorem cupidatat mollit sit nisi.
                    </p>
            </section>
            <section>
                <header>
                    <h2>View Dogs Looking for a Friend Near you...</h2>
                </header>
                <p>[<em>placeholder for screenshot of pack-members-wanted page</em>]</p>
                <p>Quis aliquip fugiat ullamco eiusmod voluptate anim in enim sit Lorem duis pariatur. Consectetur
                    occaecat laborum voluptate qui velit enim esse commodo veniam consectetur deserunt. Commodo ex
                    deserunt commodo nulla excepteur officia officia. Eu Lorem Lorem irure nisi. Quis consectetur minim
                    sint officia Lorem cupidatat mollit sit nisi.
                </p>
            </section>
            <section>
                <header>
                    <h2>...or get your dog's profile howling and let others know your good dog is looking for a playmate!</h2>
                </header>
                <p>[<em>placeholder for screenshot of date creation page</em>]</p>
                <p>Quis aliquip fugiat ullamco eiusmod voluptate anim in enim sit Lorem duis pariatur. Consectetur
                    occaecat laborum voluptate qui velit enim esse commodo veniam consectetur deserunt. Commodo ex
                    deserunt commodo nulla excepteur officia officia. Eu Lorem Lorem irure nisi. Quis consectetur minim
                    sint officia Lorem cupidatat mollit sit nisi.
                </p>
            </section>
            <Link to='/register'>Get started by registering an account!</Link>
            <p>or</p>
            <Link to='/howls'>View Howls in your area!</Link>
        </>
    );
}

export default Landing;