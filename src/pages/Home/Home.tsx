import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { TEAM } from '../../constants/constants';

import Board from './assets/Example.png';
import Icon from './assets/icon.png';
import { ReactComponent as RssLogo } from 'components/Footer/assets/rssLogo.svg';
import './Home.scss';

const Home = () => {
  const { t } = useTranslation();
  return (
    <Container component="main" className="public_page">
      <div className="home_section">
        <div className="home_main">
          <h2>{t('Main title')}</h2>
          <p>{t('Main description')}</p>
        </div>
        <img src={Board} alt="image deskboard" className="home_image" />
      </div>
      <div className="project_section">
        <div className="project_main">
          <h2>{t('project')}</h2>
          <span>{t('with')}</span>
          <RssLogo className="project_rss" />
        </div>
        <p className="project_description">{t('big description')}</p>
      </div>
      <div className="about_section">
        <h2>{t('Team')}</h2>
        <div className="about_members">
          {TEAM.map((item, index) => (
            <div key={index} className="about_member">
              <div className="about_member_head">
                <img src={Icon} alt="image background" className="about_member_image" />
              </div>
              <h3>{t(item.name)}</h3>
              <p>{t(item.desc)}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Home;
