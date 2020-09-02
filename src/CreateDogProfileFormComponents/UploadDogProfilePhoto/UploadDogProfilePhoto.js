import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
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
        unit: "%", 
        height: 100, 
        aspect: 4 / 3, 
    });
    const [completedCrop, setCompletedCrop] = useState(null);
    const [upImg, setUpImg] = useState();

    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    
    useEffect(() => {
        if (imgUrl !== imgUrlP) {
            setImgUrlP(imgUrl);
        } else if (imgUrlP === null) {
            uploadDogProfile();
        }
    }, [imgUrl, imgUrlP, setImgUrlP, uploadDogProfile]);

    useEffect(() => {
        if (imgFile) {
            const reader = new FileReader();
            reader.onload = () => setUpImg(reader.result);
            reader.readAsDataURL(imgFile);
        }
    }, [imgFile]);

    useEffect(() => {
        if (upImg) {

            const { width, height } = document.querySelector('.ReactCrop__image').getBoundingClientRect();

            if (width > height) {
                
                const cropWidth = height * 4 / 3;
                const xOffset = ((width - cropWidth) / 2) / width * 100;
                
                setCrop({ 
                    x: xOffset,
                    y: 0,
                    unit: "%", 
                    height: 100, 
                    aspect: 4 / 3, 
                });
            } else {

                const cropHeight = width * 3 / 4;
                const yOffset = ((height - cropHeight) / 2) / height * 100;

                setCrop({
                    x: 0,
                    y: yOffset, 
                    unit: "%", 
                    height: 100, 
                    aspect: 4 / 3, 
                });
            }
        }
    }, [upImg, setCrop])

    const noPhoto = () => {
        setImgUrl(null);
        if (apiError) {
            setApiError(false);
        }
    }

    const pixelRatio = 10;

    function getResizedCanvas(canvas, newWidth, newHeight) {
        const tmpCanvas = document.createElement("canvas");
        tmpCanvas.width = newWidth;
        tmpCanvas.height = newHeight;

        const ctx = tmpCanvas.getContext("2d");
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

    function generateDownload(previewCanvas, crop) {
        if (!crop || !previewCanvas) {
            return;
        }

        const canvas = getResizedCanvas(previewCanvas, crop.width * 5, crop.height * 5);

        canvas.toBlob(blob => {
                const reader = new FileReader();
                reader.onload = () => setImgDataP(reader.result);
                reader.readAsDataURL(blob);
            },
            "image/png",
            1
        );
    }

    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext("2d");

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
        generateDownload(previewCanvasRef.current, completedCrop)
    }

    return (
        <section className={`UploadDogProfilePhoto__outer-section ${suffix} section`}>
            <header>
                <h2>Upload a photo for your dog's profile</h2>
            </header>
            {suffix && <button className={`CreateDogProfile__close-button ${suffix}`} onClick={() => props.setShowEdit(false)}>&#10006;</button>}
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
                <ReactCrop 
                    src={upImg}
                    onImageLoaded={onLoad}
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}            
                />
                <div>
                    <button
                        type='submit'
                        disabled={!imgFile}
                    >
                        Upload new photo
                    </button>
                    <button onClick={noPhoto}>Don't use a photo</button>
                </div>
            </form>
            <div 
                aria-live='polite'
                className={`UploadDogProfilePhoto__img-preview-container ${suffix}`}
            >
                <p>Upload image preview</p>
                <canvas
                    className={`UploadDogProfilePhoto__preview-canvas ${suffix}`}
                    ref={previewCanvasRef}
                    style={{
                        width: upImg ? 200 : 0,
                        height: upImg ? 150 : 0
                    }}
                />
                {imgUrl && 
                    <div className={`UploadDogProfilePhoto__current-img-container ${suffix}`}>
                        <p>Current image:</p>
                        <img 
                            src={imgUrl} 
                            alt='Avatar currently saved to profile.' 
                            className='UploadDogProfilePhoto__img-preview'
                        />
                        <button onClick={uploadDogProfile}>Keep current profile picture</button>
                    </div>
                }
            </div>
            <div role='alert'>
                {apiError && <p>Error: Looks like something went wrong. Please check your connection and try again.</p>}
            </div>
        </section>
    );
}

export default UploadDogProfilePhoto;
