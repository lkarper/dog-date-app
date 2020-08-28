import React, { useState, useEffect } from 'react';
import './UploadDogProfilePhoto.css';

const UploadDogProfilePhoto = (props) => {
    
    const { 
        imgUrlP, 
        setImgUrlP, 
        setImgDataP,
        uploadDogProfile, 
        suffix 
    } = props;

    const [imgFile, setImgFile] = useState();
    const [imgUrl, setImgUrl] = useState(imgUrlP);

    useEffect(() => {
        if (imgUrl !== imgUrlP) {
            setImgUrlP(imgUrl);
        } else if (imgUrlP === null) {
            uploadDogProfile();
        }
    }, [imgUrl, imgUrlP, setImgUrlP, uploadDogProfile]);

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('upload clicked')

        const reader = new FileReader();
        
        reader.onload = (e) => {
            setImgDataP(e.target.result)
        } 
        
        reader.readAsDataURL(imgFile);
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
                <div className='UploadDogProfilePhoto__outer-container'>
                    <img 
                        src={URL.createObjectURL(imgFile)} 
                        alt='Avatar preview.' 
                        className='UploadDogProfilePhoto__img-preview'
                    />
                </div>
            </>
        );
    }

    return (
        <section className={`UploadDogProfilePhoto__outer-section${suffix} section`}>
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
                    disabled={!imgFile}
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
