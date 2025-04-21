import { useUser } from '../../context/UserContext'

export const CountMove = () => {
  const { countMove } = useUser()

  return <div
    className='text-black flex items-center'
    style={{
      color: 'black',
      padding: '10px 15px',
      fontSize: '16px',
    }}>
    <div className='p-1'>
      <div style={{ width: '12px', height: '12px', position: 'relative' }}>
        <div style={{ background: 'black', width: '6px', height: '6px', position: 'absolute', top: '0', left: 0 }}></div>
        <div style={{ background: 'black', width: '6px', height: '6px', position: 'absolute', bottom: '0', right: 0 }}></div>
      </div>
    </div>
    <div>{countMove} </div></div>
}