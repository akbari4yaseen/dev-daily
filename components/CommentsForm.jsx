import { useRef, useEffect, useState } from "react";
import { submitComment } from "../services";

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeEl = useRef();

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem("name");
    emailEl.current.value = window.localStorage.getItem("email");
  }, []);

  const handleCommentSubmission = () => {
    setError(false);

    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeEl.current;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = { comment, name, email, slug };

    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name", name);
      window.localStorage.removeItem("email", email);
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 ">
      <h3 className="text-xl font-semibold border-b pb-4 mb-8">
        Leave a Reply
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          className="w-full bg-gray-100 text-gray-700 p-4 outline-none rounded-lg focus:ring-2 focus:ring-gray-200"
          ref={commentEl}
          placeholder="Comment"
          name="comment"
          required
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2">
        <input
          type="text"
          className="w-full bg-gray-100 text-gray-700 px-4 py-2 outline-none rounded-lg focus:ring-2 focus:ring-gray-200"
          ref={nameEl}
          placeholder="Name"
          name="name"
          required
        />
        <input
          type="email"
          className="w-full bg-gray-100 text-gray-700 px-4 py-2 outline-none rounded-lg focus:ring-2 focus:ring-gray-200"
          ref={emailEl}
          placeholder="Email"
          name="email"
          required
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="flex items-center">
          <input
            className="w-4 h-4 accent-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
            type="checkbox"
            ref={storeEl}
            id="storeData"
            name="storeData"
          />
          <label
            className="cursor-pointer ml-2 text-gray-600"
            htmlFor="storeData"
          >
            Save my Info for the next time
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500 ">All fields are required!</p>
      )}
      <div className="mt-8">
        <button
          className="transition duration-500 ease-out px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-700"
          type="button"
          onClick={handleCommentSubmission}
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="float-right mt-3 text-green-500 text-xl font-semibold">
            Comment submitted for review.
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
