import React from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp, Target, BookOpen, BarChart2, Star } from 'lucide-react';
import styles from './CoachingCenter.module.css';
import GlassButton from './ui/GlassButton';

interface CoachingCenterProps {
  user: any;
  documents: any[];
  onClose: () => void;
}

const CoachingCenter: React.FC<CoachingCenterProps> = ({ user, documents, onClose }) => {
  const avgScore = documents.length > 0 
    ? Math.round(documents.reduce((acc, doc) => acc + (doc.score || 85), 0) / documents.length)
    : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`${styles.container} glass`}
    >
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h2 className="text-gradient">Coaching Center</h2>
          <p>Analyzing your path to writing mastery</p>
        </div>
        <GlassButton variant="ghost" onClick={onClose}>Close Dashboard</GlassButton>
      </div>

      <div className={styles.statsGrid}>
        <StatCard 
          icon={<Award className={styles.iconGold} />} 
          label="Current Level" 
          value={`Level ${user?.level || 1}`}
          sub={`${user?.xp || 0} Total XP`}
        />
        <StatCard 
          icon={<TrendingUp className={styles.iconBlue} />} 
          label="Average Score" 
          value={`${avgScore}`}
          sub="Last 10 docs"
        />
        <StatCard 
          icon={<Star className={styles.iconPink} />} 
          label="Writing Streak" 
          value={`${user?.streak || 0} Days`}
          sub="Keep it up!"
        />
        <StatCard 
          icon={<Target className={styles.iconPurple} />} 
          label="Writing Goals" 
          value="85%"
          sub="Mastery track"
        />
      </div>

      <div className={styles.mainContent}>
        <div className={styles.trendsSection}>
          <h3><BarChart2 size={18} /> Writing Trends</h3>
          <div className={styles.chartPlaceholder}>
            <svg viewBox="0 0 400 100" className={styles.sparkline}>
              <path d="M0,80 Q50,20 100,50 T200,30 T300,60 T400,10" fill="none" stroke="var(--accent-blue)" strokeWidth="3" />
              <circle cx="400" cy="10" r="4" fill="var(--accent-blue)" />
            </svg>
            <div className={styles.chartLabels}>
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>

        <div className={styles.lessonsSection}>
          <h3><BookOpen size={18} /> Personalized Lessons</h3>
          <div className={styles.lessonList}>
            <LessonItem title="Mastering the Passive Voice" difficulty="Intermediate" status="In Progress" />
            <LessonItem title="Comma Splicing 101" difficulty="Beginner" status="Completed" />
            <LessonItem title="Advanced Professional Tones" difficulty="Expert" status="Locked" />
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.aiAdvice}>
          <Star size={16} className={styles.iconGold} />
          <span><b>AI Advice:</b> Your clarity score has improved by 12% this week. Focus on reducing adjective density for even more punch.</span>
        </div>
      </div>
    </motion.div>
  );
};

const StatCard = ({ icon, label, value, sub }: any) => (
  <div className={`${styles.statCard} glass`}>
    <div className={styles.statIcon}>{icon}</div>
    <div className={styles.statInfo}>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statSub}>{sub}</div>
    </div>
  </div>
);

const LessonItem = ({ title, difficulty, status }: any) => (
  <div className={styles.lessonItem}>
    <div className={styles.lessonText}>
      <span className={styles.lessonTitle}>{title}</span>
      <span className={styles.lessonMeta}>{difficulty}</span>
    </div>
    <div className={`${styles.statusBadge} ${styles[status.toLowerCase().replace(' ', '')]}`}>
      {status}
    </div>
  </div>
);

export default CoachingCenter;
