import{b as P,u as Y,r as m,a as w,j as e}from"./index-CWYikBle.js";const B={video:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("polygon",{points:"10 8 16 12 10 16 10 8",fill:"currentColor",stroke:"none"})]}),audio:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"4",y1:"8",x2:"4",y2:"16"}),e.jsx("line",{x1:"8",y1:"5",x2:"8",y2:"19"}),e.jsx("line",{x1:"12",y1:"3",x2:"12",y2:"21"}),e.jsx("line",{x1:"16",y1:"7",x2:"16",y2:"17"}),e.jsx("line",{x1:"20",y1:"10",x2:"20",y2:"14"})]}),article:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),e.jsx("polyline",{points:"14 2 14 8 20 8"}),e.jsx("line",{x1:"8",y1:"13",x2:"16",y2:"13"}),e.jsx("line",{x1:"8",y1:"17",x2:"16",y2:"17"})]}),meditation:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("circle",{cx:"12",cy:"12",r:"2",fill:"currentColor",stroke:"none"})]}),podcast:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"}),e.jsx("path",{d:"M19 10v2a7 7 0 0 1-14 0v-2"}),e.jsx("line",{x1:"12",y1:"19",x2:"12",y2:"23"}),e.jsx("line",{x1:"8",y1:"23",x2:"16",y2:"23"})]}),mixed:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"3",y:"3",width:"7",height:"7",rx:"1"}),e.jsx("rect",{x:"14",y:"3",width:"7",height:"7",rx:"1"}),e.jsx("rect",{x:"3",y:"14",width:"7",height:"7",rx:"1"}),e.jsx("rect",{x:"14",y:"14",width:"7",height:"7",rx:"1"})]})},H=()=>e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"#22c55e",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"20 6 9 17 4 12"})}),V=()=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"}),e.jsx("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]}),U=({open:d})=>e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{transition:"transform 0.25s ease",transform:d?"rotate(180deg)":"rotate(0deg)"},children:e.jsx("polyline",{points:"6 9 12 15 18 9"})});function _(d){if(d==null)return null;const i=Number(d);if(!Number.isFinite(i)||i<=0)return null;if(i<60)return`${Math.round(i)} min`;const s=Math.floor(i/60),x=Math.round(i%60);return x>0?`${s}h ${x}m`:`${s}h`}function q(d){return!d||typeof d!="string"?"Course":d.replace(/[-_]/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").trim().split(/\s+/).map(s=>s.charAt(0).toUpperCase()+s.slice(1).toLowerCase()).join(" ")}function K(d){switch(d){case"quest":return{background:"linear-gradient(135deg, #c5a55a 0%, #e8d5a3 100%)",color:"#2d2d2d"};case"challenge":return{background:"linear-gradient(135deg, #ef4444 0%, #f87171 100%)",color:"#fff"};default:return{background:"linear-gradient(135deg, #2d2d2d 0%, #444 100%)",color:"#fff"}}}const v=`
  /* ===== CourseDetail — cd__ prefix ===== */

  @import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

  .cd__page {
    max-width: 1120px;
    margin: 0 auto;
    padding: 2rem 1.5rem 4rem;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #2d2d2d;
  }

  .cd__back-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.5rem 0.85rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #666;
    background: none;
    border: 1px solid #e0ddd8;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 1.5rem;
  }
  .cd__back-btn:hover {
    color: #2d2d2d;
    border-color: #c5a55a;
    background: #faf9f6;
  }

  /* ---------- Loading / Error ---------- */
  .cd__loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 40vh;
    gap: 1rem;
    color: #999;
    font-size: 0.95rem;
  }
  .cd__spinner {
    width: 36px;
    height: 36px;
    border: 3px solid #e0ddd8;
    border-top-color: #c5a55a;
    border-radius: 50%;
    animation: cd__spin 0.8s linear infinite;
  }
  @keyframes cd__spin {
    to { transform: rotate(360deg); }
  }
  .cd__error-card {
    margin-top: 1rem;
    text-align: center;
    padding: 2.5rem 2rem;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  .cd__error-text {
    color: #ef4444;
    font-size: 0.95rem;
    margin: 0 0 1rem;
  }

  /* ---------- Hero ---------- */
  .cd__hero {
    display: flex;
    gap: 2rem;
    margin-bottom: 2.5rem;
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.07);
    overflow: hidden;
  }
  .cd__hero-thumb {
    flex: 0 0 420px;
    min-height: 280px;
    position: relative;
    overflow: hidden;
  }
  .cd__hero-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .cd__hero-placeholder {
    width: 100%;
    height: 100%;
    min-height: 280px;
    background: linear-gradient(135deg, #2d2d2d 0%, #444 40%, #c5a55a 100%);
  }
  .cd__hero-content {
    flex: 1;
    padding: 2rem 2.5rem 2rem 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  /* Badges */
  .cd__badges {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 0.75rem;
  }
  .cd__badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border-radius: 20px;
  }
  .cd__badge--category {
    background: #faf9f6;
    color: #c5a55a;
    border: 1px solid #e8d5a3;
  }

  /* Title */
  .cd__title {
    font-family: 'League Spartan', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: #2d2d2d;
    margin: 0 0 0.75rem;
    line-height: 1.2;
  }

  /* Description */
  .cd__description {
    font-size: 0.95rem;
    line-height: 1.65;
    color: #555;
    margin-bottom: 1rem;
  }
  .cd__description p {
    margin: 0 0 0.5rem;
  }

  /* Meta row */
  .cd__meta {
    display: flex;
    gap: 1.25rem;
    flex-wrap: wrap;
    margin-bottom: 1.25rem;
  }
  .cd__meta-item {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.85rem;
    color: #888;
    font-weight: 500;
  }
  .cd__meta-item::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #c5a55a;
  }

  /* Action buttons */
  .cd__actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    align-items: center;
  }
  .cd__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.65rem 1.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
  }
  .cd__btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  .cd__btn--primary {
    background: linear-gradient(135deg, #c5a55a 0%, #b8943f 100%);
    color: #fff;
    box-shadow: 0 2px 8px rgba(197,165,90,0.3);
  }
  .cd__btn--primary:hover:not(:disabled) {
    box-shadow: 0 4px 16px rgba(197,165,90,0.4);
    transform: translateY(-1px);
  }
  .cd__btn--outline {
    background: transparent;
    color: #c5a55a;
    border: 1.5px solid #c5a55a;
  }
  .cd__btn--outline:hover {
    background: #faf9f6;
  }
  .cd__btn--ghost {
    background: transparent;
    color: #c5a55a;
    font-weight: 600;
    padding: 0.65rem 1rem;
  }
  .cd__btn--ghost:hover {
    background: rgba(197,165,90,0.08);
    border-radius: 8px;
  }

  /* ---------- Progress Bar ---------- */
  .cd__progress {
    margin-bottom: 2rem;
    background: #fff;
    border-radius: 10px;
    padding: 1.25rem 1.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  .cd__progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.6rem;
  }
  .cd__progress-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #2d2d2d;
  }
  .cd__progress-pct {
    font-size: 0.85rem;
    font-weight: 700;
    color: #c5a55a;
  }
  .cd__progress-track {
    width: 100%;
    height: 8px;
    background: #f0ede6;
    border-radius: 4px;
    overflow: hidden;
  }
  .cd__progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #c5a55a 0%, #e8d5a3 100%);
    border-radius: 4px;
    transition: width 0.5s ease;
  }

  /* ---------- Two-Column Layout ---------- */
  .cd__layout {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 2rem;
    align-items: start;
  }

  /* ---------- Modules / Course Content ---------- */
  .cd__modules {
    min-width: 0;
  }
  .cd__modules-heading {
    font-family: 'League Spartan', sans-serif;
    font-size: 1.35rem;
    font-weight: 700;
    color: #2d2d2d;
    margin: 0 0 1rem;
  }

  .cd__module {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    margin-bottom: 0.75rem;
    overflow: hidden;
    border: 1px solid #f0ede6;
    transition: border-color 0.2s ease;
  }
  .cd__module--open {
    border-color: #e8d5a3;
  }
  .cd__module-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 1rem 1.25rem;
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    text-align: left;
    transition: background 0.15s ease;
  }
  .cd__module-header:hover {
    background: #faf9f6;
  }
  .cd__module-header-left {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    min-width: 0;
  }
  .cd__module-title {
    font-family: 'League Spartan', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #2d2d2d;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .cd__module-count {
    font-size: 0.8rem;
    color: #999;
    white-space: nowrap;
    flex-shrink: 0;
  }

  /* Lessons */
  .cd__lessons {
    border-top: 1px solid #f0ede6;
  }
  .cd__lesson {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.85rem 1.25rem 0.85rem 2.75rem;
    border-bottom: 1px solid #faf9f6;
    transition: background 0.15s ease;
  }
  .cd__lesson:last-child {
    border-bottom: none;
  }
  .cd__lesson--clickable {
    cursor: pointer;
  }
  .cd__lesson--clickable:hover {
    background: #faf9f6;
  }
  .cd__lesson--completed {
    opacity: 0.7;
  }
  .cd__lesson--locked {
    opacity: 0.45;
  }
  .cd__lesson-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    color: #c5a55a;
  }
  .cd__lesson-title {
    flex: 1;
    font-size: 0.9rem;
    color: #2d2d2d;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .cd__lesson-duration {
    font-size: 0.78rem;
    color: #aaa;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .cd__lesson-status {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    width: 20px;
  }

  /* ---------- Sidebar ---------- */
  .cd__sidebar {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .cd__card {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    overflow: hidden;
  }
  .cd__card-header {
    padding: 1rem 1.25rem 0.75rem;
    border-bottom: 1px solid #f0ede6;
  }
  .cd__card-header h3 {
    font-family: 'League Spartan', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: #2d2d2d;
    margin: 0;
  }
  .cd__card-body {
    padding: 1.25rem;
  }

  /* Instructor card */
  .cd__instructor-profile {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }
  .cd__instructor-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, #c5a55a 0%, #e8d5a3 100%);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'League Spartan', sans-serif;
    font-size: 1.15rem;
    font-weight: 700;
    flex-shrink: 0;
  }
  .cd__instructor-info {
    min-width: 0;
  }
  .cd__instructor-name {
    display: block;
    font-weight: 600;
    font-size: 0.95rem;
    color: #2d2d2d;
    margin-bottom: 0.25rem;
  }
  .cd__instructor-bio {
    font-size: 0.83rem;
    line-height: 1.55;
    color: #777;
    margin: 0;
  }

  /* Stats card */
  .cd__stats-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .cd__stats-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.65rem 0;
    border-bottom: 1px solid #f7f5f0;
  }
  .cd__stats-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  .cd__stats-item:first-child {
    padding-top: 0;
  }
  .cd__stats-label {
    font-size: 0.83rem;
    color: #888;
  }
  .cd__stats-value {
    font-size: 0.9rem;
    font-weight: 600;
    color: #2d2d2d;
  }

  /* ---------- Responsive ---------- */
  @media (max-width: 900px) {
    .cd__hero {
      flex-direction: column;
    }
    .cd__hero-thumb {
      flex: none;
      min-height: 200px;
      max-height: 240px;
    }
    .cd__hero-content {
      padding: 1.5rem;
    }
    .cd__title {
      font-size: 1.5rem;
    }
    .cd__layout {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 600px) {
    .cd__page {
      padding: 1rem 1rem 3rem;
    }
    .cd__hero-thumb {
      min-height: 160px;
      max-height: 200px;
    }
    .cd__hero-content {
      padding: 1.25rem;
    }
    .cd__title {
      font-size: 1.3rem;
    }
    .cd__actions {
      flex-direction: column;
      align-items: stretch;
    }
    .cd__btn {
      width: 100%;
      justify-content: center;
    }
    .cd__lesson {
      padding-left: 1.25rem;
    }
  }
`;function G(){const{slug:d}=P(),i=Y(),[s,x]=m.useState(null),[a,N]=m.useState(null),[I,C]=m.useState(!0),[L,f]=m.useState(null),[T,z]=m.useState({}),[D,S]=m.useState(!1);m.useEffect(()=>{$()},[d]);async function $(){var r,n;C(!0),f(null);try{const[t,l]=await Promise.all([w.courseDetail(d),w.myEnrollments()]);x(t.course);const o=(r=l==null?void 0:l.enrollments)==null?void 0:r.find(c=>c.courseId===t.course.id||c.courseSlug===t.course.slug);N(o||null),((n=t.course.modules)==null?void 0:n.length)>0&&z({[t.course.modules[0].id]:!0})}catch(t){f(t.message||"Failed to load course")}finally{C(!1)}}async function W(){S(!0);try{const r=await w.enroll(s.id);N(r.enrollment||{courseId:s.id,status:"active",completedLessons:[]})}catch(r){f(r.message||"Failed to enroll")}finally{S(!1)}}function A(r){z(n=>({...n,[r]:!n[r]}))}function b(r){var n;return a&&((n=a.completedLessons)==null?void 0:n.includes(r))||!1}function M(r){if(!a||!r.dripDay)return!1;const n=a.enrolledAt?new Date(a.enrolledAt):new Date,t=new Date(n);return t.setDate(t.getDate()+r.dripDay),new Date<t}function E(){var r,n,t;if(!a||!(s!=null&&s.modules))return null;for(const l of s.modules)for(const o of l.lessons||[])if(!b(o.id)&&!M(o))return o.id;return((t=(n=(r=s.modules[0])==null?void 0:r.lessons)==null?void 0:n[0])==null?void 0:t.id)||null}function O(){return a?a.status==="completed"?"completed":"enrolled":"not-enrolled"}function R(){return s!=null&&s.modules?s.modules.reduce((r,n)=>r+(n.lessons||[]).reduce((t,l)=>t+(l.durationMinutes||0),0),0):0}function F(){var t;if(!a||!(s!=null&&s.modules))return null;const r=s.modules.reduce((l,o)=>{var c;return l+(((c=o.lessons)==null?void 0:c.length)||0)},0);if(r===0)return null;const n=((t=a.completedLessons)==null?void 0:t.length)||0;return Math.round(n/r*100)}if(I)return e.jsxs("div",{className:"cd__page",children:[e.jsx("style",{children:v}),e.jsxs("div",{className:"cd__loading",children:[e.jsx("div",{className:"cd__spinner"}),e.jsx("p",{children:"Loading..."})]})]});if(L)return e.jsxs("div",{className:"cd__page",children:[e.jsx("style",{children:v}),e.jsx("button",{className:"cd__back-btn",onClick:()=>i("/learn"),children:"← Back to Academy"}),e.jsxs("div",{className:"cd__error-card",children:[e.jsx("p",{className:"cd__error-text",children:L}),e.jsx("button",{className:"cd__btn cd__btn--primary",onClick:$,children:"Retry"})]})]});if(!s)return null;const u=O(),g=R(),h=F(),j=[...s.modules||[]].sort((r,n)=>(r.sortOrder||0)-(n.sortOrder||0));return e.jsxs("div",{className:"cd__page",children:[e.jsx("style",{children:v}),e.jsx("button",{className:"cd__back-btn",onClick:()=>i("/learn"),children:"← Back to Academy"}),e.jsxs("div",{className:"cd__hero",children:[e.jsx("div",{className:"cd__hero-thumb",children:s.thumbnail?e.jsx("img",{src:s.thumbnail,alt:s.title}):e.jsx("div",{className:"cd__hero-placeholder"})}),e.jsxs("div",{className:"cd__hero-content",children:[e.jsxs("div",{className:"cd__badges",children:[e.jsx("span",{className:"cd__badge",style:K(s.type),children:q(s.type)}),s.category&&e.jsx("span",{className:"cd__badge cd__badge--category",children:s.category})]}),e.jsx("h2",{className:"cd__title",children:s.title}),s.description&&e.jsx("div",{className:"cd__description",dangerouslySetInnerHTML:{__html:s.description}}),e.jsxs("div",{className:"cd__meta",children:[e.jsxs("span",{className:"cd__meta-item",children:[s.lessonCount||j.reduce((r,n)=>{var t;return r+(((t=n.lessons)==null?void 0:t.length)||0)},0)," lessons"]}),_(s.estimatedDuration||g)&&e.jsx("span",{className:"cd__meta-item",children:_(s.estimatedDuration||g)}),s.enrollmentCount!=null&&e.jsxs("span",{className:"cd__meta-item",children:[s.enrollmentCount," enrolled"]})]}),e.jsxs("div",{className:"cd__actions",children:[u==="not-enrolled"&&e.jsx("button",{className:"cd__btn cd__btn--primary",onClick:W,disabled:D,children:D?"Enrolling...":s.price&&s.price>0?`Enroll — R${s.price}`:"Start Learning"}),u==="enrolled"&&e.jsx("button",{className:"cd__btn cd__btn--primary",onClick:()=>{const r=E();r&&i(`/learn/${d}/lesson/${r}`)},children:"Continue Learning"}),u==="completed"&&e.jsx("button",{className:"cd__btn cd__btn--outline",onClick:()=>{const r=E();r&&i(`/learn/${d}/lesson/${r}`)},children:"Review Course"}),u!=="not-enrolled"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"cd__btn cd__btn--ghost",onClick:()=>i(`/learn/${d}/community`),children:"Community"}),e.jsx("button",{className:"cd__btn cd__btn--ghost",onClick:()=>i(`/learn/${d}/live`),children:"Live Sessions"})]})]})]})]}),h!=null&&u!=="not-enrolled"&&e.jsxs("div",{className:"cd__progress",children:[e.jsxs("div",{className:"cd__progress-header",children:[e.jsx("span",{className:"cd__progress-label",children:"Your Progress"}),e.jsxs("span",{className:"cd__progress-pct",children:[h,"%"]})]}),e.jsx("div",{className:"cd__progress-track",children:e.jsx("div",{className:"cd__progress-fill",style:{width:`${h}%`}})})]}),e.jsxs("div",{className:"cd__layout",children:[e.jsx("div",{className:"cd__modules",children:j.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("h3",{className:"cd__modules-heading",children:"Course Content"}),j.map(r=>{const n=!!T[r.id],t=[...r.lessons||[]].sort((o,c)=>(o.sortOrder||0)-(c.sortOrder||0)),l=t.filter(o=>b(o.id)).length;return e.jsxs("div",{className:`cd__module ${n?"cd__module--open":""}`,children:[e.jsxs("button",{className:"cd__module-header",onClick:()=>A(r.id),children:[e.jsxs("div",{className:"cd__module-header-left",children:[e.jsx(U,{open:n}),e.jsx("span",{className:"cd__module-title",children:r.title})]}),e.jsx("span",{className:"cd__module-count",children:a?`${l}/${t.length} lessons`:`${t.length} lessons`})]}),n&&e.jsx("div",{className:"cd__lessons",children:t.map(o=>{const c=b(o.id),y=M(o),p=a&&!y;return e.jsxs("div",{className:`cd__lesson${c?" cd__lesson--completed":""}${y?" cd__lesson--locked":""}${p?" cd__lesson--clickable":""}`,onClick:()=>{p&&i(`/learn/${d}/lesson/${o.id}`)},role:p?"button":void 0,tabIndex:p?0:void 0,onKeyDown:k=>{p&&(k.key==="Enter"||k.key===" ")&&(k.preventDefault(),i(`/learn/${d}/lesson/${o.id}`))},children:[e.jsx("span",{className:"cd__lesson-icon",children:B[o.contentType]||B.article}),e.jsx("span",{className:"cd__lesson-title",children:o.title}),_(o.durationMinutes)&&e.jsx("span",{className:"cd__lesson-duration",children:_(o.durationMinutes)}),e.jsxs("span",{className:"cd__lesson-status",children:[c&&e.jsx(H,{}),y&&e.jsx(V,{})]})]},o.id)})})]},r.id)})]})}),e.jsxs("div",{className:"cd__sidebar",children:[s.creator&&e.jsxs("div",{className:"cd__card",children:[e.jsx("div",{className:"cd__card-header",children:e.jsx("h3",{children:"Instructor"})}),e.jsx("div",{className:"cd__card-body",children:e.jsxs("div",{className:"cd__instructor-profile",children:[e.jsx("div",{className:"cd__instructor-avatar",children:(s.creator.name||"I").charAt(0).toUpperCase()}),e.jsxs("div",{className:"cd__instructor-info",children:[e.jsx("span",{className:"cd__instructor-name",children:s.creator.name}),s.creator.bio&&e.jsx("p",{className:"cd__instructor-bio",children:s.creator.bio})]})]})})]}),e.jsxs("div",{className:"cd__card",children:[e.jsx("div",{className:"cd__card-header",children:e.jsx("h3",{children:"Course Stats"})}),e.jsx("div",{className:"cd__card-body",children:e.jsxs("div",{className:"cd__stats-list",children:[s.enrollmentCount!=null&&e.jsxs("div",{className:"cd__stats-item",children:[e.jsx("span",{className:"cd__stats-label",children:"Enrollments"}),e.jsx("span",{className:"cd__stats-value",children:s.enrollmentCount})]}),h!=null&&e.jsxs("div",{className:"cd__stats-item",children:[e.jsx("span",{className:"cd__stats-label",children:"Your Progress"}),e.jsxs("span",{className:"cd__stats-value",children:[h,"%"]})]}),_(s.estimatedDuration||g)&&e.jsxs("div",{className:"cd__stats-item",children:[e.jsx("span",{className:"cd__stats-label",children:"Total Duration"}),e.jsx("span",{className:"cd__stats-value",children:_(s.estimatedDuration||g)})]}),s.lessonCount!=null&&e.jsxs("div",{className:"cd__stats-item",children:[e.jsx("span",{className:"cd__stats-label",children:"Lessons"}),e.jsx("span",{className:"cd__stats-value",children:s.lessonCount})]})]})})]})]})]})]})}export{G as default};
