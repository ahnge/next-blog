import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { buildUrl } from "cloudinary-build-url";

const BlogDetails = ({ blog }) => {
  const router = useRouter();

  const imgHash = blog.attributes.img.data[0].attributes.hash;

  const imgSrc = buildUrl(imgHash, {
    cloud: {
      cloudName: "ddwguc7vu",
    },
  });

  const blurImgSrc = buildUrl(imgHash, {
    cloud: {
      cloudName: "ddwguc7vu",
    },
    transformations: {
      effect: "blur:1000",
      quality: 1,
    },
  });

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{blog.attributes.title}</h1>
      <h3>{blog.attributes.author}</h3>
      <p>{blog.attributes.body}</p>
      <Link href={"/"}>go home</Link>
      <Image src={imgSrc} width={200} height={200} />
      <Image src={blurImgSrc} width={200} height={200} unoptimized={true} />
    </div>
  );
};

export default BlogDetails;

export const getStaticPaths = async () => {
  const res = await fetch("https://strapi-blog4.herokuapp.com/api/blogs");
  const blog = await res.json();
  console.log(blog);

  const ids = blog.data.map((bg) => {
    return {
      params: { id: bg.id.toString() },
    };
  });

  return {
    paths: ids,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;

  const res = await fetch(
    `https://strapi-blog4.herokuapp.com/api/blogs/${id}?populate=img`
  );
  const data = await res.json();
  console.log(data);

  return {
    props: {
      blog: data.data,
    },
  };
};
