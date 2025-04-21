import type { MetaFunction } from "@remix-run/node";
import {Tela} from '../components/Tela'

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="relative h-screen overflow-hidden">
    <div className="fixed top-0 left-0 w-full bg-gray-200 h-[60px] z-10">Menu Superior</div>
    <div className="pt-[60px] pb-[60px] h-full overflow-auto">
    <Tela />
    </div>
    <div className="fixed bottom-0 left-0 w-full bg-gray-200 h-[60px]">Menu inferior</div>
    </div>
  );
}

