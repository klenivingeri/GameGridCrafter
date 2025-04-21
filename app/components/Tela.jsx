import { useState } from 'react'
import PuzzleImage from './PuzzleImage'
import { toggleFullScreen } from '../utils/fullScreen'
import './styleTela.css';

export const Tela = () => {
  const [showComponent, setShowComponent] = useState('init')
  const [imageSrc, setImageSrc] = useState(null);
  const handleStart = () => {
    setShowComponent('game')
    toggleFullScreen()
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
    }
  };

  if (showComponent == 'init') {
    return <div
      className='h-full, w-full'
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: 400,
      }}>
        <input type="file" accept="image/*" onChange={handleImageUpload} width={200} />
      </div>

      <div className='botao-container'>
        <div onClick={handleStart}
          className='botao-iniciar'>
          Iniciar
        </div>
      </div>
    </div >
  }
  if (showComponent == 'game') {
    return <PuzzleImage imageSrc={imageSrc} />
  }

  return <div> nada selecionado</div>
}