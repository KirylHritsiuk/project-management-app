import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { TEAM } from '../../constants/constants';

import Board from './assets/Example.png';
import Icon from './assets/icon.png';
import { ReactComponent as RssLogo } from 'components/Footer/assets/rssLogo.svg';
import './Home.scss';
import { motion } from 'framer-motion';

const textAnimation = {
  hidden: {
    y: 25,
    opacity: 0,
  },
  visible: (custom = 1) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.1 },
  }),
};
const featureAnimation = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: (custom = 1) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.2 },
  }),
};

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
          viewport={{ amount: 0.2, once: true }}
          className="home_main"
        >
          <motion.h2 variants={textAnimation}>{t('Main title')}</motion.h2>
          <motion.p custom={2} variants={textAnimation}>
            {t('Main description')}
          </motion.p>
        </motion.div>
        <motion.img
          variants={featureAnimation}
          src={Board}
          alt="image deskboard"
          className="home_image"
        />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
        className="project_section"
      >
        <motion.div className="project_main">
          <motion.h2 variants={textAnimation}>{t('project')}</motion.h2>
          <motion.span custom={3} variants={textAnimation}>
            {t('with')}
          </motion.span>
          <RssLogo className="project_rss" />
        </motion.div>
        <motion.p custom={2} variants={textAnimation} className="project_description">
          {t('big description')}
        </motion.p>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
        className="about_section"
      >
        <motion.h2 variants={textAnimation}>{t('Team')}</motion.h2>
        <motion.div className="about_members">
          {TEAM.map((item, index) => (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2 }}
              key={index}
              className="about_member"
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.2 }}
                className="about_member_head"
              >
                <motion.img
                  variants={featureAnimation}
                  src={Icon}
                  alt="image background"
                  className="about_member_image"
                />
              </motion.div>
              <motion.h3 variants={textAnimation}>{t(item.name)}</motion.h3>
              <motion.p custom={3} variants={textAnimation}>
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
