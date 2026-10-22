// import SectionHeading from "../SectionHeading";
// import { processSteps } from "../../data/siteData";
// import styles from "./Process.module.css";

// export default function Process() {
//   return (
//     <section className={styles.section} id="process">
//       <div className={styles.container}>
//         <SectionHeading
//           eyebrow="OUR PROCESS"
//           title="A simple path from <em>question to action.</em>"
//           description="Structured enough to create momentum. Flexible enough to fit the way your organization works."
//         />

//         <div className={styles.roadmap}>
//           <div className={styles.roadLine} />

//           {processSteps.map(([n, t, d], index) => (
//             <div
//               className={`${styles.roadItem} ${
//                 index % 2 === 0 ? styles.left : styles.right
//               }`}
//               key={n}
//             >
//               <div className={styles.roadContent}>
//                 <div className={styles.stepMeta}>
//                   <span className={styles.stepNumber}>{n}</span>
//                   <span className={styles.stepLabel}>
//                     STEP {String(index + 1).padStart(2, "0")}
//                   </span>
//                 </div>

//                 <h3>{t}</h3>
//                 <p>{d}</p>
//               </div>

//               <div className={styles.roadDot}>
//                 <span />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }





import { processSteps } from "../../data/siteData";
import styles from "./Process.module.css";

export default function Process() {
  return (
    <section className={styles.section} id="process">
      <div className={styles.container}>

        {/* SECTION HEADING */}
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>OUR PROCESS</p>

          <h2>
            A simple path from <em>question to action.</em>
          </h2>

          <p className={styles.description}>
            Structured enough to create momentum. Flexible enough to fit the
            way your organization works.
          </p>
        </div>

        {/* ROADMAP */}
        <div className={styles.roadmap}>
          <div className={styles.roadLine} />

          {processSteps.map(([n, t, d], index) => (
            <div
              className={`${styles.roadItem} ${
                index % 2 === 0 ? styles.left : styles.right
              }`}
              key={n}
            >
              <div className={styles.roadContent}>
                <div className={styles.stepMeta}>
                  <span className={styles.stepNumber}>{n}</span>

                  <span className={styles.stepLabel}>
                    STEP {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3>{t}</h3>

                <p>{d}</p>
              </div>

              <div className={styles.roadDot}>
                <span />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}