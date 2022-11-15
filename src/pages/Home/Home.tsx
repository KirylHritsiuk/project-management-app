import './Home.scss';
import Board from './assets/board.png';
import Background from './assets/back.jpeg';
import Icon from './assets/icon.png';

import { TEAM } from '../../constants/constants';
import { ReactComponent as RssLogo } from '../../components/Footer/assets/rssLogo.svg';
import { Container } from '@mui/material';

export const Home = () => {
  return (
    <Container component="main" className="public_page">
      <div className="home_section">
        {/* <img src={Background2} alt="image background" className={styles.home_background_image} /> */}
        <div className="home_main">
          <h1>Kanban Board</h1>
          <p>
            <b>Kanban</b> - is an application with a wide range of possibilities for creating and
            managing boards.
          </p>
        </div>
        <img src={Board} alt="image deskboard" className="home_image" />
      </div>
      <div className="project_section">
        {/* <img src={Background} alt="image background" className="project_image" /> */}
        <div className="project_main">
          <h2>Project management system</h2>
          <span>with</span>
          <RssLogo className="project_rss" />
        </div>
        <p className="project_description">
          Project management system is an application that helps a team or group of developers
          achieve their goals. Все новые объекты, созданные в файле, по умолчанию серого цвета.
          Бывают ситуации, когда вам нужно создать множество объектов с другим цветом. Используйте
          Set Default Properties: скопируйте цвет нужного объекта один раз и все последующие объекты
          будут созданы с заданными свойствами.
        </p>
      </div>
      <div className="about_section">
        {/* <img src={Background2} alt="image background" className={styles.about_image} /> */}
        <h2>Who we are</h2>
        <div className="about_members">
          {TEAM.map((item, index) => (
            <div key={index} className="about_member">
              <div className="about_member_head">
                <img src={Icon} alt="image background" className="about_member_image" />
              </div>
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};
