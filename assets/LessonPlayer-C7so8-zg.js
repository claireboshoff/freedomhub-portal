import{b as je,u as ke,r as i,a as B,j as e}from"./index-CT6ER67h.js";const le={video:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("polygon",{points:"10 8 16 12 10 16 10 8",fill:"currentColor",stroke:"none"})]}),audio:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"4",y1:"8",x2:"4",y2:"16"}),e.jsx("line",{x1:"8",y1:"5",x2:"8",y2:"19"}),e.jsx("line",{x1:"12",y1:"3",x2:"12",y2:"21"}),e.jsx("line",{x1:"16",y1:"7",x2:"16",y2:"17"}),e.jsx("line",{x1:"20",y1:"10",x2:"20",y2:"14"})]}),article:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),e.jsx("polyline",{points:"14 2 14 8 20 8"}),e.jsx("line",{x1:"8",y1:"13",x2:"16",y2:"13"}),e.jsx("line",{x1:"8",y1:"17",x2:"16",y2:"17"})]}),meditation:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("circle",{cx:"12",cy:"12",r:"2",fill:"currentColor",stroke:"none"})]}),podcast:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"}),e.jsx("path",{d:"M19 10v2a7 7 0 0 1-14 0v-2"}),e.jsx("line",{x1:"12",y1:"19",x2:"12",y2:"23"}),e.jsx("line",{x1:"8",y1:"23",x2:"16",y2:"23"})]}),mixed:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"3",y:"3",width:"7",height:"7",rx:"1"}),e.jsx("rect",{x:"14",y:"3",width:"7",height:"7",rx:"1"}),e.jsx("rect",{x:"3",y:"14",width:"7",height:"7",rx:"1"}),e.jsx("rect",{x:"14",y:"14",width:"7",height:"7",rx:"1"})]})},U=({size:n=16})=>e.jsx("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"var(--green, #10b981)",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"20 6 9 17 4 12"})}),we=()=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"}),e.jsx("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]}),Ne=({open:n})=>e.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{transition:"transform 0.2s",transform:n?"rotate(180deg)":"rotate(0deg)"},children:e.jsx("polyline",{points:"6 9 12 15 18 9"})}),Ce=()=>e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"3",y1:"6",x2:"21",y2:"6"}),e.jsx("line",{x1:"3",y1:"12",x2:"21",y2:"12"}),e.jsx("line",{x1:"3",y1:"18",x2:"21",y2:"18"})]}),Le=()=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),e.jsx("polyline",{points:"7 10 12 15 17 10"}),e.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}),Se=()=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"}),e.jsx("polyline",{points:"13 2 13 9 20 9"})]});function ze(n){if(!n)return null;if(n<60)return`${n} min`;const r=Math.floor(n/60),a=n%60;return a>0?`${r}h ${a}m`:`${r}h`}function Te(n){const r=Math.floor(n/60),a=n%60;return`${String(r).padStart(2,"0")}:${String(a).padStart(2,"0")}`}function Ie(n){if(!n)return null;const r=n.trim().split(/\s+/).length;return`${Math.max(1,Math.round(r/200))} min read`}function de(n){if(!n)return null;const r=n.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);return r?r[1]:null}function ce(n){if(!n)return null;const r=n.match(/vimeo\.com\/(?:video\/)?(\d+)/);return r?r[1]:null}function Re(n){const r={},a=[];for(const t of n){const c=t.moduleId||"__default";r[c]||(r[c]={id:c,title:t.moduleTitle||"Lessons",lessons:[]},a.push(c)),r[c].lessons.push(t)}for(const t of a)r[t].lessons.sort((c,g)=>(c.sortOrder||0)-(g.sortOrder||0));return a.map(t=>r[t])}function W({currentSpeed:n,onSpeedChange:r}){const a=[.5,.75,1,1.25,1.5,2];return e.jsxs("div",{className:"speed-controls",children:[e.jsx("span",{className:"speed-controls__label",children:"Speed:"}),a.map(t=>e.jsxs("button",{className:`speed-controls__btn ${n===t?"speed-controls__btn--active":""}`,onClick:()=>r(t),children:[t,"x"]},t))]})}function Me({onTimerEnd:n}){const[r,a]=i.useState(null),t=i.useRef(null),c=i.useRef(n);c.current=n,i.useEffect(()=>()=>clearInterval(t.current),[]);function g(d){clearInterval(t.current);const z=d*60;a(z),t.current=setInterval(()=>{a(k=>k===null||k<=1?(clearInterval(t.current),c.current(),null):k-1)},1e3)}function S(){clearInterval(t.current),a(null)}return e.jsxs("div",{className:"sleep-timer",children:[e.jsx("span",{className:"sleep-timer__label",children:"Sleep Timer:"}),e.jsxs("div",{className:"sleep-timer__buttons",children:[[15,30,45,60].map(d=>e.jsxs("button",{className:"btn btn--outline btn--sm",onClick:()=>g(d),children:[d,"m"]},d)),r!==null&&e.jsx("button",{className:"btn btn--ghost btn--sm",onClick:S,children:"Cancel"})]}),r!==null&&e.jsxs("div",{className:"sleep-timer__display",children:[Te(r)," remaining"]})]})}function Ee({xp:n,visible:r}){return r?e.jsxs("div",{className:"xp-notification",children:["+",n," XP"]}):null}function Pe(){var ae;const{slug:n,lessonId:r}=je(),a=ke(),[t,c]=i.useState(null),[g,S]=i.useState([]),[d,z]=i.useState(null),[k,F]=i.useState(!0),[T,w]=i.useState(null),[M,E]=i.useState(!1),[pe,X]=i.useState({}),[V,I]=i.useState(!1),[O,H]=i.useState(!1),[Y,G]=i.useState({visible:!1,xp:0}),[R,J]=i.useState(""),[Q,b]=i.useState(null),[P,q]=i.useState(!1),[K,Z]=i.useState(null),D=i.useRef(null),[f,ee]=i.useState(1),N=i.useRef(null),x=i.useRef(null);i.useEffect(()=>(se(),()=>clearTimeout(D.current)),[r]);async function se(){var s,l;F(!0),w(null),I(!1),J(""),b(null),q(!1),Z(null),ee(1);try{const o=await B.lessonDetail(r);if(c(o.lesson),S(o.allLessons||[]),z(o.enrollment||null),(l=(s=o.enrollment)==null?void 0:s.completedLessons)!=null&&l.includes(r))I(!0);else{const m=(o.allLessons||[]).find(u=>u.id===r);m!=null&&m.completed&&I(!0)}const p=(o.allLessons||[]).find(m=>m.id===r);p!=null&&p.moduleId&&X(m=>({...m,[p.moduleId]:!0}))}catch(o){w(o.message||"Failed to load lesson")}finally{F(!1)}}const te=Re(g),v=te.flatMap(s=>s.lessons),_=v.findIndex(s=>s.id===r),C=_>0?v[_-1]:null,h=_<v.length-1?v[_+1]:null,ne=_===v.length-1,L=v.length,oe=_+1,re=(d==null?void 0:d.progressPercent)??(L>0?Math.round((((ae=d==null?void 0:d.completedLessons)==null?void 0:ae.length)||0)/L*100):0);function xe(s){var o;if((o=d==null?void 0:d.completedLessons)!=null&&o.includes(s))return!0;const l=g.find(p=>p.id===s);return(l==null?void 0:l.completed)||!1}function me(s){if(!s.dripDay||!d)return!1;const l=d.enrolledAt?new Date(d.enrolledAt):new Date,o=new Date(l);return o.setDate(o.getDate()+s.dripDay),new Date<o}async function ue(){if(!(V||O)){H(!0);try{const s=await B.markComplete(r);I(!0),z(o=>({...o,progressPercent:s.newProgress??(o==null?void 0:o.progressPercent),completedLessons:[...(o==null?void 0:o.completedLessons)||[],r]})),S(o=>o.map(p=>p.id===r?{...p,completed:!0}:p));const l=s.xpEarned||10;G({visible:!0,xp:l}),setTimeout(()=>G({visible:!1,xp:0}),3e3),s.nextLessonId?setTimeout(()=>a(`/learn/${n}/lesson/${s.nextLessonId}`),1500):h&&!ne&&setTimeout(()=>a(`/learn/${n}/lesson/${h.id}`),1500)}catch(s){w(s.message||"Failed to mark lesson complete")}finally{H(!1)}}}function he(s){J(s),b("saving"),clearTimeout(D.current),D.current=setTimeout(()=>{b("saved")},1200)}async function ge(){if(R.trim()){b("saving");try{const s=await B.submitReflection(r,R);q(!0),b("saved"),s.xpEarned&&Z(s.xpEarned)}catch(s){b(null),w(s.message||"Failed to submit reflection")}}}function A(s){ee(s),N.current&&(N.current.playbackRate=s),x.current&&(x.current.playbackRate=s)}const be=i.useCallback(()=>{x.current&&x.current.pause()},[]);function y(s){a(`/learn/${n}/lesson/${s}`),E(!1)}if(k)return e.jsxs("div",{className:"page-loading",children:[e.jsx("div",{className:"spinner"}),e.jsx("p",{children:"Loading..."})]});if(T&&!t)return e.jsxs("div",{className:"portal-page",children:[e.jsx("button",{className:"btn btn--ghost btn--sm",onClick:()=>a(`/learn/${n}`),children:"← Back to Course"}),e.jsxs("div",{className:"card",style:{marginTop:"1rem",textAlign:"center",padding:"2rem"},children:[e.jsx("p",{style:{color:"var(--red)"},children:T}),e.jsx("button",{className:"btn btn--primary",onClick:se,style:{marginTop:"1rem"},children:"Retry"})]})]});if(!t)return null;const j=t.contentType||"article",fe=j==="video",ve=j==="audio"||j==="podcast",_e=j==="meditation",ye=j==="article",ie=j==="mixed";return e.jsxs("div",{className:"lesson-player",children:[e.jsx("button",{className:"lesson-player__sidebar-toggle",onClick:()=>E(!M),"aria-label":"Toggle lesson navigation",children:e.jsx(Ce,{})}),M&&e.jsx("div",{className:"lesson-sidebar__overlay",onClick:()=>E(!1)}),e.jsxs("aside",{className:`lesson-sidebar ${M?"lesson-sidebar--open":""}`,children:[e.jsx("div",{className:"lesson-sidebar__course-title",children:e.jsxs("button",{className:"btn btn--ghost btn--sm",onClick:()=>a(`/learn/${n}`),style:{width:"100%",textAlign:"left",justifyContent:"flex-start"},children:["← ",t.courseTitle||"Course"]})}),e.jsx("nav",{className:"lesson-sidebar__nav",children:te.map(s=>{const l=!!pe[s.id];return e.jsxs("div",{className:"lesson-sidebar__module",children:[e.jsxs("button",{className:"lesson-sidebar__module-header",onClick:()=>X(o=>({...o,[s.id]:!o[s.id]})),children:[e.jsx(Ne,{open:l}),e.jsx("span",{className:"lesson-sidebar__module-title",children:s.title})]}),l&&e.jsx("ul",{className:"lesson-sidebar__lessons",children:s.lessons.map(o=>{const p=o.id===r,m=xe(o.id),u=me(o);return e.jsxs("li",{className:["lesson-sidebar__lesson",p&&"lesson-sidebar__lesson--current",m&&"lesson-sidebar__lesson--completed",u&&"lesson-sidebar__lesson--locked"].filter(Boolean).join(" "),onClick:()=>{u||y(o.id)},role:u?void 0:"button",tabIndex:u?-1:0,onKeyDown:$=>{!u&&($.key==="Enter"||$.key===" ")&&($.preventDefault(),y(o.id))},children:[e.jsx("span",{className:"lesson-sidebar__lesson-icon",children:le[o.contentType]||le.article}),e.jsx("span",{className:"lesson-sidebar__lesson-title",children:o.title}),e.jsx("span",{className:"lesson-sidebar__lesson-meta",children:o.durationMinutes?ze(o.durationMinutes):""}),e.jsxs("span",{className:"lesson-sidebar__lesson-status",children:[m&&e.jsx(U,{size:14}),u&&e.jsx(we,{})]})]},o.id)})})]},s.id)})}),e.jsxs("div",{className:"lesson-sidebar__progress",children:[e.jsxs("div",{className:"lesson-sidebar__progress-label",children:[e.jsx("span",{children:"Progress"}),e.jsxs("span",{children:[re,"%"]})]}),e.jsx("div",{className:"lesson-sidebar__progress-bar-track",children:e.jsx("div",{className:"lesson-sidebar__progress-bar-fill",style:{width:`${re}%`}})})]})]}),e.jsxs("main",{className:"lesson-content",children:[e.jsxs("div",{className:"lesson-topbar",children:[e.jsxs("div",{className:"lesson-topbar__breadcrumb",children:[e.jsx("button",{className:"btn btn--ghost btn--sm",onClick:()=>a(`/learn/${n}`),children:t.courseTitle||"Course"}),e.jsx("span",{className:"lesson-topbar__sep",children:"/"}),e.jsx("span",{className:"lesson-topbar__module",children:t.moduleTitle||"Module"}),e.jsx("span",{className:"lesson-topbar__sep",children:"/"}),e.jsx("span",{className:"lesson-topbar__current",children:t.title})]}),e.jsxs("div",{className:"lesson-topbar__progress",children:[e.jsxs("span",{className:"lesson-topbar__progress-text",children:["Lesson ",oe," of ",L]}),e.jsx("div",{className:"lesson-topbar__progress-bar",children:e.jsx("div",{className:"lesson-topbar__progress-fill",style:{width:`${L>0?oe/L*100:0}%`}})})]}),e.jsxs("div",{className:"lesson-topbar__nav",children:[e.jsx("button",{className:"btn btn--outline btn--sm",disabled:!C,onClick:()=>C&&y(C.id),children:"← Prev"}),e.jsx("button",{className:"btn btn--outline btn--sm",disabled:!h,onClick:()=>h&&y(h.id),children:"Next →"})]})]}),e.jsx("h1",{className:"lesson-content__title",children:t.title}),T&&e.jsxs("div",{className:"lesson-content__error",children:[e.jsx("p",{children:T}),e.jsx("button",{className:"btn btn--ghost btn--sm",onClick:()=>w(null),children:"Dismiss"})]}),(fe||ie&&t.videoUrl)&&e.jsxs("div",{className:"video-section",children:[e.jsx("div",{className:"video-container",children:(()=>{const s=de(t.videoUrl),l=ce(t.videoUrl);return s?e.jsx("iframe",{src:`https://www.youtube.com/embed/${s}?rel=0`,title:t.title,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0}):l?e.jsx("iframe",{src:`https://player.vimeo.com/video/${l}?title=0&byline=0&portrait=0`,title:t.title,frameBorder:"0",allow:"autoplay; fullscreen; picture-in-picture",allowFullScreen:!0}):e.jsx("video",{ref:N,src:t.videoUrl,controls:!0,playsInline:!0,onLoadedMetadata:()=>{N.current&&(N.current.playbackRate=f)}})})()}),t.videoUrl&&!de(t.videoUrl)&&!ce(t.videoUrl)&&e.jsx(W,{currentSpeed:f,onSpeedChange:A})]}),ve&&t.audioUrl&&e.jsxs("div",{className:"audio-section",children:[e.jsxs("div",{className:"audio-player",children:[e.jsx("div",{className:"audio-player__waveform"}),e.jsx("audio",{ref:x,src:t.audioUrl,controls:!0,onLoadedMetadata:()=>{x.current&&(x.current.playbackRate=f)}})]}),e.jsx(W,{currentSpeed:f,onSpeedChange:A})]}),_e&&e.jsxs("div",{className:"audio-section audio-section--meditation",children:[e.jsx("div",{className:"meditation-ambient"}),t.audioUrl?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"audio-player",children:[e.jsx("div",{className:"audio-player__waveform"}),e.jsx("audio",{ref:x,src:t.audioUrl,controls:!0,onLoadedMetadata:()=>{x.current&&(x.current.playbackRate=f)}})]}),e.jsx(W,{currentSpeed:f,onSpeedChange:A})]}):e.jsx("p",{style:{textAlign:"center",color:"var(--gray-500)",padding:"2rem",position:"relative",zIndex:1},children:"Meditation audio not yet available."}),e.jsx(Me,{onTimerEnd:be})]}),ye&&t.writtenContent&&e.jsxs("div",{className:"article-section",children:[e.jsx("div",{className:"article-section__read-time",children:Ie(t.writtenContent)}),e.jsx("div",{className:"article-content",children:t.writtenContent.split(`

