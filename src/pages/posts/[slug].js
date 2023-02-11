import styles from "../../styles/Slug.module.css";
import { GraphQLClient, gql } from "graphql-request";
import moment from "moment";

const graphCMS = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT);

// This is the query that will be used to get the post by slug
const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      datePublished
      author {
        id
        name
        avatar {
          url
        }
      }
      content {
        html
      }
      coverPhoto {
        id
        url
      }
    }
  }
`;

// Query to get all the slugs
const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

//This
export async function getStaticPaths() {
  const { posts } = await graphCMS.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  // Fetch data from external API
  const data = await graphCMS.request(QUERY, { slug });
  const post = data.post;
  // will be passed to the page component as props
  return {
    props: {
      post,
    },
    // revalidate website for new content every 10 seconds (since its static)
    revalidate: 10,
  };
}

function BlogPost({ post }) {
  return (
    <main className={styles.blog}>
      <img src={post.coverPhoto.url} className={styles.cover} alt="" />
      <div className={styles.authdetails}>
        <img src={post.author.avatar.url} alt={post.author.name} />
        <div className={styles.authtext}>
          <h6>By {post.author.name}</h6>
          <h6 className={styles.date}>
            {moment(post.datePublished).format("MMMM DD, YYYY")}
          </h6>
        </div>
      </div>
      <div className={styles.title}>
        <h2>{post.title}</h2>
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content.html }}
      ></div>
    </main>
  );
}

export default BlogPost;
