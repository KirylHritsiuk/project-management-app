import styles from './Footer.module.scss';
import { ReactComponent as RssLogo } from './assets/rssLogo.svg';
import { ReactComponent as GitLogo } from './assets/gitLogo.svg';
import { ReactComponent as Copy } from './assets/copy.svg';

const TEAMS = [
  { login: 'KirylHritsiuk', link: 'https://github.com/KirylHritsiuk' },
  { login: 'Philonena', link: 'https://github.com/Philonena' },
  { login: 'kate-js', link: 'https://github.com/kate-js' },
];

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <a href="https://rs.school/react/">
          <RssLogo className={styles.rss_logo} />
        </a>
        <ul className={styles.list}>
          {TEAMS.map((item, index) => (
            <a href={item.link} key={index} className={styles.list_link}>
              <li>
                <GitLogo className={styles.git_hub} />
                <p>{item.login}</p>
              </li>
            </a>
          ))}
        </ul>
        <div className={styles.copy}>
          <Copy className={styles.copy_icon} />
          <p>2022</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
