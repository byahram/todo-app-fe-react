import { useState } from "react";

function BotAddButton() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <>
      {/* Dimmed Background when Popup is Open */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30"></div>
      )}

      {/* Fixed Navigation Bar */}
      <nav className="absolute bottom-0 left-0 right-0 bg-gray-50 border-t border-gray-200 rounded-b-2xl z-20">
        <div className="flex justify-center items-center px-4 h-16">
          {/* Add Button or Close Button */}
          <button
            onClick={togglePopup}
            className="flex items-center justify-center w-12 h-12 bg-red-400 text-white rounded-full transform transition-all border-2 border-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Popup */}
      {isPopupOpen && (
        <div className="absolute bottom-2 left-2 right-2 bg-white shadow-2xl rounded-2xl transform transition-all z-40 border-2 border-black">
          <div className="relative">
            {/* Close Button */}
            <button
              onClick={togglePopup}
              className="absolute -top-6 right-1/2 translate-x-1/2 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center border-2 border-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Todo Input Form */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Add a New Todo
              </h2>
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter task name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter task description"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="shopping">Shopping</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <div className="flex items-center justify-end w-full">
                  <button
                    type="submit"
                    className="w-max bg-white text-black py-1 px-4 rounded-lg border-2 font-semibold border-black hover:bg-black hover:text-white"
                  >
                    Add Todo
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BotAddButton;
