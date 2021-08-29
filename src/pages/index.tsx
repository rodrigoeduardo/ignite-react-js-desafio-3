import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

import { FiCalendar, FiUser } from 'react-icons/fi'

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostsProps {
  postsArray: Post[]
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsArray }: PostsProps) {
  console.log(postsArray)
  return (
    <main className={styles.homeContainer}>
      <img src="assets/images/Logo.svg" className={styles.logo} alt="spacetraveling logo" />
      
      <div className={styles.post}>

        <h1>Como utilizar hooks</h1>

        <p>Pensando em sincronização em vez de ciclos de vida.</p>
        
        <div className={styles.info}>
          <FiCalendar size={20} />
          <time>15 Mar 2021</time>
          <FiUser size={20} />
          <h6>Joseph Oliveira</h6>
        </div>
      </div>

      <div className={styles.post}>

        <h1>Como utilizar hooks</h1>

        <p>Pensando em sincronização em vez de ciclos de vida.</p>
        
        <div className={styles.info}>
          <FiCalendar size={20} />
          <time>15 Mar 2021</time>
          <FiUser size={20} />
          <h6>Joseph Oliveira</h6>
        </div>
      </div>

      <div className={styles.post}>

        <h1>Como utilizar hooks</h1>

        <p>Pensando em sincronização em vez de ciclos de vida.</p>
        
        <div className={styles.info}>
          <FiCalendar size={20} />
          <time>15 Mar 2021</time>
          <FiUser size={20} />
          <h6>Joseph Oliveira</h6>
        </div>
      </div>

      <h3 className={styles.loadMorePosts}>Carregar mais posts</h3>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query([
    Prismic.predicates.at('document.type', 'posts')
  ], {
    fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
    pageSize: 100
  });

  const postsArray = postsResponse.results.map(post => {
    return {
      slug: post.uid,
      first_publication_date: format(
        new Date(post.last_publication_date),
        'dd MMM uuuu',
        {
          locale: ptBR,
        }
      ),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author
      }
    }
  })

  return {
    props: {postsArray}
  }
};
