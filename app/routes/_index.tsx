import type { MetaFunction } from "@remix-run/node";
import Playground from "../components/playground";
import ControlModeProvider from "../contexts/control-bar.provider";
import KubeComponentsProvider from "../contexts/kube-components.provider";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen w-screen">
      <ControlModeProvider>
        <KubeComponentsProvider>
          <Playground />
        </KubeComponentsProvider>
      </ControlModeProvider>
    </div>
  );
}
