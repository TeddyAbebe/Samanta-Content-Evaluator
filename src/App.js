import ApiTester from "./ApiTester";
import "./App.css";

function App() {
  return (
    <div className=" bg-[#00fa9a] min-h-screen">
      <div className="flex justify-center items-center text-center font-serif text-4xl w-full pt-5 pb-8 italic font-semibold hover:underline hover:decoration-dashed hover:underline-offset-8 hover:decoration-4">
        Samanta Content Evaluator
      </div>
      <ApiTester />
    </div>
  );
}

export default App;
