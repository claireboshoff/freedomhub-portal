import{b as oe,u as ce,r as c,a as p,j as e}from"./index-DYHhggTF.js";function H(y){return(y||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}const re=["Business","Marketing","Leadership","Sales","Tech","Personal Development","Other"],de=["video","audio","article","meditation","podcast","mixed"],_e=["Beginner","Intermediate","Advanced"],ue=[{value:"mc",label:"Multiple Choice"},{value:"tf",label:"True/False"},{value:"open",label:"Open Ended"}];function pe(){const{courseId:y}=oe(),B=ce(),_=!!y,[Y,A]=c.useState(_),[O,U]=c.useState(null),[x,g]=c.useState(!1),[F,S]=c.useState(null),[m,P]=c.useState({title:"",slug:"",description:"",category:"Business",thumbnail:"",status:"Draft",difficulty:"Beginner"}),[u,f]=c.useState([]),[D,J]=c.useState(null),[q,E]=c.useState(!1),[v,M]=c.useState({title:"",description:""}),[r,I]=c.useState(null),[b,h]=c.useState(null),[C,L]=c.useState(null),[z,j]=c.useState([]);c.useEffect(()=>{_&&W()},[y,_]);async function W(){try{A(!0),U(null);const s=await p.adminCourseDetail(y),t=s.course||s;P({title:t.title||"",slug:t.slug||"",description:t.description||"",category:t.category||"Business",thumbnail:t.thumbnail||"",status:t.status||"Draft",difficulty:t.difficulty||"Beginner"}),f(t.modules||[])}catch(s){U(s.message||"Failed to load course")}finally{A(!1)}}const w=c.useCallback((s,t)=>{P(n=>{const a={...n,[s]:t};return s==="title"&&(!n.slug||n.slug===H(n.title))&&(a.slug=H(t)),a}),S(null)},[]);async function K(){g(!0),S(null);try{const s={...m,modules:u.map((t,n)=>({...t,sortOrder:n+1,lessons:(t.lessons||[]).map((a,i)=>({...a,sortOrder:i+1}))}))};if(_)await p.adminUpdateCourse(y,s);else{const t=await p.adminCreateCourse(s);t.courseId&&B(`/admin/courses/${t.courseId}/edit`,{replace:!0})}S("saved")}catch(s){console.error("Save failed:",s),S("error")}g(!1)}async function V(){if(v.title.trim()){g(!0);try{let s;if(_){const t=await p.adminCreateModule(y,{title:v.title,description:v.description,sortOrder:u.length+1});s=t.moduleId||t.id}f(t=>[...t,{id:s||"temp-"+Date.now(),title:v.title,description:v.description,sortOrder:u.length+1,lessons:[]}]),M({title:"",description:""}),E(!1)}catch(s){console.error("Add module failed:",s)}g(!1)}}async function X(s){if(window.confirm("Delete this module and all its lessons?"))try{_&&!String(s).startsWith("temp-")&&await p.adminDeleteModule(s),f(t=>t.filter(n=>n.id!==s))}catch(t){console.error("Delete module failed:",t)}}function $(s,t){const n=[...u],a=s+t;a<0||a>=n.length||([n[s],n[a]]=[n[a],n[s]],n.forEach((i,l)=>{i.sortOrder=l+1}),f(n))}function R(s,t,n){I({moduleId:s,index:n}),h(t?{...t}:{title:"",contentType:"video",contentUrl:"",durationMinutes:0,description:""})}async function Z(){var n,a,i;if(!b||!r)return;const{moduleId:s,index:t}=r;g(!0);try{if(t!=null){const l=u.find(d=>d.id===s),o=(n=l==null?void 0:l.lessons)==null?void 0:n[t];_&&(o!=null&&o.id)&&!String(o.id).startsWith("temp-")&&await p.adminUpdateLesson(o.id,b),f(d=>d.map(N=>{if(N.id!==s)return N;const T=[...N.lessons||[]];return T[t]={...T[t],...b},{...N,lessons:T}}))}else{let l;if(_&&!String(s).startsWith("temp-")){const o=await p.adminCreateLesson(s,{...b,sortOrder:(((i=(a=u.find(d=>d.id===s))==null?void 0:a.lessons)==null?void 0:i.length)||0)+1});l=o.lessonId||o.id}f(o=>o.map(d=>d.id!==s?d:{...d,lessons:[...d.lessons||[],{id:l||"temp-"+Date.now(),...b}]}))}I(null),h(null)}catch(l){console.error("Save lesson failed:",l)}g(!1)}async function ee(s,t){var i;const n=u.find(l=>l.id===s),a=(i=n==null?void 0:n.lessons)==null?void 0:i[t];if(a&&window.confirm("Delete this lesson?"))try{_&&a.id&&!String(a.id).startsWith("temp-")&&await p.adminDeleteLesson(a.id),f(l=>l.map(o=>o.id!==s?o:{...o,lessons:(o.lessons||[]).filter((d,N)=>N!==t)}))}catch(l){console.error("Delete lesson failed:",l)}}function G(s,t,n){f(a=>a.map(i=>{if(i.id!==s)return i;const l=[...i.lessons||[]],o=t+n;return o<0||o>=l.length?i:([l[t],l[o]]=[l[o],l[t]],l.forEach((d,N)=>{d.sortOrder=N+1}),{...i,lessons:l})}))}function se(s){var n;L(s);let t=[];for(const a of u)for(const i of a.lessons||[])if(i.id===s&&((n=i.quiz)!=null&&n.questions)){t=Array.isArray(i.quiz.questions)?i.quiz.questions:[];break}j(t.length>0?t:[])}function te(){j(s=>[...s,{question:"",type:"mc",options:["","","",""],correctIndex:0,explanation:"",points:10}])}function k(s,t,n){j(a=>{const i=[...a];return i[s]={...i[s],[t]:n},i})}function ne(s,t,n){j(a=>{const i=[...a],l=[...i[s].options];return l[t]=n,i[s]={...i[s],options:l},i})}function ae(s){j(t=>t.filter((n,a)=>a!==s))}async function ie(){var s;if(C){g(!0);try{let t=null;for(const a of u)for(const i of a.lessons||[])i.id===C&&((s=i.quiz)!=null&&s.id)&&(t=i.quiz.id);const n={questions:z};if(t)await p.adminUpdateQuiz(t,n);else if(_&&!String(C).startsWith("temp-")){const a=await p.adminCreateQuiz(C,n);n.id=a.quizId||a.id}f(a=>a.map(i=>({...i,lessons:(i.lessons||[]).map(l=>l.id!==C?l:{...l,quiz:{id:t||n.id,questions:z}})}))),L(null),j([])}catch(t){console.error("Save quiz failed:",t)}g(!1)}}const le=s=>{switch(s){case"video":return"▶";case"audio":return"♫";case"article":return"¶";case"meditation":return"✨";case"podcast":return"🎙";default:return"◈"}};return Y?e.jsxs("div",{className:"cb__container",children:[e.jsx("style",{children:Q}),e.jsxs("div",{className:"cb__loading",children:[e.jsx("div",{className:"cb__spinner"}),e.jsx("p",{children:"Loading course..."})]})]}):O?e.jsxs("div",{className:"cb__container",children:[e.jsx("style",{children:Q}),e.jsxs("div",{className:"cb__error-box",children:[e.jsx("h3",{children:"Failed to load course"}),e.jsx("p",{children:O}),e.jsx("button",{className:"cb__btn cb__btn--primary",onClick:W,children:"Try Again"})]})]}):e.jsxs("div",{className:"cb__container",children:[e.jsx("style",{children:Q}),e.jsxs("button",{className:"cb__back",onClick:()=>B("/admin/courses"),children:[e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("polyline",{points:"15 18 9 12 15 6"})}),"Back to Courses"]}),e.jsxs("div",{className:"cb__header",children:[e.jsx("h1",{className:"cb__title",children:_?"Edit Course":"Create Course"}),e.jsxs("div",{className:"cb__save-area",children:[x&&e.jsx("span",{className:"cb__save-msg cb__save-msg--saving",children:"Saving..."}),F==="saved"&&e.jsx("span",{className:"cb__save-msg cb__save-msg--saved",children:"Saved successfully"}),F==="error"&&e.jsx("span",{className:"cb__save-msg cb__save-msg--error",children:"Save failed"}),e.jsx("button",{className:"cb__btn cb__btn--primary",onClick:K,disabled:x||!m.title.trim(),children:x?"Saving...":_?"Save Changes":"Create Course"})]})]}),e.jsxs("div",{className:"cb__section",children:[e.jsx("h2",{className:"cb__section-title",children:"Course Details"}),e.jsxs("div",{className:"cb__field",children:[e.jsx("label",{className:"cb__label",children:"Title"}),e.jsx("input",{type:"text",className:"cb__input",value:m.title,onChange:s=>w("title",s.target.value),placeholder:"e.g. Business Growth Masterclass"})]}),e.jsxs("div",{className:"cb__field",children:[e.jsx("label",{className:"cb__label",children:"Slug"}),e.jsx("input",{type:"text",className:"cb__input",value:m.slug,onChange:s=>w("slug",s.target.value),placeholder:"auto-generated-from-title"})]}),e.jsxs("div",{className:"cb__field",children:[e.jsx("label",{className:"cb__label",children:"Description"}),e.jsx("textarea",{className:"cb__textarea",value:m.description,onChange:s=>w("description",s.target.value),placeholder:"Course description..."})]}),e.jsxs("div",{className:"cb__row",children:[e.jsxs("div",{className:"cb__field",children:[e.jsx("label",{className:"cb__label",children:"Category"}),e.jsx("select",{className:"cb__select",value:m.category,onChange:s=>w("category",s.target.value),children:re.map(s=>e.jsx("option",{value:s,children:s},s))})]}),e.jsxs("div",{className:"cb__field",children:[e.jsx("label",{className:"cb__label",children:"Difficulty"}),e.jsx("select",{className:"cb__select",value:m.difficulty,onChange:s=>w("difficulty",s.target.value),children:_e.map(s=>e.jsx("option",{value:s,children:s},s))})]})]}),e.jsxs("div",{className:"cb__row",children:[e.jsxs("div",{className:"cb__field",children:[e.jsx("label",{className:"cb__label",children:"Thumbnail URL"}),e.jsx("input",{type:"text",className:"cb__input",value:m.thumbnail,onChange:s=>w("thumbnail",s.target.value),placeholder:"https://..."})]}),e.jsxs("div",{className:"cb__field",children:[e.jsx("label",{className:"cb__label",children:"Status"}),e.jsxs("select",{className:"cb__select",value:m.status,onChange:s=>w("status",s.target.value),children:[e.jsx("option",{value:"Draft",children:"Draft"}),e.jsx("option",{value:"Published",children:"Published"})]})]})]})]}),e.jsxs("div",{className:"cb__section",children:[e.jsxs("div",{className:"cb__section-header",children:[e.jsx("h2",{className:"cb__section-title",children:"Modules"}),e.jsx("button",{className:"cb__btn cb__btn--outline",onClick:()=>E(!0),children:"+ Add Module"})]}),u.length===0&&!q&&e.jsx("div",{className:"cb__empty-msg",children:"No modules yet. Add your first module to start building the course structure."}),u.map((s,t)=>e.jsxs("div",{className:"cb__module",children:[e.jsxs("div",{className:"cb__module-header",onClick:()=>J(D===s.id?null:s.id),children:[e.jsx("span",{className:"cb__module-order",children:t+1}),e.jsx("span",{className:"cb__module-name",children:s.title}),e.jsxs("span",{className:"cb__module-count",children:[(s.lessons||[]).length," lessons"]}),e.jsxs("div",{className:"cb__module-arrows",onClick:n=>n.stopPropagation(),children:[e.jsx("button",{className:"cb__arrow",onClick:()=>$(t,-1),disabled:t===0,title:"Move up",children:"▲"}),e.jsx("button",{className:"cb__arrow",onClick:()=>$(t,1),disabled:t===u.length-1,title:"Move down",children:"▼"}),e.jsx("button",{className:"cb__arrow cb__arrow--danger",onClick:()=>X(s.id),title:"Delete module",children:"✕"})]}),e.jsx("svg",{className:`cb__chevron ${D===s.id?"cb__chevron--open":""}`,width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("polyline",{points:"9 18 15 12 9 6"})})]}),D===s.id&&e.jsxs("div",{className:"cb__module-body",children:[s.description&&e.jsx("p",{className:"cb__module-desc",children:s.description}),(s.lessons||[]).length===0&&e.jsx("div",{className:"cb__empty-msg",children:"No lessons in this module yet."}),(s.lessons||[]).map((n,a)=>e.jsxs("div",{className:"cb__lesson",children:[e.jsx("span",{className:"cb__lesson-icon",children:le(n.contentType)}),e.jsx("span",{className:"cb__lesson-title",children:n.title||"Untitled"}),e.jsx("span",{className:"cb__lesson-type",children:n.contentType||"video"}),n.durationMinutes>0&&e.jsxs("span",{className:"cb__lesson-dur",children:[n.durationMinutes,"m"]}),e.jsxs("div",{className:"cb__lesson-actions",children:[e.jsx("button",{className:"cb__arrow",onClick:()=>G(s.id,a,-1),disabled:a===0,children:"▲"}),e.jsx("button",{className:"cb__arrow",onClick:()=>G(s.id,a,1),disabled:a===(s.lessons||[]).length-1,children:"▼"}),e.jsx("button",{className:"cb__btn-sm",onClick:()=>R(s.id,n,a),children:"Edit"}),e.jsx("button",{className:"cb__btn-sm",onClick:()=>se(n.id),children:"Quiz"}),e.jsx("button",{className:"cb__btn-sm cb__btn-sm--danger",onClick:()=>ee(s.id,a),children:"Del"})]})]},n.id||a)),e.jsx("button",{className:"cb__btn cb__btn--outline cb__btn--small",style:{marginTop:8},onClick:()=>R(s.id),children:"+ Add Lesson"})]})]},s.id)),q&&e.jsxs("div",{className:"cb__inline-form",children:[e.jsx("h4",{className:"cb__inline-title",children:"New Module"}),e.jsxs("div",{className:"cb__field",children:[e.jsx("label",{className:"cb__label",children:"Module Title"}),e.jsx("input",{type:"text",className:"cb__input",value:v.title,onChange:s=>M(t=>({...t,title:s.target.value})),placeholder:"e.g. Getting Started"})]}),e.jsxs("div",{className:"cb__field",children:[e.jsx("label",{className:"cb__label",children:"Description (optional)"}),e.jsx("input",{type:"text",className:"cb__input",value:v.description,onChange:s=>M(t=>({...t,description:s.target.value})),placeholder:"Brief module description"})]}),e.jsxs("div",{className:"cb__form-actions",children:[e.jsx("button",{className:"cb__btn cb__btn--primary cb__btn--small",onClick:V,disabled:x||!v.title.trim(),children:x?"Adding...":"Add Module"}),e.jsx("button",{className:"cb__btn cb__btn--ghost",onClick:()=>{E(!1),M({title:"",description:""})},children:"Cancel"})]})]})]}),b&&e.jsx("div",{className:"cb__overlay",onClick:()=>{I(null),h(null)},children:e.jsxs("div",{className:"cb__modal",onClick:s=>s.stopPropagation(),children:[e.jsx("h3",{className:"cb__modal-title",children:(r==null?void 0:r.index)!==void 0&&(r==null?void 0:r.index)!==null?"Edit Lesson":"Add Lesson"}),e.jsxs("div",{className:"cb__field",children:[e.jsx("label",{className:"cb__label",children:"Title"}),e.jsx("input",{type:"text",className:"cb__input",value:b.title,onChange:s=>h(t=>({...t,title:s.target.value})),placeholder:"Lesson title"})]}),e.jsxs("div",{className:"cb__row",children:[e.jsxs("div",{className:"cb__field",children:[e.jsx("label",{className:"cb__label",children:"Content Type"}),e.jsx("select",{className:"cb__select",value:b.contentType,onChange:s=>h(t=>({...t,contentType:s.target.value})),children:de.map(s=>e.jsx("option",{value:s,children:s.charAt(0).toUpperCase()+s.slice(1)},s))})]}),e.jsxs("div",{className:"cb__field",children:[e.jsx("label",{className:"cb__label",children:"Duration (minutes)"}),e.jsx("input",{type:"number",className:"cb__input",min:"0",value:b.durationMinutes,onChange:s=>h(t=>({...t,durationMinutes:Number(s.target.value)}))})]})]}),e.jsxs("div",{className:"cb__field",children:[e.jsx("label",{className:"cb__label",children:"Content URL"}),e.jsx("input",{type:"text",className:"cb__input",value:b.contentUrl,onChange:s=>h(t=>({...t,contentUrl:s.target.value})),placeholder:"https://..."})]}),e.jsxs("div",{className:"cb__field",children:[e.jsx("label",{className:"cb__label",children:"Description"}),e.jsx("textarea",{className:"cb__textarea",value:b.description,onChange:s=>h(t=>({...t,description:s.target.value})),placeholder:"Lesson description...",style:{minHeight:80}})]}),e.jsxs("div",{className:"cb__form-actions",children:[e.jsx("button",{className:"cb__btn cb__btn--primary",onClick:Z,disabled:x||!b.title.trim(),children:x?"Saving...":(r==null?void 0:r.index)!==void 0&&(r==null?void 0:r.index)!==null?"Update Lesson":"Add Lesson"}),e.jsx("button",{className:"cb__btn cb__btn--ghost",onClick:()=>{I(null),h(null)},children:"Cancel"})]})]})}),C&&e.jsx("div",{className:"cb__overlay",onClick:()=>{L(null),j([])},children:e.jsxs("div",{className:"cb__modal",onClick:s=>s.stopPropagation(),children:[e.jsx("h3",{className:"cb__modal-title",children:"Quiz Builder"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16},children:[e.jsxs("span",{className:"cb__label",style:{margin:0},children:["Questions (",z.length,")"]}),e.jsx("button",{className:"cb__btn cb__btn--outline cb__btn--small",onClick:te,children:"+ Add Question"})]}),z.length===0&&e.jsx("div",{className:"cb__empty-msg",children:"No questions yet. Add one to build the quiz."}),z.map((s,t)=>e.jsxs("div",{className:"cb__question",children:[e.jsxs("div",{className:"cb__question-header",children:[e.jsxs("span",{className:"cb__question-num",children:["Q",t+1]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx("select",{className:"cb__select cb__select--mini",value:s.type,onChange:n=>k(t,"type",n.target.value),children:ue.map(n=>e.jsx("option",{value:n.value,children:n.label},n.value))}),e.jsx("input",{type:"number",className:"cb__input cb__input--mini",value:s.points,onChange:n=>k(t,"points",Number(n.target.value)),style:{width:60},placeholder:"pts"}),e.jsx("button",{className:"cb__btn-sm cb__btn-sm--danger",onClick:()=>ae(t),children:"Remove"})]})]}),e.jsx("div",{className:"cb__field",style:{marginBottom:10},children:e.jsx("input",{type:"text",className:"cb__input",value:s.question,onChange:n=>k(t,"question",n.target.value),placeholder:"Question text..."})}),s.type==="mc"&&e.jsxs("div",{className:"cb__options",children:[(s.options||["","","",""]).map((n,a)=>e.jsxs("div",{className:"cb__option-row",children:[e.jsx("input",{type:"radio",className:"cb__option-radio",name:`quiz-q${t}`,checked:s.correctIndex===a,onChange:()=>k(t,"correctIndex",a)}),e.jsx("input",{type:"text",className:"cb__option-input",value:n,onChange:i=>ne(t,a,i.target.value),placeholder:`Option ${a+1}`})]},a)),e.jsx("span",{className:"cb__hint",children:"Select the radio button next to the correct answer"})]}),s.type==="tf"&&e.jsx("div",{className:"cb__options",children:["True","False"].map((n,a)=>e.jsxs("div",{className:"cb__option-row",children:[e.jsx("input",{type:"radio",className:"cb__option-radio",name:`quiz-tf-${t}`,checked:s.correctIndex===a,onChange:()=>k(t,"correctIndex",a)}),e.jsx("span",{style:{fontSize:14},children:n})]},a))}),e.jsx("div",{className:"cb__field",style:{marginTop:10,marginBottom:0},children:e.jsx("input",{type:"text",className:"cb__input",value:s.explanation||"",onChange:n=>k(t,"explanation",n.target.value),placeholder:"Explanation (shown after answering)",style:{fontSize:12}})})]},t)),e.jsxs("div",{className:"cb__form-actions",children:[e.jsx("button",{className:"cb__btn cb__btn--primary",onClick:ie,disabled:x,children:x?"Saving...":"Save Quiz"}),e.jsx("button",{className:"cb__btn cb__btn--ghost",onClick:()=>{L(null),j([])},children:"Cancel"})]})]})})]})}const Q=`
  .cb__container {
    max-width: 900px;
    margin: 0 auto;
    padding: 32px 20px;
    font-family: 'Inter', sans-serif;
    color: #2d2d2d;
  }

  /* Loading / Error */
  .cb__loading {
    text-align: center;
    padding: 60px 20px;
    color: #888;
  }
  .cb__spinner {
    width: 32px;
    height: 32px;
    border: 3px solid #e5e7eb;
    border-top-color: #c5a55a;
    border-radius: 50%;
    animation: cb__spin 0.8s linear infinite;
    margin: 0 auto 16px;
  }
  @keyframes cb__spin {
    to { transform: rotate(360deg); }
  }
  .cb__error-box {
    text-align: center;
    padding: 60px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  .cb__error-box h3 {
    font-family: 'League Spartan', sans-serif;
    color: #c0392b;
    margin: 0 0 8px;
  }
  .cb__error-box p {
    color: #888;
    margin: 0 0 20px;
  }

  /* Back */
  .cb__back {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #888;
    font-size: 13px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    margin-bottom: 16px;
    font-family: 'Inter', sans-serif;
    transition: color 0.2s;
  }
  .cb__back:hover { color: #c5a55a; }

  /* Header */
  .cb__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 12px;
  }
  .cb__title {
    font-family: 'League Spartan', sans-serif;
    font-size: 28px;
    font-weight: 700;
    margin: 0;
    color: #2d2d2d;
  }
  .cb__save-area {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .cb__save-msg {
    font-size: 13px;
    font-weight: 500;
  }
  .cb__save-msg--saving { color: #888; }
  .cb__save-msg--saved { color: #22c55e; }
  .cb__save-msg--error { color: #ef4444; }

  /* Buttons */
  .cb__btn {
    border: none;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    border-radius: 8px;
    transition: all 0.2s;
    font-size: 14px;
    padding: 10px 20px;
  }
  .cb__btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .cb__btn--primary {
    background: #c5a55a;
    color: #fff;
  }
  .cb__btn--primary:hover:not(:disabled) {
    background: #b8973f;
  }
  .cb__btn--outline {
    background: transparent;
    color: #c5a55a;
    border: 1px solid #c5a55a;
    padding: 8px 16px;
    font-size: 13px;
  }
  .cb__btn--outline:hover:not(:disabled) {
    background: #c5a55a;
    color: #fff;
  }
  .cb__btn--ghost {
    background: transparent;
    color: #888;
    border: 1px solid #ddd;
    padding: 8px 16px;
    font-size: 13px;
  }
  .cb__btn--ghost:hover { border-color: #c5a55a; color: #c5a55a; }
  .cb__btn--small {
    padding: 6px 14px;
    font-size: 12px;
  }
  .cb__btn-sm {
    padding: 4px 10px;
    font-size: 11px;
    font-weight: 600;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: #fff;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    color: #555;
    transition: all 0.15s;
  }
  .cb__btn-sm:hover { border-color: #c5a55a; color: #c5a55a; }
  .cb__btn-sm--danger { color: #ef4444; border-color: #fca5a5; }
  .cb__btn-sm--danger:hover { background: #ef4444; color: #fff; border-color: #ef4444; }

  /* Section */
  .cb__section {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    padding: 24px;
    margin-bottom: 20px;
  }
  .cb__section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .cb__section-title {
    font-family: 'League Spartan', sans-serif;
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 20px;
    color: #2d2d2d;
  }
  .cb__section-header .cb__section-title {
    margin-bottom: 0;
  }

  /* Form fields */
  .cb__field {
    margin-bottom: 16px;
  }
  .cb__label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: #555;
    margin-bottom: 6px;
  }
  .cb__input,
  .cb__select,
  .cb__textarea {
    width: 100%;
    padding: 10px 14px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    background: #fff;
    outline: none;
    transition: border-color 0.2s;
    box-sizing: border-box;
  }
  .cb__input:focus,
  .cb__select:focus,
  .cb__textarea:focus {
    border-color: #c5a55a;
  }
  .cb__textarea {
    min-height: 100px;
    resize: vertical;
  }
  .cb__input--mini,
  .cb__select--mini {
    padding: 4px 8px;
    font-size: 12px;
    border-radius: 6px;
  }
  .cb__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  @media (max-width: 600px) {
    .cb__row { grid-template-columns: 1fr; }
  }

  /* Module */
  .cb__module {
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    margin-bottom: 12px;
    overflow: hidden;
  }
  .cb__module-header {
    display: flex;
    align-items: center;
    padding: 14px 16px;
    background: #f9fafb;
    cursor: pointer;
    gap: 12px;
    user-select: none;
    transition: background 0.15s;
  }
  .cb__module-header:hover { background: #faf9f6; }
  .cb__module-order {
    font-weight: 700;
    font-size: 14px;
    color: #c5a55a;
    min-width: 24px;
  }
  .cb__module-name {
    flex: 1;
    font-weight: 600;
    font-size: 14px;
    color: #2d2d2d;
  }
  .cb__module-count {
    font-size: 12px;
    color: #9ca3af;
  }
  .cb__module-arrows {
    display: flex;
    gap: 4px;
  }
  .cb__arrow {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    background: #fff;
    cursor: pointer;
    color: #555;
    font-size: 12px;
    transition: all 0.15s;
  }
  .cb__arrow:hover:not(:disabled) { border-color: #c5a55a; color: #c5a55a; }
  .cb__arrow:disabled { opacity: 0.3; cursor: not-allowed; }
  .cb__arrow--danger:hover:not(:disabled) { border-color: #ef4444; color: #ef4444; }
  .cb__chevron {
    transition: transform 0.2s;
    color: #9ca3af;
  }
  .cb__chevron--open { transform: rotate(90deg); }
  .cb__module-body {
    padding: 16px;
    border-top: 1px solid #e5e7eb;
  }
  .cb__module-desc {
    font-size: 13px;
    color: #888;
    margin: 0 0 12px;
  }

  /* Lesson */
  .cb__lesson {
    display: flex;
    align-items: center;
    padding: 10px 12px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    margin-bottom: 8px;
    gap: 10px;
    font-size: 13px;
  }
  .cb__lesson-icon {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    background: #faf9f6;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #c5a55a;
    flex-shrink: 0;
  }
  .cb__lesson-title {
    flex: 1;
    font-weight: 500;
    color: #2d2d2d;
  }
  .cb__lesson-type {
    font-size: 11px;
    text-transform: uppercase;
    color: #9ca3af;
    letter-spacing: 0.3px;
  }
  .cb__lesson-dur {
    font-size: 12px;
    color: #9ca3af;
    min-width: 35px;
    text-align: right;
  }
  .cb__lesson-actions {
    display: flex;
    gap: 4px;
  }

  /* Inline form */
  .cb__inline-form {
    background: #faf9f6;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 16px;
    margin-top: 12px;
  }
  .cb__inline-title {
    margin: 0 0 12px;
    font-size: 15px;
    font-family: 'League Spartan', sans-serif;
    color: #2d2d2d;
  }
  .cb__form-actions {
    display: flex;
    gap: 8px;
    margin-top: 12px;
  }

  /* Empty */
  .cb__empty-msg {
    text-align: center;
    padding: 20px;
    color: #9ca3af;
    font-size: 13px;
  }

  /* Modal */
  .cb__overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
  }
  .cb__modal {
    background: #fff;
    border-radius: 10px;
    padding: 28px;
    width: 100%;
    max-width: 640px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  }
  .cb__modal-title {
    font-family: 'League Spartan', sans-serif;
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 20px;
    color: #2d2d2d;
  }

  /* Quiz */
  .cb__question {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 12px;
  }
  .cb__question-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    flex-wrap: wrap;
    gap: 8px;
  }
  .cb__question-num {
    font-weight: 700;
    font-size: 13px;
    color: #c5a55a;
  }
  .cb__options {
    padding-left: 4px;
  }
  .cb__option-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }
  .cb__option-radio {
    accent-color: #c5a55a;
    cursor: pointer;
    width: 16px;
    height: 16px;
  }
  .cb__option-input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-size: 13px;
    font-family: 'Inter', sans-serif;
    outline: none;
  }
  .cb__option-input:focus { border-color: #c5a55a; }
  .cb__hint {
    font-size: 11px;
    color: #9ca3af;
    display: block;
    margin-top: 4px;
  }
`;export{pe as default};
