import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

function Appbar({ name='Anonymous' }: { name?: string }) {
  return (
    <div className="flex justify-between border-b px-10 py-4">
      <Link
        to={"/blogs"}
        className="flex cursor-pointer flex-col justify-center text-xl font-semibold"
      >
        Medium
      </Link>
      <div>
        <Link to={'/publish'}>
      <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mr-4">New</button>
        </Link>
        <Avatar size={"big"} name={name} />
      </div>
    </div>
  );
}

export default Appbar;
