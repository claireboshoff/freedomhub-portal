import{r as a,j as e,a as $,b as Re,u as Pe}from"./index-qghCmzYd.js";const re=()=>e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"var(--green, #10b981)",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),e.jsx("polyline",{points:"22 4 12 14.01 9 11.01"})]}),te=()=>e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"var(--red, #ef4444)",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("line",{x1:"15",y1:"9",x2:"9",y2:"15"}),e.jsx("line",{x1:"9",y1:"9",x2:"15",y2:"15"})]}),Te=()=>e.jsxs("svg",{width:"32",height:"32",viewBox:"0 0 24 24",fill:"none",stroke:"var(--gold, #c5a55a)",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6"}),e.jsx("path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18"}),e.jsx("path",{d:"M4 22h16"}),e.jsx("path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"}),e.jsx("path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"}),e.jsx("path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z"})]});function Me({lessonId:s,quizData:n,onQuizComplete:o}){const[i,r]=a.useState(0),[p,g]=a.useState(null),[l,m]=a.useState(!1),[b,q]=a.useState([]),[S,w]=a.useState(""),[L,k]=a.useState(!1),[A,_]=a.useState(!1);if(!n||!n.questions||n.questions.length===0)return null;const z=n.questions,N=z.length,c=z[i],C=n.type==="graded",j=n.passScore||70,I=z.reduce((x,u)=>x+(u.points||10),0);function D(x){l||g(x)}function X(){if(!l)if(c.type==="open-ended"){if(!S.trim())return;const x={questionId:c.id,type:"open-ended",answer:S.trim(),correct:!0,points:c.points||10,earned:c.points||10};q(u=>[...u,x]),m(!0)}else{if(p===null)return;const x=p===c.correct,u={questionId:c.id,type:c.type,answer:p,correct:x,points:c.points||10,earned:x?c.points||10:0};q(f=>[...f,u]),m(!0)}}function K(){if(i<N-1)_(!0),setTimeout(()=>{r(x=>x+1),g(null),m(!1),w(""),_(!1)},300);else{k(!0);const x=[...b].reduce((E,U)=>E+U.earned,0),u=Math.round(x/I*100),f=!C||u>=j;o&&o({score:u,passed:f,answers:[...b]})}}function ee(){r(0),g(null),m(!1),q([]),w(""),k(!1),_(!1)}if(L){const x=b.reduce((T,R)=>T+R.earned,0),u=Math.round(x/I*100),f=!C||u>=j,E=b.filter(T=>T.correct).length,U=u===100;return e.jsxs("div",{className:"quiz-section",children:[e.jsx("style",{children:xe}),e.jsxs("div",{className:"quiz-results",children:[e.jsxs("div",{className:"quiz-results__header",children:[e.jsx(Te,{}),e.jsx("h3",{className:"quiz-results__title",children:"Quiz Complete"})]}),e.jsx("div",{className:`quiz-results__score-ring ${f?"quiz-results__score-ring--pass":"quiz-results__score-ring--fail"}`,children:e.jsxs("span",{className:"quiz-results__score-number",children:[u,"%"]})}),C&&e.jsx("div",{className:`quiz-results__status ${f?"quiz-results__status--pass":"quiz-results__status--fail"}`,children:f?"Passed":"Not Passed"}),C&&!f&&e.jsxs("p",{className:"quiz-results__requirement",children:["You need ",j,"% to pass this quiz."]}),e.jsx("div",{className:"quiz-results__xp",children:U?"+20 XP for perfect score":f?"+15 XP for passing":"Pass the quiz to earn XP"}),e.jsxs("div",{className:"quiz-results__stats",children:[e.jsxs("div",{className:"quiz-results__stat",children:[e.jsx("span",{className:"quiz-results__stat-value",children:E}),e.jsx("span",{className:"quiz-results__stat-label",children:"Correct"})]}),e.jsxs("div",{className:"quiz-results__stat",children:[e.jsx("span",{className:"quiz-results__stat-value",children:N-E}),e.jsx("span",{className:"quiz-results__stat-label",children:"Incorrect"})]}),e.jsxs("div",{className:"quiz-results__stat",children:[e.jsxs("span",{className:"quiz-results__stat-value",children:[x,"/",I]}),e.jsx("span",{className:"quiz-results__stat-label",children:"Points"})]})]}),e.jsxs("div",{className:"quiz-results__breakdown",children:[e.jsx("h4",{className:"quiz-results__breakdown-title",children:"Question Breakdown"}),b.map((T,R)=>e.jsxs("div",{className:`quiz-results__breakdown-item ${T.correct?"quiz-results__breakdown-item--correct":"quiz-results__breakdown-item--incorrect"}`,children:[e.jsxs("span",{className:"quiz-results__breakdown-num",children:["Q",R+1]}),e.jsx("span",{className:"quiz-results__breakdown-text",children:z[R].question}),e.jsx("span",{className:"quiz-results__breakdown-icon",children:T.correct?e.jsx(re,{}):e.jsx(te,{})})]},R))]}),C&&!f&&e.jsx("button",{className:"btn btn--primary quiz-results__retry",onClick:ee,children:"Retry Quiz"})]})]})}const M=i/N*100,O=l&&(c.type==="open-ended"||p===c.correct);return e.jsxs("div",{className:"quiz-section",children:[e.jsx("style",{children:xe}),e.jsxs("div",{className:"quiz-header",children:[e.jsx("h3",{className:"quiz-header__title",children:C?"Quiz":"Practice Quiz"}),e.jsxs("span",{className:"quiz-header__progress",children:["Question ",i+1," of ",N]})]}),e.jsx("div",{className:"quiz-progress",children:e.jsx("div",{className:"quiz-progress__bar",style:{width:`${M}%`}})}),C&&e.jsxs("p",{className:"quiz-pass-note",children:["You need ",j,"% to pass"]}),e.jsxs("div",{className:`quiz-question ${A?"quiz-question--exit":"quiz-question--enter"}`,children:[e.jsx("p",{className:"quiz-question__text",children:c.question}),c.type==="multiple-choice"&&e.jsx("div",{className:"quiz-options",children:c.options.map((x,u)=>{let f="quiz-option";return l?u===c.correct?f+=" quiz-option--correct":u===p&&u!==c.correct&&(f+=" quiz-option--incorrect"):u===p&&(f+=" quiz-option--selected"),e.jsxs("button",{className:f,onClick:()=>D(u),disabled:l,children:[e.jsx("span",{className:"quiz-option__letter",children:String.fromCharCode(65+u)}),e.jsx("span",{className:"quiz-option__text",children:x}),l&&u===c.correct&&e.jsx("span",{className:"quiz-option__icon",children:e.jsx(re,{})}),l&&u===p&&u!==c.correct&&e.jsx("span",{className:"quiz-option__icon",children:e.jsx(te,{})})]},u)})}),c.type==="true-false"&&e.jsx("div",{className:"quiz-tf",children:c.options.map((x,u)=>{let f="quiz-tf__btn";return l?u===c.correct?f+=" quiz-tf__btn--correct":u===p&&u!==c.correct&&(f+=" quiz-tf__btn--incorrect"):u===p&&(f+=" quiz-tf__btn--selected"),e.jsx("button",{className:f,onClick:()=>D(u),disabled:l,children:x},u)})}),c.type==="open-ended"&&e.jsx("div",{className:"quiz-open",children:e.jsx("textarea",{className:"quiz-open__textarea",placeholder:"Type your answer here...",value:S,onChange:x=>w(x.target.value),disabled:l,rows:4})}),!l&&e.jsx("button",{className:"btn btn--primary quiz-submit-btn",onClick:X,disabled:c.type==="open-ended"&&!S.trim()||c.type!=="open-ended"&&p===null,children:"Submit Answer"}),l&&e.jsxs("div",{className:`quiz-feedback ${O?"quiz-feedback--correct":"quiz-feedback--incorrect"}`,children:[e.jsxs("div",{className:"quiz-feedback__header",children:[O?e.jsx(re,{}):e.jsx(te,{}),e.jsx("span",{className:"quiz-feedback__label",children:c.type==="open-ended"?"Answer Submitted":O?"Correct!":"Incorrect"})]}),c.explanation&&e.jsx("p",{className:"quiz-feedback__explanation",children:c.explanation})]}),l&&e.jsx("button",{className:"btn btn--primary quiz-next-btn",onClick:K,children:i<N-1?"Next Question":"See Results"})]})]})}const xe=`
  .quiz-section {
    margin-top: 2rem;
    background: var(--white, #fff);
    border: 1px solid var(--gray-200, #e5e5e5);
    border-radius: var(--radius, 12px);
    padding: 1.5rem;
    box-shadow: var(--shadow, 0 2px 8px rgba(0,0,0,0.06));
  }

  .quiz-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }
  .quiz-header__title {
    font-family: var(--font-heading, 'League Spartan', sans-serif);
    font-size: 1.25rem;
    color: var(--charcoal, #2d2d2d);
    margin: 0;
  }
  .quiz-header__progress {
    font-size: 0.85rem;
    color: var(--gray-500, #737373);
    font-weight: 500;
  }

  .quiz-progress {
    height: 6px;
    background: var(--gray-100, #f5f5f5);
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 1rem;
  }
  .quiz-progress__bar {
    height: 100%;
    background: var(--gold, #c5a55a);
    border-radius: 3px;
    transition: width 0.4s ease;
  }

  .quiz-pass-note {
    font-size: 0.8rem;
    color: var(--gray-500, #737373);
    margin: 0 0 1rem 0;
    text-align: center;
    font-style: italic;
  }

  /* Question card transitions */
  .quiz-question--enter {
    animation: quizSlideIn 0.3s ease forwards;
  }
  .quiz-question--exit {
    animation: quizSlideOut 0.3s ease forwards;
  }
  @keyframes quizSlideIn {
    from { opacity: 0; transform: translateX(20px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes quizSlideOut {
    from { opacity: 1; transform: translateX(0); }
    to   { opacity: 0; transform: translateX(-20px); }
  }

  .quiz-question__text {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--charcoal, #2d2d2d);
    margin: 0 0 1.25rem 0;
    line-height: 1.5;
  }

  /* Multiple choice options */
  .quiz-options {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }
  .quiz-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    background: var(--gray-100, #f5f5f5);
    border: 2px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
    font-size: 0.95rem;
    color: var(--charcoal, #2d2d2d);
    width: 100%;
  }
  .quiz-option:hover:not(:disabled) {
    background: var(--cream, #faf9f6);
    border-color: var(--gray-300, #d4d4d4);
  }
  .quiz-option--selected {
    border-color: var(--gold, #c5a55a);
    background: rgba(197, 165, 90, 0.08);
  }
  .quiz-option--correct {
    border-color: var(--green, #10b981);
    background: rgba(16, 185, 129, 0.08);
  }
  .quiz-option--incorrect {
    border-color: var(--red, #ef4444);
    background: rgba(239, 68, 68, 0.06);
  }
  .quiz-option:disabled {
    cursor: default;
  }
  .quiz-option__letter {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--gray-200, #e5e5e5);
    font-weight: 700;
    font-size: 0.8rem;
    color: var(--gray-600, #525252);
    flex-shrink: 0;
  }
  .quiz-option--selected .quiz-option__letter {
    background: var(--gold, #c5a55a);
    color: var(--white, #fff);
  }
  .quiz-option--correct .quiz-option__letter {
    background: var(--green, #10b981);
    color: var(--white, #fff);
  }
  .quiz-option--incorrect .quiz-option__letter {
    background: var(--red, #ef4444);
    color: var(--white, #fff);
  }
  .quiz-option__text {
    flex: 1;
  }
  .quiz-option__icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  /* True/False */
  .quiz-tf {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  .quiz-tf__btn {
    padding: 1.25rem;
    font-size: 1.1rem;
    font-weight: 700;
    border: 2px solid var(--gray-200, #e5e5e5);
    border-radius: 10px;
    background: var(--gray-100, #f5f5f5);
    cursor: pointer;
    transition: all 0.2s ease;
    color: var(--charcoal, #2d2d2d);
  }
  .quiz-tf__btn:hover:not(:disabled) {
    border-color: var(--gold, #c5a55a);
    background: rgba(197, 165, 90, 0.06);
  }
  .quiz-tf__btn--selected {
    border-color: var(--gold, #c5a55a);
    background: rgba(197, 165, 90, 0.1);
  }
  .quiz-tf__btn--correct {
    border-color: var(--green, #10b981);
    background: rgba(16, 185, 129, 0.1);
  }
  .quiz-tf__btn--incorrect {
    border-color: var(--red, #ef4444);
    background: rgba(239, 68, 68, 0.08);
  }
  .quiz-tf__btn:disabled {
    cursor: default;
  }

  /* Open-ended */
  .quiz-open__textarea {
    width: 100%;
    padding: 0.875rem;
    border: 2px solid var(--gray-200, #e5e5e5);
    border-radius: 8px;
    font-family: var(--font-body, 'Inter', sans-serif);
    font-size: 0.95rem;
    color: var(--charcoal, #2d2d2d);
    resize: vertical;
    min-height: 100px;
    transition: border-color 0.2s;
    box-sizing: border-box;
  }
  .quiz-open__textarea:focus {
    outline: none;
    border-color: var(--gold, #c5a55a);
  }
  .quiz-open__textarea:disabled {
    background: var(--gray-100, #f5f5f5);
  }

  /* Submit & Next buttons */
  .quiz-submit-btn,
  .quiz-next-btn {
    margin-top: 1.25rem;
    width: 100%;
  }
  .quiz-submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Feedback */
  .quiz-feedback {
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 8px;
    animation: quizFadeIn 0.3s ease;
  }
  @keyframes quizFadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .quiz-feedback--correct {
    background: rgba(16, 185, 129, 0.08);
    border: 1px solid rgba(16, 185, 129, 0.2);
  }
  .quiz-feedback--incorrect {
    background: rgba(239, 68, 68, 0.06);
    border: 1px solid rgba(239, 68, 68, 0.15);
  }
  .quiz-feedback__header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .quiz-feedback__label {
    font-weight: 700;
    font-size: 1rem;
    color: var(--charcoal, #2d2d2d);
  }
  .quiz-feedback__explanation {
    margin: 0;
    font-size: 0.9rem;
    color: var(--gray-600, #525252);
    line-height: 1.5;
  }

  /* ---- Results view ---- */
  .quiz-results {
    text-align: center;
  }
  .quiz-results__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }
  .quiz-results__title {
    font-family: var(--font-heading, 'League Spartan', sans-serif);
    font-size: 1.5rem;
    color: var(--charcoal, #2d2d2d);
    margin: 0;
  }

  .quiz-results__score-ring {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    border: 6px solid;
  }
  .quiz-results__score-ring--pass {
    border-color: var(--green, #10b981);
    background: rgba(16, 185, 129, 0.06);
  }
  .quiz-results__score-ring--fail {
    border-color: var(--red, #ef4444);
    background: rgba(239, 68, 68, 0.04);
  }
  .quiz-results__score-number {
    font-size: 2rem;
    font-weight: 800;
    color: var(--charcoal, #2d2d2d);
  }

  .quiz-results__status {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  .quiz-results__status--pass {
    color: var(--green, #10b981);
  }
  .quiz-results__status--fail {
    color: var(--red, #ef4444);
  }

  .quiz-results__requirement {
    font-size: 0.85rem;
    color: var(--gray-500, #737373);
    margin: 0 0 0.75rem;
  }

  .quiz-results__xp {
    display: inline-block;
    padding: 0.4rem 1rem;
    background: rgba(197, 165, 90, 0.1);
    border: 1px solid rgba(197, 165, 90, 0.25);
    border-radius: 20px;
    color: var(--gold, #c5a55a);
    font-weight: 600;
    font-size: 0.85rem;
    margin-bottom: 1.5rem;
  }

  .quiz-results__stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  .quiz-results__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }
  .quiz-results__stat-value {
    font-size: 1.3rem;
    font-weight: 800;
    color: var(--charcoal, #2d2d2d);
  }
  .quiz-results__stat-label {
    font-size: 0.75rem;
    color: var(--gray-500, #737373);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* Breakdown */
  .quiz-results__breakdown {
    text-align: left;
    margin-top: 1rem;
  }
  .quiz-results__breakdown-title {
    font-family: var(--font-heading, 'League Spartan', sans-serif);
    font-size: 1rem;
    color: var(--charcoal, #2d2d2d);
    margin: 0 0 0.75rem;
  }
  .quiz-results__breakdown-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.625rem 0.75rem;
    border-radius: 6px;
    margin-bottom: 0.375rem;
    font-size: 0.85rem;
  }
  .quiz-results__breakdown-item--correct {
    background: rgba(16, 185, 129, 0.06);
  }
  .quiz-results__breakdown-item--incorrect {
    background: rgba(239, 68, 68, 0.05);
  }
  .quiz-results__breakdown-num {
    font-weight: 700;
    color: var(--gray-500, #737373);
    min-width: 28px;
  }
  .quiz-results__breakdown-text {
    flex: 1;
    color: var(--charcoal, #2d2d2d);
    line-height: 1.4;
  }
  .quiz-results__breakdown-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  .quiz-results__retry {
    margin-top: 1.5rem;
    width: 100%;
  }

  /* Responsive */
  @media (max-width: 600px) {
    .quiz-section {
      padding: 1rem;
    }
    .quiz-tf {
      grid-template-columns: 1fr;
    }
    .quiz-results__stats {
      gap: 0.5rem;
    }
    .quiz-results__score-ring {
      width: 100px;
      height: 100px;
    }
    .quiz-results__score-number {
      font-size: 1.5rem;
    }
  }
`;function Ee(s){const n=new Date,o=new Date(s),i=Math.floor((n-o)/1e3);if(i<60)return"just now";const r=Math.floor(i/60);if(r<60)return`${r}m ago`;const p=Math.floor(r/60);if(p<24)return`${p}h ago`;const g=Math.floor(p/24);if(g<7)return`${g}d ago`;const l=Math.floor(g/7);return l<4?`${l}w ago`:o.toLocaleDateString()}function be(s){let n=0;for(let i=0;i<(s||"").length;i++)n=s.charCodeAt(i)+((n<<5)-n);const o=["#c5a55a","#5a8fc5","#c55a5a","#5ac58a","#8a5ac5","#c5895a","#5ac5c5","#c55a8a"];return o[Math.abs(n)%o.length]}const $e=({filled:s})=>e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:s?"var(--gold, #c5a55a)":"none",stroke:s?"var(--gold, #c5a55a)":"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"})}),Ae=()=>e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("polyline",{points:"9 17 4 12 9 7"}),e.jsx("path",{d:"M20 18v-2a4 4 0 0 0-4-4H4"})]}),De=()=>e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"var(--gold, #c5a55a)",stroke:"var(--gold, #c5a55a)",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"})});function _e({clientName:s,onPost:n,placeholder:o,compact:i}){const[r,p]=a.useState(""),[g,l]=a.useState(!1);async function m(q){if(q.preventDefault(),!(!r.trim()||g)){l(!0);try{await n(r.trim()),p("")}finally{l(!1)}}}const b=(s||"?").charAt(0).toUpperCase();return e.jsxs("form",{className:`disc-composer ${i?"disc-composer--compact":""}`,onSubmit:m,children:[e.jsx("div",{className:"disc-composer__avatar",style:{background:be(s)},children:b}),e.jsxs("div",{className:"disc-composer__body",children:[e.jsx("textarea",{className:"disc-composer__input",value:r,onChange:q=>p(q.target.value),placeholder:o||"Share your thoughts...",rows:i?2:3,maxLength:2e3}),e.jsxs("div",{className:"disc-composer__footer",children:[e.jsxs("span",{className:"disc-composer__count",children:[r.length,"/2000"]}),e.jsx("button",{type:"submit",className:"btn btn--primary btn--sm",disabled:!r.trim()||g,children:g?"Posting...":"Post"})]})]})]})}function ve({post:s,clientName:n,onLike:o,onReply:i,depth:r=0}){const[p,g]=a.useState(!1),[l,m]=a.useState(!1),[b,q]=a.useState(s.likes||0),S=(s.authorName||"?").charAt(0).toUpperCase();async function w(){if(!l){m(!0),q(k=>k+1);try{await o(s.id)}catch{m(!1),q(k=>k-1)}}}async function L(k){await i(k,s.id),g(!1)}return e.jsxs("div",{className:`disc-post ${r>0?"disc-post--reply":""} ${s.pinned?"disc-post--pinned":""}`,children:[e.jsxs("div",{className:"disc-post__header",children:[e.jsx("div",{className:"disc-post__avatar",style:{background:be(s.authorName)},children:S}),e.jsxs("div",{className:"disc-post__meta",children:[e.jsx("span",{className:"disc-post__author",children:s.authorName||"Unknown"}),e.jsx("span",{className:"disc-post__time",children:Ee(s.created)})]}),s.pinned&&e.jsx("span",{className:"disc-post__pin",title:"Pinned",children:e.jsx(De,{})})]}),e.jsx("div",{className:"disc-post__content",children:s.content}),e.jsxs("div",{className:"disc-post__actions",children:[e.jsxs("button",{className:`disc-post__action-btn ${l?"disc-post__action-btn--liked":""}`,onClick:w,title:"Like",children:[e.jsx($e,{filled:l}),e.jsx("span",{children:b>0?b:""})]}),r===0&&e.jsxs("button",{className:"disc-post__action-btn",onClick:()=>g(!p),title:"Reply",children:[e.jsx(Ae,{})," ",e.jsx("span",{children:"Reply"})]})]}),p&&e.jsx("div",{className:"disc-post__reply-composer",children:e.jsx(_e,{clientName:n,onPost:L,placeholder:"Write a reply...",compact:!0})}),s.replies&&s.replies.length>0&&e.jsx("div",{className:"disc-post__replies",children:s.replies.map(k=>e.jsx(ve,{post:k,clientName:n,onLike:o,onReply:i,depth:r+1},k.id))})]})}function Oe(){return e.jsx("div",{className:"disc-skeleton",children:[1,2,3].map(s=>e.jsxs("div",{className:"disc-skeleton__post",children:[e.jsx("div",{className:"disc-skeleton__avatar"}),e.jsxs("div",{className:"disc-skeleton__lines",children:[e.jsx("div",{className:"disc-skeleton__line disc-skeleton__line--short"}),e.jsx("div",{className:"disc-skeleton__line"}),e.jsx("div",{className:"disc-skeleton__line disc-skeleton__line--med"})]})]},s))})}function Be({lessonId:s,courseId:n,client:o}){const[i,r]=a.useState([]),[p,g]=a.useState(!0),[l,m]=a.useState(null),[b,q]=a.useState(10),S=(o==null?void 0:o.name)||(o==null?void 0:o.businessName)||"You",w=a.useCallback(async()=>{g(!0),m(null);try{const z=(await $.lessonDiscussions(s)).discussions||[],N=z.filter(j=>!j.parentId),c=z.filter(j=>j.parentId),C=N.map(j=>({...j,replies:c.filter(I=>I.parentId===j.id)}));C.sort((j,I)=>j.pinned&&!I.pinned?-1:!j.pinned&&I.pinned?1:new Date(I.created)-new Date(j.created)),r(C)}catch(_){m(_.message||"Failed to load discussions")}finally{g(!1)}},[s]);a.useEffect(()=>{s&&w()},[s,w]);async function L(_,z){const N={lessonId:s,courseId:n||"",content:_};z&&(N.parentId=z),await $.postDiscussion(N),await w()}async function k(_){await $.likeDiscussion(_)}const A=i.slice(0,b);return e.jsxs("div",{className:"lesson-discussion",children:[e.jsx("style",{children:We}),e.jsx("h3",{className:"lesson-discussion__title",children:"Discussion"}),e.jsx("p",{className:"lesson-discussion__xp-hint",children:"+3 XP for posting, +2 XP for replying"}),e.jsx(_e,{clientName:S,onPost:_=>L(_,null),placeholder:"Share your thoughts on this lesson..."}),p&&e.jsx(Oe,{}),l&&e.jsxs("div",{className:"disc-error",children:[e.jsx("p",{children:l}),e.jsx("button",{className:"btn btn--outline btn--sm",onClick:w,children:"Retry"})]}),!p&&!l&&i.length===0&&e.jsx("div",{className:"disc-empty",children:e.jsx("p",{children:"Be the first to start a discussion on this lesson"})}),!p&&A.map(_=>e.jsx(ve,{post:_,clientName:S,onLike:k,onReply:(z,N)=>L(z,N)},_.id)),!p&&i.length>b&&e.jsxs("button",{className:"btn btn--outline btn--sm disc-load-more",onClick:()=>q(_=>_+10),children:["Load more (",i.length-b," remaining)"]})]})}const We=`
.lesson-discussion {
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--white, #fff);
  border-radius: var(--radius, 12px);
  box-shadow: var(--shadow, 0 1px 3px rgba(0,0,0,0.08));
}

.lesson-discussion__title {
  font-family: var(--font-heading, 'League Spartan', sans-serif);
  font-size: 1.25rem;
  color: var(--charcoal, #2d2d2d);
  margin: 0 0 0.25rem;
}

.lesson-discussion__xp-hint {
  font-size: 0.8rem;
  color: var(--gold, #c5a55a);
  margin: 0 0 1rem;
  font-style: italic;
}

/* Composer */
.disc-composer {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.disc-composer--compact {
  margin-bottom: 0.5rem;
}

.disc-composer__avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.disc-composer--compact .disc-composer__avatar {
  width: 28px;
  height: 28px;
  font-size: 0.75rem;
}

.disc-composer__body {
  flex: 1;
  min-width: 0;
}

.disc-composer__input {
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--gray-200, #e5e5e5);
  border-radius: var(--radius, 12px);
  font-family: var(--font-body, 'Inter', sans-serif);
  font-size: 0.9rem;
  resize: vertical;
  background: var(--cream, #faf9f6);
  color: var(--charcoal, #2d2d2d);
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.disc-composer__input:focus {
  outline: none;
  border-color: var(--gold, #c5a55a);
}

.disc-composer__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.4rem;
}

.disc-composer__count {
  font-size: 0.75rem;
  color: var(--gray-400, #999);
}

/* Post Card */
.disc-post {
  padding: 1rem 0;
  border-bottom: 1px solid var(--gray-100, #f0f0f0);
}

.disc-post:last-child {
  border-bottom: none;
}

.disc-post--reply {
  margin-left: 2.5rem;
  padding: 0.75rem 0;
  border-left: 2px solid var(--gray-100, #f0f0f0);
  padding-left: 1rem;
  border-bottom: none;
}

.disc-post--pinned {
  background: linear-gradient(135deg, rgba(197,165,90,0.06) 0%, rgba(197,165,90,0.02) 100%);
  border-radius: var(--radius, 12px);
  padding: 1rem;
  margin-bottom: 0.5rem;
  border: 1px solid rgba(197,165,90,0.15);
}

.disc-post__header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.disc-post__avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.disc-post--reply .disc-post__avatar {
  width: 24px;
  height: 24px;
  font-size: 0.7rem;
}

.disc-post__meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
}

.disc-post__author {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--charcoal, #2d2d2d);
}

.disc-post__time {
  font-size: 0.75rem;
  color: var(--gray-400, #999);
}

.disc-post__pin {
  display: flex;
  align-items: center;
}

.disc-post__content {
  font-size: 0.9rem;
  color: var(--gray-600, #555);
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
  margin-bottom: 0.5rem;
}

.disc-post__actions {
  display: flex;
  gap: 0.75rem;
}

.disc-post__action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  color: var(--gray-400, #999);
  padding: 0.2rem 0.4rem;
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
}

.disc-post__action-btn:hover {
  color: var(--charcoal, #2d2d2d);
  background: var(--gray-50, #f8f8f8);
}

.disc-post__action-btn--liked {
  color: var(--gold, #c5a55a);
}

.disc-post__reply-composer {
  margin-top: 0.5rem;
  margin-left: 2.5rem;
}

.disc-post__replies {
  margin-top: 0.25rem;
}

/* Empty & Error */
.disc-empty {
  text-align: center;
  padding: 2rem 1rem;
  color: var(--gray-400, #999);
  font-size: 0.9rem;
}

.disc-error {
  text-align: center;
  padding: 1.5rem;
  color: var(--red, #ef4444);
  font-size: 0.9rem;
}

.disc-error .btn {
  margin-top: 0.5rem;
}

.disc-load-more {
  display: block;
  margin: 1rem auto 0;
}

/* Skeleton */
.disc-skeleton__post {
  display: flex;
  gap: 0.75rem;
  padding: 1rem 0;
}

.disc-skeleton__avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--gray-100, #f0f0f0);
  animation: disc-pulse 1.5s ease-in-out infinite;
}

.disc-skeleton__lines {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.disc-skeleton__line {
  height: 12px;
  border-radius: 6px;
  background: var(--gray-100, #f0f0f0);
  animation: disc-pulse 1.5s ease-in-out infinite;
  width: 100%;
}

.disc-skeleton__line--short {
  width: 30%;
}

.disc-skeleton__line--med {
  width: 65%;
}

@keyframes disc-pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}
`,he={video:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("polygon",{points:"10 8 16 12 10 16 10 8",fill:"currentColor",stroke:"none"})]}),audio:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"4",y1:"8",x2:"4",y2:"16"}),e.jsx("line",{x1:"8",y1:"5",x2:"8",y2:"19"}),e.jsx("line",{x1:"12",y1:"3",x2:"12",y2:"21"}),e.jsx("line",{x1:"16",y1:"7",x2:"16",y2:"17"}),e.jsx("line",{x1:"20",y1:"10",x2:"20",y2:"14"})]}),article:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),e.jsx("polyline",{points:"14 2 14 8 20 8"}),e.jsx("line",{x1:"8",y1:"13",x2:"16",y2:"13"}),e.jsx("line",{x1:"8",y1:"17",x2:"16",y2:"17"})]}),meditation:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("circle",{cx:"12",cy:"12",r:"2",fill:"currentColor",stroke:"none"})]}),podcast:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"}),e.jsx("path",{d:"M19 10v2a7 7 0 0 1-14 0v-2"}),e.jsx("line",{x1:"12",y1:"19",x2:"12",y2:"23"}),e.jsx("line",{x1:"8",y1:"23",x2:"16",y2:"23"})]}),mixed:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"3",y:"3",width:"7",height:"7",rx:"1"}),e.jsx("rect",{x:"14",y:"3",width:"7",height:"7",rx:"1"}),e.jsx("rect",{x:"3",y:"14",width:"7",height:"7",rx:"1"}),e.jsx("rect",{x:"14",y:"14",width:"7",height:"7",rx:"1"})]})},ne=({size:s=16})=>e.jsx("svg",{width:s,height:s,viewBox:"0 0 24 24",fill:"none",stroke:"var(--green, #10b981)",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"20 6 9 17 4 12"})}),Xe=()=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"}),e.jsx("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]}),Ue=({open:s})=>e.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{transition:"transform 0.2s",transform:s?"rotate(180deg)":"rotate(0deg)"},children:e.jsx("polyline",{points:"6 9 12 15 18 9"})}),Fe=()=>e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"3",y1:"6",x2:"21",y2:"6"}),e.jsx("line",{x1:"3",y1:"12",x2:"21",y2:"12"}),e.jsx("line",{x1:"3",y1:"18",x2:"21",y2:"18"})]}),Qe=()=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),e.jsx("polyline",{points:"7 10 12 15 17 10"}),e.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}),Ve=()=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"}),e.jsx("polyline",{points:"13 2 13 9 20 9"})]});function He(s){if(!s)return null;if(s<60)return`${s} min`;const n=Math.floor(s/60),o=s%60;return o>0?`${n}h ${o}m`:`${n}h`}function Ye(s){const n=Math.floor(s/60),o=s%60;return`${String(n).padStart(2,"0")}:${String(o).padStart(2,"0")}`}function Ge(s){if(!s)return null;const n=s.trim().split(/\s+/).length;return`${Math.max(1,Math.round(n/200))} min read`}function fe(s){if(!s)return null;const n=s.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);return n?n[1]:null}function ge(s){if(!s)return null;const n=s.match(/vimeo\.com\/(?:video\/)?(\d+)/);return n?n[1]:null}function Je(s){const n={},o=[];for(const i of s){const r=i.moduleId||"__default";n[r]||(n[r]={id:r,title:i.moduleTitle||"Lessons",lessons:[]},o.push(r)),n[r].lessons.push(i)}for(const i of o)n[i].lessons.sort((r,p)=>(r.sortOrder||0)-(p.sortOrder||0));return o.map(i=>n[i])}function oe({currentSpeed:s,onSpeedChange:n}){const o=[.5,.75,1,1.25,1.5,2];return e.jsxs("div",{className:"speed-controls",children:[e.jsx("span",{className:"speed-controls__label",children:"Speed:"}),o.map(i=>e.jsxs("button",{className:`speed-controls__btn ${s===i?"speed-controls__btn--active":""}`,onClick:()=>n(i),children:[i,"x"]},i))]})}function Ze({onTimerEnd:s}){const[n,o]=a.useState(null),i=a.useRef(null),r=a.useRef(s);r.current=s,a.useEffect(()=>()=>clearInterval(i.current),[]);function p(l){clearInterval(i.current);const m=l*60;o(m),i.current=setInterval(()=>{o(b=>b===null||b<=1?(clearInterval(i.current),r.current(),null):b-1)},1e3)}function g(){clearInterval(i.current),o(null)}return e.jsxs("div",{className:"sleep-timer",children:[e.jsx("span",{className:"sleep-timer__label",children:"Sleep Timer:"}),e.jsxs("div",{className:"sleep-timer__buttons",children:[[15,30,45,60].map(l=>e.jsxs("button",{className:"btn btn--outline btn--sm",onClick:()=>p(l),children:[l,"m"]},l)),n!==null&&e.jsx("button",{className:"btn btn--ghost btn--sm",onClick:g,children:"Cancel"})]}),n!==null&&e.jsxs("div",{className:"sleep-timer__display",children:[Ye(n)," remaining"]})]})}function Ke({xp:s,visible:n}){return n?e.jsxs("div",{className:"xp-notification",children:["+",s," XP"]}):null}function ss({client:s}){var me;const{slug:n,lessonId:o}=Re(),i=Pe(),[r,p]=a.useState(null),[g,l]=a.useState([]),[m,b]=a.useState(null),[q,S]=a.useState(!0),[w,L]=a.useState(null),[k,A]=a.useState(!1),[_,z]=a.useState({}),[N,c]=a.useState(!1),[C,j]=a.useState(!1),[I,D]=a.useState({visible:!1,xp:0}),[X,K]=a.useState(""),[ee,M]=a.useState(null),[O,x]=a.useState(!1),[u,f]=a.useState(null),E=a.useRef(null),[U,T]=a.useState(null),[R,ie]=a.useState(1),Y=a.useRef(null),P=a.useRef(null);a.useEffect(()=>(ae(),()=>clearTimeout(E.current)),[o]);async function ae(){var t,h,d;S(!0),L(null),c(!1),K(""),M(null),x(!1),f(null),ie(1),T(null);try{const v=await $.lessonDetail(o);if(p(v.lesson),l(v.allLessons||[]),b(v.enrollment||null),(h=(t=v.enrollment)==null?void 0:t.completedLessons)!=null&&h.includes(o))c(!0);else{const y=(v.allLessons||[]).find(Z=>Z.id===o);y!=null&&y.completed&&c(!0)}const W=(v.allLessons||[]).find(y=>y.id===o);if(W!=null&&W.moduleId&&z(y=>({...y,[W.moduleId]:!0})),(d=v.lesson)!=null&&d.quizEnabled)try{const y=await $.quizData(o);y&&y.questions&&T(y)}catch{}}catch(v){L(v.message||"Failed to load lesson")}finally{S(!1)}}const le=Je(g),F=le.flatMap(t=>t.lessons),Q=F.findIndex(t=>t.id===o),G=Q>0?F[Q-1]:null,B=Q<F.length-1?F[Q+1]:null,ce=Q===F.length-1,J=F.length,de=Q+1,ue=(m==null?void 0:m.progressPercent)??(J>0?Math.round((((me=m==null?void 0:m.completedLessons)==null?void 0:me.length)||0)/J*100):0);function ye(t){var d;if((d=m==null?void 0:m.completedLessons)!=null&&d.includes(t))return!0;const h=g.find(v=>v.id===t);return(h==null?void 0:h.completed)||!1}function je(t){if(!t.dripDay||!m)return!1;const h=m.enrolledAt?new Date(m.enrolledAt):new Date,d=new Date(h);return d.setDate(d.getDate()+t.dripDay),new Date<d}async function ke(){if(!(N||C)){j(!0);try{const t=await $.markComplete(o);c(!0),b(d=>({...d,progressPercent:t.newProgress??(d==null?void 0:d.progressPercent),completedLessons:[...(d==null?void 0:d.completedLessons)||[],o]})),l(d=>d.map(v=>v.id===o?{...v,completed:!0}:v));const h=t.xpEarned||10;D({visible:!0,xp:h}),setTimeout(()=>D({visible:!1,xp:0}),3e3),t.nextLessonId?setTimeout(()=>i(`/learn/${n}/lesson/${t.nextLessonId}`),1500):B&&!ce&&setTimeout(()=>i(`/learn/${n}/lesson/${B.id}`),1500)}catch(t){L(t.message||"Failed to mark lesson complete")}finally{j(!1)}}}function we(t){K(t),M("saving"),clearTimeout(E.current),E.current=setTimeout(()=>{M("saved")},1200)}async function ze(){if(X.trim()){M("saving");try{const t=await $.submitReflection(o,X);x(!0),M("saved"),t.xpEarned&&f(t.xpEarned)}catch(t){M(null),L(t.message||"Failed to submit reflection")}}}function se(t){ie(t),Y.current&&(Y.current.playbackRate=t),P.current&&(P.current.playbackRate=t)}const Ne=a.useCallback(()=>{P.current&&P.current.pause()},[]);async function qe({score:t,passed:h,answers:d}){try{await $.submitQuiz(o,d,t)}catch{}h&&(D({visible:!0,xp:t===100?20:15}),setTimeout(()=>D({visible:!1,xp:0}),3e3))}function V(t){i(`/learn/${n}/lesson/${t}`),A(!1)}if(q)return e.jsxs("div",{className:"page-loading",children:[e.jsx("div",{className:"spinner"}),e.jsx("p",{children:"Loading..."})]});if(w&&!r)return e.jsxs("div",{className:"portal-page",children:[e.jsx("button",{className:"btn btn--ghost btn--sm",onClick:()=>i(`/learn/${n}`),children:"← Back to Course"}),e.jsxs("div",{className:"card",style:{marginTop:"1rem",textAlign:"center",padding:"2rem"},children:[e.jsx("p",{style:{color:"var(--red)"},children:w}),e.jsx("button",{className:"btn btn--primary",onClick:ae,style:{marginTop:"1rem"},children:"Retry"})]})]});if(!r)return null;const H=r.contentType||"article",Ce=H==="video",Se=H==="audio"||H==="podcast",Le=H==="meditation",Ie=H==="article",pe=H==="mixed";return e.jsxs("div",{className:"lesson-player",children:[e.jsx("button",{className:"lesson-player__sidebar-toggle",onClick:()=>A(!k),"aria-label":"Toggle lesson navigation",children:e.jsx(Fe,{})}),k&&e.jsx("div",{className:"lesson-sidebar__overlay",onClick:()=>A(!1)}),e.jsxs("aside",{className:`lesson-sidebar ${k?"lesson-sidebar--open":""}`,children:[e.jsx("div",{className:"lesson-sidebar__course-title",children:e.jsxs("button",{className:"btn btn--ghost btn--sm",onClick:()=>i(`/learn/${n}`),style:{width:"100%",textAlign:"left",justifyContent:"flex-start"},children:["← ",r.courseTitle||"Course"]})}),e.jsx("nav",{className:"lesson-sidebar__nav",children:le.map(t=>{const h=!!_[t.id];return e.jsxs("div",{className:"lesson-sidebar__module",children:[e.jsxs("button",{className:"lesson-sidebar__module-header",onClick:()=>z(d=>({...d,[t.id]:!d[t.id]})),children:[e.jsx(Ue,{open:h}),e.jsx("span",{className:"lesson-sidebar__module-title",children:t.title})]}),h&&e.jsx("ul",{className:"lesson-sidebar__lessons",children:t.lessons.map(d=>{const v=d.id===o,W=ye(d.id),y=je(d);return e.jsxs("li",{className:["lesson-sidebar__lesson",v&&"lesson-sidebar__lesson--current",W&&"lesson-sidebar__lesson--completed",y&&"lesson-sidebar__lesson--locked"].filter(Boolean).join(" "),onClick:()=>{y||V(d.id)},role:y?void 0:"button",tabIndex:y?-1:0,onKeyDown:Z=>{!y&&(Z.key==="Enter"||Z.key===" ")&&(Z.preventDefault(),V(d.id))},children:[e.jsx("span",{className:"lesson-sidebar__lesson-icon",children:he[d.contentType]||he.article}),e.jsx("span",{className:"lesson-sidebar__lesson-title",children:d.title}),e.jsx("span",{className:"lesson-sidebar__lesson-meta",children:d.durationMinutes?He(d.durationMinutes):""}),e.jsxs("span",{className:"lesson-sidebar__lesson-status",children:[W&&e.jsx(ne,{size:14}),y&&e.jsx(Xe,{})]})]},d.id)})})]},t.id)})}),e.jsxs("div",{className:"lesson-sidebar__progress",children:[e.jsxs("div",{className:"lesson-sidebar__progress-label",children:[e.jsx("span",{children:"Progress"}),e.jsxs("span",{children:[ue,"%"]})]}),e.jsx("div",{className:"lesson-sidebar__progress-bar-track",children:e.jsx("div",{className:"lesson-sidebar__progress-bar-fill",style:{width:`${ue}%`}})})]})]}),e.jsxs("main",{className:"lesson-content",children:[e.jsxs("div",{className:"lesson-topbar",children:[e.jsxs("div",{className:"lesson-topbar__breadcrumb",children:[e.jsx("button",{className:"btn btn--ghost btn--sm",onClick:()=>i(`/learn/${n}`),children:r.courseTitle||"Course"}),e.jsx("span",{className:"lesson-topbar__sep",children:"/"}),e.jsx("span",{className:"lesson-topbar__module",children:r.moduleTitle||"Module"}),e.jsx("span",{className:"lesson-topbar__sep",children:"/"}),e.jsx("span",{className:"lesson-topbar__current",children:r.title}),e.jsx("button",{className:"btn btn--ghost btn--sm",style:{marginLeft:"0.75rem",fontSize:"0.8rem",color:"var(--gold, #c5a55a)"},onClick:()=>i(`/learn/${n}/community`),children:"Community"})]}),e.jsxs("div",{className:"lesson-topbar__progress",children:[e.jsxs("span",{className:"lesson-topbar__progress-text",children:["Lesson ",de," of ",J]}),e.jsx("div",{className:"lesson-topbar__progress-bar",children:e.jsx("div",{className:"lesson-topbar__progress-fill",style:{width:`${J>0?de/J*100:0}%`}})})]}),e.jsxs("div",{className:"lesson-topbar__nav",children:[e.jsx("button",{className:"btn btn--outline btn--sm",disabled:!G,onClick:()=>G&&V(G.id),children:"← Prev"}),e.jsx("button",{className:"btn btn--outline btn--sm",disabled:!B,onClick:()=>B&&V(B.id),children:"Next →"})]})]}),e.jsx("h1",{className:"lesson-content__title",children:r.title}),w&&e.jsxs("div",{className:"lesson-content__error",children:[e.jsx("p",{children:w}),e.jsx("button",{className:"btn btn--ghost btn--sm",onClick:()=>L(null),children:"Dismiss"})]}),(Ce||pe&&r.videoUrl)&&e.jsxs("div",{className:"video-section",children:[e.jsx("div",{className:"video-container",children:(()=>{const t=fe(r.videoUrl),h=ge(r.videoUrl);return t?e.jsx("iframe",{src:`https://www.youtube.com/embed/${t}?rel=0`,title:r.title,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0}):h?e.jsx("iframe",{src:`https://player.vimeo.com/video/${h}?title=0&byline=0&portrait=0`,title:r.title,frameBorder:"0",allow:"autoplay; fullscreen; picture-in-picture",allowFullScreen:!0}):e.jsx("video",{ref:Y,src:r.videoUrl,controls:!0,playsInline:!0,onLoadedMetadata:()=>{Y.current&&(Y.current.playbackRate=R)}})})()}),r.videoUrl&&!fe(r.videoUrl)&&!ge(r.videoUrl)&&e.jsx(oe,{currentSpeed:R,onSpeedChange:se})]}),Se&&r.audioUrl&&e.jsxs("div",{className:"audio-section",children:[e.jsxs("div",{className:"audio-player",children:[e.jsx("div",{className:"audio-player__waveform"}),e.jsx("audio",{ref:P,src:r.audioUrl,controls:!0,onLoadedMetadata:()=>{P.current&&(P.current.playbackRate=R)}})]}),e.jsx(oe,{currentSpeed:R,onSpeedChange:se})]}),Le&&e.jsxs("div",{className:"audio-section audio-section--meditation",children:[e.jsx("div",{className:"meditation-ambient"}),r.audioUrl?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"audio-player",children:[e.jsx("div",{className:"audio-player__waveform"}),e.jsx("audio",{ref:P,src:r.audioUrl,controls:!0,onLoadedMetadata:()=>{P.current&&(P.current.playbackRate=R)}})]}),e.jsx(oe,{currentSpeed:R,onSpeedChange:se})]}):e.jsx("p",{style:{textAlign:"center",color:"var(--gray-500)",padding:"2rem",position:"relative",zIndex:1},children:"Meditation audio not yet available."}),e.jsx(Ze,{onTimerEnd:Ne})]}),Ie&&r.writtenContent&&e.jsxs("div",{className:"article-section",children:[e.jsx("div",{className:"article-section__read-time",children:Ge(r.writtenContent)}),e.jsx("div",{className:"article-content",children:r.writtenContent.split(`

`).map((t,h)=>e.jsx("p",{children:t},h))})]}),pe&&r.writtenContent&&e.jsx("div",{className:"article-section",children:e.jsx("div",{className:"article-content",children:r.writtenContent.split(`

`).map((t,h)=>e.jsx("p",{children:t},h))})}),r.attachments&&r.attachments.length>0&&e.jsxs("div",{className:"attachments-section",children:[e.jsx("h3",{className:"attachments-section__heading",children:"Attachments"}),e.jsx("ul",{className:"attachment-list",children:r.attachments.map((t,h)=>e.jsxs("li",{className:"attachment-item",children:[e.jsx("span",{className:"attachment-item__icon",children:e.jsx(Ve,{})}),e.jsx("span",{className:"attachment-item__name",children:t.name||t.filename}),t.size&&e.jsx("span",{className:"attachment-item__size",children:t.size}),e.jsxs("a",{href:t.url,download:!0,target:"_blank",rel:"noopener noreferrer",className:"btn btn--outline btn--sm attachment-item__download",children:[e.jsx(Qe,{})," Download"]})]},h))})]}),r.reflectionPrompt&&e.jsxs("div",{className:"reflection-section",children:[e.jsx("h3",{className:"reflection-section__heading",children:"Reflection Journal"}),e.jsx("p",{className:"reflection-section__prompt",children:r.reflectionPrompt}),e.jsx("textarea",{className:"reflection-box",placeholder:"Write your reflection...",value:X,onChange:t=>we(t.target.value),disabled:O,rows:5}),e.jsxs("div",{className:"reflection-section__footer",children:[e.jsxs("span",{className:"reflection-section__save-status",children:[ee==="saving"&&"Saving...",ee==="saved"&&"Saved"]}),e.jsx("span",{className:"reflection-section__xp-hint",children:O&&u?`+${u} XP earned`:"+5 XP for completing your reflection"}),O?e.jsxs("span",{className:"reflection-section__submitted",children:[e.jsx(ne,{size:14})," Submitted"]}):e.jsx("button",{className:"btn btn--primary btn--sm",onClick:ze,disabled:!X.trim(),children:"Submit Reflection"})]})]}),r.quizEnabled&&U&&e.jsx(Me,{lessonId:o,quizData:U,onQuizComplete:qe}),e.jsx(Be,{lessonId:o,courseId:r.courseId||"",client:s}),e.jsxs("div",{className:"lesson-bottom-actions",children:[e.jsx("div",{className:"lesson-bottom-actions__left",children:G&&e.jsx("button",{className:"btn btn--outline",onClick:()=>V(G.id),children:"← Previous Lesson"})}),e.jsx("div",{className:"lesson-bottom-actions__center",children:N?e.jsxs("span",{className:"lesson-completed-badge",children:[e.jsx(ne,{size:18})," Completed"]}):e.jsx("button",{className:"btn btn--success",onClick:ke,disabled:C,children:C?"Marking...":"Mark Complete"})}),e.jsx("div",{className:"lesson-bottom-actions__right",children:ce?e.jsx("button",{className:"btn btn--primary",onClick:()=>i(`/learn/${n}`),children:"Complete Course"}):B?e.jsx("button",{className:"btn btn--primary",onClick:()=>V(B.id),children:"Next Lesson →"}):null})]}),e.jsx(Ke,{xp:I.xp,visible:I.visible})]}),e.jsx("style",{children:`
        /* ========== LESSON PLAYER LAYOUT ========== */
        .lesson-player {
          display: flex;
          min-height: calc(100vh - var(--topbar-height, 64px));
          position: relative;
        }

        /* ========== SIDEBAR ========== */
        .lesson-sidebar {
          width: 300px;
          flex-shrink: 0;
          background: var(--white);
          border-right: 1px solid var(--gray-200);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          max-height: calc(100vh - var(--topbar-height, 64px));
          position: sticky;
          top: var(--topbar-height, 64px);
        }

        .lesson-sidebar__course-title {
          padding: 16px;
          border-bottom: 1px solid var(--gray-200);
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.875rem;
        }

        .lesson-sidebar__nav {
          flex: 1;
          overflow-y: auto;
          padding: 8px 0;
        }

        .lesson-sidebar__module-header {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 10px 16px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-heading);
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--charcoal);
          text-align: left;
          transition: background var(--transition);
        }
        .lesson-sidebar__module-header:hover {
          background: var(--gray-50);
        }

        .lesson-sidebar__module-title {
          flex: 1;
          line-height: 1.3;
        }

        .lesson-sidebar__lessons {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .lesson-sidebar__lesson {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px 8px 36px;
          font-size: 0.8125rem;
          color: var(--gray-600);
          cursor: pointer;
          border-left: 3px solid transparent;
          transition: background var(--transition), border-color var(--transition);
        }
        .lesson-sidebar__lesson:hover:not(.lesson-sidebar__lesson--locked) {
          background: var(--gray-50);
        }
        .lesson-sidebar__lesson--current {
          background: rgba(197, 165, 90, 0.08);
          border-left-color: var(--gold);
          color: var(--charcoal);
          font-weight: 600;
        }
        .lesson-sidebar__lesson--completed .lesson-sidebar__lesson-title {
          color: var(--gray-400);
        }
        .lesson-sidebar__lesson--locked {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .lesson-sidebar__lesson-icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }
        .lesson-sidebar__lesson-title {
          flex: 1;
          line-height: 1.3;
        }
        .lesson-sidebar__lesson-meta {
          font-size: 0.6875rem;
          color: var(--gray-400);
          flex-shrink: 0;
        }
        .lesson-sidebar__lesson-status {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          width: 16px;
        }

        /* Sidebar Progress */
        .lesson-sidebar__progress {
          padding: 16px;
          border-top: 1px solid var(--gray-200);
        }
        .lesson-sidebar__progress-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--gray-500);
          margin-bottom: 6px;
        }
        .lesson-sidebar__progress-bar-track {
          height: 6px;
          background: var(--gray-200);
          border-radius: 3px;
          overflow: hidden;
        }
        .lesson-sidebar__progress-bar-fill {
          height: 100%;
          background: var(--gold);
          border-radius: 3px;
          transition: width 400ms ease;
        }

        /* Sidebar overlay + toggle (mobile) */
        .lesson-sidebar__overlay {
          display: none;
        }
        .lesson-player__sidebar-toggle {
          display: none;
        }

        /* ========== MAIN CONTENT ========== */
        .lesson-content {
          flex: 1;
          min-width: 0;
          padding: 24px 32px 48px;
          max-width: 900px;
        }

        .lesson-content__title {
          font-size: 1.5rem;
          color: var(--charcoal);
          margin-bottom: 24px;
        }

        .lesson-content__error {
          background: var(--red-light);
          border: 1px solid var(--red);
          border-radius: var(--radius-sm);
          padding: 12px 16px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.875rem;
          color: var(--red);
        }

        /* ========== TOP BAR ========== */
        .lesson-topbar {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 0;
          margin-bottom: 16px;
          border-bottom: 1px solid var(--gray-200);
          flex-wrap: wrap;
        }

        .lesson-topbar__breadcrumb {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
          color: var(--gray-500);
          flex: 1;
          min-width: 0;
          overflow: hidden;
        }
        .lesson-topbar__sep {
          color: var(--gray-300);
        }
        .lesson-topbar__module {
          color: var(--gray-500);
        }
        .lesson-topbar__current {
          color: var(--charcoal);
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .lesson-topbar__progress {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .lesson-topbar__progress-text {
          font-size: 0.75rem;
          color: var(--gray-500);
          white-space: nowrap;
        }
        .lesson-topbar__progress-bar {
          width: 80px;
          height: 4px;
          background: var(--gray-200);
          border-radius: 2px;
          overflow: hidden;
        }
        .lesson-topbar__progress-fill {
          height: 100%;
          background: var(--gold);
          border-radius: 2px;
          transition: width 300ms ease;
        }

        .lesson-topbar__nav {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        /* ========== VIDEO ========== */
        .video-section {
          margin-bottom: 24px;
        }
        .video-container {
          position: relative;
          width: 100%;
          padding-top: 56.25%;
          background: #000;
          border-radius: var(--radius);
          overflow: hidden;
        }
        .video-container iframe,
        .video-container video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        /* ========== AUDIO ========== */
        .audio-section {
          margin-bottom: 24px;
          position: relative;
        }
        .audio-section--meditation {
          border-radius: var(--radius);
          overflow: hidden;
          padding: 32px 24px;
        }
        .audio-player {
          position: relative;
          z-index: 1;
        }
        .audio-player audio {
          width: 100%;
          border-radius: var(--radius-sm);
        }
        .audio-player__waveform {
          height: 48px;
          margin-bottom: 12px;
          border-radius: var(--radius-sm);
          background:
            repeating-linear-gradient(
              90deg,
              var(--gray-200) 0px,
              var(--gray-200) 2px,
              transparent 2px,
              transparent 6px
            );
          background-size: 6px 100%;
          opacity: 0.5;
          animation: waveformPulse 2s ease-in-out infinite alternate;
        }
        @keyframes waveformPulse {
          0% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }

        /* Meditation ambient background */
        .meditation-ambient {
          position: absolute;
          inset: 0;
          z-index: 0;
          border-radius: var(--radius);
          background: linear-gradient(135deg, #667eea, #764ba2, #f093fb, #667eea);
          background-size: 600% 600%;
          animation: meditationGradient 20s ease infinite;
          opacity: 0.15;
        }
        @keyframes meditationGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* ========== SPEED CONTROLS ========== */
        .speed-controls {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 12px;
          font-size: 0.8125rem;
          position: relative;
          z-index: 1;
        }
        .speed-controls__label {
          color: var(--gray-500);
          font-weight: 500;
          margin-right: 4px;
        }
        .speed-controls__btn {
          padding: 4px 10px;
          border: 1px solid var(--gray-200);
          border-radius: 999px;
          background: var(--white);
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--gray-600);
          cursor: pointer;
          transition: all var(--transition);
          font-family: var(--font-body);
        }
        .speed-controls__btn:hover {
          border-color: var(--gold);
          color: var(--gold-dark);
        }
        .speed-controls__btn--active {
          background: var(--gold);
          border-color: var(--gold);
          color: var(--white);
        }

        /* ========== SLEEP TIMER ========== */
        .sleep-timer {
          margin-top: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }
        .sleep-timer__label {
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--gray-500);
        }
        .sleep-timer__buttons {
          display: flex;
          gap: 6px;
        }
        .sleep-timer__display {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--purple);
          padding: 4px 12px;
          background: var(--purple-light);
          border-radius: 999px;
        }

        /* ========== ARTICLE ========== */
        .article-section {
          margin-bottom: 24px;
        }
        .article-section__read-time {
          font-size: 0.8125rem;
          color: var(--gray-400);
          margin-bottom: 16px;
          font-weight: 500;
        }
        .article-content {
          max-width: 65ch;
          font-size: 1rem;
          line-height: 1.75;
          color: var(--charcoal);
        }
        .article-content p {
          margin-bottom: 1.25em;
        }

        /* ========== ATTACHMENTS ========== */
        .attachments-section {
          margin-bottom: 24px;
          padding: 20px;
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius);
        }
        .attachments-section__heading {
          font-size: 1rem;
          margin-bottom: 12px;
          color: var(--charcoal);
        }
        .attachment-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .attachment-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          background: var(--gray-50);
          border-radius: var(--radius-sm);
        }
        .attachment-item__icon {
          flex-shrink: 0;
          color: var(--gray-500);
          display: flex;
          align-items: center;
        }
        .attachment-item__name {
          flex: 1;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--charcoal);
        }
        .attachment-item__size {
          font-size: 0.75rem;
          color: var(--gray-400);
          flex-shrink: 0;
        }
        .attachment-item__download {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
          text-decoration: none;
        }

        /* ========== REFLECTION JOURNAL ========== */
        .reflection-section {
          margin-bottom: 24px;
          padding: 20px;
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius);
        }
        .reflection-section__heading {
          font-size: 1rem;
          color: var(--charcoal);
          margin-bottom: 8px;
        }
        .reflection-section__prompt {
          font-size: 0.9375rem;
          color: var(--gray-600);
          line-height: 1.6;
          margin-bottom: 12px;
          font-style: italic;
        }
        .reflection-box {
          width: 100%;
          padding: 12px 14px;
          border: 1.5px solid var(--gray-200);
          border-radius: var(--radius-sm);
          font-family: var(--font-body);
          font-size: 0.9375rem;
          color: var(--charcoal);
          resize: vertical;
          min-height: 100px;
          transition: border-color var(--transition);
          box-sizing: border-box;
        }
        .reflection-box:focus {
          outline: none;
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(197, 165, 90, 0.15);
        }
        .reflection-box:disabled {
          background: var(--gray-50);
          color: var(--gray-500);
        }
        .reflection-section__footer {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 10px;
          flex-wrap: wrap;
        }
        .reflection-section__save-status {
          font-size: 0.75rem;
          color: var(--gray-400);
          font-weight: 500;
        }
        .reflection-section__xp-hint {
          font-size: 0.75rem;
          color: var(--gold-dark);
          font-weight: 600;
          flex: 1;
        }
        .reflection-section__submitted {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--green);
        }

        /* ========== PLACEHOLDER CARDS ========== */
        .placeholder-card {
          padding: 20px;
          background: var(--gray-50);
          border: 1px dashed var(--gray-300);
          border-radius: var(--radius);
          margin-bottom: 24px;
          text-align: center;
        }
        .placeholder-card h3 {
          font-size: 0.9375rem;
          color: var(--gray-500);
          margin-bottom: 4px;
        }
        .placeholder-card p {
          font-size: 0.8125rem;
          color: var(--gray-400);
        }

        /* ========== BOTTOM ACTIONS ========== */
        .lesson-bottom-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 0 0;
          border-top: 1px solid var(--gray-200);
          margin-top: 24px;
          gap: 12px;
          flex-wrap: wrap;
        }
        .lesson-bottom-actions__left,
        .lesson-bottom-actions__right {
          flex: 1;
        }
        .lesson-bottom-actions__right {
          text-align: right;
        }
        .lesson-bottom-actions__center {
          flex-shrink: 0;
        }

        .lesson-completed-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--green);
          padding: 8px 20px;
          background: var(--green-light);
          border-radius: var(--radius-sm);
        }

        /* ========== XP NOTIFICATION ========== */
        .xp-notification {
          position: fixed;
          bottom: 32px;
          right: 32px;
          background: var(--gold);
          color: var(--white);
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          padding: 12px 24px;
          border-radius: var(--radius);
          box-shadow: var(--shadow-lg);
          z-index: 1000;
          animation: xpSlideIn 0.4s ease, xpFadeOut 0.6s ease 2.4s forwards;
        }
        @keyframes xpSlideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes xpFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        /* ========== RESPONSIVE (< 768px) ========== */
        @media (max-width: 768px) {
          .lesson-player {
            flex-direction: column;
          }

          .lesson-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 200;
            width: 280px;
            max-height: 100vh;
            transform: translateX(-100%);
            transition: transform 300ms ease;
            box-shadow: none;
          }
          .lesson-sidebar--open {
            transform: translateX(0);
            box-shadow: var(--shadow-lg);
          }

          .lesson-sidebar__overlay {
            display: block;
            position: fixed;
            inset: 0;
            z-index: 199;
            background: rgba(0, 0, 0, 0.4);
          }

          .lesson-player__sidebar-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            top: calc(var(--topbar-height, 64px) + 12px);
            left: 12px;
            z-index: 100;
            width: 40px;
            height: 40px;
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: var(--radius-sm);
            box-shadow: var(--shadow);
            cursor: pointer;
          }

          .lesson-content {
            padding: 16px;
            max-width: 100%;
          }

          .lesson-topbar {
            flex-direction: column;
            align-items: flex-start;
          }

          .lesson-topbar__breadcrumb {
            width: 100%;
          }

          .lesson-topbar__nav {
            width: 100%;
            justify-content: space-between;
          }

          .video-container {
            border-radius: var(--radius-sm);
          }

          .audio-player audio {
            width: 100%;
          }

          .lesson-bottom-actions {
            flex-direction: column;
            align-items: stretch;
          }
          .lesson-bottom-actions__left,
          .lesson-bottom-actions__center,
          .lesson-bottom-actions__right {
            text-align: center;
          }

          .xp-notification {
            left: 50%;
            right: auto;
            bottom: 20px;
          }
        }
      `})]})}export{ss as default};
