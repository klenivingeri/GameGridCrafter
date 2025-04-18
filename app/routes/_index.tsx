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
    <Tela />
  );
}

