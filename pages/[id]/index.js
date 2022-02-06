import Link from "next/link";

const blogDetails = ({ blog }) => {
  console.log(blog);
  return (
    <div>
      <h1>{blog.data.attributes.title}</h1>
      <h3>{blog.data.attributes.author}</h3>
      <p>{blog.data.attributes.body}</p>
      <Link href={"/"}>go home</Link>
    </div>
  );
};

export default blogDetails;

export const getStaticPaths = async () => {
  const res = await fetch("https://strapi-blog4.herokuapp.com/api/blogs");
  const data = await res.json();

  const paths = data.data.map((blog) => {
    return {
      params: { id: blog.id.toString() },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;

  const res = await fetch(`https://strapi-blog4.herokuapp.com/api/blogs/${id}`);
  const data = await res.json();

  return {
    props: {
      blog: data,
    },
  };
};
