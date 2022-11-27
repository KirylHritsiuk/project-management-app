import { Container } from '@mui/material';
import { TEAM } from 'constants/constants';
// import Board from './assets/board.png';
import Board from './assets/Example.png';
import Icon from './assets/icon.png';
import { ReactComponent as RssLogo } from 'components/Footer/assets/rssLogo.svg';

import './Home.scss';

const Home = () => {
  return (
    <Container component="main" className="public_page">
      <div className="home_section">
        <div className="home_main">
          <h2>Kanban Board</h2>
          <p>
            <b>Kanban</b> - is an application with a wide range of possibilities for creating and
            managing boards.
          </p>
        </div>
        <img src={Board} alt="image deskboard" className="home_image" />
      </div>
      <div className="project_section">
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

export default Home;
