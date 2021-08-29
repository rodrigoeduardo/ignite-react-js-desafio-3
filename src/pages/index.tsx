import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';

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

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home() {
  return (
    <main className={styles.homeContainer}>
      <img src="assets/icons/Logo.svg" className={styles.logo} alt="spacetraveling logo" />
      
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
    </main>
  )
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
