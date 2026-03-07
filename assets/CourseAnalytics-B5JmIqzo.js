import{b as P,u as D,r as c,a as B,j as e}from"./index-D6dyrzHb.js";function I(){const{courseId:_}=P(),p=D(),[k,f]=c.useState(!0),[g,z]=c.useState(null),[t,C]=c.useState(null),[n,A]=c.useState("name"),[o,u]=c.useState("asc");c.useEffect(()=>{B.adminCourseAnalytics(_).then(a=>{C(a),f(!1)}).catch(a=>{z(a.message||"Failed to load analytics"),f(!1)})},[_]);const b=c.useMemo(()=>{if(!t||!t.students)return[];const a=[...t.students];return a.sort((s,l)=>{let r,i;return n==="name"?(r=(s.name||"").toLowerCase(),i=(l.name||"").toLowerCase(),o==="asc"?r.localeCompare(i):i.localeCompare(r)):(n==="progress"&&(r=s.totalLessons?s.lessonsCompleted/s.totalLessons:0,i=l.totalLessons?l.lessonsCompleted/l.totalLessons:0),n==="lastActivity"&&(r=s.lastActivity?new Date(s.lastActivity).getTime():0,i=l.lastActivity?new Date(l.lastActivity).getTime():0),o==="asc"?r-i:i-r)}),a},[t,n,o]);function x(a){n===a?u(s=>s==="asc"?"desc":"asc"):(A(a),u("asc"))}function h(a){return n!==a?"":o==="asc"?" ▲":" ▼"}function j(a){if(!a)return"--";const s=new Date(a);return isNaN(s.getTime())?a:s.toLocaleDateString("en-ZA",{day:"numeric",month:"short",year:"numeric"})}function v(a){return a==="Completed"?"#22c55e":a==="Active"?"#c5a55a":"#9ca3af"}if(k)return e.jsxs("div",{className:"page-loading",children:[e.jsx("div",{className:"spinner"}),e.jsx("p",{children:"Loading analytics..."})]});if(g)return e.jsxs("div",{style:{padding:"40px",textAlign:"center"},children:[e.jsx("p",{style:{color:"#ef4444"},children:g}),e.jsx("button",{onClick:()=>p("/admin/courses"),style:{marginTop:"12px",padding:"10px 20px",background:"#c5a55a",color:"#fff",border:"none",borderRadius:"8px",cursor:"pointer",fontFamily:"'Inter', sans-serif",fontWeight:600},children:"Back to Courses"})]});if(!t||!t.course)return e.jsxs("div",{style:{padding:"40px",textAlign:"center",color:"#9ca3af"},children:[e.jsx("p",{children:"No analytics data found for this course."}),e.jsx("button",{onClick:()=>p("/admin/courses"),style:{marginTop:"12px",padding:"10px 20px",background:"#c5a55a",color:"#fff",border:"none",borderRadius:"8px",cursor:"pointer",fontFamily:"'Inter', sans-serif",fontWeight:600},children:"Back to Courses"})]});const{course:L,metrics:S,weeklyEnrollments:T,modules:M,quizzes:R,students:Q,topPerformers:q}=t,d=S||{},m=T||[],y=M||[],N=R||[],w=q||[],E=Math.max(...m.map(a=>a.count),1);return e.jsxs("div",{className:"ca__page",children:[e.jsx("style",{children:`
        .ca__page {
          max-width: 1060px;
          margin: 0 auto;
          padding: 24px 16px 48px;
          font-family: 'Inter', sans-serif;
          color: #2d2d2d;
          background: #faf9f6;
          min-height: 100vh;
        }

        /* Back button */
        .ca__back-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #c5a55a;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          margin-bottom: 20px;
          transition: opacity 0.2s;
        }
        .ca__back-btn:hover { opacity: 0.85; }

        /* Header */
        .ca__header { margin-bottom: 24px; }
        .ca__header h1 {
          margin: 0 0 4px;
          font-family: 'League Spartan', sans-serif;
          font-size: 26px;
          font-weight: 700;
          color: #2d2d2d;
        }
        .ca__header p {
          margin: 0;
          font-size: 14px;
          color: #9ca3af;
        }

        /* Metrics row */
        .ca__metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 28px;
        }
        @media (max-width: 768px) {
          .ca__metrics { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .ca__metrics { grid-template-columns: 1fr; }
        }
        .ca__metric-card {
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          border-radius: 10px;
          padding: 20px;
          text-align: center;
        }
        .ca__metric-value {
          font-size: 32px;
          font-weight: 700;
          font-family: 'League Spartan', sans-serif;
          color: #2d2d2d;
          line-height: 1.1;
        }
        .ca__metric-label {
          font-size: 12px;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 6px;
        }

        /* Card */
        .ca__card {
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          border-radius: 10px;
          padding: 24px;
          margin-bottom: 20px;
        }
        .ca__card h2 {
          margin: 0 0 16px;
          font-family: 'League Spartan', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #2d2d2d;
        }

        /* Bar chart */
        .ca__bar-chart {
          display: flex;
          align-items: flex-end;
          gap: 6px;
          height: 160px;
          padding-top: 10px;
        }
        .ca__bar-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          justify-content: flex-end;
        }
        .ca__bar-count {
          font-size: 11px;
          font-weight: 600;
          color: #2d2d2d;
          margin-bottom: 4px;
        }
        .ca__bar {
          width: 100%;
          max-width: 44px;
          background: #c5a55a;
          border-radius: 4px 4px 0 0;
          min-height: 4px;
          transition: height 0.3s ease;
        }
        .ca__bar-label {
          font-size: 10px;
          color: #9ca3af;
          margin-top: 6px;
          text-align: center;
          white-space: nowrap;
        }

        /* Module table */
        .ca__table-wrap { overflow-x: auto; }
        .ca__table {
          width: 100%;
          border-collapse: collapse;
        }
        .ca__table th {
          text-align: left;
          padding: 10px 12px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #9ca3af;
          border-bottom: 2px solid #f3f4f6;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
        }
        .ca__table td {
          padding: 12px;
          font-size: 13px;
          border-bottom: 1px solid #f9fafb;
          color: #2d2d2d;
        }
        .ca__table tr:last-child td { border-bottom: none; }
        .ca__table th.ca__sortable {
          cursor: pointer;
          user-select: none;
        }
        .ca__table th.ca__sortable:hover { color: #c5a55a; }

        /* Progress bar inline */
        .ca__progress-bar {
          display: inline-block;
          width: 80px;
          height: 6px;
          background: #f3f4f6;
          border-radius: 3px;
          overflow: hidden;
          vertical-align: middle;
          margin-right: 8px;
        }
        .ca__progress-fill {
          height: 100%;
          background: #c5a55a;
          border-radius: 3px;
          transition: width 0.3s;
        }

        /* Status badge */
        .ca__badge {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        /* Quiz section */
        .ca__quiz-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 14px;
        }
        .ca__quiz-item {
          background: #faf9f6;
          border-radius: 8px;
          padding: 16px;
        }
        .ca__quiz-title {
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 10px;
          color: #2d2d2d;
        }
        .ca__quiz-stat {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          padding: 4px 0;
          color: #4b5563;
        }
        .ca__quiz-stat span:last-child { font-weight: 600; color: #2d2d2d; }
        .ca__quiz-hardest {
          margin-top: 8px;
          padding-top: 8px;
          border-top: 1px solid #e5e7eb;
          font-size: 12px;
          color: #9ca3af;
        }
        .ca__quiz-hardest strong { color: #2d2d2d; font-weight: 500; }

        /* Top performers */
        .ca__top-list { list-style: none; padding: 0; margin: 0; }
        .ca__top-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 0;
          border-bottom: 1px solid #f9fafb;
        }
        .ca__top-item:last-child { border-bottom: none; }
        .ca__top-rank {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #c5a55a;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          font-family: 'League Spartan', sans-serif;
          flex-shrink: 0;
        }
        .ca__top-name {
          flex: 1;
          font-weight: 600;
          font-size: 14px;
          color: #2d2d2d;
        }
        .ca__top-xp {
          font-size: 14px;
          font-weight: 700;
          color: #c5a55a;
        }
        .ca__top-lessons {
          font-size: 12px;
          color: #9ca3af;
          min-width: 90px;
          text-align: right;
        }

        /* Empty state */
        .ca__empty {
          text-align: center;
          padding: 24px;
          color: #9ca3af;
          font-size: 13px;
        }

        @media (max-width: 600px) {
          .ca__table th:nth-child(4),
          .ca__table td:nth-child(4),
          .ca__table th:nth-child(5),
          .ca__table td:nth-child(5) { display: none; }
          .ca__bar-chart { height: 120px; }
        }
      `}),e.jsxs("button",{className:"ca__back-btn",onClick:()=>p("/admin/courses"),children:[e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"15 18 9 12 15 6"})}),"Back to Courses"]}),e.jsxs("div",{className:"ca__header",children:[e.jsxs("h1",{children:[L.title," -- Analytics"]}),e.jsx("p",{children:"Performance overview and student engagement data"})]}),e.jsxs("div",{className:"ca__metrics",children:[e.jsxs("div",{className:"ca__metric-card",children:[e.jsx("div",{className:"ca__metric-value",children:d.totalEnrollments||0}),e.jsx("div",{className:"ca__metric-label",children:"Total Enrollments"})]}),e.jsxs("div",{className:"ca__metric-card",children:[e.jsxs("div",{className:"ca__metric-value",style:{color:"#22c55e"},children:[d.completionRate||0,"%"]}),e.jsx("div",{className:"ca__metric-label",children:"Completion Rate"})]}),e.jsxs("div",{className:"ca__metric-card",children:[e.jsxs("div",{className:"ca__metric-value",style:{color:"#c5a55a"},children:[d.avgQuizScore||0,"%"]}),e.jsx("div",{className:"ca__metric-label",children:"Avg Quiz Score"})]}),e.jsxs("div",{className:"ca__metric-card",children:[e.jsx("div",{className:"ca__metric-value",children:d.activeLearners||0}),e.jsx("div",{className:"ca__metric-label",children:"Active Learners (7d)"})]})]}),m.length>0&&e.jsxs("div",{className:"ca__card",children:[e.jsx("h2",{children:"Enrollment Trend (Last 12 Weeks)"}),e.jsx("div",{className:"ca__bar-chart",children:m.map((a,s)=>e.jsxs("div",{className:"ca__bar-col",children:[e.jsx("span",{className:"ca__bar-count",children:a.count}),e.jsx("div",{className:"ca__bar",style:{height:`${a.count/E*100}%`}}),e.jsx("span",{className:"ca__bar-label",children:a.week?a.week.replace("2026-",""):""})]},s))})]}),e.jsxs("div",{className:"ca__card",children:[e.jsx("h2",{children:"Module Breakdown"}),y.length===0?e.jsx("div",{className:"ca__empty",children:"No module data available yet."}):e.jsx("div",{className:"ca__table-wrap",children:e.jsxs("table",{className:"ca__table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Module"}),e.jsx("th",{children:"Lessons"}),e.jsx("th",{children:"Completion Rate"}),e.jsx("th",{children:"Avg Time Spent"})]})}),e.jsx("tbody",{children:y.map(a=>e.jsxs("tr",{children:[e.jsx("td",{style:{fontWeight:500},children:a.title}),e.jsx("td",{children:a.lessonCount}),e.jsxs("td",{children:[e.jsx("span",{className:"ca__progress-bar",children:e.jsx("span",{className:"ca__progress-fill",style:{width:`${a.completionRate||0}%`}})}),a.completionRate||0,"%"]}),e.jsx("td",{children:a.avgTimeMinutes!=null?`${a.avgTimeMinutes} min`:"--"})]},a.id))})]})})]}),e.jsxs("div",{className:"ca__card",children:[e.jsx("h2",{children:"Quiz Performance"}),N.length===0?e.jsx("div",{className:"ca__empty",children:"No quiz data available yet."}):e.jsx("div",{className:"ca__quiz-grid",children:N.map(a=>e.jsxs("div",{className:"ca__quiz-item",children:[e.jsx("div",{className:"ca__quiz-title",children:a.title}),e.jsxs("div",{className:"ca__quiz-stat",children:[e.jsx("span",{children:"Avg Score"}),e.jsx("span",{children:a.avgScore!=null?`${a.avgScore}%`:"--"})]}),e.jsxs("div",{className:"ca__quiz-stat",children:[e.jsx("span",{children:"Pass Rate"}),e.jsx("span",{children:a.passRate!=null?`${a.passRate}%`:"--"})]}),a.hardestQuestion&&e.jsxs("div",{className:"ca__quiz-hardest",children:["Hardest: ",e.jsx("strong",{children:a.hardestQuestion})]})]},a.id))})]}),e.jsxs("div",{className:"ca__card",children:[e.jsx("h2",{children:"Student Progress"}),b.length===0?e.jsx("div",{className:"ca__empty",children:"No student data available yet."}):e.jsx("div",{className:"ca__table-wrap",children:e.jsxs("table",{className:"ca__table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsxs("th",{className:"ca__sortable",onClick:()=>x("name"),children:["Student",h("name")]}),e.jsx("th",{children:"Enrolled"}),e.jsxs("th",{className:"ca__sortable",onClick:()=>x("progress"),children:["Lessons",h("progress")]}),e.jsxs("th",{className:"ca__sortable",onClick:()=>x("lastActivity"),children:["Last Activity",h("lastActivity")]}),e.jsx("th",{children:"Quiz Avg"}),e.jsx("th",{children:"Status"})]})}),e.jsx("tbody",{children:b.map(a=>{const s=a.totalLessons?Math.round(a.lessonsCompleted/a.totalLessons*100):0;return e.jsxs("tr",{children:[e.jsx("td",{style:{fontWeight:500},children:a.name}),e.jsx("td",{style:{fontSize:"12px",color:"#9ca3af"},children:j(a.enrolledDate)}),e.jsxs("td",{children:[e.jsx("span",{className:"ca__progress-bar",children:e.jsx("span",{className:"ca__progress-fill",style:{width:`${s}%`}})}),a.lessonsCompleted,"/",a.totalLessons]}),e.jsx("td",{style:{fontSize:"12px",color:"#9ca3af"},children:j(a.lastActivity)}),e.jsx("td",{children:a.quizAvg!=null?`${a.quizAvg}%`:"--"}),e.jsx("td",{children:e.jsx("span",{className:"ca__badge",style:{background:v(a.status)+"18",color:v(a.status)},children:a.status||"Unknown"})})]},a.id)})})]})})]}),w.length>0&&e.jsxs("div",{className:"ca__card",children:[e.jsx("h2",{children:"Top Performers"}),e.jsx("ul",{className:"ca__top-list",children:w.slice(0,5).map((a,s)=>e.jsxs("li",{className:"ca__top-item",children:[e.jsx("div",{className:"ca__top-rank",children:s+1}),e.jsx("div",{className:"ca__top-name",children:a.name}),e.jsxs("div",{className:"ca__top-xp",children:[a.xp," XP"]}),e.jsxs("div",{className:"ca__top-lessons",children:[a.lessonsCompleted," lessons"]})]},a.id))})]})]})}export{I as default};
