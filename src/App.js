import ApiTester from "./ApiTester";
import "./App.css";

function App() {
  return (
    <div className=" bg-cyan-900 min-h-screen">
      <div className="flex justify-center font-serif text-5xl py-24 italic font-semibold hover:text-white">
        Samanta Content Evaluator
      </div>
      <ApiTester />
    </div>
  );
}

export default App;
