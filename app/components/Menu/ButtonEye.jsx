import { useState } from 'react';
import { IconEye } from '../../icons/IconEye';
import { IconEyeSlash } from '../../icons/IconEyeSlash'
import { useUser } from '../../context/UserContext'

export const ButtonEye = () => {
  const { imageSrc } = useUser()
  const [showImage, setShowImage] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowImage(!showImage)}
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
        top: 50,
        right: 10,
        width: 150,
      }}><img src={imageSrc} /></div>)}

    </>
  )
}