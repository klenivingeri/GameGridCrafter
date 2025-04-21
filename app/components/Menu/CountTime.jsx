import { useUser } from '../../context/UserContext'
import { Time } from '../../icons/Time'
export const CountTime = () => {
  const { time } = useUser()

  return <div className="flex flex-row items-center text-black" style={{ fontSize: '15px' }}>
    <Time /> {time.formatedTime}
  </div>
}