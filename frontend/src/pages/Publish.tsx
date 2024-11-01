import { ChangeEvent, useState } from "react";
import Appbar from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

function Publish() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <Appbar />
      <div className="flex w-full justify-center pt-4">
        <div className="w-full max-w-screen-lg">
          <input
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Title"
          />
          <TextArea
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <button
            type="submit"
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                {
                  title,
                  content: description,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("jwt"),
                  },
                },
              );
              console.log(response);
              navigate(`/blog/${response?.data?.id}`);
            }}
            className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
}

export default Publish;

function TextArea({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <form>
      <div className="mb-4 w-full border">
        <div className="flex items-center justify-between border-b">
          <div className="w-full rounded-b-lg bg-white py-2">
            <label className="sr-only">Publish post</label>
            <textarea
              id="editor"
              rows={8}
              onChange={onChange}
              className="block w-full border-0 bg-white px-0 text-sm text-gray-800"
              placeholder="Write an article..."
              required
            />
          </div>
        </div>
      </div>
    </form>
  );
}
