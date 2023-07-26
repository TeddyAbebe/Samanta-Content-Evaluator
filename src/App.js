import ApiTester from "./ApiTester";
import "./App.css";

function App() {
  return (
    <div className=" bg-[#F1F1E6] min-h-screen">
      <div className="flex justify-center items-center text-center font-joane text-orange-500 cursor-pointer text-4xl w-full pt-5 pb-8 italic font-semibold">
        Samanta Content Evaluator
      </div>
      <ApiTester />
    </div>
  );
}

export default App;
