import type { MetaFunction } from "@remix-run/node";
import { Tela } from "../components/Tela";
import { MenuTop } from "../components/Menu/MenuTop";
import { MenuBot } from "../components/Menu/MenuBot";
import { UserProvider } from "../context/UserContext";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <UserProvider>
      <div className="relative h-screen overflow-hidden">
        <MenuTop />
        <div className="pt-[60px] pb-[60px] h-full overflow-auto">
          <Tela />
        </div>
        <MenuBot />
      </div>
    </UserProvider>
  );
}
