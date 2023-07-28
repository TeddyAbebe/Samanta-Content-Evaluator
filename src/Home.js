import React, { useState } from "react";
import axios from "axios";
import { RxInfoCircled } from "react-icons/rx";

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
      <div className="text-center font-joane text-amber-400 cursor-pointer text-4xl w-full italic font-semibold">
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
                <label for="" className="text-sm pb-2">
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
                <label for="" className="text-sm pb-2">
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
            <div role="status" className="items-center">
              <svg
                aria-hidden="true"
                class="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-amber-400 fill-cyan-700"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          ) : response ? (
            <div>
              <h2 className="text-2xl font-bold font-joane text-center text-amber-300">
                Response :
              </h2>
              <div className="p-2 text-base space-y-1">
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
                Welcome to the DoWell Samanta Content Evaluator
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
