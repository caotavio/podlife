import { GetStaticProps } from 'next';
import Image from 'next/image'; //config file is in next.config.js
import Link from 'next/link';
import Head from 'next/head';
import { format, parseISO } from 'date-fns';
import enCA from 'date-fns/locale/en-CA';
import { api } from '../services/api';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';

import styles from './home.module.scss';
import { usePlayer } from '../contexts/PlayerContext';

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  publishedAt: string;
  duration: number;
  durationAsString: string;
  url: string;
}

type HomeProps = {
  latestEpisodes: Episode[];
  restOfEpisodes: Episode[];
}

export default function Home({ latestEpisodes, restOfEpisodes }:HomeProps) {
  const { playList } = usePlayer();

  const episodesList = [...latestEpisodes, ...restOfEpisodes];

  return (
    <div className={styles.homepage}>
      <Head>
        <title>Home | PodLife</title>
      </Head>

      <section className={styles.latestEpisodes}>
        <h2>Latest releases</h2>
        
        <ul>
          { latestEpisodes.map((episode, index) => {
            return (
              <li key={episode.id}>
                <Image
                  width={192}
                  height={192}
                  src={episode.thumbnail}
                  alt={episode.title}
                  objectFit="cover"
                />

                <div className={styles.episodeDetails}>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button type="button" onClick={() => playList(episodesList, index)}>
                  <img src="/play.svg" alt="Play episode"/>
                </button>
              </li>
            )
          }) }
        </ul>
      </section>

      <section className={styles.restOfEpisodes}>
        <h2>Episodes</h2>
        
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Members</th>
              <th>Date</th>
              <th>Duration</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {restOfEpisodes.map((episode, index) => {
              return (
                <tr key={episode.id}>
                  <td style={{ width: 70 }}>
                    <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: 100 }}>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button type="button" onClick={() => playList(episodesList, index + latestEpisodes.length)}>
                      <img src="/play-green.svg" alt="Play episode"/>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 20,
      _sort: 'published_at',
      _order: 'desc'
    }
  })
  // const response =
  // const data = await response.data

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: enCA }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      url: episode.file.url
    };
  })

  const latestEpisodes = episodes.slice(0, 2);
  const restOfEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      restOfEpisodes
    },
    revalidate: 60 * 60 * 8,
  }
}