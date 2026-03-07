import{r as c,j as e,b as Ce,u as Se,a as J}from"./index-DJ4tQi2c.js";const re=()=>e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"var(--green, #10b981)",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),e.jsx("polyline",{points:"22 4 12 14.01 9 11.01"})]}),te=()=>e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"var(--red, #ef4444)",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("line",{x1:"15",y1:"9",x2:"9",y2:"15"}),e.jsx("line",{x1:"9",y1:"9",x2:"15",y2:"15"})]}),Le=()=>e.jsxs("svg",{width:"32",height:"32",viewBox:"0 0 24 24",fill:"none",stroke:"var(--gold, #c5a55a)",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6"}),e.jsx("path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18"}),e.jsx("path",{d:"M4 22h16"}),e.jsx("path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"}),e.jsx("path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"}),e.jsx("path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z"})]});function Ie({lessonId:n,quizData:t,onQuizComplete:d}){const[s,f]=c.useState(0),[g,N]=c.useState(null),[a,k]=c.useState(!1),[_,E]=c.useState([]),[z,w]=c.useState(""),[F,A]=c.useState(!1),[ee,O]=c.useState(!1);if(!t||!t.questions||t.questions.length===0)return null;const L=t.questions,v=L.length,l=L[s],y=t.type==="graded",I=t.passScore||70,q=L.reduce((u,i)=>u+(i.points||10),0);function T(u){a||N(u)}function Z(){if(!a)if(l.type==="open-ended"){if(!z.trim())return;const u={questionId:l.id,type:"open-ended",answer:z.trim(),correct:!0,points:l.points||10,earned:l.points||10};E(i=>[...i,u]),k(!0)}else{if(g===null)return;const u=g===l.correct,i={questionId:l.id,type:l.type,answer:g,correct:u,points:l.points||10,earned:u?l.points||10:0};E(p=>[...p,i]),k(!0)}}function K(){if(s<v-1)O(!0),setTimeout(()=>{f(u=>u+1),N(null),k(!1),w(""),O(!1)},300);else{A(!0);const u=[..._].reduce((R,B)=>R+B.earned,0),i=Math.round(u/q*100),p=!y||i>=I;d&&d({score:i,passed:p,answers:[..._]})}}function C(){f(0),N(null),k(!1),E([]),w(""),A(!1),O(!1)}if(F){const u=_.reduce((b,S)=>b+S.earned,0),i=Math.round(u/q*100),p=!y||i>=I,R=_.filter(b=>b.correct).length,B=i===100;return e.jsxs("div",{className:"quiz-section",children:[e.jsx("style",{children:me}),e.jsxs("div",{className:"quiz-results",children:[e.jsxs("div",{className:"quiz-results__header",children:[e.jsx(Le,{}),e.jsx("h3",{className:"quiz-results__title",children:"Quiz Complete"})]}),e.jsx("div",{className:`quiz-results__score-ring ${p?"quiz-results__score-ring--pass":"quiz-results__score-ring--fail"}`,children:e.jsxs("span",{className:"quiz-results__score-number",children:[i,"%"]})}),y&&e.jsx("div",{className:`quiz-results__status ${p?"quiz-results__status--pass":"quiz-results__status--fail"}`,children:p?"Passed":"Not Passed"}),y&&!p&&e.jsxs("p",{className:"quiz-results__requirement",children:["You need ",I,"% to pass this quiz."]}),e.jsx("div",{className:"quiz-results__xp",children:B?"+20 XP for perfect score":p?"+15 XP for passing":"Pass the quiz to earn XP"}),e.jsxs("div",{className:"quiz-results__stats",children:[e.jsxs("div",{className:"quiz-results__stat",children:[e.jsx("span",{className:"quiz-results__stat-value",children:R}),e.jsx("span",{className:"quiz-results__stat-label",children:"Correct"})]}),e.jsxs("div",{className:"quiz-results__stat",children:[e.jsx("span",{className:"quiz-results__stat-value",children:v-R}),e.jsx("span",{className:"quiz-results__stat-label",children:"Incorrect"})]}),e.jsxs("div",{className:"quiz-results__stat",children:[e.jsxs("span",{className:"quiz-results__stat-value",children:[u,"/",q]}),e.jsx("span",{className:"quiz-results__stat-label",children:"Points"})]})]}),e.jsxs("div",{className:"quiz-results__breakdown",children:[e.jsx("h4",{className:"quiz-results__breakdown-title",children:"Question Breakdown"}),_.map((b,S)=>e.jsxs("div",{className:`quiz-results__breakdown-item ${b.correct?"quiz-results__breakdown-item--correct":"quiz-results__breakdown-item--incorrect"}`,children:[e.jsxs("span",{className:"quiz-results__breakdown-num",children:["Q",S+1]}),e.jsx("span",{className:"quiz-results__breakdown-text",children:L[S].question}),e.jsx("span",{className:"quiz-results__breakdown-icon",children:b.correct?e.jsx(re,{}):e.jsx(te,{})})]},S))]}),y&&!p&&e.jsx("button",{className:"btn btn--primary quiz-results__retry",onClick:C,children:"Retry Quiz"})]})]})}const U=s/v*100,$=a&&(l.type==="open-ended"||g===l.correct);return e.jsxs("div",{className:"quiz-section",children:[e.jsx("style",{children:me}),e.jsxs("div",{className:"quiz-header",children:[e.jsx("h3",{className:"quiz-header__title",children:y?"Quiz":"Practice Quiz"}),e.jsxs("span",{className:"quiz-header__progress",children:["Question ",s+1," of ",v]})]}),e.jsx("div",{className:"quiz-progress",children:e.jsx("div",{className:"quiz-progress__bar",style:{width:`${U}%`}})}),y&&e.jsxs("p",{className:"quiz-pass-note",children:["You need ",I,"% to pass"]}),e.jsxs("div",{className:`quiz-question ${ee?"quiz-question--exit":"quiz-question--enter"}`,children:[e.jsx("p",{className:"quiz-question__text",children:l.question}),l.type==="multiple-choice"&&e.jsx("div",{className:"quiz-options",children:l.options.map((u,i)=>{let p="quiz-option";return a?i===l.correct?p+=" quiz-option--correct":i===g&&i!==l.correct&&(p+=" quiz-option--incorrect"):i===g&&(p+=" quiz-option--selected"),e.jsxs("button",{className:p,onClick:()=>T(i),disabled:a,children:[e.jsx("span",{className:"quiz-option__letter",children:String.fromCharCode(65+i)}),e.jsx("span",{className:"quiz-option__text",children:u}),a&&i===l.correct&&e.jsx("span",{className:"quiz-option__icon",children:e.jsx(re,{})}),a&&i===g&&i!==l.correct&&e.jsx("span",{className:"quiz-option__icon",children:e.jsx(te,{})})]},i)})}),l.type==="true-false"&&e.jsx("div",{className:"quiz-tf",children:l.options.map((u,i)=>{let p="quiz-tf__btn";return a?i===l.correct?p+=" quiz-tf__btn--correct":i===g&&i!==l.correct&&(p+=" quiz-tf__btn--incorrect"):i===g&&(p+=" quiz-tf__btn--selected"),e.jsx("button",{className:p,onClick:()=>T(i),disabled:a,children:u},i)})}),l.type==="open-ended"&&e.jsx("div",{className:"quiz-open",children:e.jsx("textarea",{className:"quiz-open__textarea",placeholder:"Type your answer here...",value:z,onChange:u=>w(u.target.value),disabled:a,rows:4})}),!a&&e.jsx("button",{className:"btn btn--primary quiz-submit-btn",onClick:Z,disabled:l.type==="open-ended"&&!z.trim()||l.type!=="open-ended"&&g===null,children:"Submit Answer"}),a&&e.jsxs("div",{className:`quiz-feedback ${$?"quiz-feedback--correct":"quiz-feedback--incorrect"}`,children:[e.jsxs("div",{className:"quiz-feedback__header",children:[$?e.jsx(re,{}):e.jsx(te,{}),e.jsx("span",{className:"quiz-feedback__label",children:l.type==="open-ended"?"Answer Submitted":$?"Correct!":"Incorrect"})]}),l.explanation&&e.jsx("p",{className:"quiz-feedback__explanation",children:l.explanation})]}),a&&e.jsx("button",{className:"btn btn--primary quiz-next-btn",onClick:K,children:s<v-1?"Next Question":"See Results"})]})]})}const me=`
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
`,xe={video:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("polygon",{points:"10 8 16 12 10 16 10 8",fill:"currentColor",stroke:"none"})]}),audio:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"4",y1:"8",x2:"4",y2:"16"}),e.jsx("line",{x1:"8",y1:"5",x2:"8",y2:"19"}),e.jsx("line",{x1:"12",y1:"3",x2:"12",y2:"21"}),e.jsx("line",{x1:"16",y1:"7",x2:"16",y2:"17"}),e.jsx("line",{x1:"20",y1:"10",x2:"20",y2:"14"})]}),article:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),e.jsx("polyline",{points:"14 2 14 8 20 8"}),e.jsx("line",{x1:"8",y1:"13",x2:"16",y2:"13"}),e.jsx("line",{x1:"8",y1:"17",x2:"16",y2:"17"})]}),meditation:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("circle",{cx:"12",cy:"12",r:"2",fill:"currentColor",stroke:"none"})]}),podcast:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"}),e.jsx("path",{d:"M19 10v2a7 7 0 0 1-14 0v-2"}),e.jsx("line",{x1:"12",y1:"19",x2:"12",y2:"23"}),e.jsx("line",{x1:"8",y1:"23",x2:"16",y2:"23"})]}),mixed:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"3",y:"3",width:"7",height:"7",rx:"1"}),e.jsx("rect",{x:"14",y:"3",width:"7",height:"7",rx:"1"}),e.jsx("rect",{x:"3",y:"14",width:"7",height:"7",rx:"1"}),e.jsx("rect",{x:"14",y:"14",width:"7",height:"7",rx:"1"})]})},ne=({size:n=16})=>e.jsx("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"var(--green, #10b981)",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"20 6 9 17 4 12"})}),Te=()=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"}),e.jsx("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]}),Re=({open:n})=>e.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{transition:"transform 0.2s",transform:n?"rotate(180deg)":"rotate(0deg)"},children:e.jsx("polyline",{points:"6 9 12 15 18 9"})}),Me=()=>e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"3",y1:"6",x2:"21",y2:"6"}),e.jsx("line",{x1:"3",y1:"12",x2:"21",y2:"12"}),e.jsx("line",{x1:"3",y1:"18",x2:"21",y2:"18"})]}),Pe=()=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),e.jsx("polyline",{points:"7 10 12 15 17 10"}),e.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}),Ee=()=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"}),e.jsx("polyline",{points:"13 2 13 9 20 9"})]});function Ae(n){if(!n)return null;if(n<60)return`${n} min`;const t=Math.floor(n/60),d=n%60;return d>0?`${t}h ${d}m`:`${t}h`}function Oe(n){const t=Math.floor(n/60),d=n%60;return`${String(t).padStart(2,"0")}:${String(d).padStart(2,"0")}`}function $e(n){if(!n)return null;const t=n.trim().split(/\s+/).length;return`${Math.max(1,Math.round(t/200))} min read`}function he(n){if(!n)return null;const t=n.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);return t?t[1]:null}function ge(n){if(!n)return null;const t=n.match(/vimeo\.com\/(?:video\/)?(\d+)/);return t?t[1]:null}function Be(n){const t={},d=[];for(const s of n){const f=s.moduleId||"__default";t[f]||(t[f]={id:f,title:s.moduleTitle||"Lessons",lessons:[]},d.push(f)),t[f].lessons.push(s)}for(const s of d)t[s].lessons.sort((f,g)=>(f.sortOrder||0)-(g.sortOrder||0));return d.map(s=>t[s])}function oe({currentSpeed:n,onSpeedChange:t}){const d=[.5,.75,1,1.25,1.5,2];return e.jsxs("div",{className:"speed-controls",children:[e.jsx("span",{className:"speed-controls__label",children:"Speed:"}),d.map(s=>e.jsxs("button",{className:`speed-controls__btn ${n===s?"speed-controls__btn--active":""}`,onClick:()=>t(s),children:[s,"x"]},s))]})}function De({onTimerEnd:n}){const[t,d]=c.useState(null),s=c.useRef(null),f=c.useRef(n);f.current=n,c.useEffect(()=>()=>clearInterval(s.current),[]);function g(a){clearInterval(s.current);const k=a*60;d(k),s.current=setInterval(()=>{d(_=>_===null||_<=1?(clearInterval(s.current),f.current(),null):_-1)},1e3)}function N(){clearInterval(s.current),d(null)}return e.jsxs("div",{className:"sleep-timer",children:[e.jsx("span",{className:"sleep-timer__label",children:"Sleep Timer:"}),e.jsxs("div",{className:"sleep-timer__buttons",children:[[15,30,45,60].map(a=>e.jsxs("button",{className:"btn btn--outline btn--sm",onClick:()=>g(a),children:[a,"m"]},a)),t!==null&&e.jsx("button",{className:"btn btn--ghost btn--sm",onClick:N,children:"Cancel"})]}),t!==null&&e.jsxs("div",{className:"sleep-timer__display",children:[Oe(t)," remaining"]})]})}function Xe({xp:n,visible:t}){return t?e.jsxs("div",{className:"xp-notification",children:["+",n," XP"]}):null}function We(){var pe;const{slug:n,lessonId:t}=Ce(),d=Se(),[s,f]=c.useState(null),[g,N]=c.useState([]),[a,k]=c.useState(null),[_,E]=c.useState(!0),[z,w]=c.useState(null),[F,A]=c.useState(!1),[ee,O]=c.useState({}),[L,v]=c.useState(!1),[l,y]=c.useState(!1),[I,q]=c.useState({visible:!1,xp:0}),[T,Z]=c.useState(""),[K,C]=c.useState(null),[U,$]=c.useState(!1),[u,i]=c.useState(null),p=c.useRef(null),[R,B]=c.useState(null),[b,S]=c.useState(1),V=c.useRef(null),j=c.useRef(null);c.useEffect(()=>(ie(),()=>clearTimeout(p.current)),[t]);async function ie(){var r,m,o;E(!0),w(null),v(!1),Z(""),C(null),$(!1),i(null),S(1),B(null);try{const x=await J.lessonDetail(t);if(f(x.lesson),N(x.allLessons||[]),k(x.enrollment||null),(m=(r=x.enrollment)==null?void 0:r.completedLessons)!=null&&m.includes(t))v(!0);else{const h=(x.allLessons||[]).find(G=>G.id===t);h!=null&&h.completed&&v(!0)}const P=(x.allLessons||[]).find(h=>h.id===t);if(P!=null&&P.moduleId&&O(h=>({...h,[P.moduleId]:!0})),(o=x.lesson)!=null&&o.quizEnabled)try{const h=await J.quizData(t);h&&h.questions&&B(h)}catch{}}catch(x){w(x.message||"Failed to load lesson")}finally{E(!1)}}const ae=Be(g),D=ae.flatMap(r=>r.lessons),X=D.findIndex(r=>r.id===t),H=X>0?D[X-1]:null,M=X<D.length-1?D[X+1]:null,le=X===D.length-1,Y=D.length,ce=X+1,de=(a==null?void 0:a.progressPercent)??(Y>0?Math.round((((pe=a==null?void 0:a.completedLessons)==null?void 0:pe.length)||0)/Y*100):0);function fe(r){var o;if((o=a==null?void 0:a.completedLessons)!=null&&o.includes(r))return!0;const m=g.find(x=>x.id===r);return(m==null?void 0:m.completed)||!1}function be(r){if(!r.dripDay||!a)return!1;const m=a.enrolledAt?new Date(a.enrolledAt):new Date,o=new Date(m);return o.setDate(o.getDate()+r.dripDay),new Date<o}async function _e(){if(!(L||l)){y(!0);try{const r=await J.markComplete(t);v(!0),k(o=>({...o,progressPercent:r.newProgress??(o==null?void 0:o.progressPercent),completedLessons:[...(o==null?void 0:o.completedLessons)||[],t]})),N(o=>o.map(x=>x.id===t?{...x,completed:!0}:x));const m=r.xpEarned||10;q({visible:!0,xp:m}),setTimeout(()=>q({visible:!1,xp:0}),3e3),r.nextLessonId?setTimeout(()=>d(`/learn/${n}/lesson/${r.nextLessonId}`),1500):M&&!le&&setTimeout(()=>d(`/learn/${n}/lesson/${M.id}`),1500)}catch(r){w(r.message||"Failed to mark lesson complete")}finally{y(!1)}}}function ve(r){Z(r),C("saving"),clearTimeout(p.current),p.current=setTimeout(()=>{C("saved")},1200)}async function ye(){if(T.trim()){C("saving");try{const r=await J.submitReflection(t,T);$(!0),C("saved"),r.xpEarned&&i(r.xpEarned)}catch(r){C(null),w(r.message||"Failed to submit reflection")}}}function se(r){S(r),V.current&&(V.current.playbackRate=r),j.current&&(j.current.playbackRate=r)}const je=c.useCallback(()=>{j.current&&j.current.pause()},[]);async function ke({score:r,passed:m,answers:o}){try{await J.submitQuiz(t,o,r)}catch{}m&&(q({visible:!0,xp:r===100?20:15}),setTimeout(()=>q({visible:!1,xp:0}),3e3))}function Q(r){d(`/learn/${n}/lesson/${r}`),A(!1)}if(_)return e.jsxs("div",{className:"page-loading",children:[e.jsx("div",{className:"spinner"}),e.jsx("p",{children:"Loading..."})]});if(z&&!s)return e.jsxs("div",{className:"portal-page",children:[e.jsx("button",{className:"btn btn--ghost btn--sm",onClick:()=>d(`/learn/${n}`),children:"← Back to Course"}),e.jsxs("div",{className:"card",style:{marginTop:"1rem",textAlign:"center",padding:"2rem"},children:[e.jsx("p",{style:{color:"var(--red)"},children:z}),e.jsx("button",{className:"btn btn--primary",onClick:ie,style:{marginTop:"1rem"},children:"Retry"})]})]});if(!s)return null;const W=s.contentType||"article",ze=W==="video",we=W==="audio"||W==="podcast",Ne=W==="meditation",qe=W==="article",ue=W==="mixed";return e.jsxs("div",{className:"lesson-player",children:[e.jsx("button",{className:"lesson-player__sidebar-toggle",onClick:()=>A(!F),"aria-label":"Toggle lesson navigation",children:e.jsx(Me,{})}),F&&e.jsx("div",{className:"lesson-sidebar__overlay",onClick:()=>A(!1)}),e.jsxs("aside",{className:`lesson-sidebar ${F?"lesson-sidebar--open":""}`,children:[e.jsx("div",{className:"lesson-sidebar__course-title",children:e.jsxs("button",{className:"btn btn--ghost btn--sm",onClick:()=>d(`/learn/${n}`),style:{width:"100%",textAlign:"left",justifyContent:"flex-start"},children:["← ",s.courseTitle||"Course"]})}),e.jsx("nav",{className:"lesson-sidebar__nav",children:ae.map(r=>{const m=!!ee[r.id];return e.jsxs("div",{className:"lesson-sidebar__module",children:[e.jsxs("button",{className:"lesson-sidebar__module-header",onClick:()=>O(o=>({...o,[r.id]:!o[r.id]})),children:[e.jsx(Re,{open:m}),e.jsx("span",{className:"lesson-sidebar__module-title",children:r.title})]}),m&&e.jsx("ul",{className:"lesson-sidebar__lessons",children:r.lessons.map(o=>{const x=o.id===t,P=fe(o.id),h=be(o);return e.jsxs("li",{className:["lesson-sidebar__lesson",x&&"lesson-sidebar__lesson--current",P&&"lesson-sidebar__lesson--completed",h&&"lesson-sidebar__lesson--locked"].filter(Boolean).join(" "),onClick:()=>{h||Q(o.id)},role:h?void 0:"button",tabIndex:h?-1:0,onKeyDown:G=>{!h&&(G.key==="Enter"||G.key===" ")&&(G.preventDefault(),Q(o.id))},children:[e.jsx("span",{className:"lesson-sidebar__lesson-icon",children:xe[o.contentType]||xe.article}),e.jsx("span",{className:"lesson-sidebar__lesson-title",children:o.title}),e.jsx("span",{className:"lesson-sidebar__lesson-meta",children:o.durationMinutes?Ae(o.durationMinutes):""}),e.jsxs("span",{className:"lesson-sidebar__lesson-status",children:[P&&e.jsx(ne,{size:14}),h&&e.jsx(Te,{})]})]},o.id)})})]},r.id)})}),e.jsxs("div",{className:"lesson-sidebar__progress",children:[e.jsxs("div",{className:"lesson-sidebar__progress-label",children:[e.jsx("span",{children:"Progress"}),e.jsxs("span",{children:[de,"%"]})]}),e.jsx("div",{className:"lesson-sidebar__progress-bar-track",children:e.jsx("div",{className:"lesson-sidebar__progress-bar-fill",style:{width:`${de}%`}})})]})]}),e.jsxs("main",{className:"lesson-content",children:[e.jsxs("div",{className:"lesson-topbar",children:[e.jsxs("div",{className:"lesson-topbar__breadcrumb",children:[e.jsx("button",{className:"btn btn--ghost btn--sm",onClick:()=>d(`/learn/${n}`),children:s.courseTitle||"Course"}),e.jsx("span",{className:"lesson-topbar__sep",children:"/"}),e.jsx("span",{className:"lesson-topbar__module",children:s.moduleTitle||"Module"}),e.jsx("span",{className:"lesson-topbar__sep",children:"/"}),e.jsx("span",{className:"lesson-topbar__current",children:s.title})]}),e.jsxs("div",{className:"lesson-topbar__progress",children:[e.jsxs("span",{className:"lesson-topbar__progress-text",children:["Lesson ",ce," of ",Y]}),e.jsx("div",{className:"lesson-topbar__progress-bar",children:e.jsx("div",{className:"lesson-topbar__progress-fill",style:{width:`${Y>0?ce/Y*100:0}%`}})})]}),e.jsxs("div",{className:"lesson-topbar__nav",children:[e.jsx("button",{className:"btn btn--outline btn--sm",disabled:!H,onClick:()=>H&&Q(H.id),children:"← Prev"}),e.jsx("button",{className:"btn btn--outline btn--sm",disabled:!M,onClick:()=>M&&Q(M.id),children:"Next →"})]})]}),e.jsx("h1",{className:"lesson-content__title",children:s.title}),z&&e.jsxs("div",{className:"lesson-content__error",children:[e.jsx("p",{children:z}),e.jsx("button",{className:"btn btn--ghost btn--sm",onClick:()=>w(null),children:"Dismiss"})]}),(ze||ue&&s.videoUrl)&&e.jsxs("div",{className:"video-section",children:[e.jsx("div",{className:"video-container",children:(()=>{const r=he(s.videoUrl),m=ge(s.videoUrl);return r?e.jsx("iframe",{src:`https://www.youtube.com/embed/${r}?rel=0`,title:s.title,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0}):m?e.jsx("iframe",{src:`https://player.vimeo.com/video/${m}?title=0&byline=0&portrait=0`,title:s.title,frameBorder:"0",allow:"autoplay; fullscreen; picture-in-picture",allowFullScreen:!0}):e.jsx("video",{ref:V,src:s.videoUrl,controls:!0,playsInline:!0,onLoadedMetadata:()=>{V.current&&(V.current.playbackRate=b)}})})()}),s.videoUrl&&!he(s.videoUrl)&&!ge(s.videoUrl)&&e.jsx(oe,{currentSpeed:b,onSpeedChange:se})]}),we&&s.audioUrl&&e.jsxs("div",{className:"audio-section",children:[e.jsxs("div",{className:"audio-player",children:[e.jsx("div",{className:"audio-player__waveform"}),e.jsx("audio",{ref:j,src:s.audioUrl,controls:!0,onLoadedMetadata:()=>{j.current&&(j.current.playbackRate=b)}})]}),e.jsx(oe,{currentSpeed:b,onSpeedChange:se})]}),Ne&&e.jsxs("div",{className:"audio-section audio-section--meditation",children:[e.jsx("div",{className:"meditation-ambient"}),s.audioUrl?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"audio-player",children:[e.jsx("div",{className:"audio-player__waveform"}),e.jsx("audio",{ref:j,src:s.audioUrl,controls:!0,onLoadedMetadata:()=>{j.current&&(j.current.playbackRate=b)}})]}),e.jsx(oe,{currentSpeed:b,onSpeedChange:se})]}):e.jsx("p",{style:{textAlign:"center",color:"var(--gray-500)",padding:"2rem",position:"relative",zIndex:1},children:"Meditation audio not yet available."}),e.jsx(De,{onTimerEnd:je})]}),qe&&s.writtenContent&&e.jsxs("div",{className:"article-section",children:[e.jsx("div",{className:"article-section__read-time",children:$e(s.writtenContent)}),e.jsx("div",{className:"article-content",children:s.writtenContent.split(`

`).map((r,m)=>e.jsx("p",{children:r},m))})]}),ue&&s.writtenContent&&e.jsx("div",{className:"article-section",children:e.jsx("div",{className:"article-content",children:s.writtenContent.split(`

`).map((r,m)=>e.jsx("p",{children:r},m))})}),s.attachments&&s.attachments.length>0&&e.jsxs("div",{className:"attachments-section",children:[e.jsx("h3",{className:"attachments-section__heading",children:"Attachments"}),e.jsx("ul",{className:"attachment-list",children:s.attachments.map((r,m)=>e.jsxs("li",{className:"attachment-item",children:[e.jsx("span",{className:"attachment-item__icon",children:e.jsx(Ee,{})}),e.jsx("span",{className:"attachment-item__name",children:r.name||r.filename}),r.size&&e.jsx("span",{className:"attachment-item__size",children:r.size}),e.jsxs("a",{href:r.url,download:!0,target:"_blank",rel:"noopener noreferrer",className:"btn btn--outline btn--sm attachment-item__download",children:[e.jsx(Pe,{})," Download"]})]},m))})]}),s.reflectionPrompt&&e.jsxs("div",{className:"reflection-section",children:[e.jsx("h3",{className:"reflection-section__heading",children:"Reflection Journal"}),e.jsx("p",{className:"reflection-section__prompt",children:s.reflectionPrompt}),e.jsx("textarea",{className:"reflection-box",placeholder:"Write your reflection...",value:T,onChange:r=>ve(r.target.value),disabled:U,rows:5}),e.jsxs("div",{className:"reflection-section__footer",children:[e.jsxs("span",{className:"reflection-section__save-status",children:[K==="saving"&&"Saving...",K==="saved"&&"Saved"]}),e.jsx("span",{className:"reflection-section__xp-hint",children:U&&u?`+${u} XP earned`:"+5 XP for completing your reflection"}),U?e.jsxs("span",{className:"reflection-section__submitted",children:[e.jsx(ne,{size:14})," Submitted"]}):e.jsx("button",{className:"btn btn--primary btn--sm",onClick:ye,disabled:!T.trim(),children:"Submit Reflection"})]})]}),s.quizEnabled&&R&&e.jsx(Ie,{lessonId:t,quizData:R,onQuizComplete:ke}),e.jsxs("div",{className:"placeholder-card",children:[e.jsx("h3",{children:"Discussion"}),e.jsx("p",{children:"Discussion coming soon -- Sprint 12"})]}),e.jsxs("div",{className:"lesson-bottom-actions",children:[e.jsx("div",{className:"lesson-bottom-actions__left",children:H&&e.jsx("button",{className:"btn btn--outline",onClick:()=>Q(H.id),children:"← Previous Lesson"})}),e.jsx("div",{className:"lesson-bottom-actions__center",children:L?e.jsxs("span",{className:"lesson-completed-badge",children:[e.jsx(ne,{size:18})," Completed"]}):e.jsx("button",{className:"btn btn--success",onClick:_e,disabled:l,children:l?"Marking...":"Mark Complete"})}),e.jsx("div",{className:"lesson-bottom-actions__right",children:le?e.jsx("button",{className:"btn btn--primary",onClick:()=>d(`/learn/${n}`),children:"Complete Course"}):M?e.jsx("button",{className:"btn btn--primary",onClick:()=>Q(M.id),children:"Next Lesson →"}):null})]}),e.jsx(Xe,{xp:I.xp,visible:I.visible})]}),e.jsx("style",{children:`
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
      `})]})}export{We as default};
