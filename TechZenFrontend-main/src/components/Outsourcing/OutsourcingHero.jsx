import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Code2 } from "lucide-react";
import styles from "./Outsourcing.module.css";

export default function OutsourcingHero({ onScrollToForm, onScrollToCapabilities }) {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          {/* Left Column Content */}
          <div className={styles.heroContent}>
            <h1 className={styles.heroHeading}>
              Your Trusted Technology Partner for{" "}
              <span className={styles.heroHighlight}>Software Development Outsourcing</span>
            </h1>

            <p className={styles.heroText}>
              Scale your technology capabilities with TechZen IT and HR Services LLC. We help IT
              companies, digital agencies, startups, and businesses build reliable software
              solutions through flexible development outsourcing, dedicated engineering teams, and
              long-term technology partnerships.
            </p>

            <div className={styles.heroCtaGroup}>
              <button
                type="button"
                className={styles.primaryCta}
                onClick={onScrollToForm}
              >
                <span>Discuss Your Project</span>
                <ArrowRight size={17} />
              </button>

              <button
                type="button"
                className={styles.secondaryCta}
                onClick={onScrollToCapabilities}
              >
                <span>Explore Our Services</span>
              </button>
            </div>

            <div className={styles.heroValueProps}>
              <div className={styles.valPropItem}>
                <div className={styles.valPropCheck}>
                  <CheckCircle2 size={13} />
                </div>
                <span>Flexible Development Engagements</span>
              </div>

              <div className={styles.valPropItem}>
                <div className={styles.valPropCheck}>
                  <CheckCircle2 size={13} />
                </div>
                <span>End-to-End Project Delivery</span>
              </div>

              <div className={styles.valPropItem}>
                <div className={styles.valPropCheck}>
                  <CheckCircle2 size={13} />
                </div>
                <span>Long-Term Technology Partnerships</span>
              </div>
            </div>
          </div>

          {/* Right Column: Code Editor & Delivery Dashboard Visual */}
          <div className={styles.heroVisualWrapper}>
            <div className={styles.floatingBadgeOne}>
              <div className={styles.metricBadgeIconEmerald}>
                <Zap size={18} />
              </div>
              <div className={styles.badgeContent}>
                <span className={styles.badgeLabel}>Delivery Velocity</span>
                <span className={styles.badgeValue}>99.4% On-Time Sprints</span>
              </div>
            </div>

            <div className={styles.ideWindow}>
              <div className={styles.ideHeader}>
                <div className={styles.ideDots}>
                  <span className={styles.ideDotRed} />
                  <span className={styles.ideDotYellow} />
                  <span className={styles.ideDotGreen} />
                </div>
                <div className={styles.ideTitle}>TechZenEnterprisePod.tsx</div>
                <div className={styles.ideBranch}>git: main*</div>
              </div>

              <div className={styles.ideCodeBody}>
                <div className={styles.codeLine}>
                  <span className={styles.lineNum}>01</span>
                  <span>
                    <span className={styles.tokenKeyword}>import</span> &#123;{" "}
                    <span className={styles.tokenVar}>createEnterprisePod</span> &#125;{" "}
                    <span className={styles.tokenKeyword}>from</span>{" "}
                    <span className={styles.tokenString}>'@techzen/engineering'</span>;
                  </span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.lineNum}>02</span>
                  <span>
                    <span className={styles.tokenKeyword}>export const</span>{" "}
                    <span className={styles.tokenFn}>outsourcingPartner</span> ={" "}
                    <span className={styles.tokenFn}>createEnterprisePod</span>(&#123;
                  </span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.lineNum}>03</span>
                  <span>
                    &nbsp;&nbsp;model:{" "}
                    <span className={styles.tokenString}>'Dedicated Engineering Team'</span>,
                  </span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.lineNum}>04</span>
                  <span>
                    &nbsp;&nbsp;stack: [
                    <span className={styles.tokenString}>'React.js'</span>,{" "}
                    <span className={styles.tokenString}>'Node.js'</span>,{" "}
                    <span className={styles.tokenString}>'MongoDB'</span>,{" "}
                    <span className={styles.tokenString}>'AWS'</span>],
                  </span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.lineNum}>05</span>
                  <span>
                    &nbsp;&nbsp;governance: &#123; ndaSigned:{" "}
                    <span className={styles.tokenKeyword}>true</span>, clientIP:{" "}
                    <span className={styles.tokenString}>'100% Protected'</span> &#125;,
                  </span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.lineNum}>06</span>
                  <span>
                    &nbsp;&nbsp;sprintCycle:{" "}
                    <span className={styles.tokenString}>'Agile Bi-Weekly Milestones'</span>
                  </span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.lineNum}>07</span>
                  <span>&#125;);</span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.lineNum}>08</span>
                  <span className={styles.tokenComment}>
                    // TechZen delivery: seamless integration with your internal team
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.floatingBadgeTwo}>
              <div className={styles.metricBadgeIcon}>
                <ShieldCheck size={18} />
              </div>
              <div className={styles.badgeContent}>
                <span className={styles.badgeLabel}>Partnership Guarantee</span>
                <span className={styles.badgeValue}>100% NDA & IP Protection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
