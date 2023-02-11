import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { GraphQLClient, gql } from "graphql-request";
import BlogCard from "@/components/BlogCard";
import dotenv from "dotenv";

dotenv.config();

const graphCMS = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT);

const QUERY = gql`
  {
    posts {
      id
      title
      datePublished
      slug
      content {
        html
      }
      author {
        name
        avatar {
          url
        }
      }
      coverPhoto {
        url
      }
    }
  }
`;

export async function getStaticProps() {
  // Fetch data from graphCMS API using GraphQL query
  const { posts } = await graphCMS.request(QUERY);
  // will be passed to the page component as props
  return {
    props: {
      posts,
    },
    // revalidate website for new content every 10 seconds (since its static)
    revalidate: 10,
    fallback: false,
  };
}

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Vanessa&apos;s Blog Site</title>
        <meta name="description" content="Created a Blog Using JamStack" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            title={post.title}
            author={post.author}
            datePublished={post.datePublished}
            coverPhoto={post.coverPhoto}
            slug={post.slug}
          />
        ))}
      </main>
    </>
  );
}
