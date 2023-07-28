import React, { useState } from "react";
import axios from "axios";
import { RxInfoCircled } from "react-icons/rx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Home() {
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
    <div className="flex flex-col w-full min-h-screen justify-center items-center">
      <div className="text-center font-joane text-orange-300 cursor-pointer text-4xl w-full italic font-semibold">
        Samanta Content Evaluator
      </div>
      <div className="flex flex-col md:flex-row justify-between md:space-x-6 space-y-6 md:space-y-0 bg-cyan-700 w-full max-w-7xl p-8 sm:p-20 rounded-xl shadow-xl text-white overflow-hidden">
        <div className="relative">
          <div className="absolute z-0 w-40 h-40 bg-teal-400 rounded-full -left-36 -top-36"></div>
          <div className="flex justify-center items-center absolute z-0 w-40 h-40 bg-teal-400 rounded-full -right-36 -bottom-32">
            <button
              className="tracking-widest cursor-pointer inline-block self-center bg-red-800 text-white font-bold rounded-lg px-6 py-2 uppercase text-sm"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>

          <div className="relative z-10 bg-white rounded-xl shadow-lg px-14 py-20 text-gray-600">
            <div className="flex flex-col space-y-10">
              <div>
                <label for="" className="text-sm">
                  Content
                </label>

                <textarea
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  rows="5"
                  placeholder="Content"
                  className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300"
                ></textarea>
              </div>

              <div>
                <label for="" className="text-sm">
                  Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Title"
                  className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300"
                />
              </div>

              <button
                className="tracking-widest cursor-pointer inline-block self-center bg-cyan-700 text-white font-bold rounded-lg px-6 py-2 uppercase text-sm"
                onClick={handleApiRequest}
              >
                Check
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-xl">
          {isLoading ? (
            <div className="text-amber-300  font-joane">
              <AiOutlineLoading3Quarters/>
            </div>
          ) : response ? (
            <div>
              <h2 className="text-2xl font-bold font-joane text-center text-amber-300">
                Response :
              </h2>
              <div className="p-2 text-base space-y-1 border border-black">
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
                  <strong className="text-amber-300 font-joane">
                    - Title :
                  </strong>{" "}
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
          ) : (
            <div className="text-xl font-mono">
              <strong className="flex gap-2">
                <RxInfoCircled />
                Welcome to the DoWell API
              </strong>
              You can determine if the content is written by AI or human,
              measure the confidence level (percentage) indicating whether AI or
              human authorship is more likely, and detect plagiarism. The
              response will also include the letter count, sentence count, and
              paragraph count.{" "}
              <strong className="uppercase">you can checkout!</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
