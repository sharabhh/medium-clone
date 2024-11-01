import { Circle } from "./BlogCard";


function BlogSkeleton() {
  return (
    <div>

        
      <div role="status" className="animate-pulse">

      <div className="border-b border-slate-200 p-4 w-screen max-w-screen-md cursor-pointer">
      <div className="flex">
      <div className="mb-4 h-4 w-48 rounded-full bg-gray-200"></div>
      <div className="mb-2.5 h-2 rounded-full bg-gray-200"></div>
        <div className="flex flex-col justify-center pl-2 text-sm font-extralight">
        </div>
          <Circle />
        <div className="flex flex-col justify-center pl-2 text-sm font-thin text-slate-500">
        <div className="mb-2.5 h-2 rounded-full bg-gray-200"></div>
        </div>
      </div>
      <div className="pt-2 text-xl font-semibold"><div className="mb-2.5 h-2 rounded-full bg-gray-200"></div></div>
      <div className="text-md font-thin">
        {/* check if the content is 100 characters or more */}
        <div className="mb-2.5 h-2 rounded-full bg-gray-200"></div>
      </div>
      <div className="pt-4 text-sm font-thin text-slate-400"><div className="mb-2.5 h-2 rounded-full bg-gray-200"></div></div>
    </div>

        
      </div>
    </div>
  );
}

export default BlogSkeleton;
