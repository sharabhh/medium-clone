import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

function BlogCard({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) {
  return (
    <Link to={`/blog/${id}`}>
    <div className="border-b border-slate-200 p-4 w-screen max-w-screen-lg cursor-pointer">
      <div className="flex">
        <Avatar name={authorName} />
        <div className="flex flex-col justify-center pl-2 text-sm font-extralight">
          {authorName}
        </div>
        <div className="flex flex-col justify-center pl-2">
          <Circle />
        </div>
        <div className="flex flex-col justify-center pl-2 text-sm font-thin text-slate-500">
          {publishedDate}
        </div>
      </div>
      <div className="pt-2 text-xl font-semibold">{title}</div>
      <div className="text-md font-thin">
        {/* check if the content is 100 characters or more */}
        {content.length >= 100 ? content.slice(0, 100) + "..." : content}
      </div>
      <div className="pt-4 text-sm font-thin text-slate-400">{`${Math.ceil(content.length / 100)} minute(s) read`}</div>
    </div>
</Link>
  );
}

function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}

export function Avatar({ name= 'Anonymous', size = "small" }: { name: string; size?: string }) {
  return (
    <div
    className={`relative inline-flex ${size==="small"? "h-6 w-6": "w-10 h-10"} items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600`}
    >
      <span className={`${size==="small"? "text-xs": "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
        {name}
      </span>
    </div>
  );
}

export default BlogCard;
