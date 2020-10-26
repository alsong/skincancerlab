import React, { useEffect, useState,useRef } from 'react'
import ImageGallery from 'react-image-gallery';

function PatientImage(props) {
    const [Images, setImages] = useState([])

    const refImg = useRef(null)

    useEffect(() => {
        if (props.detail.images && props.detail.images.length > 0) {
            let images = [];

            props.detail.images && props.detail.images.map(item => {
                images.push({
                    original: `http://localhost:8000/${item}`,
                    thumbnail: `http://localhost:8000/${item}`
                })
            })
            setImages(images)
        }
    }, [props.detail])

    const _onImageClick = (event) =>{
        props.getImgSrc(event.target.src)
      }

    return (
        <div>
            <ImageGallery 
            onThumbnailClick={_onImageClick}
            ref={refImg} 
            items={Images} 
             />
        </div>
    )
}

export default PatientImage
