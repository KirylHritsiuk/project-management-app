import styles from './Footer.module.scss';
import { ReactComponent as RssLogo } from './rssLogo.svg';
import { ReactComponent as GitLogo } from './gitLogo.svg';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <RssLogo className={styles.rss_logo} />
        <p>2022</p>
        <ul className={styles.list}>
          <li>
            <GitLogo />
          </li>
          <li>
            <GitLogo />
          </li>
          <li>
            <GitLogo />
          </li>
        </ul>
      </div>
    </footer>
  );
};
