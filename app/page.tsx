import FlowCanvasWrapper from "./components/flow/FlowCanvas";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <div className="w-full">
        <FlowCanvasWrapper />
      </div>
    </main>
  );
}
