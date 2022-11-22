import { Container, Link, Box } from '@mui/material';
import { ReactComponent as RssLogo } from './assets/rssLogo.svg';
import GitHubIcon from '@mui/icons-material/GitHub';
import { TEAM } from 'constants/constants';

import './Footer.scss';

export const Footer = () => {
  return (
    <Container component="footer" className="footer">
      <Link href="https://rs.school/react/">
        <RssLogo className="footer__rs" />
      </Link>
      <Box className="footer__git-links">
        <p className="footer__git-text">&#169;&nbsp;2022</p>
        <GitHubIcon className="footer__git-text" />
        {TEAM.map((item, index) => (
          <Link href={item.link} key={index} className="footer__git-link">
            {item.login}
          </Link>
        ))}
      </Box>
    </Container>
  );
};

export default Footer;
