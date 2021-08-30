import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({post}) {
  console.log(post)
  
  return (
    <main className={styles.post}>
      <img src="/assets/images/Banner.png" alt="" />

      <article className={styles.postContainer}>
        <h1>Criando um app CRA do zero</h1>

        <div className={styles.info}>
          <FiCalendar size={20} />
          <time>15 Mar 2021</time>
          <FiUser size={20} />
          <h6>Joseph Oliveira</h6>
          <FiClock size={20} />
          <h6>4 min</h6>
        </div>

        <div className={styles.postContent}>
          Lorem ipsum
        </div>
      </article>
    </main>
  )
}

export const getStaticPaths = async () => {
  // const prismic = getPrismicClient();
  // const posts = await prismic.query(TODO);

  return {
    paths: [],
    fallback: 'blocking'
  }
  
  // TODO
};

export const getStaticProps = async ({ params }) => {
  const slug = params.slug;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      banner: {
        url: response.data.banner.url
      },
      author: response.data.author,
      content: response.data.content
    }
  }

  return {
    props: {post}
  }
};
