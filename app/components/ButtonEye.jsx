import { useState } from 'react';
import { IconEye } from '../icons/IconEye';
import { IconEyeSlash } from '../icons/IconEyeSlash'

export const ButtonEye = () => {
  const [showImage, setShowImage] = useState(false)
  const handleshowImage = () => {
    setShowImage(!showImage)
  }
  return (
    <>
      <button
        onTouchStart={() => setShowImage(!showImage)}
        style={{
          color: 'black',
          padding: '10px 15px',
          fontSize: '16px',
        }}
      >
        {showImage ? <IconEyeSlash /> : <IconEye />}
      </button>
      {showImage && (<div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        height: 200,
        width: 200,
        background: 'red'
      }}></div>)}

    </>
  )
}