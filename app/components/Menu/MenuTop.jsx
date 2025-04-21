import { ButtonExpand } from "./ButtonExpand";
import { ButtonEye } from "./ButtonEye";
import { CountMove } from './CountMove'
import { CountTime } from './CountTime'

export const MenuTop = () => {

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-200 h-[60px] z-10 flex justify-between items-center">
      <div>Menu Superior</div>
      <div className="flex flex-row">
        <CountTime />
        <CountMove />
        <ButtonEye />
        <ButtonExpand />
      </div>
    </div>
  )
}