import { useUser } from '../../context/UserContext'

export const MenuBot = () => {
  const { setShowComponent, time } = useUser()

  const handleMenu = (menu) => {
    setShowComponent(menu)
    time.handleReset()
  }

  return (
    <div className="fixed bottom-0 left-0 w-full h-[60px] z-10 bg-gray-700">
      <div className="w-full  h-full flex flex-row justify-around items-center">
        <div onClick={() => handleMenu('lib')}><span>Biblioteca</span></div>
        <div onClick={() => handleMenu('day')}><span>Diário</span></div>
        <div onClick={() => handleMenu('line')}><span>Jornada</span></div>
        <div onClick={() => handleMenu('my')}><span>Minha</span></div>
      </div>
    </div>
  )
}