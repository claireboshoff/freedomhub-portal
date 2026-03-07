import{u as E,r as n,a as v,j as a}from"./index-D6dyrzHb.js";function L({course:r,onClose:l,onSuccess:p}){const[x,f]=n.useState([]),[u,g]=n.useState(!0),[i,w]=n.useState(""),[c,b]=n.useState(null),[d,o]=n.useState(null);n.useEffect(()=>{v.adminClients().then(t=>f(t.clients||[])).catch(()=>o({type:"error",text:"Failed to load clients"})).finally(()=>g(!1))},[]);const m=x.filter(t=>{if(!i.trim())return!0;const _=i.toLowerCase();return(t.name||"").toLowerCase().includes(_)||(t.email||"").toLowerCase().includes(_)});async function y(t){b(t),o(null);try{await v.adminEnrollClient(r.id,t),o({type:"success",text:"Client enrolled successfully!"}),p&&p()}catch(_){const h=_.message||"Failed to enroll client";o({type:"error",text:h.includes("Already enrolled")?"Client is already enrolled in this course.":h})}finally{b(null)}}return a.jsx("div",{className:"ac__modal-overlay",onClick:l,children:a.jsxs("div",{className:"ac__modal",onClick:t=>t.stopPropagation(),children:[a.jsxs("div",{className:"ac__modal-header",children:[a.jsx("h3",{children:"Enroll Client"}),a.jsx("button",{className:"ac__modal-close",onClick:l,children:"×"})]}),a.jsxs("p",{className:"ac__modal-course-title",children:["Course: ",a.jsx("strong",{children:r.title})]}),d&&a.jsx("div",{className:`ac__modal-feedback ac__modal-feedback--${d.type}`,children:d.text}),a.jsx("input",{type:"text",className:"ac__search ac__modal-search",placeholder:"Search clients by name or email...",value:i,onChange:t=>w(t.target.value)}),a.jsx("div",{className:"ac__modal-client-list",children:u?a.jsx("div",{className:"ac__modal-loading",children:"Loading clients..."}):m.length===0?a.jsx("div",{className:"ac__modal-loading",children:"No clients found"}):m.map(t=>a.jsxs("div",{className:"ac__modal-client-row",children:[a.jsxs("div",{className:"ac__modal-client-info",children:[a.jsx("span",{className:"ac__modal-client-name",children:t.name}),a.jsx("span",{className:"ac__modal-client-email",children:t.email})]}),a.jsx("button",{className:"ac__btn ac__btn--primary ac__btn--sm",disabled:c===t.id,onClick:()=>y(t.id),children:c===t.id?"...":"Enroll"})]},t.id))})]})})}function A(){const r=E(),[l,p]=n.useState([]),[x,f]=n.useState(!0),[u,g]=n.useState(null),[i,w]=n.useState("All"),[c,b]=n.useState(""),[d,o]=n.useState(null),[m,y]=n.useState(null);n.useEffect(()=>{t()},[]);async function t(){try{f(!0),g(null);const e=await v.adminCourses();p(Array.isArray(e)?e:e.courses||[])}catch(e){g(e.message||"Failed to load courses")}finally{f(!1)}}async function _(e,s){e.stopPropagation();const k=s.status==="Published"?"Draft":"Published";try{o(s.id),await v.adminToggleCourseStatus(s.id,k),p(N=>N.map(C=>C.id===s.id?{...C,status:k}:C))}catch(N){alert("Failed to update status: "+(N.message||"Unknown error"))}finally{o(null)}}const h=n.useMemo(()=>{let e=l;if(i==="Published"&&(e=e.filter(s=>s.status==="Published")),i==="Draft"&&(e=e.filter(s=>s.status==="Draft")),c.trim()){const s=c.toLowerCase();e=e.filter(k=>(k.title||"").toLowerCase().includes(s))}return e},[l,i,c]),j=n.useMemo(()=>({total:l.length,published:l.filter(e=>e.status==="Published").length,draft:l.filter(e=>e.status==="Draft").length,enrollments:l.reduce((e,s)=>e+(s.enrolled||s.enrollments||s.enrollmentCount||0),0)}),[l]);function z(e){return e?new Date(e).toLocaleDateString("en-ZA",{day:"numeric",month:"short",year:"numeric"}):"--"}return u&&!x?a.jsxs("div",{className:"ac__container",children:[a.jsx("style",{children:S}),a.jsxs("div",{className:"ac__error",children:[a.jsx("h3",{children:"Something went wrong"}),a.jsx("p",{children:u}),a.jsx("button",{className:"ac__btn ac__btn--primary",onClick:t,children:"Try Again"})]})]}):a.jsxs("div",{className:"ac__container",children:[a.jsx("style",{children:S}),a.jsxs("div",{className:"ac__header",children:[a.jsx("h1",{className:"ac__title",children:"Course Management"}),a.jsx("button",{className:"ac__btn ac__btn--primary",onClick:()=>r("/admin/courses/new"),children:"+ Create Course"})]}),x?a.jsx("div",{className:"ac__stats",children:[1,2,3,4].map(e=>a.jsx("div",{className:"ac__stat-card ac__skeleton",children:" "},e))}):a.jsxs("div",{className:"ac__stats",children:[a.jsxs("div",{className:"ac__stat-card",children:[a.jsx("span",{className:"ac__stat-value",children:j.total}),a.jsx("span",{className:"ac__stat-label",children:"Total Courses"})]}),a.jsxs("div",{className:"ac__stat-card",children:[a.jsx("span",{className:"ac__stat-value ac__stat-value--green",children:j.published}),a.jsx("span",{className:"ac__stat-label",children:"Published"})]}),a.jsxs("div",{className:"ac__stat-card",children:[a.jsx("span",{className:"ac__stat-value ac__stat-value--gold",children:j.draft}),a.jsx("span",{className:"ac__stat-label",children:"Draft"})]}),a.jsxs("div",{className:"ac__stat-card",children:[a.jsx("span",{className:"ac__stat-value",children:j.enrollments}),a.jsx("span",{className:"ac__stat-label",children:"Total Enrollments"})]})]}),a.jsxs("div",{className:"ac__toolbar",children:[a.jsx("div",{className:"ac__tabs",children:["All","Published","Draft"].map(e=>a.jsx("button",{className:`ac__tab ${i===e?"ac__tab--active":""}`,onClick:()=>w(e),children:e},e))}),a.jsx("input",{type:"text",className:"ac__search",placeholder:"Search by title...",value:c,onChange:e=>b(e.target.value)})]}),x?a.jsx("div",{className:"ac__list",children:[1,2,3].map(e=>a.jsxs("div",{className:"ac__card ac__skeleton-card",children:[a.jsx("div",{className:"ac__skeleton ac__skeleton-thumb"}),a.jsxs("div",{className:"ac__skeleton-body",children:[a.jsx("div",{className:"ac__skeleton ac__skeleton-line ac__skeleton-line--wide"}),a.jsx("div",{className:"ac__skeleton ac__skeleton-line ac__skeleton-line--med"}),a.jsx("div",{className:"ac__skeleton ac__skeleton-line ac__skeleton-line--short"})]})]},e))}):h.length===0?a.jsxs("div",{className:"ac__empty",children:[a.jsx("div",{className:"ac__empty-icon",children:a.jsxs("svg",{width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"#ccc",strokeWidth:"1.5",children:[a.jsx("path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"}),a.jsx("path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"})]})}),a.jsx("h3",{children:"No courses found"}),a.jsx("p",{children:c?"Try a different search term.":"Create your first course to get started."}),!c&&i==="All"&&a.jsx("button",{className:"ac__btn ac__btn--primary",onClick:()=>r("/admin/courses/new"),children:"+ Create Course"})]}):a.jsx("div",{className:"ac__list",children:h.map(e=>a.jsxs("div",{className:"ac__card",children:[a.jsx("div",{className:"ac__card-thumb",children:e.thumbnail?a.jsx("img",{src:e.thumbnail,alt:e.title}):a.jsx("div",{className:"ac__card-placeholder",children:a.jsxs("svg",{width:"32",height:"32",viewBox:"0 0 24 24",fill:"none",stroke:"#c5a55a",strokeWidth:"1.5",opacity:"0.5",children:[a.jsx("path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"}),a.jsx("path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"})]})})}),a.jsxs("div",{className:"ac__card-body",children:[a.jsxs("div",{className:"ac__card-top",children:[a.jsx("h3",{className:"ac__card-title",children:e.title}),a.jsx("span",{className:`ac__badge ${e.status==="Published"?"ac__badge--published":"ac__badge--draft"}`,children:e.status||"Draft"})]}),a.jsxs("div",{className:"ac__card-meta",children:[e.category&&a.jsxs("span",{className:"ac__meta-item",children:["Category: ",e.category]}),a.jsxs("span",{className:"ac__meta-item",children:[e.moduleCount??e.modules??0," modules"]}),a.jsxs("span",{className:"ac__meta-item",children:[e.lessonCount??e.lessons??0," lessons"]}),a.jsxs("span",{className:"ac__meta-item",children:[e.enrolled??e.enrollments??e.enrollmentCount??0," enrolled"]}),a.jsxs("span",{className:"ac__meta-item",children:["Created: ",z(e.createdAt||e.created)]})]}),a.jsxs("div",{className:"ac__card-actions",children:[a.jsx("button",{className:"ac__btn ac__btn--primary ac__btn--sm",onClick:()=>r(`/admin/courses/${e.id}/edit`),children:"Edit"}),a.jsx("button",{className:"ac__btn ac__btn--ghost ac__btn--sm",onClick:()=>r(`/learn/${e.slug}`),children:"View"}),a.jsx("button",{className:"ac__btn ac__btn--ghost ac__btn--sm",onClick:()=>r(`/admin/courses/${e.id}/analytics`),children:"Analytics"}),a.jsx("button",{className:"ac__btn ac__btn--ghost ac__btn--sm",onClick:()=>y(e),children:"Enroll Client"}),a.jsx("button",{className:"ac__btn ac__btn--outline ac__btn--sm",disabled:d===e.id,onClick:s=>_(s,e),children:d===e.id?"...":e.status==="Published"?"Unpublish":"Publish"})]})]})]},e.id))}),m&&a.jsx(L,{course:m,onClose:()=>y(null),onSuccess:t})]})}const S=`
  .ac__container {
    max-width: 960px;
    margin: 0 auto;
    padding: 32px 20px;
    font-family: 'Inter', sans-serif;
    color: #2d2d2d;
  }
  .ac__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;
    flex-wrap: wrap;
    gap: 12px;
  }
  .ac__title {
    font-family: 'League Spartan', sans-serif;
    font-size: 28px;
    font-weight: 700;
    margin: 0;
    color: #2d2d2d;
  }

  /* Buttons */
  .ac__btn {
    border: none;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    border-radius: 8px;
    transition: opacity 0.2s, background 0.2s;
    font-size: 14px;
    padding: 10px 20px;
  }
  .ac__btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .ac__btn--primary {
    background: #c5a55a;
    color: #fff;
  }
  .ac__btn--primary:hover:not(:disabled) {
    background: #b8973f;
  }
  .ac__btn--ghost {
    background: transparent;
    color: #c5a55a;
    border: none;
  }
  .ac__btn--ghost:hover:not(:disabled) {
    background: rgba(197,165,90,0.08);
  }
  .ac__btn--outline {
    background: transparent;
    color: #2d2d2d;
    border: 1px solid #ddd;
  }
  .ac__btn--outline:hover:not(:disabled) {
    border-color: #c5a55a;
    color: #c5a55a;
  }
  .ac__btn--sm {
    padding: 6px 14px;
    font-size: 13px;
  }

  /* Stats */
  .ac__stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 16px;
    margin-bottom: 28px;
  }
  .ac__stat-card {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  .ac__stat-value {
    font-family: 'League Spartan', sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: #2d2d2d;
  }
  .ac__stat-value--green { color: #22c55e; }
  .ac__stat-value--gold { color: #c5a55a; }
  .ac__stat-label {
    font-size: 13px;
    color: #888;
  }

  /* Toolbar */
  .ac__toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 12px;
  }
  .ac__tabs {
    display: flex;
    gap: 4px;
    background: #f3f3f3;
    border-radius: 8px;
    padding: 3px;
  }
  .ac__tab {
    border: none;
    background: transparent;
    padding: 8px 18px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 6px;
    color: #888;
    font-family: 'Inter', sans-serif;
    transition: all 0.2s;
  }
  .ac__tab--active {
    background: #fff;
    color: #2d2d2d;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  }
  .ac__search {
    padding: 10px 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    min-width: 220px;
    outline: none;
    transition: border-color 0.2s;
  }
  .ac__search:focus {
    border-color: #c5a55a;
  }

  /* Course List */
  .ac__list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .ac__card {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    display: flex;
    overflow: hidden;
  }
  .ac__card-thumb {
    width: 140px;
    min-height: 120px;
    background: #f5f0e6;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .ac__card-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .ac__card-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ac__card-body {
    flex: 1;
    padding: 18px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .ac__card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }
  .ac__card-title {
    font-family: 'League Spartan', sans-serif;
    font-size: 18px;
    font-weight: 700;
    margin: 0;
    color: #2d2d2d;
  }
  .ac__badge {
    font-size: 11px;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }
  .ac__badge--published {
    background: #e6f4ea;
    color: #1e7e34;
  }
  .ac__badge--draft {
    background: #fff3e0;
    color: #b26a00;
  }
  .ac__card-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 16px;
    font-size: 13px;
    color: #888;
  }
  .ac__card-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: auto;
  }

  /* Empty */
  .ac__empty {
    text-align: center;
    padding: 60px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  .ac__empty-icon {
    margin-bottom: 12px;
  }
  .ac__empty h3 {
    font-family: 'League Spartan', sans-serif;
    font-size: 20px;
    margin: 0 0 8px;
    color: #2d2d2d;
  }
  .ac__empty p {
    color: #888;
    margin: 0 0 20px;
    font-size: 14px;
  }

  /* Error */
  .ac__error {
    text-align: center;
    padding: 60px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  .ac__error h3 {
    font-family: 'League Spartan', sans-serif;
    font-size: 20px;
    margin: 0 0 8px;
    color: #c0392b;
  }
  .ac__error p {
    color: #888;
    margin: 0 0 20px;
    font-size: 14px;
  }

  /* Skeletons */
  .ac__skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: ac__shimmer 1.5s infinite;
    border-radius: 10px;
  }
  @keyframes ac__shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  .ac__skeleton-card {
    min-height: 120px;
    display: flex;
    gap: 16px;
    padding: 18px 20px;
    background: #fff;
  }
  .ac__skeleton-thumb {
    width: 100px;
    height: 80px;
    flex-shrink: 0;
  }
  .ac__skeleton-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .ac__skeleton-line {
    height: 14px;
  }
  .ac__skeleton-line--wide { width: 70%; }
  .ac__skeleton-line--med { width: 50%; }
  .ac__skeleton-line--short { width: 30%; }

  /* Modal */
  .ac__modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .ac__modal {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    width: 480px;
    max-width: 90vw;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .ac__modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid #eee;
  }
  .ac__modal-header h3 {
    font-family: 'League Spartan', sans-serif;
    font-size: 18px;
    font-weight: 700;
    margin: 0;
    color: #2d2d2d;
  }
  .ac__modal-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #888;
    line-height: 1;
    padding: 0 4px;
  }
  .ac__modal-close:hover {
    color: #2d2d2d;
  }
  .ac__modal-course-title {
    padding: 12px 20px 0;
    font-size: 14px;
    color: #555;
    margin: 0;
  }
  .ac__modal-feedback {
    margin: 12px 20px 0;
    padding: 10px 14px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
  }
  .ac__modal-feedback--success {
    background: #e6f4ea;
    color: #1e7e34;
  }
  .ac__modal-feedback--error {
    background: #fdecea;
    color: #c0392b;
  }
  .ac__modal-search {
    margin: 12px 20px 0;
    width: calc(100% - 40px);
  }
  .ac__modal-client-list {
    flex: 1;
    overflow-y: auto;
    padding: 12px 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .ac__modal-loading {
    text-align: center;
    padding: 24px 0;
    color: #888;
    font-size: 14px;
  }
  .ac__modal-client-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    border: 1px solid #eee;
    border-radius: 8px;
    transition: border-color 0.2s;
  }
  .ac__modal-client-row:hover {
    border-color: #c5a55a;
  }
  .ac__modal-client-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .ac__modal-client-name {
    font-size: 14px;
    font-weight: 600;
    color: #2d2d2d;
  }
  .ac__modal-client-email {
    font-size: 12px;
    color: #888;
  }

  @media (max-width: 640px) {
    .ac__card {
      flex-direction: column;
    }
    .ac__card-thumb {
      width: 100%;
      min-height: 100px;
    }
    .ac__toolbar {
      flex-direction: column;
      align-items: stretch;
    }
    .ac__search {
      min-width: unset;
    }
  }
`;export{A as default};
