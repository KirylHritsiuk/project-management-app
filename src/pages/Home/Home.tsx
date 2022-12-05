import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { TEAM } from '../../constants/constants';

import Board from './assets/Example.png';
import Icon from './assets/icon.png';
import RssLogo from 'components/Footer/assets/rssLogo.svg';
import './Home.scss';
import { motion } from 'framer-motion';
import { card, imgAnimation, textAnimation } from 'constants/animation';

const Home = () => {
  const { t } = useTranslation();
  return (
    <Container component="main" className="public_page">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2, once: true }}
        className="home_section"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3, once: true }}
          className="home_main"
        >
          <motion.h2 custom={3} variants={textAnimation}>
            {t('Main title')}
          </motion.h2>
          <motion.p custom={5} variants={textAnimation}>
            {t('Main description')}
          </motion.p>
        </motion.div>
        <motion.img
          variants={imgAnimation}
          custom={3}
          src={Board}
          alt="image deskboard"
          className="home_image"
        />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2, once: true }}
        custom={2}
        variants={imgAnimation}
        className="project_section"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={textAnimation}
          custom={3}
          viewport={{ amount: 0.4, once: true }}
          className="project_main"
        >
          <motion.h2 variants={textAnimation} custom={4}>
            {t('project')}
          </motion.h2>
          <motion.span variants={textAnimation} custom={4}>
            {t('with')}
          </motion.span>
          <motion.img
            variants={imgAnimation}
            custom={5}
            src={RssLogo}
            alt="RSSchool logo"
            className="project_rss"
          />
        </motion.div>
        <motion.p variants={textAnimation} custom={5} className="project_description">
          {t('big description')}
        </motion.p>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3, once: true }}
        className="about_section"
      >
        <motion.h2 variants={textAnimation}>{t('Team')}</motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.4, once: true }}
          className="about_members"
        >
          {TEAM.map((item, index) => (
            <motion.div
              initial="init"
              whileInView="anim"
              variants={card}
              whileHover="hover"
              viewport={{ amount: 0.4, once: true }}
              key={index}
              className="about_member"
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.4, once: true }}
                className="about_member_head"
              >
                <motion.img
                  custom={2}
                  variants={imgAnimation}
                  viewport={{ amount: 0.4, once: true }}
                  src={Icon}
                  alt="image background"
                  className="about_member_image"
                />
              </motion.div>
              <motion.h3
                variants={textAnimation}
                initial="hidden"
                whileInView="visible"
                custom={3}
                viewport={{ amount: 0.3, once: true }}
              >
                {t(item.name)}
              </motion.h3>
              <motion.p
                variants={textAnimation}
                initial="hidden"
                whileInView="visible"
                custom={4}
                viewport={{ amount: 0.4, once: true }}
              >
                {t(item.desc)}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default Home;
