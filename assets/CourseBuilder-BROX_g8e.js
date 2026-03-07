import{b as se,u as ae,r as u,a as m,j as e}from"./index-h96dWn9f.js";function $(j){return(j||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}const te=["course","quest","challenge","meditation-series","podcast-series"],ne=["business","wellness","marketing","mindset","skills","finance","coaching"],ie=["draft","published","archived"],re=["private","unlisted","public"],le=["video","audio","text","mixed"],oe=["multiple-choice","true-false","open-ended"];function de(){const{courseId:j}=se(),Q=ae(),C=!!j,[Z,L]=u.useState(C),[v,y]=u.useState(!1),[q,I]=u.useState(null),[o,O]=u.useState({title:"",slug:"",description:"",type:"course",category:"business",status:"draft",visibility:"private",priceZAR:0,priceUSD:0,featured:!1,dripEnabled:!1,dripIntervalDays:7,estimatedDuration:""}),[b,w]=u.useState([]),[M,G]=u.useState(null),[P,U]=u.useState(!1),[N,E]=u.useState({title:"",description:""}),[c,D]=u.useState(null),[l,d]=u.useState(null),[z,T]=u.useState(null),[h,g]=u.useState(null);u.useEffect(()=>{C&&Promise.all([m.adminCourses()]).then(([s])=>{const a=(s.courses||[]).find(t=>t.id===j);a&&(O({title:a.title||"",slug:a.slug||"",description:a.description||"",type:a.type||"course",category:a.category||"business",status:a.status||"draft",visibility:a.visibility||"private",priceZAR:a.priceZAR||0,priceUSD:a.priceUSD||0,featured:a.featured||!1,dripEnabled:a.dripEnabled||!1,dripIntervalDays:a.dripIntervalDays||7,estimatedDuration:a.estimatedDuration||""}),w(a.modules||[])),L(!1)}).catch(()=>L(!1))},[j,C]);const p=u.useCallback((s,a)=>{O(t=>{const n={...t,[s]:a};return s==="title"&&(!t.slug||t.slug===$(t.title))&&(n.slug=$(a)),n}),I(null)},[]);async function W(){y(!0),I(null);try{if(C)await m.adminUpdateCourse(j,o);else{const s=await m.adminCreateCourse(o);s.courseId&&Q(`/admin/courses/${s.courseId}`,{replace:!0})}I("saved")}catch(s){console.error("Save failed:",s),I("error")}y(!1)}async function Y(){if(N.title.trim()){y(!0);try{const s=await m.adminCreateModule(j,{title:N.title,description:N.description,sortOrder:b.length+1});w(a=>[...a,{id:s.moduleId||Date.now().toString(),title:N.title,description:N.description,sortOrder:b.length+1,lessons:[]}]),E({title:"",description:""}),U(!1)}catch(s){console.error("Add module failed:",s)}y(!1)}}async function R(s,a){const t=[...b],n=s+a;if(!(n<0||n>=t.length)){[t[s],t[n]]=[t[n],t[s]],t.forEach((i,r)=>{i.sortOrder=r+1}),w(t);try{await m.adminUpdateModule(t[s].id,{sortOrder:t[s].sortOrder}),await m.adminUpdateModule(t[n].id,{sortOrder:t[n].sortOrder})}catch(i){console.error("Reorder failed:",i)}}}function B(s,a,t){D({moduleId:s,index:t}),d(a?{...a}:{title:"",contentType:"video",status:"draft",durationMinutes:0,videoUrl:"",audioUrl:"",writtenContent:"",reflectionPrompt:"",quizEnabled:!1,dripDay:0,sortOrder:0})}async function V(){var t,n,i;if(!l||!c)return;const{moduleId:s,index:a}=c;y(!0);try{if(a!=null){const r=b.find(f=>f.id===s),x=(t=r==null?void 0:r.lessons)==null?void 0:t[a];x!=null&&x.id&&await m.adminUpdateLesson(x.id,l),w(f=>f.map(S=>{if(S.id!==s)return S;const A=[...S.lessons||[]];return A[a]={...A[a],...l},{...S,lessons:A}}))}else{const r=await m.adminCreateLesson(s,{courseId:j,...l,sortOrder:(((i=(n=b.find(x=>x.id===s))==null?void 0:n.lessons)==null?void 0:i.length)||0)+1});w(x=>x.map(f=>f.id!==s?f:{...f,lessons:[...f.lessons||[],{id:r.lessonId||Date.now().toString(),...l}]}))}D(null),d(null)}catch(r){console.error("Save lesson failed:",r)}y(!1)}async function F(s,a,t){w(n=>n.map(i=>{if(i.id!==s)return i;const r=[...i.lessons||[]],x=a+t;return x<0||x>=r.length?i:([r[a],r[x]]=[r[x],r[a]],r.forEach((f,S)=>{f.sortOrder=S+1}),{...i,lessons:r})}))}function _(s){T(s);let a=null;for(const t of b)for(const n of t.lessons||[])if(n.id===s&&n.quiz){a=n.quiz;break}g(a||{questions:[],passScore:70,type:"practice"})}function H(){g(s=>({...s,questions:[...s.questions||[],{type:"multiple-choice",question:"",options:["","","",""],correctIndex:0,explanation:"",points:10}]}))}function k(s,a,t){g(n=>{const i=[...n.questions];return i[s]={...i[s],[a]:t},{...n,questions:i}})}function J(s,a,t){g(n=>{const i=[...n.questions],r=[...i[s].options];return r[a]=t,i[s]={...i[s],options:r},{...n,questions:i}})}function K(s){g(a=>({...a,questions:a.questions.filter((t,n)=>n!==s)}))}async function X(){var s;if(!(!h||!z)){y(!0);try{let a=null;for(const n of b)for(const i of n.lessons||[])i.id===z&&((s=i.quiz)!=null&&s.id)&&(a=i.quiz.id);const t={questions:JSON.stringify(h.questions),passScore:h.passScore,type:h.type};if(a)await m.adminUpdateQuiz(a,t);else{const n=await m.adminCreateQuiz(z,t);t.id=n.quizId||Date.now().toString()}w(n=>n.map(i=>({...i,lessons:(i.lessons||[]).map(r=>r.id!==z?r:{...r,quiz:{...h,id:a||t.id}})}))),T(null),g(null)}catch(a){console.error("Save quiz failed:",a)}y(!1)}}if(Z)return e.jsxs("div",{className:"page-loading",children:[e.jsx("div",{className:"spinner"}),e.jsx("p",{children:"Loading course..."})]});const ee=s=>{switch(s){case"video":return"▶";case"audio":return"♫";case"text":return"¶";default:return"◈"}};return e.jsxs("div",{className:"course-builder-page",children:[e.jsx("style",{children:`
        .course-builder-page { max-width: 900px; }
        .cb-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--gray-400, #9ca3af);
          font-size: 13px;
          text-decoration: none;
          margin-bottom: 16px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          font-family: var(--font-body, 'Inter', sans-serif);
        }
        .cb-back:hover { color: var(--gold, #c5a55a); }
        .cb-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .cb-header h2 {
          margin: 0;
          font-family: var(--font-heading, 'League Spartan', sans-serif);
        }
        .cb-save-area { display: flex; align-items: center; gap: 12px; }
        .cb-save-status {
          font-size: 13px;
          font-weight: 500;
        }
        .cb-save-status--saving { color: var(--gray-400, #9ca3af); }
        .cb-save-status--saved { color: var(--green, #22c55e); }
        .cb-save-status--error { color: var(--red, #ef4444); }
        .cb-section {
          background: var(--white, #fff);
          border: 1px solid var(--gray-100, #e5e7eb);
          border-radius: var(--radius, 12px);
          padding: 24px;
          margin-bottom: 20px;
        }
        .cb-section h3 {
          margin: 0 0 20px;
          font-family: var(--font-heading, 'League Spartan', sans-serif);
          font-size: 18px;
          color: var(--charcoal, #2d2d2d);
        }
        .cb-field {
          margin-bottom: 16px;
        }
        .cb-field label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: var(--gray-600, #4b5563);
          margin-bottom: 6px;
          font-family: var(--font-body, 'Inter', sans-serif);
        }
        .cb-field input[type="text"],
        .cb-field input[type="number"],
        .cb-field textarea,
        .cb-field select {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid var(--gray-100, #e5e7eb);
          border-radius: 8px;
          font-size: 14px;
          font-family: var(--font-body, 'Inter', sans-serif);
          background: var(--white, #fff);
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .cb-field input:focus,
        .cb-field textarea:focus,
        .cb-field select:focus { border-color: var(--gold, #c5a55a); }
        .cb-field textarea { min-height: 100px; resize: vertical; }
        .cb-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .cb-row-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 600px) {
          .cb-row, .cb-row-3 { grid-template-columns: 1fr; }
        }
        .cb-checkbox {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          cursor: pointer;
        }
        .cb-checkbox input {
          width: 18px;
          height: 18px;
          accent-color: var(--gold, #c5a55a);
          cursor: pointer;
        }
        .cb-checkbox span {
          font-size: 14px;
          color: var(--charcoal, #2d2d2d);
        }
        .btn-gold {
          padding: 10px 20px;
          background: var(--gold, #c5a55a);
          color: var(--white, #fff);
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          font-family: var(--font-body, 'Inter', sans-serif);
          transition: opacity 0.2s;
        }
        .btn-gold:hover { opacity: 0.9; }
        .btn-gold:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-outline {
          padding: 8px 16px;
          background: transparent;
          color: var(--gold, #c5a55a);
          border: 1px solid var(--gold, #c5a55a);
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: var(--font-body, 'Inter', sans-serif);
          transition: all 0.2s;
        }
        .btn-outline:hover {
          background: var(--gold, #c5a55a);
          color: var(--white, #fff);
        }
        .btn-sm {
          padding: 4px 10px;
          font-size: 12px;
        }
        .btn-ghost {
          padding: 6px 10px;
          background: none;
          border: 1px solid var(--gray-100, #e5e7eb);
          border-radius: 6px;
          cursor: pointer;
          color: var(--gray-600, #4b5563);
          font-size: 12px;
          font-family: var(--font-body, 'Inter', sans-serif);
        }
        .btn-ghost:hover { border-color: var(--gold, #c5a55a); color: var(--gold, #c5a55a); }
        .btn-danger {
          color: var(--red, #ef4444);
          border-color: var(--red, #ef4444);
        }
        .btn-danger:hover { background: var(--red, #ef4444); color: white; }

        /* Module styles */
        .cb-module {
          border: 1px solid var(--gray-100, #e5e7eb);
          border-radius: 8px;
          margin-bottom: 12px;
          overflow: hidden;
        }
        .cb-module-header {
          display: flex;
          align-items: center;
          padding: 14px 16px;
          background: var(--gray-50, #f9fafb);
          cursor: pointer;
          gap: 12px;
          user-select: none;
        }
        .cb-module-header:hover { background: var(--cream, #faf9f6); }
        .cb-module-order {
          font-weight: 700;
          font-size: 14px;
          color: var(--gold, #c5a55a);
          min-width: 28px;
        }
        .cb-module-title {
          flex: 1;
          font-weight: 600;
          font-size: 14px;
          color: var(--charcoal, #2d2d2d);
        }
        .cb-module-meta {
          font-size: 12px;
          color: var(--gray-400, #9ca3af);
        }
        .cb-module-arrows {
          display: flex;
          gap: 4px;
        }
        .cb-arrow-btn {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--gray-100, #e5e7eb);
          border-radius: 6px;
          background: var(--white, #fff);
          cursor: pointer;
          color: var(--gray-600, #4b5563);
          font-size: 14px;
          transition: all 0.15s;
        }
        .cb-arrow-btn:hover { border-color: var(--gold, #c5a55a); color: var(--gold, #c5a55a); }
        .cb-chevron {
          transition: transform 0.2s;
          color: var(--gray-400, #9ca3af);
        }
        .cb-chevron--open { transform: rotate(90deg); }
        .cb-module-body {
          padding: 16px;
          border-top: 1px solid var(--gray-100, #e5e7eb);
        }

        /* Lesson styles */
        .cb-lesson {
          display: flex;
          align-items: center;
          padding: 10px 12px;
          border: 1px solid var(--gray-100, #e5e7eb);
          border-radius: 6px;
          margin-bottom: 8px;
          gap: 10px;
          font-size: 13px;
        }
        .cb-lesson-icon {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          background: var(--cream, #faf9f6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: var(--gold, #c5a55a);
          flex-shrink: 0;
        }
        .cb-lesson-title {
          flex: 1;
          font-weight: 500;
          color: var(--charcoal, #2d2d2d);
        }
        .cb-lesson-status {
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 10px;
          text-transform: uppercase;
          font-weight: 600;
        }
        .cb-lesson-status--draft { background: #fef3c7; color: #92400e; }
        .cb-lesson-status--published { background: #dcfce7; color: #166534; }
        .cb-lesson-dur {
          font-size: 12px;
          color: var(--gray-400, #9ca3af);
          min-width: 40px;
          text-align: right;
        }
        .cb-lesson-actions { display: flex; gap: 4px; }
        .cb-no-lessons {
          text-align: center;
          padding: 20px;
          color: var(--gray-400, #9ca3af);
          font-size: 13px;
        }

        /* Inline forms */
        .cb-inline-form {
          background: var(--cream, #faf9f6);
          border: 1px solid var(--gray-100, #e5e7eb);
          border-radius: 8px;
          padding: 16px;
          margin-top: 12px;
        }
        .cb-inline-form h4 {
          margin: 0 0 12px;
          font-size: 14px;
          font-family: var(--font-heading, 'League Spartan', sans-serif);
        }
        .cb-form-actions {
          display: flex;
          gap: 8px;
          margin-top: 12px;
        }

        /* Lesson modal overlay */
        .cb-lesson-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }
        .cb-lesson-modal {
          background: var(--white, #fff);
          border-radius: var(--radius, 12px);
          padding: 28px;
          width: 100%;
          max-width: 640px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }
        .cb-lesson-modal h3 {
          margin: 0 0 20px;
          font-family: var(--font-heading, 'League Spartan', sans-serif);
        }

        /* Quiz builder */
        .cb-quiz-section {
          background: var(--cream, #faf9f6);
          border: 1px solid var(--gray-100, #e5e7eb);
          border-radius: 8px;
          padding: 20px;
          margin-top: 16px;
        }
        .cb-question {
          background: var(--white, #fff);
          border: 1px solid var(--gray-100, #e5e7eb);
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 12px;
        }
        .cb-question-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .cb-question-num {
          font-weight: 700;
          font-size: 13px;
          color: var(--gold, #c5a55a);
        }
        .cb-option-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .cb-option-radio {
          accent-color: var(--gold, #c5a55a);
          cursor: pointer;
        }
        .cb-option-input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid var(--gray-100, #e5e7eb);
          border-radius: 6px;
          font-size: 13px;
          font-family: var(--font-body, 'Inter', sans-serif);
        }
      `}),e.jsxs("button",{className:"cb-back",onClick:()=>Q("/admin/courses"),children:[e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("polyline",{points:"15 18 9 12 15 6"})}),"Back to Courses"]}),e.jsxs("div",{className:"cb-header",children:[e.jsx("h2",{children:C?"Edit Course":"Create Course"}),e.jsxs("div",{className:"cb-save-area",children:[v&&e.jsx("span",{className:"cb-save-status cb-save-status--saving",children:"Saving..."}),q==="saved"&&e.jsx("span",{className:"cb-save-status cb-save-status--saved",children:"Saved"}),q==="error"&&e.jsx("span",{className:"cb-save-status cb-save-status--error",children:"Save failed"}),e.jsx("button",{className:"btn-gold",onClick:W,disabled:v||!o.title.trim(),children:v?"Saving...":C?"Save Changes":"Create Course"})]})]}),e.jsxs("div",{className:"cb-section",children:[e.jsx("h3",{children:"Course Details"}),e.jsxs("div",{className:"cb-field",children:[e.jsx("label",{children:"Title"}),e.jsx("input",{type:"text",value:o.title,onChange:s=>p("title",s.target.value),placeholder:"e.g. Business Growth Masterclass"})]}),e.jsxs("div",{className:"cb-field",children:[e.jsx("label",{children:"Slug"}),e.jsx("input",{type:"text",value:o.slug,onChange:s=>p("slug",s.target.value),placeholder:"auto-generated-from-title"})]}),e.jsxs("div",{className:"cb-field",children:[e.jsx("label",{children:"Description"}),e.jsx("textarea",{value:o.description,onChange:s=>p("description",s.target.value),placeholder:"Course description..."})]}),e.jsxs("div",{className:"cb-row",children:[e.jsxs("div",{className:"cb-field",children:[e.jsx("label",{children:"Type"}),e.jsx("select",{value:o.type,onChange:s=>p("type",s.target.value),children:te.map(s=>e.jsx("option",{value:s,children:s.replace(/-/g," ").replace(/\b\w/g,a=>a.toUpperCase())},s))})]}),e.jsxs("div",{className:"cb-field",children:[e.jsx("label",{children:"Category"}),e.jsx("select",{value:o.category,onChange:s=>p("category",s.target.value),children:ne.map(s=>e.jsx("option",{value:s,children:s.charAt(0).toUpperCase()+s.slice(1)},s))})]})]}),e.jsxs("div",{className:"cb-row-3",children:[e.jsxs("div",{className:"cb-field",children:[e.jsx("label",{children:"Status"}),e.jsx("select",{value:o.status,onChange:s=>p("status",s.target.value),children:ie.map(s=>e.jsx("option",{value:s,children:s.charAt(0).toUpperCase()+s.slice(1)},s))})]}),e.jsxs("div",{className:"cb-field",children:[e.jsx("label",{children:"Visibility"}),e.jsx("select",{value:o.visibility,onChange:s=>p("visibility",s.target.value),children:re.map(s=>e.jsx("option",{value:s,children:s.charAt(0).toUpperCase()+s.slice(1)},s))})]}),e.jsxs("div",{className:"cb-field",children:[e.jsx("label",{children:"Estimated Duration"}),e.jsx("input",{type:"text",value:o.estimatedDuration,onChange:s=>p("estimatedDuration",s.target.value),placeholder:"e.g. 4 weeks"})]})]}),e.jsxs("div",{className:"cb-row",children:[e.jsxs("div",{className:"cb-field",children:[e.jsx("label",{children:"Price (ZAR)"}),e.jsx("input",{type:"number",min:"0",value:o.priceZAR,onChange:s=>p("priceZAR",Number(s.target.value))})]}),e.jsxs("div",{className:"cb-field",children:[e.jsx("label",{children:"Price (USD)"}),e.jsx("input",{type:"number",min:"0",value:o.priceUSD,onChange:s=>p("priceUSD",Number(s.target.value))})]})]}),e.jsxs("label",{className:"cb-checkbox",children:[e.jsx("input",{type:"checkbox",checked:o.featured,onChange:s=>p("featured",s.target.checked)}),e.jsx("span",{children:"Featured Course"})]}),e.jsxs("label",{className:"cb-checkbox",children:[e.jsx("input",{type:"checkbox",checked:o.dripEnabled,onChange:s=>p("dripEnabled",s.target.checked)}),e.jsx("span",{children:"Enable Drip Content"})]}),o.dripEnabled&&e.jsxs("div",{className:"cb-field",style:{maxWidth:"200px"},children:[e.jsx("label",{children:"Drip Interval (Days)"}),e.jsx("input",{type:"number",min:"1",value:o.dripIntervalDays,onChange:s=>p("dripIntervalDays",Number(s.target.value))})]})]}),C&&e.jsxs("div",{className:"cb-section",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"20px"},children:[e.jsx("h3",{style:{margin:0},children:"Modules & Lessons"}),e.jsx("button",{className:"btn-outline",onClick:()=>U(!0),children:"+ Add Module"})]}),b.length===0&&!P&&e.jsx("div",{className:"cb-no-lessons",children:e.jsx("p",{children:"No modules yet. Add your first module to start building the course structure."})}),b.map((s,a)=>e.jsxs("div",{className:"cb-module",children:[e.jsxs("div",{className:"cb-module-header",onClick:()=>G(M===s.id?null:s.id),children:[e.jsx("span",{className:"cb-module-order",children:a+1}),e.jsx("span",{className:"cb-module-title",children:s.title}),e.jsxs("span",{className:"cb-module-meta",children:[(s.lessons||[]).length," lessons"]}),e.jsxs("div",{className:"cb-module-arrows",onClick:t=>t.stopPropagation(),children:[e.jsx("button",{className:"cb-arrow-btn",onClick:()=>R(a,-1),disabled:a===0,title:"Move up",children:"▲"}),e.jsx("button",{className:"cb-arrow-btn",onClick:()=>R(a,1),disabled:a===b.length-1,title:"Move down",children:"▼"})]}),e.jsx("svg",{className:`cb-chevron ${M===s.id?"cb-chevron--open":""}`,width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("polyline",{points:"9 18 15 12 9 6"})})]}),M===s.id&&e.jsxs("div",{className:"cb-module-body",children:[s.description&&e.jsx("p",{style:{fontSize:"13px",color:"var(--gray-400)",margin:"0 0 12px"},children:s.description}),(s.lessons||[]).length===0&&e.jsx("div",{className:"cb-no-lessons",children:"No lessons in this module yet."}),(s.lessons||[]).map((t,n)=>e.jsxs("div",{className:"cb-lesson",children:[e.jsx("div",{className:"cb-lesson-icon",children:ee(t.contentType)}),e.jsx("span",{className:"cb-lesson-title",children:t.title}),e.jsx("span",{className:`cb-lesson-status cb-lesson-status--${t.status||"draft"}`,children:t.status||"draft"}),t.durationMinutes>0&&e.jsxs("span",{className:"cb-lesson-dur",children:[t.durationMinutes,"m"]}),t.quizEnabled&&e.jsx("button",{className:"btn-ghost btn-sm",onClick:()=>_(t.id),children:"Quiz"}),e.jsxs("div",{className:"cb-lesson-actions",children:[e.jsx("button",{className:"cb-arrow-btn",style:{width:"24px",height:"24px",fontSize:"11px"},onClick:()=>F(s.id,n,-1),disabled:n===0,children:"▲"}),e.jsx("button",{className:"cb-arrow-btn",style:{width:"24px",height:"24px",fontSize:"11px"},onClick:()=>F(s.id,n,1),disabled:n===(s.lessons||[]).length-1,children:"▼"}),e.jsx("button",{className:"btn-ghost btn-sm",onClick:()=>B(s.id,t,n),children:"Edit"})]})]},t.id||n)),e.jsx("button",{className:"btn-outline btn-sm",style:{marginTop:"8px"},onClick:()=>B(s.id),children:"+ Add Lesson"})]})]},s.id)),P&&e.jsxs("div",{className:"cb-inline-form",children:[e.jsx("h4",{children:"New Module"}),e.jsxs("div",{className:"cb-field",children:[e.jsx("label",{children:"Module Title"}),e.jsx("input",{type:"text",value:N.title,onChange:s=>E(a=>({...a,title:s.target.value})),placeholder:"e.g. Getting Started"})]}),e.jsxs("div",{className:"cb-field",children:[e.jsx("label",{children:"Description (optional)"}),e.jsx("input",{type:"text",value:N.description,onChange:s=>E(a=>({...a,description:s.target.value})),placeholder:"Brief module description"})]}),e.jsxs("div",{className:"cb-form-actions",children:[e.jsx("button",{className:"btn-gold btn-sm",onClick:Y,disabled:v||!N.title.trim(),children:v?"Adding...":"Add Module"}),e.jsx("button",{className:"btn-ghost",onClick:()=>{U(!1),E({title:"",description:""})},children:"Cancel"})]})]})]}),l&&e.jsx("div",{className:"cb-lesson-overlay",onClick:()=>{D(null),d(null)},children:e.jsxs("div",{className:"cb-lesson-modal",onClick:s=>s.stopPropagation(),children:[e.jsx("h3",{children:(c==null?void 0:c.index)!==void 0&&(c==null?void 0:c.index)!==null?"Edit Lesson":"Add Lesson"}),e.jsxs("div",{className:"cb-field",children:[e.jsx("label",{children:"Title"}),e.jsx("input",{type:"text",value:l.title,onChange:s=>d(a=>({...a,title:s.target.value})),placeholder:"Lesson title"})]}),e.jsxs("div",{className:"cb-row",children:[e.jsxs("div",{className:"cb-field",children:[e.jsx("label",{children:"Content Type"}),e.jsx("select",{value:l.contentType,onChange:s=>d(a=>({...a,contentType:s.target.value})),children:le.map(s=>e.jsx("option",{value:s,children:s.charAt(0).toUpperCase()+s.slice(1)},s))})]}),e.jsxs("div",{className:"cb-field",children:[e.jsx("label",{children:"Status"}),e.jsxs("select",{value:l.status,onChange:s=>d(a=>({...a,status:s.target.value})),children:[e.jsx("option",{value:"draft",children:"Draft"}),e.jsx("option",{value:"published",children:"Published"})]})]})]}),e.jsxs("div",{className:"cb-row",children:[e.jsxs("div",{className:"cb-field",children:[e.jsx("label",{children:"Duration (Minutes)"}),e.jsx("input",{type:"number",min:"0",value:l.durationMinutes,onChange:s=>d(a=>({...a,durationMinutes:Number(s.target.value)}))})]}),o.dripEnabled&&e.jsxs("div",{className:"cb-field",children:[e.jsx("label",{children:"Drip Day"}),e.jsx("input",{type:"number",min:"0",value:l.dripDay,onChange:s=>d(a=>({...a,dripDay:Number(s.target.value)}))})]})]}),(l.contentType==="video"||l.contentType==="mixed")&&e.jsxs("div",{className:"cb-field",children:[e.jsx("label",{children:"Video URL"}),e.jsx("input",{type:"text",value:l.videoUrl,onChange:s=>d(a=>({...a,videoUrl:s.target.value})),placeholder:"https://..."})]}),(l.contentType==="audio"||l.contentType==="mixed")&&e.jsxs("div",{className:"cb-field",children:[e.jsx("label",{children:"Audio URL"}),e.jsx("input",{type:"text",value:l.audioUrl,onChange:s=>d(a=>({...a,audioUrl:s.target.value})),placeholder:"https://..."})]}),e.jsxs("div",{className:"cb-field",children:[e.jsx("label",{children:"Written Content"}),e.jsx("textarea",{value:l.writtenContent,onChange:s=>d(a=>({...a,writtenContent:s.target.value})),placeholder:"Lesson content (plain text or markdown)...",style:{minHeight:"120px"}})]}),e.jsxs("div",{className:"cb-field",children:[e.jsx("label",{children:"Reflection Prompt"}),e.jsx("textarea",{value:l.reflectionPrompt,onChange:s=>d(a=>({...a,reflectionPrompt:s.target.value})),placeholder:"Optional reflection question...",style:{minHeight:"60px"}})]}),e.jsxs("label",{className:"cb-checkbox",children:[e.jsx("input",{type:"checkbox",checked:l.quizEnabled,onChange:s=>d(a=>({...a,quizEnabled:s.target.checked}))}),e.jsx("span",{children:"Quiz Enabled"})]}),e.jsxs("div",{className:"cb-form-actions",children:[e.jsx("button",{className:"btn-gold",onClick:V,disabled:v||!l.title.trim(),children:v?"Saving...":(c==null?void 0:c.index)!==void 0&&(c==null?void 0:c.index)!==null?"Update Lesson":"Add Lesson"}),e.jsx("button",{className:"btn-ghost",onClick:()=>{D(null),d(null)},children:"Cancel"})]})]})}),h&&z&&e.jsx("div",{className:"cb-lesson-overlay",onClick:()=>{T(null),g(null)},children:e.jsxs("div",{className:"cb-lesson-modal",onClick:s=>s.stopPropagation(),children:[e.jsx("h3",{children:"Quiz Builder"}),e.jsxs("div",{className:"cb-row",children:[e.jsxs("div",{className:"cb-field",children:[e.jsx("label",{children:"Quiz Type"}),e.jsxs("select",{value:h.type,onChange:s=>g(a=>({...a,type:s.target.value})),children:[e.jsx("option",{value:"practice",children:"Practice"}),e.jsx("option",{value:"graded",children:"Graded"})]})]}),e.jsxs("div",{className:"cb-field",children:[e.jsx("label",{children:"Pass Score (%)"}),e.jsx("input",{type:"number",min:"0",max:"100",value:h.passScore,onChange:s=>g(a=>({...a,passScore:Number(s.target.value)}))})]})]}),e.jsxs("div",{style:{marginTop:"16px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"12px"},children:[e.jsxs("strong",{style:{fontSize:"14px"},children:["Questions (",(h.questions||[]).length,")"]}),e.jsx("button",{className:"btn-outline btn-sm",onClick:H,children:"+ Add Question"})]}),(h.questions||[]).map((s,a)=>e.jsxs("div",{className:"cb-question",children:[e.jsxs("div",{className:"cb-question-header",children:[e.jsxs("span",{className:"cb-question-num",children:["Q",a+1]}),e.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e.jsx("select",{style:{padding:"4px 8px",borderRadius:"6px",border:"1px solid var(--gray-100)",fontSize:"12px"},value:s.type,onChange:t=>k(a,"type",t.target.value),children:oe.map(t=>e.jsx("option",{value:t,children:t.replace(/-/g," ")},t))}),e.jsx("input",{type:"number",style:{width:"60px",padding:"4px 8px",borderRadius:"6px",border:"1px solid var(--gray-100)",fontSize:"12px"},placeholder:"pts",value:s.points,onChange:t=>k(a,"points",Number(t.target.value))}),e.jsx("button",{className:"btn-ghost btn-sm btn-danger",onClick:()=>K(a),children:"Remove"})]})]}),e.jsx("div",{className:"cb-field",style:{marginBottom:"10px"},children:e.jsx("input",{type:"text",value:s.question,onChange:t=>k(a,"question",t.target.value),placeholder:"Question text..."})}),s.type==="multiple-choice"&&e.jsx("div",{children:(s.options||[]).map((t,n)=>e.jsxs("div",{className:"cb-option-row",children:[e.jsx("input",{type:"radio",className:"cb-option-radio",name:`q${a}-correct`,checked:s.correctIndex===n,onChange:()=>k(a,"correctIndex",n)}),e.jsx("input",{type:"text",className:"cb-option-input",value:t,onChange:i=>J(a,n,i.target.value),placeholder:`Option ${n+1}`})]},n))}),s.type==="true-false"&&e.jsx("div",{children:["True","False"].map((t,n)=>e.jsxs("div",{className:"cb-option-row",children:[e.jsx("input",{type:"radio",className:"cb-option-radio",name:`q${a}-tf`,checked:s.correctIndex===n,onChange:()=>k(a,"correctIndex",n)}),e.jsx("span",{style:{fontSize:"13px"},children:t})]},n))}),e.jsx("div",{className:"cb-field",style:{marginTop:"10px",marginBottom:0},children:e.jsx("input",{type:"text",value:s.explanation||"",onChange:t=>k(a,"explanation",t.target.value),placeholder:"Explanation (shown after answering)",style:{fontSize:"12px"}})})]},a))]}),e.jsxs("div",{className:"cb-form-actions",children:[e.jsx("button",{className:"btn-gold",onClick:X,disabled:v,children:v?"Saving...":"Save Quiz"}),e.jsx("button",{className:"btn-ghost",onClick:()=>{T(null),g(null)},children:"Cancel"})]})]})})]})}export{de as default};
