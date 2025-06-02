import FlowCanvasWrapper from "./components/flow/FlowCanvas";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full h-[calc(100vh-48px)]">
        <FlowCanvasWrapper />
      </div>
    </main>
  );
}
