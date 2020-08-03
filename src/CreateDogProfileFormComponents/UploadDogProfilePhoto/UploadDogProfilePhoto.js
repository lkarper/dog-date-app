import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import config from '../../config';
import './UploadDogProfilePhoto.css';

const UploadDogProfilePhoto = (props) => {
    
    const { imgUrlP, setImgUrlP, uploadDogProfile } = props;

    const [imgFile, setImgFile] = useState();
    const [imgUrl, setImgUrl] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const [uploadError, setUploadError] = useState('');

    useEffect(() => {
        if (imgUrl !== imgUrlP) {
            setImgUrlP(imgUrl);
        } else if (imgUrlP) {
            uploadDogProfile();
        }
    }, [imgUrl, imgUrlP, setImgUrlP]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowLoading(true);

        const formData = new FormData();
        formData.append("file", imgFile);

        fetch(`https://api.cloudinary.com/v1_1/${config.cloud_name}/image/upload?upload_preset=${config.preset}`, {
            method: 'POST',
            body: formData,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error (res.statusText);
            })
            .then(resJson => {
                console.log(resJson);
                setUploadError('');
                setShowLoading(false);
                setImgUrl(resJson.secure_url);
            })
            .catch(error => {
                console.log("error", error);
                setUploadError(error)
                setShowLoading(false);
            });
    }

    return (
        <section>
            <header>
                <h2>Upload a photo for your dog's profile</h2>
            </header>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="profile-pic">Profile picture:</label>
                    <input
                        type="file"
                        id="profile-pic"
                        name="profile-pic"
                        accept="image/png, image/jpeg"
                        aria-describedby="file-type"
                        onChange={(e) => setImgFile(e.target.files[0])}
                    />
                <p id="file-type">(.png or .jpg only)</p>
                </div>
                <button
                    type='submit'
                    disabled={!imgFile || showLoading}
                >
                    Upload
                </button>
                <button onClick={uploadDogProfile}>Nevermind</button>
            </form>
            <div 
                role='alert'
                className='UploadDogProfilePhoto__img-preview-container'
            >
                {imgFile 
                    ?
                        <> 
                            <p>Image preview</p>
                            <img 
                                src={URL.createObjectURL(imgFile)} 
                                alt='Avatar preview.' 
                                className='UploadDogProfilePhoto__img-preview'
                            />
                            {showLoading && <FontAwesomeIcon icon={faSpinner} spin />}
                            {uploadError ? <p>Upload failed.  Please try again.</p> : ''}
                        </>
                    : ''
                }
            </div>
        </section>
    );
}

export default UploadDogProfilePhoto;
