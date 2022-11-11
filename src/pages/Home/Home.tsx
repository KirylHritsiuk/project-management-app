import styles from './Home.module.scss';
import Board from './assets/board.png';
import Background from './assets/back.jpeg';
import Icon from './assets/icon.png';

import { TEAM } from '../../constants/constants';
import { ReactComponent as RssLogo } from '../../components/Footer/assets/rssLogo.svg';

export const Home = () => {
  return (
    <div className={styles.public_page}>
      <div className={styles.home_section}>
        {/* <img src={Background2} alt="image background" className={styles.home_background_image} /> */}
        <div className={styles.home_main}>
          <h1>Kanban Board</h1>
          <p>
            <b>Kanban</b> - is an application with a wide range of possibilities for creating and
            managing boards.
          </p>
        </div>
        <img src={Board} alt="image deskboard" className={styles.home_image} />
      </div>
      <div className={styles.project_section}>
        <img src={Background} alt="image background" className={styles.project_image} />
        <div className={styles.project_main}>
          <h2>Project management system</h2>
          <span>with</span>
          <RssLogo className={styles.project_image} />
        </div>
        <p className={styles.project_description}>
          Project management system is an application that helps a team or group of developers
          achieve their goals. Все новые объекты, созданные в файле, по умолчанию серого цвета.
          Бывают ситуации, когда вам нужно создать множество объектов с другим цветом. Используйте
          Set Default Properties: скопируйте цвет нужного объекта один раз и все последующие объекты
          будут созданы с заданными свойствами.
        </p>
      </div>
      <div className={styles.about_section}>
        {/* <img src={Background2} alt="image background" className={styles.about_image} /> */}
        <h2>Who we are</h2>
        <div className={styles.about_members}>
          {TEAM.map((item, index) => (
            <div key={index} className={styles.about_member}>
              <div className={styles.about_member_head}>
                <img src={Icon} alt="image background" className={styles.about_member_image} />
              </div>
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
