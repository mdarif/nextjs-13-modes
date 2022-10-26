import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

async function fetchData() {
  const res = await fetch(
    'https://almarfa.in/pokemon/pokemon-main/index.json',
    { cache: 'no-store' }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  const data = await res.json();
  return data;
}

export default async function Page() {
  const data = await fetchData();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Pokemon Modes with{' '}
          <a href='https://nextjs.org'>Next.js 13!</a>
        </h1>
        <div className={styles.grid}>
          {data.map((pokemon: any) => {
            return (
              <div className={styles.card} key={pokemon.id}>
                <Link href={`/pokemon/${pokemon.id}`}>
                  <Image
                    // loader={myLoader}
                    src={`https://almarfa.in/pokemon/pokemon-main/${pokemon.image}`}
                    alt={pokemon.name}
                    width={200}
                    height={200}
                    // priority={true} // When true, the image will be considered high priority and preload. Lazy loading is automatically disabled for images using priority.
                    priority={pokemon.id <= 20}
                  />
                  <h3>{pokemon.name}</h3>
                </Link>
              </div>
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
