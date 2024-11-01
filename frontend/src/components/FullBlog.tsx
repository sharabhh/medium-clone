import { Blog } from "../hooks";
import Appbar from "./Appbar";
import { Avatar } from "./BlogCard";

function FullBlog({ blog }: { blog: Blog }) {
  console.log(blog);

  return (
    <div>
      <Appbar name={blog?.author?.name} />
      <div className="flex justify-center">
        <div className="pt-200 grid w-full max-w-screen-2xl grid-cols-12 px-10 pt-12">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">{blog?.title}</div>
            <div className="pt-2 text-slate-500">Posted on 2nd Feb 2024</div>
            <div className="">{blog?.content}</div>
          </div>
          <div className="col-span-4">
            <div className="text-lg text-slate-600">Author</div>
            <div className="flex w-full">
              <div className="flex flex-col justify-center pr-4">
                <Avatar size="big" name={blog?.author?.name} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog?.author?.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  Random catch phrase about the author's ability to garb the
                  user's attention.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullBlog;
