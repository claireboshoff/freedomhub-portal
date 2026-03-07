import{j as e,r as g,u as E,a as y}from"./index-h96dWn9f.js";const j=[{level:1,xp:0,title:"Newcomer"},{level:2,xp:100,title:"Explorer"},{level:3,xp:300,title:"Learner"},{level:4,xp:600,title:"Achiever"},{level:5,xp:1e3,title:"Rising Star"},{level:6,xp:1500,title:"Knowledge Seeker"},{level:7,xp:2500,title:"Trailblazer"},{level:8,xp:4e3,title:"Expert"},{level:9,xp:6e3,title:"Master"},{level:10,xp:1e4,title:"Legend"}];function B(a){const t=j.find(d=>d.level===a);return t?t.title:"Newcomer"}function $(a){const t=j.find(d=>d.level===a);return t?t.xp:0}function P(a){const t=j.find(d=>d.level===a+1);return t?t.xp:null}function D(a){const t=j.find(d=>d.level===a+1);return t?t.title:null}function V(a,t){const d=$(t),o=P(t);if(o===null)return 100;const l=o-d,n=a-d;return Math.min(100,Math.max(0,n/l*100))}function Y({streak:a=0,longestStreak:t=0,lastActive:d}){const o=new Date,l=d?new Date(d):null,n=l?Math.floor((o-l)/(1e3*60*60*24)):null,s=n===1,r=n===0,u=a>7,c=["M","T","W","T","F","S","S"],m=new Date;m.getDay();const h=[];for(let x=6;x>=0;x--){const p=new Date(m);p.setDate(p.getDate()-x);const v=p.getDay(),w=x,N=a>0&&w<a&&(r||s&&w>0);h.push({label:c[v===0?6:v-1],active:N})}const _=a===0?"Start your streak!":s?"Keep it going! Log in today.":"Keep it going!";return e.jsxs("div",{className:"streak-widget",children:[e.jsx("style",{children:`
        .streak-widget {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius);
          padding: 24px;
          box-shadow: var(--shadow);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          position: relative;
          overflow: hidden;
        }
        .streak-widget__top {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .streak-widget__flame {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .streak-widget__flame svg {
          filter: drop-shadow(0 2px 6px rgba(239, 68, 68, 0.3));
        }
        .streak-widget__count {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--charcoal);
          line-height: 1;
        }
        .streak-widget__count--glow {
          text-shadow: 0 0 12px rgba(197, 165, 90, 0.5), 0 0 24px rgba(197, 165, 90, 0.3);
          animation: streak-glow 2s ease-in-out infinite alternate;
        }
        @keyframes streak-glow {
          from { text-shadow: 0 0 8px rgba(197, 165, 90, 0.3), 0 0 16px rgba(197, 165, 90, 0.15); }
          to { text-shadow: 0 0 16px rgba(197, 165, 90, 0.6), 0 0 32px rgba(197, 165, 90, 0.3); }
        }
        .streak-widget__label {
          font-size: 0.875rem;
          color: var(--gray-500);
          font-weight: 500;
        }
        .streak-widget__info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }
        .streak-widget__longest {
          font-size: 0.75rem;
          color: var(--gray-400);
        }
        .streak-widget__heatmap {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .streak-widget__day {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .streak-widget__day-label {
          font-size: 0.625rem;
          color: var(--gray-400);
          font-weight: 600;
          text-transform: uppercase;
        }
        .streak-widget__dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--gray-200);
          transition: background 0.3s, box-shadow 0.3s;
        }
        .streak-widget__dot--active {
          background: var(--gold);
          box-shadow: 0 0 6px rgba(197, 165, 90, 0.4);
        }
        .streak-widget__status {
          font-size: 0.8125rem;
          font-weight: 500;
        }
        .streak-widget__status--ok {
          color: var(--green);
        }
        .streak-widget__status--risk {
          color: var(--amber, #f59e0b);
        }
        .streak-widget__status--start {
          color: var(--gray-500);
        }
      `}),e.jsxs("div",{className:"streak-widget__top",children:[e.jsx("div",{className:"streak-widget__flame",children:e.jsxs("svg",{width:"40",height:"40",viewBox:"0 0 24 24",fill:"none",children:[e.jsx("path",{d:"M12 2C8 7 4 10 4 14a8 8 0 0 0 16 0c0-4-4-7-8-12z",fill:a>0?"#ef4444":"#d1d5db",stroke:a>0?"#dc2626":"#9ca3af",strokeWidth:"1.5"}),e.jsx("path",{d:"M12 9c-1.5 2.5-3 4-3 6a3 3 0 0 0 6 0c0-2-1.5-3.5-3-6z",fill:a>0?"#fbbf24":"#e5e7eb",stroke:"none"})]})}),e.jsxs("div",{className:"streak-widget__info",children:[e.jsx("div",{className:`streak-widget__count${u?" streak-widget__count--glow":""}`,children:a}),e.jsxs("div",{className:"streak-widget__label",children:["day",a!==1?"s":""," streak"]}),e.jsxs("div",{className:"streak-widget__longest",children:["Longest: ",t," day",t!==1?"s":""]})]})]}),e.jsx("div",{className:"streak-widget__heatmap",children:h.map((x,p)=>e.jsxs("div",{className:"streak-widget__day",children:[e.jsx("span",{className:"streak-widget__day-label",children:x.label}),e.jsx("div",{className:`streak-widget__dot${x.active?" streak-widget__dot--active":""}`})]},p))}),e.jsx("div",{className:`streak-widget__status ${a===0?"streak-widget__status--start":s?"streak-widget__status--risk":"streak-widget__status--ok"}`,children:_})]})}function H({xp:a=0,level:t=1}){const[d,o]=g.useState(0),l=V(a,t),n=B(t),s=D(t),r=P(t);$(t);const u=r===null;g.useEffect(()=>{const p=setTimeout(()=>o(l),100);return()=>clearTimeout(p)},[l]);const c=140,m=10,h=(c-m)/2,_=2*Math.PI*h,x=_-d/100*_;return e.jsxs("div",{className:"xp-widget",children:[e.jsx("style",{children:`
        .xp-widget {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius);
          padding: 24px;
          box-shadow: var(--shadow);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .xp-widget__ring-container {
          position: relative;
          width: ${c}px;
          height: ${c}px;
        }
        .xp-widget__ring-bg {
          fill: none;
          stroke: var(--gray-200);
          stroke-width: ${m};
        }
        .xp-widget__ring-fill {
          fill: none;
          stroke: var(--gold);
          stroke-width: ${m};
          stroke-linecap: round;
          transform: rotate(-90deg);
          transform-origin: center;
          transition: stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          filter: drop-shadow(0 0 4px rgba(197, 165, 90, 0.3));
        }
        .xp-widget__ring-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }
        .xp-widget__level-num {
          font-family: var(--font-heading);
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--charcoal);
          line-height: 1;
        }
        .xp-widget__level-title {
          font-size: 0.6875rem;
          color: var(--gold-dark);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .xp-widget__xp-count {
          font-family: var(--font-heading);
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--charcoal);
        }
        .xp-widget__xp-count span {
          color: var(--gray-400);
          font-weight: 400;
        }
        .xp-widget__next {
          font-size: 0.75rem;
          color: var(--gray-400);
        }
      `}),e.jsxs("div",{className:"xp-widget__ring-container",children:[e.jsxs("svg",{width:c,height:c,children:[e.jsx("circle",{className:"xp-widget__ring-bg",cx:c/2,cy:c/2,r:h}),e.jsx("circle",{className:"xp-widget__ring-fill",cx:c/2,cy:c/2,r:h,strokeDasharray:_,strokeDashoffset:x})]}),e.jsxs("div",{className:"xp-widget__ring-text",children:[e.jsxs("div",{className:"xp-widget__level-num",children:["Lv ",t]}),e.jsx("div",{className:"xp-widget__level-title",children:n})]})]}),e.jsxs("div",{className:"xp-widget__xp-count",children:[a.toLocaleString()," ",e.jsxs("span",{children:["/ ",u?"MAX":r.toLocaleString()," XP"]})]}),!u&&s&&e.jsxs("div",{className:"xp-widget__next",children:["Next: ",s]}),u&&e.jsx("div",{className:"xp-widget__next",style:{color:"var(--gold)"},children:"Maximum level reached"})]})}const M=[{id:"first-steps",name:"First Steps",criteria:"Complete your first lesson",icon:a=>e.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M4 16c0 0 2-2 4-2s4 4 4 4"}),e.jsx("path",{d:"M12 16c0 0 2-2 4-2s4 4 4 4"}),e.jsx("circle",{cx:"8",cy:"8",r:"2",fill:a,opacity:"0.3"}),e.jsx("circle",{cx:"16",cy:"6",r:"2",fill:a,opacity:"0.3"})]})},{id:"quiz-whiz",name:"Quiz Whiz",criteria:"Score 100% on any quiz",icon:a=>e.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M13 2L3 14h9l-1 8 10-12h-9l1-8z",fill:a,opacity:"0.2"}),e.jsx("path",{d:"M13 2L3 14h9l-1 8 10-12h-9l1-8z"})]})},{id:"week-warrior",name:"Week Warrior",criteria:"Achieve a 7-day streak",icon:a=>e.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M12 2C8 7 4 10 4 14a8 8 0 0 0 16 0c0-4-4-7-8-12z",fill:a,opacity:"0.2"}),e.jsx("path",{d:"M12 2C8 7 4 10 4 14a8 8 0 0 0 16 0c0-4-4-7-8-12z"})]})},{id:"month-master",name:"Month Master",criteria:"Achieve a 30-day streak",icon:a=>e.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M12 2C8 7 4 10 4 14a8 8 0 0 0 16 0c0-4-4-7-8-12z",fill:a,opacity:"0.15"}),e.jsx("path",{d:"M12 2C8 7 4 10 4 14a8 8 0 0 0 16 0c0-4-4-7-8-12z"}),e.jsx("path",{d:"M12 9c-1.5 2.5-3 4-3 6a3 3 0 0 0 6 0c0-2-1.5-3.5-3-6z",fill:a,opacity:"0.3"})]})},{id:"century",name:"Century",criteria:"Achieve a 100-day streak",icon:a=>e.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z",fill:a,opacity:"0.2"}),e.jsx("path",{d:"M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"})]})},{id:"course-complete",name:"Course Complete",criteria:"Finish any course",icon:a=>e.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z",fill:a,opacity:"0.2"}),e.jsx("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}),e.jsx("line",{x1:"4",y1:"22",x2:"4",y2:"15"})]})},{id:"quest-conqueror",name:"Quest Conqueror",criteria:"Complete a quest",icon:a=>e.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"}),e.jsx("polyline",{points:"14 2 14 8 20 8"}),e.jsx("path",{d:"M9 15l2 2 4-4",stroke:a,strokeWidth:"2"})]})},{id:"top-10",name:"Top 10",criteria:"Reach top 10 on the leaderboard",icon:a=>e.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6"}),e.jsx("path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18"}),e.jsx("path",{d:"M4 22h16"}),e.jsx("path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"}),e.jsx("path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"}),e.jsx("path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",fill:a,opacity:"0.2"})]})},{id:"helpful-hand",name:"Helpful Hand",criteria:"10 community replies",icon:a=>e.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M18 11V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3"}),e.jsx("path",{d:"M15 13h6a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3l-3 3v-3h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2z",fill:a,opacity:"0.15"})]})},{id:"thought-leader",name:"Thought Leader",criteria:"5 posts with 3+ likes",icon:a=>e.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M12 2a7 7 0 0 0-7 7c0 3 2 5.5 4.5 7.5L12 19l2.5-2.5C17 14.5 19 12 19 9a7 7 0 0 0-7-7z",fill:a,opacity:"0.15"}),e.jsx("circle",{cx:"12",cy:"9",r:"3"}),e.jsx("path",{d:"M12 19v3"}),e.jsx("path",{d:"M8 22h8"})]})},{id:"bookworm",name:"Bookworm",criteria:"Complete 5 courses",icon:a=>e.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M4 19.5A2.5 2.5 0 0 1 6.5 17H20"}),e.jsx("path",{d:"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z",fill:a,opacity:"0.15"}),e.jsx("line",{x1:"8",y1:"7",x2:"16",y2:"7"}),e.jsx("line",{x1:"8",y1:"11",x2:"14",y2:"11"})]})},{id:"deep-thinker",name:"Deep Thinker",criteria:"Submit 20 reflections",icon:a=>e.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"}),e.jsx("path",{d:"M15 5l4 4"})]})},{id:"live-wire",name:"Live Wire",criteria:"Attend 5 live sessions",icon:a=>e.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"2",fill:a,opacity:"0.4"}),e.jsx("path",{d:"M16.24 7.76a6 6 0 0 1 0 8.49"}),e.jsx("path",{d:"M7.76 16.24a6 6 0 0 1 0-8.49"}),e.jsx("path",{d:"M19.07 4.93a10 10 0 0 1 0 14.14"}),e.jsx("path",{d:"M4.93 19.07a10 10 0 0 1 0-14.14"})]})},{id:"certified-pro",name:"Certified Pro",criteria:"Earn 3 certificates",icon:a=>e.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"8",r:"6",fill:a,opacity:"0.15"}),e.jsx("circle",{cx:"12",cy:"8",r:"6"}),e.jsx("path",{d:"M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"})]})}];function I({earnedBadges:a=[]}){const[t,d]=g.useState(null),o=new Set(a.map(n=>{var s;return n.id||n.badgeId||((s=n.name)==null?void 0:s.toLowerCase().replace(/\s+/g,"-"))})),l=M.filter(n=>o.has(n.id)).length;return e.jsxs("div",{className:"badge-grid-widget",children:[e.jsx("style",{children:`
        .badge-grid-widget {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius);
          padding: 24px;
          box-shadow: var(--shadow);
        }
        .badge-grid-widget__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .badge-grid-widget__title {
          font-family: var(--font-heading);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--charcoal);
        }
        .badge-grid-widget__count {
          font-size: 0.8125rem;
          color: var(--gray-500);
          font-weight: 500;
        }
        .badge-grid-widget__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          gap: 16px;
        }
        .badge-grid-widget__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          padding: 8px 4px;
          border-radius: 8px;
          transition: background 0.2s;
          position: relative;
        }
        .badge-grid-widget__item:hover {
          background: var(--gray-50);
        }
        .badge-grid-widget__icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: transform 0.2s;
        }
        .badge-grid-widget__item:hover .badge-grid-widget__icon-wrap {
          transform: scale(1.1);
        }
        .badge-grid-widget__icon-wrap--earned {
          background: linear-gradient(135deg, rgba(197,165,90,0.1), rgba(197,165,90,0.05));
          border: 2px solid var(--gold);
          box-shadow: 0 0 8px rgba(197,165,90,0.2);
        }
        .badge-grid-widget__icon-wrap--locked {
          background: var(--gray-100);
          border: 2px solid var(--gray-200);
          opacity: 0.5;
        }
        .badge-grid-widget__lock {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 18px;
          height: 18px;
          background: var(--gray-300);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .badge-grid-widget__name {
          font-size: 0.6875rem;
          font-weight: 500;
          text-align: center;
          line-height: 1.2;
          max-width: 80px;
        }
        .badge-grid-widget__name--earned {
          color: var(--charcoal);
        }
        .badge-grid-widget__name--locked {
          color: var(--gray-400);
        }
        /* Tooltip / detail overlay */
        .badge-grid-widget__overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: badge-overlay-in 0.2s ease;
        }
        @keyframes badge-overlay-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .badge-grid-widget__detail {
          background: var(--white);
          border-radius: var(--radius);
          padding: 32px;
          max-width: 320px;
          width: 90%;
          text-align: center;
          box-shadow: var(--shadow-lg);
          animation: badge-detail-in 0.25s ease;
        }
        @keyframes badge-detail-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .badge-grid-widget__detail-icon {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }
        .badge-grid-widget__detail-icon--earned {
          background: linear-gradient(135deg, rgba(197,165,90,0.15), rgba(197,165,90,0.05));
          border: 3px solid var(--gold);
        }
        .badge-grid-widget__detail-icon--locked {
          background: var(--gray-100);
          border: 3px solid var(--gray-200);
        }
        .badge-grid-widget__detail-icon svg {
          width: 36px;
          height: 36px;
        }
        .badge-grid-widget__detail-name {
          font-family: var(--font-heading);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--charcoal);
          margin-bottom: 8px;
        }
        .badge-grid-widget__detail-status {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        .badge-grid-widget__detail-status--earned {
          color: var(--gold);
        }
        .badge-grid-widget__detail-status--locked {
          color: var(--gray-400);
        }
        .badge-grid-widget__detail-criteria {
          font-size: 0.875rem;
          color: var(--gray-500);
          margin-bottom: 20px;
        }
        .badge-grid-widget__detail-close {
          background: var(--gray-100);
          border: none;
          border-radius: 6px;
          padding: 8px 24px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--charcoal);
          cursor: pointer;
          font-family: var(--font-body);
          transition: background 0.2s;
        }
        .badge-grid-widget__detail-close:hover {
          background: var(--gray-200);
        }
      `}),e.jsxs("div",{className:"badge-grid-widget__header",children:[e.jsx("h3",{className:"badge-grid-widget__title",children:"Badges"}),e.jsxs("span",{className:"badge-grid-widget__count",children:[l," of ",M.length," earned"]})]}),e.jsx("div",{className:"badge-grid-widget__grid",children:M.map(n=>{const s=o.has(n.id),r=s?"#c5a55a":"#9ca3af";return e.jsxs("div",{className:"badge-grid-widget__item",onClick:()=>d(n),children:[e.jsxs("div",{className:`badge-grid-widget__icon-wrap ${s?"badge-grid-widget__icon-wrap--earned":"badge-grid-widget__icon-wrap--locked"}`,children:[n.icon(r),!s&&e.jsx("div",{className:"badge-grid-widget__lock",children:e.jsxs("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"#6b7280",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"}),e.jsx("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]})})]}),e.jsx("span",{className:`badge-grid-widget__name ${s?"badge-grid-widget__name--earned":"badge-grid-widget__name--locked"}`,children:n.name})]},n.id)})}),t&&e.jsx("div",{className:"badge-grid-widget__overlay",onClick:()=>d(null),children:e.jsxs("div",{className:"badge-grid-widget__detail",onClick:n=>n.stopPropagation(),children:[e.jsx("div",{className:`badge-grid-widget__detail-icon ${o.has(t.id)?"badge-grid-widget__detail-icon--earned":"badge-grid-widget__detail-icon--locked"}`,children:t.icon(o.has(t.id)?"#c5a55a":"#9ca3af")}),e.jsx("div",{className:"badge-grid-widget__detail-name",children:t.name}),e.jsx("div",{className:`badge-grid-widget__detail-status ${o.has(t.id)?"badge-grid-widget__detail-status--earned":"badge-grid-widget__detail-status--locked"}`,children:o.has(t.id)?"Earned":"Locked"}),e.jsx("div",{className:"badge-grid-widget__detail-criteria",children:t.criteria}),e.jsx("button",{className:"badge-grid-widget__detail-close",onClick:()=>d(null),children:"Close"})]})})]})}function F({level:a,previousLevel:t}){const[d,o]=g.useState(!1);if(g.useEffect(()=>{if(!a||!t||a<=t)return;const s=`levelup_shown_${a}`;if(sessionStorage.getItem(s))return;const r=setTimeout(()=>{o(!0),sessionStorage.setItem(s,"true")},600);return()=>clearTimeout(r)},[a,t]),!d)return null;const l=B(a),n=Array.from({length:40},(s,r)=>({id:r,left:Math.random()*100,delay:Math.random()*1.5,duration:2+Math.random()*2,size:4+Math.random()*6,color:["#c5a55a","#d4b96e","#ef4444","#8b5cf6","#10b981","#0ea5e9","#f59e0b"][r%7],rotation:Math.random()*360}));return e.jsxs("div",{className:"levelup-modal__overlay",children:[e.jsx("style",{children:`
        .levelup-modal__overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          animation: levelup-overlay-in 0.3s ease;
        }
        @keyframes levelup-overlay-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .levelup-modal__confetti-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .levelup-modal__confetti {
          position: absolute;
          top: -10px;
          border-radius: 2px;
          animation: levelup-confetti-fall linear forwards;
          opacity: 0;
        }
        @keyframes levelup-confetti-fall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .levelup-modal__card {
          background: var(--white);
          border-radius: 16px;
          padding: 48px 40px;
          max-width: 400px;
          width: 90%;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          position: relative;
          z-index: 1;
          animation: levelup-card-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes levelup-card-in {
          from { transform: scale(0.5) translateY(40px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
        .levelup-modal__star {
          margin-bottom: 16px;
          animation: levelup-star-pulse 1.5s ease-in-out infinite alternate;
        }
        @keyframes levelup-star-pulse {
          from { transform: scale(1); filter: drop-shadow(0 0 8px rgba(197,165,90,0.4)); }
          to { transform: scale(1.1); filter: drop-shadow(0 0 16px rgba(197,165,90,0.6)); }
        }
        .levelup-modal__heading {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--gold), var(--gold-dark));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }
        .levelup-modal__level {
          font-family: var(--font-heading);
          font-size: 3rem;
          font-weight: 700;
          color: var(--charcoal);
          line-height: 1;
          margin-bottom: 4px;
        }
        .levelup-modal__title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--gold-dark);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 20px;
        }
        .levelup-modal__message {
          font-size: 0.9375rem;
          color: var(--gray-500);
          margin-bottom: 28px;
          line-height: 1.5;
        }
        .levelup-modal__btn {
          background: linear-gradient(135deg, var(--gold), var(--gold-dark));
          color: var(--white);
          border: none;
          border-radius: 8px;
          padding: 12px 40px;
          font-size: 1rem;
          font-weight: 600;
          font-family: var(--font-body);
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .levelup-modal__btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(197, 165, 90, 0.4);
        }
      `}),e.jsx("div",{className:"levelup-modal__confetti-container",children:n.map(s=>e.jsx("div",{className:"levelup-modal__confetti",style:{left:`${s.left}%`,width:`${s.size}px`,height:`${s.size*1.5}px`,background:s.color,animationDelay:`${s.delay}s`,animationDuration:`${s.duration}s`,transform:`rotate(${s.rotation}deg)`}},s.id))}),e.jsxs("div",{className:"levelup-modal__card",children:[e.jsx("div",{className:"levelup-modal__star",children:e.jsx("svg",{width:"56",height:"56",viewBox:"0 0 24 24",fill:"none",children:e.jsx("path",{d:"M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z",fill:"#c5a55a",stroke:"#a88d44",strokeWidth:"1"})})}),e.jsx("div",{className:"levelup-modal__heading",children:"Level Up!"}),e.jsx("div",{className:"levelup-modal__level",children:a}),e.jsx("div",{className:"levelup-modal__title",children:l}),e.jsxs("div",{className:"levelup-modal__message",children:["You have reached Level ",a,". Keep learning and earning XP to unlock new achievements."]}),e.jsx("button",{className:"levelup-modal__btn",onClick:()=>o(!1),children:"Continue"})]})]})}const R={course:"#C5A55A",quest:"#8b5cf6",challenge:"#ef4444","meditation series":"#10b981","podcast series":"#0ea5e9"},X={1:e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",children:[e.jsx("circle",{cx:"12",cy:"8",r:"6",fill:"#c5a55a",stroke:"#a88d44",strokeWidth:"1"}),e.jsx("path",{d:"M15.477 12.89L17 22l-5-3-5 3 1.523-9.11",fill:"#c5a55a",stroke:"#a88d44",strokeWidth:"1"}),e.jsx("text",{x:"12",y:"10.5",textAnchor:"middle",fill:"white",fontSize:"7",fontWeight:"bold",fontFamily:"sans-serif",children:"1"})]}),2:e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",children:[e.jsx("circle",{cx:"12",cy:"8",r:"6",fill:"#9ca3af",stroke:"#6b7280",strokeWidth:"1"}),e.jsx("path",{d:"M15.477 12.89L17 22l-5-3-5 3 1.523-9.11",fill:"#9ca3af",stroke:"#6b7280",strokeWidth:"1"}),e.jsx("text",{x:"12",y:"10.5",textAnchor:"middle",fill:"white",fontSize:"7",fontWeight:"bold",fontFamily:"sans-serif",children:"2"})]}),3:e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",children:[e.jsx("circle",{cx:"12",cy:"8",r:"6",fill:"#b45309",stroke:"#92400e",strokeWidth:"1"}),e.jsx("path",{d:"M15.477 12.89L17 22l-5-3-5 3 1.523-9.11",fill:"#b45309",stroke:"#92400e",strokeWidth:"1"}),e.jsx("text",{x:"12",y:"10.5",textAnchor:"middle",fill:"white",fontSize:"7",fontWeight:"bold",fontFamily:"sans-serif",children:"3"})]})};function A({course:a,enrolled:t,onClick:d}){const o=(a.type||"course").toLowerCase(),l=R[o]||"#C5A55A";return e.jsxs("div",{className:"card course-card",onClick:d,style:{cursor:"pointer"},children:[e.jsxs("div",{className:"course-card__thumbnail",children:[a.thumbnail?e.jsx("img",{src:a.thumbnail,alt:a.title}):e.jsx("div",{className:"course-card__placeholder"}),e.jsx("span",{className:"course-card__type-pill",style:{background:l},children:a.type||"Course"})]}),e.jsxs("div",{className:"card__body course-card__body",children:[e.jsx("h4",{className:"course-card__title",children:a.title}),a.category&&e.jsx("span",{className:"course-card__category",children:a.category}),e.jsxs("div",{className:"course-card__meta",children:[a.lessonCount!=null&&e.jsxs("span",{children:[a.lessonCount," lesson",a.lessonCount!==1?"s":""]}),a.estimatedDuration&&e.jsx("span",{children:a.estimatedDuration})]}),t?e.jsxs("div",{className:"course-card__progress",children:[e.jsx("div",{className:"progress-bar progress-bar--sm",children:e.jsx("div",{className:"progress-bar__fill",style:{width:`${t.progressPercent||0}%`}})}),e.jsxs("span",{className:"course-card__progress-text",children:[t.progressPercent||0,"%"]})]}):e.jsx("div",{className:"course-card__price",children:a.price&&a.price>0?e.jsxs("span",{className:"course-card__price-badge",children:["R",a.price.toLocaleString(),a.priceUsd?` / $${a.priceUsd}`:""]}):e.jsx("span",{className:"course-card__price-badge course-card__price-badge--free",children:"Free"})})]})]})}function K(){const a=E(),[t,d]=g.useState(!0),[o,l]=g.useState([]),[n,s]=g.useState([]),[r,u]=g.useState(null),[c,m]=g.useState([]),[h,_]=g.useState(null),[x,p]=g.useState(null);if(g.useEffect(()=>{const i=sessionStorage.getItem("academy_known_level");i&&p(parseInt(i,10)),Promise.all([y.myEnrollments().catch(()=>({enrollments:[]})),y.coursesPublished().catch(()=>({courses:[]})),y.myProgress().catch(()=>({xp:0,streak:0,longestStreak:0,level:1,badges:[],lastActive:null})),y.leaderboard().catch(()=>({leaderboard:[],userRank:null}))]).then(([k,z,f,b])=>{l(k.enrollments||[]),s(z.courses||[]),u(f),m(b.leaderboard||[]),_(b.userRank);const q=(f==null?void 0:f.level)||1;i||p(q),sessionStorage.setItem("academy_known_level",String(q)),d(!1)})},[]),t)return e.jsxs("div",{className:"page-loading",children:[e.jsx("div",{className:"spinner"}),e.jsx("p",{children:"Loading your academy..."})]});const v=(r==null?void 0:r.xp)||0,w=(r==null?void 0:r.streak)||0,N=(r==null?void 0:r.longestStreak)||0,L=(r==null?void 0:r.level)||1,C=(r==null?void 0:r.badges)||[],T=(r==null?void 0:r.lastActive)||null,S=n.filter(i=>i.featured),W={};return o.forEach(i=>{W[i.courseId]=i}),e.jsxs("div",{className:"academy-page",children:[e.jsx("style",{children:`
        .academy-progress-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 24px;
        }
        @media (max-width: 640px) {
          .academy-progress-row {
            grid-template-columns: 1fr;
          }
        }
        .academy-quick-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 12px;
          margin-bottom: 24px;
        }
        .academy-quick-stat {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius-sm);
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: var(--shadow-sm);
          transition: transform var(--transition), box-shadow var(--transition);
        }
        .academy-quick-stat:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow);
        }
        .academy-quick-stat--clickable {
          cursor: pointer;
        }
        .academy-quick-stat__icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .academy-quick-stat__text {
          display: flex;
          flex-direction: column;
        }
        .academy-quick-stat__value {
          font-family: var(--font-heading);
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--charcoal);
          line-height: 1.2;
        }
        .academy-quick-stat__label {
          font-size: 0.75rem;
          color: var(--gray-500);
        }

        /* Enhanced leaderboard */
        .leaderboard-enhanced {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          overflow: hidden;
        }
        .leaderboard-enhanced__header {
          padding: 16px 20px;
          border-bottom: 1px solid var(--gray-100);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .leaderboard-enhanced__header h3 {
          font-family: var(--font-heading);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--charcoal);
          margin: 0;
        }
        .leaderboard-enhanced__body {
          padding: 8px 0;
        }
        .leaderboard-enhanced__row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 20px;
          transition: background 0.15s;
        }
        .leaderboard-enhanced__row:hover {
          background: var(--gray-50);
        }
        .leaderboard-enhanced__row--you {
          background: rgba(197, 165, 90, 0.06);
        }
        .leaderboard-enhanced__rank {
          width: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .leaderboard-enhanced__rank-text {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--gray-400);
        }
        .leaderboard-enhanced__avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--white);
          flex-shrink: 0;
        }
        .leaderboard-enhanced__name {
          flex: 1;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--charcoal);
        }
        .leaderboard-enhanced__xp {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--gold-dark);
          white-space: nowrap;
        }
        .leaderboard-enhanced__level {
          font-size: 0.6875rem;
          color: var(--gray-400);
          white-space: nowrap;
          min-width: 40px;
          text-align: right;
        }
        .leaderboard-enhanced__divider {
          text-align: center;
          padding: 4px 0;
          color: var(--gray-300);
          font-size: 0.75rem;
        }
        .leaderboard-enhanced__empty {
          padding: 24px 20px;
          text-align: center;
          color: var(--gray-400);
          font-size: 0.875rem;
        }

        /* Bottom grid for leaderboard + badges side by side */
        .academy-bottom-grid-v2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 24px;
        }
        @media (max-width: 768px) {
          .academy-bottom-grid-v2 {
            grid-template-columns: 1fr;
          }
        }
      `}),e.jsxs("div",{className:"page-header",children:[e.jsx("h2",{children:"Academy"}),e.jsx("p",{className:"page-subtitle",children:"Learn, grow, and level up. Courses, quests, and challenges built for your journey."})]}),e.jsx(F,{level:L,previousLevel:x}),e.jsxs("div",{className:"academy-progress-row",children:[e.jsx(Y,{streak:w,longestStreak:N,lastActive:T}),e.jsx(H,{xp:v,level:L})]}),e.jsxs("div",{className:"academy-quick-stats",children:[e.jsxs("div",{className:"academy-quick-stat",children:[e.jsx("div",{className:"academy-quick-stat__icon",style:{background:"rgba(197,165,90,0.1)"},children:e.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"#c5a55a",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"})})}),e.jsxs("div",{className:"academy-quick-stat__text",children:[e.jsx("div",{className:"academy-quick-stat__value",children:v.toLocaleString()}),e.jsx("div",{className:"academy-quick-stat__label",children:"Total XP"})]})]}),e.jsxs("div",{className:"academy-quick-stat",children:[e.jsx("div",{className:"academy-quick-stat__icon",style:{background:"rgba(139,92,246,0.1)"},children:e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"#8b5cf6",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"}),e.jsx("path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"})]})}),e.jsxs("div",{className:"academy-quick-stat__text",children:[e.jsx("div",{className:"academy-quick-stat__value",children:o.length}),e.jsx("div",{className:"academy-quick-stat__label",children:"Enrolled"})]})]}),e.jsxs("div",{className:"academy-quick-stat",children:[e.jsx("div",{className:"academy-quick-stat__icon",style:{background:"rgba(16,185,129,0.1)"},children:e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"#10b981",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),e.jsx("polyline",{points:"22 4 12 14.01 9 11.01"})]})}),e.jsxs("div",{className:"academy-quick-stat__text",children:[e.jsx("div",{className:"academy-quick-stat__value",children:C.length}),e.jsx("div",{className:"academy-quick-stat__label",children:"Badges"})]})]}),e.jsxs("div",{className:"academy-quick-stat academy-quick-stat--clickable",onClick:()=>a("/learn/certificates"),children:[e.jsx("div",{className:"academy-quick-stat__icon",style:{background:"rgba(197,165,90,0.1)"},children:e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"#c5a55a",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"8",r:"6"}),e.jsx("path",{d:"M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"})]})}),e.jsxs("div",{className:"academy-quick-stat__text",children:[e.jsx("div",{className:"academy-quick-stat__value",style:{color:"var(--gold)",fontSize:"0.875rem"},children:"View All"}),e.jsx("div",{className:"academy-quick-stat__label",children:"Certificates"})]})]})]}),o.length>0&&e.jsxs("div",{className:"academy-section",children:[e.jsxs("div",{className:"academy-section__header",children:[e.jsx("h3",{children:"Continue Learning"}),e.jsx("button",{className:"btn btn--ghost btn--sm",onClick:()=>a("/learn/browse"),children:"Browse All"})]}),e.jsx("div",{className:"course-grid",children:o.map(i=>e.jsx(A,{course:{id:i.courseId,title:i.courseTitle,thumbnail:i.courseThumbnail,slug:i.courseSlug,type:"course"},enrolled:i,onClick:()=>a(`/learn/${i.courseSlug}`)},i.courseId))})]}),e.jsxs("div",{className:"academy-section",children:[e.jsxs("div",{className:"academy-section__header",children:[e.jsx("h3",{children:"Featured Courses"}),e.jsx("button",{className:"btn btn--ghost btn--sm",onClick:()=>a("/learn/browse"),children:"View All"})]}),S.length>0?e.jsx("div",{className:"course-grid",children:S.map(i=>e.jsx(A,{course:i,enrolled:W[i.id],onClick:()=>a(`/learn/${i.slug}`)},i.id))}):e.jsx("div",{className:"empty-state",children:e.jsx("p",{children:"No featured courses yet. Check back soon."})})]}),e.jsxs("div",{className:"academy-bottom-grid-v2",children:[e.jsxs("div",{className:"leaderboard-enhanced",children:[e.jsxs("div",{className:"leaderboard-enhanced__header",children:[e.jsx("h3",{children:"Leaderboard"}),h&&e.jsxs("span",{style:{fontSize:"0.75rem",color:"var(--gray-400)"},children:["Your rank: #",h]})]}),e.jsx("div",{className:"leaderboard-enhanced__body",children:c.length>0?e.jsxs(e.Fragment,{children:[c.slice(0,10).map(i=>{const k=["#c5a55a","#8b5cf6","#ef4444","#10b981","#0ea5e9","#f59e0b","#6366f1"],z=k[(i.rank-1)%k.length],f=(i.name||"?").charAt(0).toUpperCase(),b=i.isCurrentUser;return e.jsxs("div",{className:`leaderboard-enhanced__row${b?" leaderboard-enhanced__row--you":""}`,children:[e.jsx("div",{className:"leaderboard-enhanced__rank",children:X[i.rank]||e.jsxs("span",{className:"leaderboard-enhanced__rank-text",children:["#",i.rank]})}),e.jsx("div",{className:"leaderboard-enhanced__avatar",style:{background:z},children:f}),e.jsxs("span",{className:"leaderboard-enhanced__name",children:[i.name,b?" (You)":""]}),e.jsxs("span",{className:"leaderboard-enhanced__xp",children:[i.xp.toLocaleString()," XP"]}),e.jsxs("span",{className:"leaderboard-enhanced__level",children:["Lv ",i.level]})]},i.rank)}),h&&h>10&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"leaderboard-enhanced__divider",children:"..."}),e.jsxs("div",{className:"leaderboard-enhanced__row leaderboard-enhanced__row--you",children:[e.jsx("div",{className:"leaderboard-enhanced__rank",children:e.jsxs("span",{className:"leaderboard-enhanced__rank-text",children:["#",h]})}),e.jsx("div",{className:"leaderboard-enhanced__avatar",style:{background:"#c5a55a"},children:"Y"}),e.jsx("span",{className:"leaderboard-enhanced__name",children:"You"}),e.jsxs("span",{className:"leaderboard-enhanced__xp",children:[v.toLocaleString()," XP"]}),e.jsxs("span",{className:"leaderboard-enhanced__level",children:["Lv ",L]})]})]})]}):e.jsx("div",{className:"leaderboard-enhanced__empty",children:"No leaderboard data yet. Start learning to climb the ranks."})})]}),e.jsx(I,{earnedBadges:C})]})]})}export{K as default};