`).map((s,l)=>e.jsx("p",{children:s},l))})]}),ie&&t.writtenContent&&e.jsx("div",{className:"article-section",children:e.jsx("div",{className:"article-content",children:t.writtenContent.split(`

`).map((s,l)=>e.jsx("p",{children:s},l))})}),t.attachments&&t.attachments.length>0&&e.jsxs("div",{className:"attachments-section",children:[e.jsx("h3",{className:"attachments-section__heading",children:"Attachments"}),e.jsx("ul",{className:"attachment-list",children:t.attachments.map((s,l)=>e.jsxs("li",{className:"attachment-item",children:[e.jsx("span",{className:"attachment-item__icon",children:e.jsx(Se,{})}),e.jsx("span",{className:"attachment-item__name",children:s.name||s.filename}),s.size&&e.jsx("span",{className:"attachment-item__size",children:s.size}),e.jsxs("a",{href:s.url,download:!0,target:"_blank",rel:"noopener noreferrer",className:"btn btn--outline btn--sm attachment-item__download",children:[e.jsx(Le,{})," Download"]})]},l))})]}),t.reflectionPrompt&&e.jsxs("div",{className:"reflection-section",children:[e.jsx("h3",{className:"reflection-section__heading",children:"Reflection Journal"}),e.jsx("p",{className:"reflection-section__prompt",children:t.reflectionPrompt}),e.jsx("textarea",{className:"reflection-box",placeholder:"Write your reflection...",value:R,onChange:s=>he(s.target.value),disabled:P,rows:5}),e.jsxs("div",{className:"reflection-section__footer",children:[e.jsxs("span",{className:"reflection-section__save-status",children:[Q==="saving"&&"Saving...",Q==="saved"&&"Saved"]}),e.jsx("span",{className:"reflection-section__xp-hint",children:P&&K?`+${K} XP earned`:"+5 XP for completing your reflection"}),P?e.jsxs("span",{className:"reflection-section__submitted",children:[e.jsx(U,{size:14})," Submitted"]}):e.jsx("button",{className:"btn btn--primary btn--sm",onClick:ge,disabled:!R.trim(),children:"Submit Reflection"})]})]}),t.quizEnabled&&e.jsxs("div",{className:"placeholder-card",children:[e.jsx("h3",{children:"Quiz"}),e.jsx("p",{children:"Quiz coming soon -- Sprint 10"})]}),e.jsxs("div",{className:"placeholder-card",children:[e.jsx("h3",{children:"Discussion"}),e.jsx("p",{children:"Discussion coming soon -- Sprint 12"})]}),e.jsxs("div",{className:"lesson-bottom-actions",children:[e.jsx("div",{className:"lesson-bottom-actions__left",children:C&&e.jsx("button",{className:"btn btn--outline",onClick:()=>y(C.id),children:"← Previous Lesson"})}),e.jsx("div",{className:"lesson-bottom-actions__center",children:V?e.jsxs("span",{className:"lesson-completed-badge",children:[e.jsx(U,{size:18})," Completed"]}):e.jsx("button",{className:"btn btn--success",onClick:ue,disabled:O,children:O?"Marking...":"Mark Complete"})}),e.jsx("div",{className:"lesson-bottom-actions__right",children:ne?e.jsx("button",{className:"btn btn--primary",onClick:()=>a(`/learn/${n}`),children:"Complete Course"}):h?e.jsx("button",{className:"btn btn--primary",onClick:()=>y(h.id),children:"Next Lesson →"}):null})]}),e.jsx(Ee,{xp:Y.xp,visible:Y.visible})]}),e.jsx("style",{children:`
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
      `})]})}export{Pe as default};
