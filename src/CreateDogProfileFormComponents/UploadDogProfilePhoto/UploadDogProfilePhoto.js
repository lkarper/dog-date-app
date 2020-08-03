import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import config from '../../config';
import './UploadDogProfilePhoto.css';

const UploadDogProfilePhoto = (props) => {
    
    const { imgUrlP, setImgUrlP, uploadDogProfile, suffix } = props;

    const [imgFile, setImgFile] = useState();
    const [imgUrl, setImgUrl] = useState(imgUrlP);
    const [showLoading, setShowLoading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(false);

    useEffect(() => {
        if (imgUrl !== imgUrlP) {
            setImgUrlP(imgUrl);
        } else if (imgUrlP === null || (uploadSuccess && imgUrl === imgUrlP)) {
            uploadDogProfile();
        }
    }, [imgUrl, imgUrlP, setImgUrlP, uploadDogProfile, uploadSuccess]);

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
                setUploadSuccess(true);
            })
            .catch(error => {
                console.log("error", error);
                setUploadError(error)
                setShowLoading(false);
                setUploadSuccess(false);
            });
    }

    const noPhoto = () => {
        setImgUrl(null);
    }

    let imagePreview = '';
    
    if (imgUrl && !imgFile) {
        imagePreview = (
            <>
                <button onClick={uploadDogProfile}>Keep current profile picture</button>
                <p>Current image:</p>
                <img 
                    src={imgUrl} 
                    alt='Avatar preview.' 
                    className='UploadDogProfilePhoto__img-preview'
                />
            </>
        );
    } else if (imgFile) {
        imagePreview = (
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
        );
    }

    return (
        <section className={`UploaddogProfilePhoto__outer-section${suffix}`}>
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
                <button onClick={noPhoto}>Don't use a photo</button>
            </form>
            <div 
                role='alert'
                className={`UploadDogProfilePhoto__img-preview-container${suffix}`}
            >
                {imagePreview}
            </div>
        </section>
    );
}

export default UploadDogProfilePhoto;
