import React, { useState } from "react";
import axios from "axios";

function ApiTester() {
  const [response, setResponse] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle API request
  const handleApiRequest = async () => {
    try {
      setIsLoading(true);
      const payload = {
        content: inputValue,
        title: title,
      };

      const response = await axios.post(
        `https://100085.pythonanywhere.com/uxlivinglab/v1/content-scan/a12058a2-ee58-4c58-ba53-4e9df34fc8db/`,
        payload
      );
      setResponse(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle input value changes
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleReset = () => {
    setInputValue("");
    setTitle("");
    setResponse(null);
    // window.location.reload();
  };

  return (
    <div className="flex gap-10 pl-20 items-center">
      <div className="flex flex-col w-[35%] bg-slate-900 justify-center items-center rounded-2xl">
        <div className="flex flex-col w-full px-8 pt-16 pb-10">
          <textarea
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Content"
            className=" rounded p-1 mb-3 h-56 w-full max-w-screen"
          />

          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Title"
            className="rounded p-1 w-1/2"
          />
        </div>

        <div className="flex justify-center gap-2 w-full p-2">
          <button
            className="w-[30%] hover:text-white font-medium font-serif rounded border-2 border-black bg-green-400 p-2"
            onClick={handleApiRequest}
          >
            Check
          </button>

          <button
            className="w-[30%] hover:text-white font-medium font-serif rounded border-2 border-black bg-red-800 p-2"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="text-white border-black bg-slate-900 justify-center items-center rounded-2xl max-w-2xl overflow-hidden">
        {isLoading ? (
          <p className="p-4">Checking...</p>
        ) : response ? (
          <pre>{JSON.stringify(response, null, 2)}</pre>
        ) : null}
      </div>
    </div>
  );
}

export default ApiTester;
