import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import PropTypes from 'prop-types';
import loadImage from 'blueimp-load-image';
import 'react-image-crop/dist/ReactCrop.css';
import './UploadDogProfilePhoto.css';

const UploadDogProfilePhoto = (props) => {
    const { 
        imgUrlP, 
        setImgUrlP, 
        setImgDataP,
        uploadDogProfile, 
        apiError,
        setApiError,
        suffix 
    } = props;

    const [imgFile, setImgFile] = useState();
    const [imgUrl, setImgUrl] = useState(imgUrlP);
    const [crop, setCrop] = useState({ 
        unit: '%', 
        height: 100, 
        aspect: 4 / 3, 
    });
    const [completedCrop, setCompletedCrop] = useState(null);
    const [upImg, setUpImg] = useState();
    const [initialWidth, setInitialWidth] = useState();
    const [initialHeight, setInitialHeight] = useState();

    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    
    // Triggers the profile upload api call if the user decides to keep an old profile photo when editing a profile
    useEffect(() => {
        if (imgUrl !== imgUrlP) {
            setImgUrlP(imgUrl);
        } else if (imgUrlP === null) {
            uploadDogProfile();
        }
    }, [imgUrl, imgUrlP, setImgUrlP, uploadDogProfile]);

    /* 
        Once the data URL is ready, the canvas is loaded for cropping the image; 
        cropping aspect ratio is locked to 4:3 for uniform profile photos
    */
    useEffect(() => {
        if (initialWidth && initialHeight) {
            
            /* 
                Sets the initial crop field to be either the maximum height or the maximum width
                allowed by a 4:3 aspect ratio, depending on the orientation of the uploaded photo
            */
            if (initialWidth > initialHeight) {    
                const cropWidth = initialHeight * 4 / 3;
                const xOffset = ((initialWidth - cropWidth) / 2) / initialWidth * 100;
                
                setCrop({ 
                    x: xOffset,
                    y: 0,
                    unit: '%', 
                    height: 100, 
                    aspect: 4 / 3, 
                });
            } else {
                const cropHeight = initialWidth * 3 / 4;
                const yOffset = ((initialHeight - cropHeight) / 2) / initialHeight * 100;

                setCrop({
                    x: 0,
                    y: yOffset, 
                    unit: '%', 
                    height: 100, 
                    aspect: 4 / 3, 
                });
            }
        }
    }, [initialWidth, initialHeight, setCrop]);

    /* 
        Converts the uploaded image file to base64 and rotates the image to a standardized exif; 
        image data is then used in canvas element for image crop
    */
    useEffect(() => {
        if (imgFile) {
            loadImage(imgFile,
                (img) => {
                    const base64data = img.toDataURL('image/png');
                    setUpImg(base64data);
                },
                { 
                    orientation: true, 
                    canvas: true,
                    maxWidth: 800,
                }
            );
        }
    }, [imgFile, setUpImg]);

    /* 
        Sets parent state so that no image is used in a profile; 
        if editing a profile, the old image is removed
    */
    const noPhoto = () => {
        setImgUrl(null);
        if (apiError) {
            setApiError(false);
        }
    }

    /* 
        Creates a new canvas from the cropped region by increasing the size,
        since the preview sized canvas that is displayed on screen is too small
        for the api upload
    */
    const getResizedCanvas = (canvas, newWidth, newHeight) => {
        const tmpCanvas = document.createElement('canvas');
        tmpCanvas.width = newWidth;
        tmpCanvas.height = newHeight;
        const ctx = tmpCanvas.getContext('2d');
        
        ctx.drawImage(
            canvas,
            0,
            0,
            canvas.width,
            canvas.height,
            0,
            0,
            newWidth,
            newHeight
        );

        return tmpCanvas;
    }

    // Generates data from the resized canavas that will be uploaded to api
    const generateUpload = (previewCanvas, crop) => {
        if (!crop || !previewCanvas) {
            return;
        }

        const canvas = getResizedCanvas(previewCanvas, crop.width * 5, crop.height * 5);

        canvas.toBlob(blob => {
                const reader = new FileReader();
                reader.onload = () => setImgDataP(reader.result);
                reader.readAsDataURL(blob);
            },
            'image/png',
            1
        );
    }

    const loaded = () => {
        const { width, height } = imgRef.current.getBoundingClientRect();
        setInitialWidth(width);
        setInitialHeight(height);
    }

    const onLoad = useCallback((img) => {
        imgRef.current = img;
        if (imgRef.current.complete) {
            loaded();
        } else {
            imgRef.current.addEventListener('load', loaded);
        }
    }, []);

    /* 
        Takes area of uploaded photo that falls within crop bounds and displays it as
        a preview of the cropped region that will be uploaded as a profile photo
    */
    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        /*
            Sets the scale by which the preview will be larger/smaller
            than the cropped region shown while cropping
        */
        const pixelRatio = 2;

        /* 
            Scales are used to properly set the cropped area's dimensions,
            since the image on screen that is being cropped has been resized
        */
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        const ctx = canvas.getContext('2d');

        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingEnabled = false;

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    }, [completedCrop]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setApiError(false);
        generateUpload(previewCanvasRef.current, completedCrop);
    }

    return (
        <section className={`UploadDogProfilePhoto__outer-section ${suffix} section`}>
            <header>
                <h2>Upload a photo for your dog's profile</h2>
            </header>
            <form onSubmit={handleSubmit}>
                <div>
                    <label 
                        className='UploadDogProfilePhoto__photo-label'
                        htmlFor='profile-pic'
                    >
                        Select an image file
                    </label>
                    <input
                        className='UploadDogProfilePhoto__file-input'
                        type='file'
                        id='profile-pic'
                        name='profile-pic'
                        accept='image/png, image/jpeg'
                        aria-describedby='file-type'
                        onChange={(e) => setImgFile(e.target.files[0])}
                    />
                    <p id='file-type'>(.png or .jpg only)</p>
                </div>
                <ReactCrop 
                    src={upImg}
                    imageAlt={upImg ? 'Canvas for cropping a 4:3 image.' : ''}
                    onImageLoaded={onLoad}
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}            
                />
                <div
                    className='UploadDogProfilePhoto__button-div'
                >
                    <button
                        className='UploadDogProfilePhoto__button button'
                        type='submit'
                        disabled={!imgFile}
                    >
                        Upload new photo
                    </button>
                    <button
                        className='UploadDogProfilePhoto__button button' 
                        onClick={noPhoto}
                    >
                        Don't use a photo
                    </button>
                </div>
            </form>
            <div 
                aria-live='polite'
                className={`UploadDogProfilePhoto__img-preview-container ${suffix}`}
            >
                <p>Upload image preview:</p>
                {imgFile 
                    ?
                        <canvas
                            className={`UploadDogProfilePhoto__preview-canvas ${suffix}`}
                            aria-label='Dog profile avatar preview.' 
                            role='img'
                            ref={previewCanvasRef}
                        />
                    : 
                        <img 
                            src='/images/upload_to_see_preview.png'
                            alt='Upload a file to see a preview.'
                            className={`UploadDogProfilePhoto__preview-canvas ${suffix}`}
                        />
                }        
                {imgUrl && 
                    <div className={`UploadDogProfilePhoto__current-img-container ${suffix}`}>
                        <p>Current image:</p>
                        <img 
                            src={imgUrl} 
                            alt='Avatar currently saved to profile.' 
                            className='UploadDogProfilePhoto__img-preview'
                        />
                        <button 
                            className='UploadDogProfilePhoto__button button'
                            onClick={uploadDogProfile}
                        >
                            Keep current profile picture
                        </button>
                    </div>
                }
            </div>
        </section>
    );
}

UploadDogProfilePhoto.defaultProps = {
    imgUrlP: '', 
    setImgUrlP: () => {}, 
    setImgDataP: () => {},
    uploadDogProfile: () => {}, 
    apiError: '',
    setApiError: () => {},
    suffix: '', 
};

UploadDogProfilePhoto.propTypes = {
    imgUrlP: PropTypes.string.isRequired,
    setImgUrlP: PropTypes.func.isRequired, 
    setImgDataP: PropTypes.func.isRequired,
    uploadDogProfile: PropTypes.func.isRequired, 
    apiError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    setApiError: PropTypes.func.isRequired,
    suffix: PropTypes.string.isRequired, 
};

export default UploadDogProfilePhoto;
