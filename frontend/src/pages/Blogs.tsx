import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";



function Blogs() {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>loading...</div>;
  }

  console.log(blogs);
  


  return (
    <div>
      <Appbar name="Sharabh" />
      <div className="flex justify-center">
        <div className="">
          {blogs.map(blog =>(

            <BlogCard
            id={blog?.id}
            authorName={blog?.author?.name || "anonymous"}
            title={blog?.title}
            content={blog?.content}
            publishedDate={'2nd Feb 2024'}
            />
          ))}
         
        </div>
      </div>
    </div>
  );
}

export default Blogs;
