import ptBR from 'date-fns/locale/pt-BR';
import format from 'date-fns/format';
import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { useRouter } from 'next/router';

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

export default function Post({post}: PostProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Carregando...</div>
  }

  const { author, banner, title, content } = post.data;  
  const first_publication_date = format(new Date(post.first_publication_date), 'dd MMM uuuu', { locale: ptBR });

  let entireContent = '';
  const regex = /[\s]/mgiu;

  post.data.content.forEach(postContent => {
    entireContent += postContent.heading+" ";
    entireContent += RichText.asText(postContent.body);
  });

  const wordsInContent = entireContent.split(regex).length;

  const timeToRead = Math.ceil(wordsInContent/200)

  return (
    <main className={styles.post}>
      <img src={banner.url} alt="Banner do post" />

      <article className={styles.postContainer}>
        <h1>{title}</h1>

        <div className={styles.info}>
          <FiCalendar size={20} />
          <time>{first_publication_date}</time>
          <FiUser size={20} />
          <h6>{author}</h6>
          <FiClock size={20} />
          <h6>{timeToRead} min</h6>
        </div>

        {content.map(content => (
          <div key={content.heading} className={styles.postContent}>
            <h2>{content.heading}</h2>

            <div
              dangerouslySetInnerHTML={{
                __html: RichText.asHtml(content.body),
              }}
            />
          </div>
        ))}
      </article>
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query([
    Prismic.predicates.at('document.type', 'posts')
  ], {
    pageSize: 1
  });

  const paths = posts.results.map(post => ({
    params: {
      slug: post.uid
    }
  }))

  return {
    paths,
    fallback: true
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.slug;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  return {
    props: {
      post: response
    },
    revalidate: 60 * 30 // 30 minutes
  }
};
