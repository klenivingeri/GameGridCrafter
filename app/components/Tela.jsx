import PuzzleImage from './PuzzleImage'
import { toggleFullScreen } from '../utils/fullScreen'
import { useUser } from '../context/UserContext'
import './styleTela.css';

//https://api.unsplash.com/photos/random?query=landscape&client_id=grPWRJeUcReY6ZrCeLncFDd0BkTqiKarzvBwGLHP4ic'


export const Tela = () => {

  const { setImageSrc, showComponent, setShowComponent, imageSrc, setGrid } = useUser()

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

  const handleImg = (img = 'https://plus.unsplash.com/premium_photo-1744395627552-1349f5d80199?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') => {
    setShowComponent('game')
    toggleFullScreen()
    setImageSrc(img)
  }


  const handleSelect = (value) => {

    if (value == 35) {
      console.log('aaa', value)
      setGrid({ columns: 5, rows: 7 })
    }
    if (value == 64) {
      setGrid({ columns: 3, rows: 3 })
    }
    if (value == 100) {
      setGrid({ columns: 3, rows: 3 })
    }

  }


  if (showComponent == 'day') {
    return <div
      className='h-full w-full'
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 400,
      }}>
        <div className='botao-container'>
          <div onClick={() => handleImg()}
            className='botao-iniciar'>
            Imagem aleatoria
          </div>
        </div>
        <select defaultValue="" onChange={(e) => handleSelect(e.target.value)}>
          <option value="" disabled selected hidden>Selecione a quantidade de Grids</option>
          <option value="35">35</option>
          <option value="64">64</option>
          <option value="100">100</option>
        </select>
      </div>
    </div >
  }

  if (showComponent == 'line') {
    return <div
      className='h-full w-full'
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'red'
      }}>
    </div >
  }

  if (showComponent == 'my') {
    return <div
      className='h-full w-full'
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 6,
        }}>
          <div style={{ width: 300, marginBottom: '20px' }}>
            <img src={imageSrc} />
          </div>
          <input type="file" accept="image/*" onChange={handleImageUpload} width={200} />

          <select onChange={(e) => handleSelect(e.target.value)}>
            <option value="" disabled selected hidden>Selecione a quantidade de Grids</option>
            <option value="35">35</option>
            <option value="64">64</option>
            <option value="100">100</option>
          </select>
        </div>
        <div className='botao-container'>
          <div onClick={handleStart}
            className='botao-iniciar'>
            Iniciar
          </div>
        </div>

      </div>
    </div >
  }

  if (showComponent == 'lib') {
    return <div
      className='h-full w-full flex flex-wrap gap-2 overflow-auto p-2'
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="w-[100px] sm:w-[120px]" onClick={() => { handleImg() }}>
          <img
            src={`https://plus.unsplash.com/premium_photo-1744395627552-1349f5d80199?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
            alt={`img-${i}`}
            className="w-full h-[100px] object-cover rounded"
          />
        </div>
      ))}
    </div >
  }

  if (showComponent == 'game') {
    return (
      <div className='flex justify-center align-middle items-center h-full w-full'>
        <PuzzleImage />
      </div>
    )
  }

  return <div> nada selecionado</div>
}