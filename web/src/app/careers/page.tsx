import React from 'react';
import styles from '../info-page.module.css';

export default function CareersPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Join the Future of Writing</h1>
        <p className={styles.subtitle}>
          Help us build the next generation of AI-powered communication tools. We're looking for thinkers, creators, and builders.
        </p>
      </header>

      <main className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Why Writing Assistant?</h2>
          <div className={styles.textBlock}>
            At <span className={styles.highlight}>Writing Assistant</span>, you'll work at the intersection of deep learning and human linguistics. We are a fast-growing, remote-first team dedicated to solving one of humanity's oldest challenges: effective communication.
          </div>
          
          <div className={styles.grid}>
            <div className={styles.card}>
              <span className={styles.cardIcon}>🏠</span>
              <h3 className={styles.cardTitle}>Remote-First</h3>
              <p>Work from wherever you are most productive. We provide a $2,000 home office stipend.</p>
            </div>
            <div className={styles.card}>
              <span className={styles.cardIcon}>📈</span>
              <h3 className={styles.cardTitle}>Equity & Growth</h3>
              <p>Generous stock options for all employees. We grow together as a team.</p>
            </div>
            <div className={styles.card}>
              <span className={styles.cardIcon}>🩺</span>
              <h3 className={styles.cardTitle}>Full Wellness</h3>
              <p>Premium health, dental, and vision insurance. Mental health days are encouraged.</p>
            </div>
            <div className={styles.card}>
              <span className={styles.cardIcon}>🏝️</span>
              <h3 className={styles.cardTitle}>Unlimited PTO</h3>
              <p>We trust you to manage your time. Take the rest you need to stay brilliant.</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Open Positions</h2>
          <div className={styles.textBlock}>
            We are currently scaling our Engineering and Product teams. Explore our active openings below:
          </div>
          
          <div className={styles.grid}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Senior AI Researcher</h3>
              <p>Specialized in NLP and Transformer architectures. Focus on low-latency inference.</p>
              <span className={styles.highlight}>Remote • Engineering</span>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Fullstack Engineer (Next.js)</h3>
              <p>Build beautiful, responsive interfaces for our millions of active users.</p>
              <span className={styles.highlight}>Remote • Engineering</span>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Product Designer</h3>
              <p>Create the "Hyper-Magical" experience that defines our premium brand.</p>
              <span className={styles.highlight}>Remote • Design</span>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Growth Lead</h3>
              <p>Help us expand our reach to students and professionals globally.</p>
              <span className={styles.highlight}>Remote • Marketing</span>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Our Culture</h2>
          <div className={styles.textBlock}>
            We value <span className={styles.highlight}>clarity</span> above all else. In our code, our communication, and our product. We are a high-trust organization that biases toward action and asynchronous deep work.
          </div>
        </section>

        <div className={styles.footerNote}>
          Writing Assistant is an equal opportunity employer.
        </div>
      </main>
    </div>
  );
}
