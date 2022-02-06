import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home({ blogs }) {
  console.log(blogs);
  return (
    <div>
      {blogs.data.map((blog) => {
        return (
          <div key={blog.id}>
            <h1>{blog.attributes.title}</h1>
            <h3>{blog.attributes.author}</h3>
            <p>{blog.attributes.body}</p>
            <Link href={`/${blog.id}`}>GO DEtails</Link>
          </div>
        );
      })}
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://strapi-blog4.herokuapp.com/api/blogs");
  const data = await res.json();

  return {
    props: { blogs: data },
  };
};
