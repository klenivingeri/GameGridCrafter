import { useUser } from '../context/UserContext'
export const Modal = ({ open, onClose }) => {
  const { time, countMove, setShowComponent, setCountMove } = useUser()
  if (!open) return null;

  const handleOnClose = () => {
    onClose()
    setShowComponent('init')
    time.handleReset()
    setCountMove(0)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className="rounded-2xl shadow-lg pb-10 w-80 text-center text-black relative bg-white flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex flex-col'>
          <div>Tempo: {time.formatedTime}</div>
          <div>Movimentos: {countMove}</div>
        </div>
        <div>
          <button
            onClick={handleOnClose}
            className="bg-gradient-to-b from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-lg hover:brightness-110 transition mt-8 border-b-[6px] border-orange-700 shadow-md font-bold"
          >
            Jogar novamente
          </button>
        </div>

      </div>
    </div>

  );
}