import{u as y,r as n,a as k,j as e}from"./index-DYHhggTF.js";function z(){const l=y(),[h,p]=n.useState(!0),[f,u]=n.useState(null),[_,b]=n.useState(null);if(n.useEffect(()=>{k.myLearningProgress().then(s=>{u(s),p(!1)}).catch(s=>{b(s.message||"Failed to load progress"),p(!1)})},[]),h)return e.jsxs("div",{className:"page-loading",children:[e.jsx("div",{className:"spinner"}),e.jsx("p",{children:"Loading your progress..."})]});if(_)return e.jsxs("div",{className:"mp__error",children:[e.jsx("p",{children:_}),e.jsx("button",{className:"btn btn--primary",onClick:()=>l("/learn"),children:"Back to Academy"})]});const{stats:t,activeCourses:d,completedCourses:c,activityDays:v,badges:o,learningStats:r}=f,x=new Date,g=[],j=new Set(v||[]);for(let s=29;s>=0;s--){const a=new Date(x);a.setDate(a.getDate()-s);const i=a.toISOString().split("T")[0];g.push({date:i,dayLabel:a.getDate(),active:j.has(i)})}const m=s=>s?new Date(s).toLocaleDateString("en-ZA",{day:"numeric",month:"short",year:"numeric"}):"",N=s=>{if(!s)return"0m";if(s<60)return`${s}m`;const a=Math.floor(s/60),i=s%60;return i>0?`${a}h ${i}m`:`${a}h`};return e.jsxs("div",{className:"mp__page",children:[e.jsx("style",{children:`
        .mp__page {
          max-width: 960px;
          margin: 0 auto;
          padding: 24px 16px 60px;
        }
        .mp__header {
          margin-bottom: 28px;
        }
        .mp__back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #c5a55a;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          margin-bottom: 12px;
        }
        .mp__back:hover {
          text-decoration: underline;
        }
        .mp__title {
          font-family: 'League Spartan', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #2d2d2d;
          margin: 0;
        }
        .mp__stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }
        @media (max-width: 700px) {
          .mp__stats-row { grid-template-columns: repeat(2, 1fr); }
        }
        .mp__stat-card {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          padding: 20px;
          text-align: center;
        }
        .mp__stat-label {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }
        .mp__stat-value {
          font-family: 'League Spartan', sans-serif;
          font-size: 32px;
          font-weight: 700;
          color: #2d2d2d;
        }
        .mp__stat-value--gold {
          color: #c5a55a;
        }
        .mp__section {
          margin-bottom: 32px;
        }
        .mp__section-title {
          font-family: 'League Spartan', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #2d2d2d;
          margin: 0 0 16px;
        }
        .mp__courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }
        .mp__course-card {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .mp__course-thumb {
          width: 100%;
          height: 140px;
          object-fit: cover;
          background: #f0ede6;
        }
        .mp__course-body {
          padding: 16px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .mp__course-title {
          font-family: 'League Spartan', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #2d2d2d;
          margin: 0 0 10px;
        }
        .mp__progress-wrap {
          margin-bottom: 8px;
        }
        .mp__progress-bar {
          width: 100%;
          height: 8px;
          background: #eee;
          border-radius: 4px;
          overflow: hidden;
        }
        .mp__progress-fill {
          height: 100%;
          background: #c5a55a;
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        .mp__progress-fill--complete {
          background: #10b981;
        }
        .mp__progress-text {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #888;
          margin-top: 4px;
        }
        .mp__course-meta {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #999;
          margin-bottom: 12px;
        }
        .mp__course-actions {
          margin-top: auto;
        }
        .mp__btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 6px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: background 0.2s;
        }
        .mp__btn--primary {
          background: #c5a55a;
          color: #fff;
        }
        .mp__btn--primary:hover {
          background: #b3944e;
        }
        .mp__btn--ghost {
          background: transparent;
          color: #c5a55a;
          border: 1px solid #c5a55a;
        }
        .mp__btn--ghost:hover {
          background: rgba(197,165,90,0.08);
        }
        .mp__calendar {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          padding: 20px;
        }
        .mp__calendar-grid {
          display: grid;
          grid-template-columns: repeat(15, 1fr);
          gap: 4px;
        }
        @media (max-width: 600px) {
          .mp__calendar-grid { grid-template-columns: repeat(10, 1fr); }
        }
        .mp__cal-day {
          aspect-ratio: 1;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: #999;
          background: #f5f5f5;
        }
        .mp__cal-day--active {
          background: #c5a55a;
          color: #fff;
        }
        .mp__cal-day--today {
          border: 2px solid #2d2d2d;
        }
        .mp__badges-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 12px;
        }
        .mp__badge-card {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          padding: 16px;
          text-align: center;
        }
        .mp__badge-card--locked {
          opacity: 0.45;
        }
        .mp__badge-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 8px;
          font-size: 24px;
        }
        .mp__badge-icon--earned {
          background: rgba(197,165,90,0.15);
        }
        .mp__badge-icon--locked {
          background: #f0f0f0;
        }
        .mp__badge-name {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #2d2d2d;
          margin-bottom: 4px;
        }
        .mp__badge-desc {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          color: #999;
          margin-bottom: 4px;
        }
        .mp__badge-date {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          color: #c5a55a;
          font-weight: 500;
        }
        .mp__learning-stats {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          padding: 20px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 20px;
        }
        .mp__ls-item {
          text-align: center;
        }
        .mp__ls-value {
          font-family: 'League Spartan', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #2d2d2d;
        }
        .mp__ls-label {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #888;
          margin-top: 2px;
        }
        .mp__empty {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          padding: 32px;
          text-align: center;
          color: #999;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
        }
      `}),e.jsxs("div",{className:"mp__header",children:[e.jsxs("button",{className:"mp__back",onClick:()=>l("/learn"),children:[e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("polyline",{points:"15 18 9 12 15 6"})}),"Back to Academy"]}),e.jsx("h1",{className:"mp__title",children:"My Learning Journey"})]}),e.jsxs("div",{className:"mp__stats-row",children:[e.jsxs("div",{className:"mp__stat-card",children:[e.jsx("div",{className:"mp__stat-label",children:"Courses Enrolled"}),e.jsx("div",{className:"mp__stat-value",children:(t==null?void 0:t.coursesEnrolled)||0})]}),e.jsxs("div",{className:"mp__stat-card",children:[e.jsx("div",{className:"mp__stat-label",children:"Courses Completed"}),e.jsx("div",{className:"mp__stat-value",children:(t==null?void 0:t.coursesCompleted)||0})]}),e.jsxs("div",{className:"mp__stat-card",children:[e.jsx("div",{className:"mp__stat-label",children:"Total XP"}),e.jsx("div",{className:"mp__stat-value mp__stat-value--gold",children:(t==null?void 0:t.totalXp)||0})]}),e.jsxs("div",{className:"mp__stat-card",children:[e.jsx("div",{className:"mp__stat-label",children:"Current Streak"}),e.jsxs("div",{className:"mp__stat-value",children:[(t==null?void 0:t.currentStreak)||0,e.jsx("span",{style:{fontSize:"18px",marginLeft:"2px"},children:"d"})]})]})]}),e.jsxs("div",{className:"mp__section",children:[e.jsx("h2",{className:"mp__section-title",children:"Active Courses"}),d&&d.length>0?e.jsx("div",{className:"mp__courses-grid",children:d.map(s=>{const a=s.totalLessons>0?Math.round(s.lessonsCompleted/s.totalLessons*100):0;return e.jsxs("div",{className:"mp__course-card",children:[s.thumbnail?e.jsx("img",{className:"mp__course-thumb",src:s.thumbnail,alt:s.title}):e.jsx("div",{className:"mp__course-thumb"}),e.jsxs("div",{className:"mp__course-body",children:[e.jsx("h3",{className:"mp__course-title",children:s.title}),e.jsxs("div",{className:"mp__progress-wrap",children:[e.jsx("div",{className:"mp__progress-bar",children:e.jsx("div",{className:"mp__progress-fill",style:{width:`${a}%`}})}),e.jsxs("div",{className:"mp__progress-text",children:[s.lessonsCompleted,"/",s.totalLessons," lessons (",a,"%)"]})]}),e.jsxs("div",{className:"mp__course-meta",children:["Last active: ",m(s.lastActivity)]}),e.jsx("div",{className:"mp__course-actions",children:e.jsx("button",{className:"mp__btn mp__btn--primary",onClick:()=>l(`/learn/${s.slug}/lesson/${s.nextLessonId}`),children:"Continue"})})]})]},s.courseId)})}):e.jsxs("div",{className:"mp__empty",children:["No active courses. ",e.jsx("button",{className:"mp__btn mp__btn--ghost",style:{marginLeft:8},onClick:()=>l("/learn/browse"),children:"Browse Courses"})]})]}),c&&c.length>0&&e.jsxs("div",{className:"mp__section",children:[e.jsx("h2",{className:"mp__section-title",children:"Completed Courses"}),e.jsx("div",{className:"mp__courses-grid",children:c.map(s=>e.jsxs("div",{className:"mp__course-card",children:[s.thumbnail?e.jsx("img",{className:"mp__course-thumb",src:s.thumbnail,alt:s.title}):e.jsx("div",{className:"mp__course-thumb"}),e.jsxs("div",{className:"mp__course-body",children:[e.jsx("h3",{className:"mp__course-title",children:s.title}),e.jsxs("div",{className:"mp__progress-wrap",children:[e.jsx("div",{className:"mp__progress-bar",children:e.jsx("div",{className:"mp__progress-fill mp__progress-fill--complete",style:{width:"100%"}})}),e.jsxs("div",{className:"mp__progress-text",children:["Completed ",m(s.completedDate)]})]}),e.jsx("div",{className:"mp__course-actions",children:s.certificateId&&e.jsx("button",{className:"mp__btn mp__btn--ghost",onClick:()=>l(`/learn/certificate/${s.certificateId}`),children:"View Certificate"})})]})]},s.courseId))})]}),e.jsxs("div",{className:"mp__section",children:[e.jsx("h2",{className:"mp__section-title",children:"Streak Calendar"}),e.jsx("div",{className:"mp__calendar",children:e.jsx("div",{className:"mp__calendar-grid",children:g.map(s=>{const a=s.date===x.toISOString().split("T")[0];let i="mp__cal-day";return s.active&&(i+=" mp__cal-day--active"),a&&(i+=" mp__cal-day--today"),e.jsx("div",{className:i,title:s.date,children:s.dayLabel},s.date)})})})]}),e.jsxs("div",{className:"mp__section",children:[e.jsx("h2",{className:"mp__section-title",children:"Badge Collection"}),o&&o.length>0?e.jsx("div",{className:"mp__badges-grid",children:o.map(s=>{const a=!!s.earnedDate;return e.jsxs("div",{className:`mp__badge-card ${a?"":"mp__badge-card--locked"}`,children:[e.jsx("div",{className:`mp__badge-icon ${a?"mp__badge-icon--earned":"mp__badge-icon--locked"}`,children:a?e.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"#c5a55a",strokeWidth:"2",children:e.jsx("path",{d:"M12 15l-3 3 1-4-3-3h4L12 7l1 4h4l-3 3 1 4z"})}):e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"#ccc",strokeWidth:"2",children:[e.jsx("circle",{cx:"12",cy:"12",r:"8"}),e.jsx("path",{d:"M12 8v0"})]})}),e.jsx("div",{className:"mp__badge-name",children:s.name}),e.jsx("div",{className:"mp__badge-desc",children:s.description}),a&&e.jsxs("div",{className:"mp__badge-date",children:["Earned ",m(s.earnedDate)]}),!a&&e.jsx("div",{className:"mp__badge-desc",children:"Locked"})]},s.id)})}):e.jsx("div",{className:"mp__empty",children:"No badges available yet."})]}),r&&e.jsxs("div",{className:"mp__section",children:[e.jsx("h2",{className:"mp__section-title",children:"Learning Stats"}),e.jsxs("div",{className:"mp__learning-stats",children:[e.jsxs("div",{className:"mp__ls-item",children:[e.jsx("div",{className:"mp__ls-value",children:N(r.totalMinutes)}),e.jsx("div",{className:"mp__ls-label",children:"Total Time"})]}),e.jsxs("div",{className:"mp__ls-item",children:[e.jsx("div",{className:"mp__ls-value",children:r.lessonsCompleted||0}),e.jsx("div",{className:"mp__ls-label",children:"Lessons Completed"})]}),e.jsxs("div",{className:"mp__ls-item",children:[e.jsx("div",{className:"mp__ls-value",children:r.quizzesTaken||0}),e.jsx("div",{className:"mp__ls-label",children:"Quizzes Taken"})]}),e.jsxs("div",{className:"mp__ls-item",children:[e.jsx("div",{className:"mp__ls-value",children:r.avgQuizScore!=null?`${r.avgQuizScore}%`:"--"}),e.jsx("div",{className:"mp__ls-label",children:"Avg Quiz Score"})]}),e.jsxs("div",{className:"mp__ls-item",children:[e.jsx("div",{className:"mp__ls-value",children:r.reflectionsSubmitted||0}),e.jsx("div",{className:"mp__ls-label",children:"Reflections"})]})]})]})]})}export{z as default};
