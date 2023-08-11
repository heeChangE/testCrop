import React, { useCallback, useState } from "react";
import Cropper from 'react-easy-crop';
import { Slider } from "@material-ui/core";
import getCroppedImg from "./Crop";

const EasyCrop = ({ image }) => {
 const [crop, setCrop] = useState({ x: 0, y: 0 });
 const [zoom, setZoom] = useState(1);
 const [rotation, setRotation] = useState(0);
 const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
 const [croppedImage, setCroppedImage] = useState(null);

 const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
 }, []);

 const showCroppedImage = useCallback(async () => {
    try {
        const croppedImage = await getCroppedImg(
            image,
            croppedAreaPixels,
            rotation
        );
        console.log('donee', {croppedImage});
        setCroppedImage(croppedImage);
    } catch (e) {
        console.error(e);
    }
 }, [croppedAreaPixels, rotation, image]);

 const onClose = useCallback(() => {
    setCroppedImage(null);
 }, []);

  return (
    <div>
        <button style={{
            display: image === null || croppedImage !== null ? "none" : "block",
        }}
        onClick={showCroppedImage}>
            crop
        </button>
        <div className="container"
        style={{
            display: image === null || croppedImage !== null ? "none" : "block",
        }}
        >
        <div className="crop-container">
            <Cropper
                image="https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706__340.jpg"
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                zoomSpeed={4}
                maxZoom={3}
                zoomWithScroll={true}
                showGrid={true}
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
            {croppedImage && (
                <img className="cropped-image" src={croppedImage} alt="cropped" />
            )}
            {croppedImage && <button onClick={onClose}>close</button>}
        </div>
    </div>
  )
}

export default EasyCrop;