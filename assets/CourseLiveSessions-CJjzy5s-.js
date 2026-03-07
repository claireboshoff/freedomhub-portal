import{b as w,u as N,r as p,a as y,j as e}from"./index-D6dyrzHb.js";function k(s){const a=new Date,o=new Date(s)-a;if(o<=0)return null;const n=Math.floor(o/(1e3*60*60*24)),c=Math.floor(o%(1e3*60*60*24)/(1e3*60*60)),d=Math.floor(o%(1e3*60*60)/(1e3*60));return n>0?`${n}d ${c}h`:c>0?`${c}h ${d}m`:`${d}m`}function D(s){return new Date(s)-new Date<=15*60*1e3}function S(s){return new Date(s).toLocaleDateString("en-ZA",{weekday:"short",day:"numeric",month:"short",year:"numeric"})}function C(s){return new Date(s).toLocaleTimeString("en-ZA",{hour:"2-digit",minute:"2-digit"})}function $(s){if(!s)return"";if(s<60)return`${s} min`;const a=Math.floor(s/60),t=s%60;return t>0?`${a}h ${t}m`:`${a}h`}function v(s){if(s.status==="cancelled")return"cancelled";if(s.status==="live")return"live";if(s.status==="completed")return"completed";const a=new Date,t=new Date(s.dateTime),o=new Date(t.getTime()+(s.durationMinutes||60)*60*1e3);return a>=t&&a<=o?"live":a>o?"completed":"scheduled"}const j=()=>e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("polygon",{points:"23 7 16 12 23 17 23 7"}),e.jsx("rect",{x:"1",y:"5",width:"15",height:"14",rx:"2",ry:"2"})]}),L=()=>e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("polygon",{points:"10 8 16 12 10 16 10 8"})]}),T=()=>e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),e.jsx("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),e.jsx("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),e.jsx("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),M=()=>e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("polyline",{points:"12 6 12 12 16 14"})]}),z=()=>e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"6 9 12 15 18 9"})}),I=()=>e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"18 15 12 9 6 15"})});function B({status:s}){const a={scheduled:{label:"Scheduled",bg:"rgba(59,130,246,0.1)",color:"#3b82f6",dot:!1},live:{label:"Live Now",bg:"rgba(239,68,68,0.1)",color:"#ef4444",dot:!0},completed:{label:"Completed",bg:"rgba(107,114,128,0.08)",color:"#6b7280",dot:!1},cancelled:{label:"Cancelled",bg:"rgba(107,114,128,0.08)",color:"#9ca3af",dot:!1}},t=a[s]||a.scheduled;return e.jsxs("span",{className:"ls-status-pill",style:{background:t.bg,color:t.color},children:[t.dot&&e.jsx("span",{className:"ls-pulse-dot"}),t.label]})}function b({session:s,isPast:a}){const[t,o]=p.useState(!1),n=v(s),c=a?null:k(s.dateTime),d=!a&&D(s.dateTime),m=(s.hostName||"H").charAt(0).toUpperCase();return e.jsxs("div",{className:`ls-card ${a?"ls-card--past":""} ${n==="cancelled"?"ls-card--cancelled":""}`,children:[e.jsxs("div",{className:"ls-card__header",children:[e.jsx("div",{className:"ls-card__icon",style:{color:a?"var(--gray-400)":"var(--gold)"},children:a?e.jsx(L,{}):e.jsx(j,{})}),e.jsxs("div",{className:"ls-card__main",children:[e.jsxs("div",{className:"ls-card__title-row",children:[e.jsx("h4",{className:`ls-card__title ${n==="cancelled"?"ls-card__title--cancelled":""}`,children:s.title}),e.jsx(B,{status:n})]}),e.jsxs("div",{className:"ls-card__meta",children:[e.jsxs("div",{className:"ls-card__host",children:[e.jsx("span",{className:"ls-card__avatar",style:{background:a?"var(--gray-400)":"var(--gold)"},children:m}),e.jsx("span",{className:"ls-card__host-name",children:s.hostName||"Instructor"})]}),e.jsxs("span",{className:"ls-card__date",children:[e.jsx(T,{})," ",S(s.dateTime)]}),e.jsxs("span",{className:"ls-card__time",children:[e.jsx(M,{})," ",C(s.dateTime),s.durationMinutes?` (${$(s.durationMinutes)})`:""]})]}),c&&n==="scheduled"&&e.jsxs("div",{className:"ls-card__countdown",children:["Starts in ",c]})]})]}),s.description&&e.jsxs("div",{className:"ls-card__desc-toggle",children:[e.jsxs("button",{className:"ls-card__desc-btn",onClick:()=>o(!t),children:[t?"Hide details":"Show details",t?e.jsx(I,{}):e.jsx(z,{})]}),t&&e.jsx("p",{className:"ls-card__description",children:s.description})]}),e.jsxs("div",{className:"ls-card__actions",children:[!a&&n!=="cancelled"&&(s.meetingUrl?e.jsx("a",{href:d?s.meetingUrl:void 0,target:"_blank",rel:"noopener noreferrer",className:`btn btn--primary btn--sm ${d?"":"btn--disabled"}`,onClick:g=>{d||g.preventDefault()},title:d?"":"Join link activates 15 minutes before session",children:n==="live"?"Join Now":"Join Session"}):e.jsx("span",{className:"ls-card__no-link",children:"Link coming soon"})),a&&n==="completed"&&(s.recordingUrl?e.jsx("a",{href:s.recordingUrl,target:"_blank",rel:"noopener noreferrer",className:"btn btn--outline btn--sm",children:"Watch Recording"}):e.jsx("span",{className:"ls-card__no-link",children:"Recording coming soon"}))]})]})}function R({sessions:s}){const a=new Date,[t,o]=p.useState(a.getMonth()),[n,c]=p.useState(a.getFullYear()),d=new Set(s.map(l=>{const h=new Date(l.dateTime);return`${h.getFullYear()}-${h.getMonth()}-${h.getDate()}`})),m=new Date(n,t,1).getDay(),g=new Date(n,t+1,0).getDate(),u=new Date(n,t).toLocaleDateString("en-ZA",{month:"long",year:"numeric"}),x=[];for(let l=0;l<m;l++)x.push(e.jsx("div",{className:"ls-cal__cell ls-cal__cell--empty"},`e-${l}`));for(let l=1;l<=g;l++){const h=`${n}-${t}-${l}`,r=d.has(h),i=l===a.getDate()&&t===a.getMonth()&&n===a.getFullYear();x.push(e.jsxs("div",{className:`ls-cal__cell ${i?"ls-cal__cell--today":""}`,children:[l,r&&e.jsx("span",{className:"ls-cal__dot"})]},l))}function _(){t===0?(o(11),c(n-1)):o(t-1)}function f(){t===11?(o(0),c(n+1)):o(t+1)}return e.jsxs("div",{className:"ls-cal",children:[e.jsxs("div",{className:"ls-cal__nav",children:[e.jsx("button",{onClick:_,className:"ls-cal__nav-btn",children:"‹"}),e.jsx("span",{className:"ls-cal__month",children:u}),e.jsx("button",{onClick:f,className:"ls-cal__nav-btn",children:"›"})]}),e.jsx("div",{className:"ls-cal__days",children:["Su","Mo","Tu","We","Th","Fr","Sa"].map(l=>e.jsx("div",{className:"ls-cal__day-label",children:l},l))}),e.jsx("div",{className:"ls-cal__grid",children:x})]})}function U(){const{slug:s}=w(),a=N(),[t,o]=p.useState(null),[n,c]=p.useState([]),[d,m]=p.useState(!0),[g,u]=p.useState(null),x=p.useRef(null),[,_]=p.useState(0);p.useEffect(()=>(f(),x.current=setInterval(()=>_(r=>r+1),3e4),()=>clearInterval(x.current)),[s]);async function f(){m(!0),u(null);try{const r=await y.courseDetail(s);o(r.course);const i=await y.courseLiveSessions(r.course.id);c(i.sessions||[])}catch(r){u(r.message||"Failed to load live sessions")}finally{m(!1)}}if(d)return e.jsxs("div",{className:"page-loading",children:[e.jsx("div",{className:"spinner"}),e.jsx("p",{children:"Loading live sessions..."})]});if(g)return e.jsxs("div",{className:"portal-page",children:[e.jsx("button",{className:"btn btn--ghost btn--sm",onClick:()=>a(`/learn/${s}`),children:"← Back to Course"}),e.jsxs("div",{className:"card",style:{marginTop:"1rem",textAlign:"center",padding:"2rem"},children:[e.jsx("p",{style:{color:"var(--red, #ef4444)"},children:g}),e.jsx("button",{className:"btn btn--primary",onClick:f,style:{marginTop:"1rem"},children:"Retry"})]})]});const l=n.filter(r=>{const i=v(r);return i==="scheduled"||i==="live"}).sort((r,i)=>new Date(r.dateTime)-new Date(i.dateTime)),h=n.filter(r=>{const i=v(r);return i==="completed"||i==="cancelled"}).sort((r,i)=>new Date(i.dateTime)-new Date(r.dateTime));return e.jsxs("div",{className:"portal-page",children:[e.jsx("style",{children:`
        .ls-layout {
          display: grid;
          grid-template-columns: 1fr 260px;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .ls-layout {
            grid-template-columns: 1fr;
          }
        }

        .ls-section {
          margin-bottom: 32px;
        }
        .ls-section__title {
          font-family: var(--font-heading);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--charcoal);
          margin: 0 0 16px 0;
        }

        /* Card */
        .ls-card {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius);
          padding: 20px;
          margin-bottom: 12px;
          box-shadow: var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.05));
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .ls-card:hover {
          box-shadow: var(--shadow, 0 2px 8px rgba(0,0,0,0.08));
        }
        .ls-card--past {
          opacity: 0.75;
        }
        .ls-card--past:hover {
          opacity: 1;
        }
        .ls-card--cancelled {
          opacity: 0.6;
        }
        .ls-card__header {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }
        .ls-card__icon {
          flex-shrink: 0;
          margin-top: 2px;
        }
        .ls-card__main {
          flex: 1;
          min-width: 0;
        }
        .ls-card__title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }
        .ls-card__title {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 600;
          color: var(--charcoal);
          margin: 0;
        }
        .ls-card__title--cancelled {
          text-decoration: line-through;
          color: var(--gray-400);
        }

        .ls-card__meta {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          font-size: 0.8125rem;
          color: var(--gray-500);
        }
        .ls-card__host {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .ls-card__avatar {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white);
          font-size: 0.6875rem;
          font-weight: 700;
          flex-shrink: 0;
        }
        .ls-card__host-name {
          font-weight: 500;
          color: var(--charcoal);
        }
        .ls-card__date,
        .ls-card__time {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .ls-card__countdown {
          margin-top: 8px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--gold);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .ls-card__countdown::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold);
          display: inline-block;
        }

        .ls-card__desc-toggle {
          margin-top: 10px;
          border-top: 1px solid var(--gray-100);
          padding-top: 8px;
        }
        .ls-card__desc-btn {
          background: none;
          border: none;
          color: var(--gray-400);
          font-size: 0.75rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 0;
        }
        .ls-card__desc-btn:hover {
          color: var(--charcoal);
        }
        .ls-card__description {
          font-size: 0.8125rem;
          color: var(--gray-600);
          line-height: 1.5;
          margin: 8px 0 0 0;
          white-space: pre-line;
        }

        .ls-card__actions {
          margin-top: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ls-card__no-link {
          font-size: 0.8125rem;
          color: var(--gray-400);
          font-style: italic;
        }

        .btn--disabled {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }

        /* Status pill */
        .ls-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 2px 10px;
          border-radius: 12px;
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          white-space: nowrap;
        }
        .ls-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          animation: ls-pulse 1.4s ease-in-out infinite;
        }
        @keyframes ls-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }

        /* Mini Calendar */
        .ls-cal {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius);
          padding: 16px;
          box-shadow: var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.05));
        }
        .ls-cal__nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .ls-cal__nav-btn {
          background: none;
          border: none;
          font-size: 1.125rem;
          color: var(--gray-500);
          cursor: pointer;
          padding: 2px 8px;
          border-radius: 4px;
        }
        .ls-cal__nav-btn:hover {
          background: var(--gray-50);
          color: var(--charcoal);
        }
        .ls-cal__month {
          font-family: var(--font-heading);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--charcoal);
        }
        .ls-cal__days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0;
          margin-bottom: 4px;
        }
        .ls-cal__day-label {
          text-align: center;
          font-size: 0.625rem;
          font-weight: 600;
          color: var(--gray-400);
          text-transform: uppercase;
          padding: 2px 0;
        }
        .ls-cal__grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0;
        }
        .ls-cal__cell {
          text-align: center;
          font-size: 0.75rem;
          color: var(--gray-600);
          padding: 4px 0;
          position: relative;
          line-height: 1.6;
        }
        .ls-cal__cell--empty {
          visibility: hidden;
        }
        .ls-cal__cell--today {
          font-weight: 700;
          color: var(--gold);
        }
        .ls-cal__dot {
          display: block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--gold);
          margin: 0 auto;
        }

        /* Empty state */
        .ls-empty {
          text-align: center;
          padding: 48px 24px;
          color: var(--gray-400);
        }
        .ls-empty__icon {
          margin-bottom: 12px;
          color: var(--gray-300);
        }
        .ls-empty__text {
          font-size: 0.9375rem;
          margin: 0;
        }
      `}),e.jsxs("button",{className:"btn btn--ghost btn--sm",onClick:()=>a(`/learn/${s}`),children:["← Back to ",(t==null?void 0:t.title)||"Course"]}),e.jsxs("div",{className:"page-header",style:{marginTop:"8px"},children:[e.jsx("h2",{children:"Live Sessions"}),e.jsx("p",{className:"page-subtitle",children:t==null?void 0:t.title})]}),n.length===0?e.jsxs("div",{className:"ls-empty",children:[e.jsx("div",{className:"ls-empty__icon",children:e.jsx(j,{})}),e.jsx("p",{className:"ls-empty__text",children:"No live sessions scheduled for this course yet."})]}):e.jsxs("div",{className:"ls-layout",children:[e.jsxs("div",{className:"ls-main",children:[l.length>0&&e.jsxs("div",{className:"ls-section",children:[e.jsx("h3",{className:"ls-section__title",children:"Upcoming Sessions"}),l.map(r=>e.jsx(b,{session:r,isPast:!1},r.id))]}),h.length>0&&e.jsxs("div",{className:"ls-section",children:[e.jsx("h3",{className:"ls-section__title",children:"Past Sessions"}),h.map(r=>e.jsx(b,{session:r,isPast:!0},r.id))]})]}),e.jsx("div",{className:"ls-sidebar",children:e.jsx(R,{sessions:n})})]})]})}export{U as default};
