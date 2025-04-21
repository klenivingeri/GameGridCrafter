import type { MetaFunction } from "@remix-run/node";
import {Tela} from '../components/Tela'
import { ButtonExpand } from '../components/ButtonExpand'
import {ButtonEye} from '../components/ButtonEye'
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="relative h-screen overflow-hidden">
    <div className="fixed top-0 left-0 w-full bg-gray-200 h-[60px] z-10 flex justify-between items-center">
      <div>Menu Superior</div>
      <div>
      <ButtonEye />
      <ButtonExpand />
      </div>
      </div>
    <div className="pt-[60px] pb-[60px] h-full overflow-auto">
    <Tela />
    </div>
    <div className="fixed bottom-0 left-0 w-full bg-gray-200 h-[60px] z-10">Menu inferior</div>
    </div>
  );
}

