import React, { useCallback, useState, useRef } from "react";
import Cropper from 'react-easy-crop';
import { Slider } from "@material-ui/core";
import getCroppedImg from "./Crop";

const EasyCrop = ({
    // image
    video
     }) => {
 const [crop, setCrop] = useState({ x: 0, y: 0 });
 const [zoom, setZoom] = useState(1);
 const [rotation, setRotation] = useState(0);
 const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
//  const [croppedImage, setCroppedImage] = useState(null);
 const [croppedVideo, setCroppedVideo] = useState(null);
 const cropperRef = useRef(null);

 const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
 }, []);

 // showCroppedImage
 const showCroppedVideo = useCallback(async () => {
    try {
        const croppedVideo = await getCroppedImg(
            // image,
            video,
            croppedAreaPixels,
            rotation
        );
        // console.log('donee', {croppedImage});
        console.log('donee', {croppedVideo});
        // setCroppedImage(croppedImage);
        setCroppedVideo(croppedVideo);
    } catch (e) {
        console.error(e);
    }
 }, [croppedAreaPixels, rotation, video /*image*/]);

 const onClose = useCallback(() => {
    // setCroppedImage(null);
    setCroppedVideo(null);
 }, []);

 const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setCroppedVideo(cropper.getCroppedCanvas().toDataURL());
 }

  return (
    <div>
        <button style={{
            display: video === null || croppedVideo !== null ? "none" : "block",
        }}
        onClick={showCroppedVideo}>
            crop
        </button>
        <div className="container"
        style={{
            display: video === null || croppedVideo !== null ? "none" : "block",
        }}
        >
        <div className="crop-container">
            <Cropper
                // image="https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706__340.jpg"
                // video="https://res.cloudinary.com/demo/video/upload/w_400,h_400,c_crop/dog.mp4"
                video={video}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                zoomSpeed={4}
                maxZoom={3}
                zoomWithScroll={true}
                showGrid={false}
                aspect={3 / 3}
                onZoomChange={setZoom}
                onCropChange={setCrop}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
            />
        </div>
            <div className="controls">
                <label>
                    Rotate
                    <Slider
                        value={rotation}
                        min={0}
                        max={360}
                        step={1}
                        aria-labelledby="rotate"
                        onChange={(e, rotation) => setRotation(rotation)}
                        className="range"
                    />
                </label>
                <label>
                    Zoom
                    <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="zoom"
                    onChange={(e, zoom) => setZoom(zoom)}
                    className="range"
                    />
                </label>
            </div>
        </div>
        <div className="cropped-image-container">
            {croppedVideo && (
                <video className="cropped-image" src={croppedVideo} alt="cropped" />
            // {croppedImage && (
            //     <img className="cropped-image" src={croppedImage} alt="cropped" />
            )}
            {croppedVideo && <button onClick={onClose}>close</button>}
            {/* {croppedImage && <button onClick={onClose}>close</button>} */}
        </div>
    </div>
  )
}

export default EasyCrop;