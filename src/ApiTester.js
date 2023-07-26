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
  };

  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="flex w-full justify-center items-center ">
        <div className="flex flex-col mx-5 md:mx-0 w-full max-w-xl bg-slate-900 justify-center items-center rounded-3xl">
          <div className="flex flex-col w-full p-3">
            <textarea
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Content"
              required
              className="rounded-xl p-1 mb-3 h-32 w-full max-w-screen"
            />

            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Title"
              required
              className="rounded p-1 w-1/2"
            />
          </div>

          <div className="flex justify-center gap-2 w-full p-2">
            <button
              className="w-[30%] font-bold space-x-4 font-joane hover:rounded-2xl rounded border-2 border-black bg-green-400 p-2"
              onClick={handleApiRequest}
              disabled={!inputValue || !title}
            >
              Check
            </button>

            <button
              className="w-[30%] hover:text-white font-joane text-amber-300 font-bold rounded border-2 border-black bg-red-800 p-2 hover:rounded-2xl"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="text-white mx-5 md:mx-0 border-black bg-slate-900 justify-center items-center rounded-3xl max-w-xl overflow-hidden">
        {isLoading ? (
          <p className="px-10 py-2 text-amber-300 font-joane">Checking...</p>
        ) : response ? (
          <div className="p-2">
            <h2 className="text-2xl font-bold font-joane text-center text-amber-300">
              Response :
            </h2>
            <div className="md:p-2">
              <p>
                <strong className="text-amber-300 font-joane">
                  - Success :
                </strong>{" "}
                {response.success ? "Yes" : "No"}
              </p>
              <p>
                {" "}
                <strong className="text-amber-300 font-joane">
                  - Message :
                </strong>{" "}
                {response.message}
              </p>
              <p>
                <strong className="text-amber-300 font-joane">
                  - Confidence level created by AI :
                </strong>{" "}
                {response["Confidence level created by AI"]}
              </p>
              <p>
                <strong className="text-amber-300 font-joane">
                  - Confidence level created by Human :
                </strong>{" "}
                {response["Confidence level created by Human"]}
              </p>
              <p>
                <strong className="text-amber-300 font-joane">
                  - AI Check :
                </strong>{" "}
                {response["AI Check"]}
              </p>
              <p>
                <strong className="text-amber-300 font-joane">
                  - Plagiarised :
                </strong>{" "}
                {response.Plagiarised}
              </p>
              <p>
                <strong className="text-amber-300 font-joane">
                  - Creative :
                </strong>{" "}
                {response.Creative}
              </p>
              <p>
                <strong className="text-amber-300 font-joane">
                  - Total characters :
                </strong>{" "}
                {response["Total characters"]}
              </p>
              <p>
                <strong className="text-amber-300 font-joane">
                  - Total sentences :
                </strong>{" "}
                {response["Total sentences"]}
              </p>
              <p>
                <strong className="text-amber-300 font-joane">
                  - Total paragraphs :
                </strong>{" "}
                {response["Total paragraphs"]}
              </p>
              <p>
                <strong className="text-amber-300 font-joane">
                  - Credits :
                </strong>{" "}
                {response.credits}
              </p>
              <p>
                <strong className="text-amber-300 font-joane">- Title :</strong>{" "}
                {response.title}
              </p>
              <p>
                <strong className="text-amber-300 font-joane">
                  - Content :
                </strong>{" "}
                {response.content}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ApiTester;
