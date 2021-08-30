import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

import { FiCalendar, FiUser } from 'react-icons/fi'
import { useEffect } from 'react';
import { useState } from 'react';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  const [posts, setPosts] = useState<Post[]>([])

  const [nextPage, setNextPage] = useState<string | null>(null)

  useEffect(() => {
    setPosts([...postsPagination.results])
    setNextPage(postsPagination.next_page)
  }, [])

  function handleLoadMorePosts() {
    fetch(nextPage)
    .then(response => response.json())
    .then((data: PostPagination) => {
      setPosts([...posts, ...data.results])
      setNextPage(data.next_page)
    })
  }
  
  return (
    <main className={styles.homeContainer}>
      <img src="assets/images/Logo.svg" className={styles.logo} alt="logo" />
      
      {posts.map(post => (
      <div key={post.uid} className={styles.post}>

        <h1>{post.data.title}</h1>

        <p>{post.data.subtitle}</p>
        
        <div className={styles.info}>
          <FiCalendar size={20} />
          <time>{post.first_publication_date}</time>
          <FiUser size={20} />
          <h6>{post.data.author}</h6>
        </div>
      </div>
      ))}

      {nextPage !== null && <h3 className={styles.loadMorePosts} onClick={handleLoadMorePosts}>Carregar mais posts</h3>}
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query([
    Prismic.predicates.at('document.type', 'posts')
  ], {
    fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
    pageSize: 1
  });

  const postsArray = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: format(
        new Date(post.first_publication_date),
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

  const postsPagination: PostPagination = {
    next_page: postsResponse.next_page,
    results: postsArray
  };

  return {
    props: {postsPagination}
  }
};
