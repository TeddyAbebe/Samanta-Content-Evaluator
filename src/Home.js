import React, { useState } from "react";
import axios from "axios";
import { RxInfoCircled } from "react-icons/rx";
import { AiFillSetting, AiFillCloseCircle } from "react-icons/ai";
import { BiSolidMoon } from "react-icons/bi";
import { BsSun } from "react-icons/bs";
import { WiMoonAltThirdQuarter } from "react-icons/wi";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { MdDisplaySettings, MdPayment } from "react-icons/md";

function Home() {
  const [credits, setCredits] = useState(localStorage.getItem("credits") || 0);
  const [response, setResponse] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState("default");
  const [showOptions, setShowOptions] = useState(false);
  const [showThemeOptions, setShowThemeOptions] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  const handleApiRequest = async () => {
    try {
      setIsLoading(true);
      const apiKey = process.env.REACT_APP_API_KEY;
      const payload = {
        content: inputValue,
        title: title,
      };

      // Call the process module service API
      const moduleServiceResponse = await axios.post(
        `https://100105.pythonanywhere.com/api/v3/process-services/?type=module_service&api_key=${apiKey}`,
        {
          sub_service_ids: ["DOWELL100342"],
          service_id: "DOWELL10034",
        }
      );

      if (moduleServiceResponse.data.success) {
        // Call the Samanta Content Evaluator API
        const response = await axios.post(
          `https://100085.pythonanywhere.com/uxlivinglab/v1/content-scan/${apiKey}/`,
          payload
        );

        // Update the state with the API response
        setResponse(response.data);

        // Update the credits state
        setCredits(response.data.credits);

        // Store the credits value in local storage
        localStorage.setItem("credits", response.data.credits);
      } else {
        console.log("Module service response indicates failure.");
      }
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

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const toggleThemeOptions = () => {
    setShowThemeOptions(!showThemeOptions);
    setShowPaymentOptions(false);
  };
  const togglePaymentOptions = () => {
    setShowPaymentOptions(!showPaymentOptions);
    setShowThemeOptions(false);
  };

  const containerClass = {
    default: "bg-cyan-700 text-white",
    dark: "bg-slate-800 text-gray-400",
    light: "bg-gray-300 text-black border-black",
  }[theme];

  return (
    <div
      className={`relative flex flex-col w-full min-h-screen justify-center items-center ${containerClass} `}
    >
      <div
        className={`text-center font-joane ${containerClass} cursor-pointer text-4xl w-full italic font-semibold`}
      >
        Samanta Content Evaluator
      </div>

      <div
        className={`flex flex-col md:flex-row justify-between md:space-x-6 space-y-6 md:space-y-0 ${containerClass} w-full max-w-6xl p-8 sm:p-10 md:p-20 rounded-xl shadow-xl text-white overflow-hidden`}
      >
        <button onClick={toggleOptions}>
          {!showOptions ? (
            <AiFillSetting
              className={`absolute z-0 right-[1%] top-[0.5%] lg:right-[10%] lg:top-10 w-7 h-7 text-teal-400 hover:cursor-pointer hover:animate-spin`}
            />
          ) : (
            <AiFillCloseCircle
              className={`absolute z-0 right-[1%] top-[0.5%] lg:right-[10%] lg:top-10 w-7 h-7 text-red-800 hover:cursor-pointer`}
            />
          )}
        </button>

        {showOptions && (
          <div
            className={`absolute border flex flex-col gap-2 z-20 ${containerClass} text-white right-[1%] top-[1%] lg:right-[2%] lg:top-[8.3%] pt-5 pb-5 px-4 rounded-lg shadow-md text-sm md:w-[18%]`}
          >
            <div className="flex justify-center items-center">
              <button
                className=" flex items-center hover:bg-gray-500 hover:text-black rounded-lg  px-1 py-3 border-b border-gray-800 gap-4 text-sm font-serif font-semibold tracking-wider"
                onClick={toggleThemeOptions}
              >
                <MdDisplaySettings />
                {showThemeOptions ? (
                  <>
                    Themes
                    <TiArrowSortedUp />
                  </>
                ) : (
                  <>
                    Themes
                    <TiArrowSortedDown />
                  </>
                )}
              </button>
            </div>

            {showThemeOptions && (
              <div className="flex flex-col gap-2 bg-yellow-100 py-2 px-1 rounded-lg shadow-md mb-4 border-x border-gray-700 text-gray-700 text-xs">
                <div>
                  <button
                    className="flex w-full items-center hover:bg-[#0E7490] hover:text-white rounded  px-4 py-2 gap-5 text-xs font-serif font-semibold tracking-wider"
                    onClick={() => setTheme("default")}
                  >
                    <WiMoonAltThirdQuarter />
                    Default
                  </button>
                </div>

                <div>
                  <button
                    className="flex w-full items-center hover:bg-[#1E293B] hover:text-[#9C9886] rounded  px-4 py-2 gap-5 text-xs font-serif font-semibold tracking-wider"
                    onClick={() => setTheme("dark")}
                  >
                    <BiSolidMoon />
                    Dark
                  </button>
                </div>

                <div>
                  <button
                    className="flex w-full items-center hover:bg-white rounded  px-4 py-2 gap-5 text-xs font-serif font-semibold tracking-wider"
                    onClick={() => setTheme("light")}
                  >
                    <BsSun />
                    Light
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-center items-center">
              <button
                className="flex items-center hover:bg-gray-500 hover:text-black rounded-lg  px-1 py-3 border-t border-gray-800 gap-3 text-sm font-serif font-semibold tracking-wider"
                onClick={togglePaymentOptions}
              >
                <MdPayment />
                {showPaymentOptions ? (
                  <>
                    Payments
                    <TiArrowSortedUp />
                  </>
                ) : (
                  <>
                    Payments
                    <TiArrowSortedDown />
                  </>
                )}
              </button>
            </div>

            {showPaymentOptions && (
              <div className="flex flex-col gap-2 bg-yellow-100 pt-2 pb-5 px-1 rounded-lg shadow-md mb-4 border-x border-gray-700 text-gray-700 text-xs">
                <div className="flex items-center justify-center bg-green-600 text-white rounded-lg  p-3">
                  <div className="text-xs font-serif font-semibold tracking-wider">
                    Credit System
                  </div>
                </div>

                <div className="flex flex-col hover:bg-gray-300 rounded border-b border-gray-700  px-1 py-1 gap-1 cursor-pointer">
                  <div className="text-xs font-serif font-semibold tracking-wider ">
                    Credit:
                  </div>
                  <div className="pl-2 font-extrabold">{credits}</div>
                </div>

                <div className="flex flex-col hover:bg-gray-300 rounded border-b border-gray-700  px-1 py-1 gap-1 cursor-pointer">
                  <div className="text-xs font-serif font-semibold tracking-wider">
                    Status:
                  </div>
                  <div className="pl-2 font-bold">inactive</div>
                </div>

                <div className="flex items-center justify-center bg-slate-700 text-white hover:bg-green-600 rounded-sm p-2">
                  <button
                    className="text-xs font-serif font-semibold tracking-wider"
                    // onClick={() => setTheme("light")}
                  >
                    Buy Credits
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="relative">
          <div className="absolute z-0 w-40 h-40 bg-teal-400 rounded-full -left-36 -top-36"></div>{" "}
          {response ? (
            <div className="flex justify-center items-center absolute z-0 w-36 h-36 bg-teal-400 rounded-full -right-20 -bottom-28 2xl:-right-36 md:-bottom-32">
              <button
                className="tracking-widest cursor-pointer inline-block self-center bg-red-800 text-white font-bold rounded-lg px-5 py-2 uppercase text-sm"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          ) : null}
          <div className="relative z-10 bg-gray-200 rounded-xl shadow-lg px-14 py-20 text-gray-600">
            <div className="flex flex-col space-y-10">
              <div className="space-y-2">
                <label
                  for=""
                  className="text-sm font-serif font-semibold tracking-wide"
                >
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

              <div className="space-y-2">
                <label
                  for=""
                  className="text-sm font-serif font-semibold tracking-wide"
                >
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
                className={`tracking-widest cursor-pointer inline-block self-center ${containerClass} border border-cyan-700 font-bold rounded-lg px-6 py-2 uppercase text-sm`}
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
            <div className={`${containerClass}`}>
              <h2 className="text-2xl font-bold font-joane text-center text-amber-500">
                Response :
              </h2>
              <div className="p-2 text-base space-y-1">
                <p>
                  <strong className="text-amber-500 font-joane">
                    - Success :
                  </strong>{" "}
                  {response.success ? "Yes" : "No"}
                </p>
                <p>
                  {" "}
                  <strong className="text-amber-500 font-joane">
                    - Message :
                  </strong>{" "}
                  {response.message}
                </p>
                <p>
                  <strong className="text-amber-500 font-joane">
                    - Confidence level created by AI :
                  </strong>{" "}
                  {response["Confidence level created by AI"]}
                </p>
                <p>
                  <strong className="text-amber-500 font-joane">
                    - Confidence level created by Human :
                  </strong>{" "}
                  {response["Confidence level created by Human"]}
                </p>
                <p>
                  <strong className="text-amber-500 font-joane">
                    - AI Check :
                  </strong>{" "}
                  {response["AI Check"]}
                </p>
                <p>
                  <strong className="text-amber-500 font-joane">
                    - Plagiarised :
                  </strong>{" "}
                  {response.Plagiarised}
                </p>
                <p>
                  <strong className="text-amber-500 font-joane">
                    - Creative :
                  </strong>{" "}
                  {response.Creative}
                </p>
                <p>
                  <strong className="text-amber-500 font-joane">
                    - Total characters :
                  </strong>{" "}
                  {response["Total characters"]}
                </p>
                <p>
                  <strong className="text-amber-500 font-joane">
                    - Total sentences :
                  </strong>{" "}
                  {response["Total sentences"]}
                </p>
                <p>
                  <strong className="text-amber-500 font-joane">
                    - Total paragraphs :
                  </strong>{" "}
                  {response["Total paragraphs"]}
                </p>
                <p>
                  <strong className="text-amber-500 font-joane">
                    - Credits :
                  </strong>{" "}
                  {response.credits}
                </p>
                <p>
                  <strong className="text-amber-500 font-joane">
                    - Title :
                  </strong>{" "}
                  {response.title}
                </p>
                <p>
                  <strong className="text-amber-500 font-joane">
                    - Content :
                  </strong>{" "}
                  <span className="text-[12px]">{response.content}</span>
                </p>
              </div>
            </div>
          ) : (
            <div className={`text-base font-mono text-${containerClass}`}>
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
