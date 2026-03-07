import{b as M,u as A,r as c,a as w,j as e}from"./index-D6dyrzHb.js";function E(o){const t=new Date,r=new Date(o),a=Math.floor((t-r)/1e3);if(a<60)return"just now";const n=Math.floor(a/60);if(n<60)return`${n}m ago`;const m=Math.floor(n/60);if(m<24)return`${m}h ago`;const l=Math.floor(m/24);if(l<7)return`${l}d ago`;const i=Math.floor(l/7);return i<4?`${i}w ago`:r.toLocaleDateString()}function S(o){let t=0;for(let a=0;a<(o||"").length;a++)t=o.charCodeAt(a)+((t<<5)-t);const r=["#c5a55a","#5a8fc5","#c55a5a","#5ac58a","#8a5ac5","#c5895a","#5ac5c5","#c55a8a"];return r[Math.abs(t)%r.length]}const L=[{value:"",label:"All"},{value:"question",label:"Questions"},{value:"win",label:"Wins"},{value:"resource",label:"Resources"}],W=({filled:o})=>e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:o?"var(--gold, #c5a55a)":"none",stroke:o?"var(--gold, #c5a55a)":"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"})}),q=()=>e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("polyline",{points:"9 17 4 12 9 7"}),e.jsx("path",{d:"M20 18v-2a4 4 0 0 0-4-4H4"})]}),B=()=>e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"var(--gold, #c5a55a)",stroke:"var(--gold, #c5a55a)",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"})}),U=()=>e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"15 18 9 12 15 6"})});function F({clientName:o,onPost:t}){const[r,a]=c.useState(""),[n,m]=c.useState(""),[l,i]=c.useState(!1),p=(o||"?").charAt(0).toUpperCase();async function g(u){if(u.preventDefault(),!(!r.trim()||l)){i(!0);try{await t(r.trim(),n),a(""),m("")}finally{i(!1)}}}return e.jsxs("form",{className:"comm-composer",onSubmit:g,children:[e.jsx("div",{className:"comm-composer__avatar",style:{background:S(o)},children:p}),e.jsxs("div",{className:"comm-composer__body",children:[e.jsx("textarea",{className:"comm-composer__input",value:r,onChange:u=>a(u.target.value),placeholder:"Share a win, ask a question, or post a resource...",rows:3,maxLength:2e3}),e.jsxs("div",{className:"comm-composer__footer",children:[e.jsxs("div",{className:"comm-composer__left",children:[e.jsxs("select",{className:"comm-composer__tag-select",value:n,onChange:u=>m(u.target.value),children:[e.jsx("option",{value:"",children:"Tag (optional)"}),e.jsx("option",{value:"question",children:"Question"}),e.jsx("option",{value:"win",children:"Win"}),e.jsx("option",{value:"resource",children:"Resource"})]}),e.jsxs("span",{className:"comm-composer__count",children:[r.length,"/2000"]})]}),e.jsx("button",{type:"submit",className:"btn btn--primary btn--sm",disabled:!r.trim()||l,children:l?"Posting...":"Post"})]})]})]})}function G({clientName:o,onPost:t}){const[r,a]=c.useState(""),[n,m]=c.useState(!1),l=(o||"?").charAt(0).toUpperCase();async function i(p){if(p.preventDefault(),!(!r.trim()||n)){m(!0);try{await t(r.trim()),a("")}finally{m(!1)}}}return e.jsxs("form",{className:"comm-reply-composer",onSubmit:i,children:[e.jsx("div",{className:"comm-reply-avatar",style:{background:S(o)},children:l}),e.jsxs("div",{className:"comm-reply-body",children:[e.jsx("textarea",{className:"comm-reply-input",value:r,onChange:p=>a(p.target.value),placeholder:"Write a reply...",rows:2,maxLength:2e3}),e.jsxs("div",{className:"comm-reply-footer",children:[e.jsxs("span",{className:"comm-composer__count",children:[r.length,"/2000"]}),e.jsx("button",{type:"submit",className:"btn btn--primary btn--sm",disabled:!r.trim()||n,children:n?"...":"Reply"})]})]})]})}function P({post:o,clientName:t,onLike:r,onReply:a,depth:n=0}){var k,h;const[m,l]=c.useState(!1),[i,p]=c.useState(!1),[g,u]=c.useState(o.likes||0),v=(o.authorName||"?").charAt(0).toUpperCase();async function C(){if(!i){p(!0),u(d=>d+1);try{await r(o.id)}catch{p(!1),u(d=>d-1)}}}async function _(d){await a(d,o.id),l(!1)}const y=o.tag?(k=L.find(d=>d.value===o.tag))==null?void 0:k.label:null;return e.jsxs("div",{className:`comm-post ${n>0?"comm-post--reply":""} ${o.pinned?"comm-post--pinned":""}`,children:[e.jsxs("div",{className:"comm-post__header",children:[e.jsx("div",{className:"comm-post__avatar",style:{background:S(o.authorName)},children:v}),e.jsxs("div",{className:"comm-post__meta",children:[e.jsx("span",{className:"comm-post__author",children:o.authorName||"Unknown"}),e.jsx("span",{className:"comm-post__time",children:E(o.created)}),o.lessonTitle&&e.jsx("span",{className:"comm-post__lesson-tag",children:o.lessonTitle}),!o.lessonTitle&&!o.lessonId&&n===0&&e.jsx("span",{className:"comm-post__lesson-tag comm-post__lesson-tag--general",children:"General Discussion"})]}),e.jsxs("div",{className:"comm-post__badges",children:[o.pinned&&e.jsx("span",{className:"comm-post__pin",title:"Pinned",children:e.jsx(B,{})}),y&&e.jsx("span",{className:`comm-tag comm-tag--${o.tag}`,children:y})]})]}),e.jsx("div",{className:"comm-post__content",children:o.content}),e.jsxs("div",{className:"comm-post__actions",children:[e.jsxs("button",{className:`comm-post__action-btn ${i?"comm-post__action-btn--liked":""}`,onClick:C,title:"Like",children:[e.jsx(W,{filled:i}),e.jsx("span",{children:g>0?g:""})]}),n===0&&e.jsxs("button",{className:"comm-post__action-btn",onClick:()=>l(!m),title:"Reply",children:[e.jsx(q,{})," ",e.jsxs("span",{children:["Reply",((h=o.replies)==null?void 0:h.length)>0?` (${o.replies.length})`:""]})]})]}),m&&e.jsx("div",{className:"comm-post__reply-area",children:e.jsx(G,{clientName:t,onPost:_})}),o.replies&&o.replies.length>0&&e.jsx("div",{className:"comm-post__replies",children:o.replies.map(d=>e.jsx(P,{post:d,clientName:t,onLike:r,onReply:a,depth:n+1},d.id))})]})}function H(){return e.jsx("div",{className:"comm-skeleton",children:[1,2,3,4].map(o=>e.jsxs("div",{className:"comm-skeleton__post",children:[e.jsx("div",{className:"comm-skeleton__avatar"}),e.jsxs("div",{className:"comm-skeleton__lines",children:[e.jsx("div",{className:"comm-skeleton__line comm-skeleton__line--short"}),e.jsx("div",{className:"comm-skeleton__line"}),e.jsx("div",{className:"comm-skeleton__line comm-skeleton__line--med"})]})]},o))})}function Y({client:o}){const{slug:t}=M(),r=A(),[a,n]=c.useState(null),[m,l]=c.useState([]),[i,p]=c.useState(!0),[g,u]=c.useState(null),[v,C]=c.useState(""),[_,y]=c.useState(10),k=(o==null?void 0:o.name)||(o==null?void 0:o.businessName)||"You",h=c.useCallback(async()=>{p(!0),u(null);try{const[s,b]=await Promise.all([w.courseDetail(t),w.courseDiscussions(t)]);n(s.course);const x=b.discussions||[],$=x.filter(f=>!f.parentId),T=x.filter(f=>f.parentId),z=$.map(f=>({...f,replies:T.filter(j=>j.parentId===f.id)}));z.sort((f,j)=>f.pinned&&!j.pinned?-1:!f.pinned&&j.pinned?1:new Date(j.created)-new Date(f.created)),l(z)}catch(s){u(s.message||"Failed to load community")}finally{p(!1)}},[t]);c.useEffect(()=>{h()},[h]);async function d(s,b){const x={courseSlug:t,courseId:(a==null?void 0:a.id)||"",content:s};b&&(x.tag=b),await w.postDiscussion(x),await h()}async function R(s,b){const x={courseSlug:t,courseId:(a==null?void 0:a.id)||"",content:s,parentId:b};await w.postDiscussion(x),await h()}async function I(s){await w.likeDiscussion(s)}const N=v?m.filter(s=>s.tag===v):m,D=N.slice(0,_);return e.jsxs("div",{className:"portal-page comm-page",children:[e.jsx("style",{children:O}),e.jsxs("div",{className:"comm-header",children:[e.jsxs("button",{className:"btn btn--ghost btn--sm comm-back",onClick:()=>r(`/learn/${t}`),children:[e.jsx(U,{})," Back to Course"]}),e.jsx("h2",{className:"comm-header__title",children:a!=null&&a.title?`${a.title} -- Community`:"Course Community"}),e.jsx("p",{className:"comm-header__subtitle",children:"Share wins, ask questions, and connect with fellow learners"})]}),e.jsx(F,{clientName:k,onPost:d}),e.jsx("div",{className:"comm-filters",children:L.map(s=>e.jsx("button",{className:`comm-filter-tab ${v===s.value?"comm-filter-tab--active":""}`,onClick:()=>{C(s.value),y(10)},children:s.label},s.value))}),i&&e.jsx(H,{}),g&&e.jsxs("div",{className:"comm-error",children:[e.jsx("p",{children:g}),e.jsx("button",{className:"btn btn--outline btn--sm",onClick:h,children:"Retry"})]}),!i&&!g&&N.length===0&&e.jsx("div",{className:"comm-empty",children:e.jsx("p",{children:"No discussions yet. Share a win or ask a question!"})}),!i&&D.map(s=>e.jsx(P,{post:s,clientName:k,onLike:I,onReply:R},s.id)),!i&&N.length>_&&e.jsxs("button",{className:"btn btn--outline btn--sm comm-load-more",onClick:()=>y(s=>s+10),children:["Load more (",N.length-_," remaining)"]})]})}const O=`
.comm-page {
  max-width: 720px;
  margin: 0 auto;
}

.comm-header {
  margin-bottom: 1.5rem;
}

.comm-back {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.75rem;
}

.comm-header__title {
  font-family: var(--font-heading, 'League Spartan', sans-serif);
  font-size: 1.5rem;
  color: var(--charcoal, #2d2d2d);
  margin: 0 0 0.25rem;
}

.comm-header__subtitle {
  font-size: 0.9rem;
  color: var(--gray-400, #999);
  margin: 0;
}

/* Composer */
.comm-composer {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding: 1.25rem;
  background: var(--white, #fff);
  border-radius: var(--radius, 12px);
  box-shadow: var(--shadow, 0 1px 3px rgba(0,0,0,0.08));
}

.comm-composer__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.comm-composer__body {
  flex: 1;
  min-width: 0;
}

.comm-composer__input {
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

.comm-composer__input:focus {
  outline: none;
  border-color: var(--gold, #c5a55a);
}

.comm-composer__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.4rem;
}

.comm-composer__left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.comm-composer__tag-select {
  padding: 0.3rem 0.5rem;
  border: 1px solid var(--gray-200, #e5e5e5);
  border-radius: 8px;
  font-size: 0.8rem;
  font-family: var(--font-body, 'Inter', sans-serif);
  background: var(--white, #fff);
  color: var(--charcoal, #2d2d2d);
  cursor: pointer;
}

.comm-composer__count {
  font-size: 0.75rem;
  color: var(--gray-400, #999);
}

/* Reply Composer */
.comm-reply-composer {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.comm-reply-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 0.7rem;
  flex-shrink: 0;
}

.comm-reply-body {
  flex: 1;
  min-width: 0;
}

.comm-reply-input {
  width: 100%;
  padding: 0.5rem 0.6rem;
  border: 1px solid var(--gray-200, #e5e5e5);
  border-radius: 8px;
  font-family: var(--font-body, 'Inter', sans-serif);
  font-size: 0.85rem;
  resize: none;
  background: var(--cream, #faf9f6);
  color: var(--charcoal, #2d2d2d);
  box-sizing: border-box;
}

.comm-reply-input:focus {
  outline: none;
  border-color: var(--gold, #c5a55a);
}

.comm-reply-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.3rem;
}

/* Filter Tabs */
.comm-filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

.comm-filter-tab {
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  border: 1px solid var(--gray-200, #e5e5e5);
  background: var(--white, #fff);
  font-size: 0.85rem;
  font-family: var(--font-body, 'Inter', sans-serif);
  color: var(--gray-600, #555);
  cursor: pointer;
  transition: all 0.2s;
}

.comm-filter-tab:hover {
  border-color: var(--gold, #c5a55a);
  color: var(--gold, #c5a55a);
}

.comm-filter-tab--active {
  background: var(--gold, #c5a55a);
  color: #fff;
  border-color: var(--gold, #c5a55a);
}

/* Post Card */
.comm-post {
  padding: 1.25rem;
  background: var(--white, #fff);
  border-radius: var(--radius, 12px);
  box-shadow: var(--shadow, 0 1px 3px rgba(0,0,0,0.08));
  margin-bottom: 0.75rem;
}

.comm-post--reply {
  margin-left: 2.5rem;
  padding: 0.75rem;
  box-shadow: none;
  border-left: 2px solid var(--gray-100, #f0f0f0);
  border-radius: 0 var(--radius, 12px) var(--radius, 12px) 0;
  background: var(--gray-50, #f8f8f8);
}

.comm-post--pinned {
  background: linear-gradient(135deg, rgba(197,165,90,0.08) 0%, rgba(197,165,90,0.02) 100%);
  border: 1px solid rgba(197,165,90,0.2);
}

.comm-post__header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.comm-post__avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.comm-post--reply .comm-post__avatar {
  width: 26px;
  height: 26px;
  font-size: 0.7rem;
}

.comm-post__meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
  flex-wrap: wrap;
}

.comm-post__author {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--charcoal, #2d2d2d);
}

.comm-post__time {
  font-size: 0.75rem;
  color: var(--gray-400, #999);
}

.comm-post__lesson-tag {
  font-size: 0.7rem;
  padding: 0.15rem 0.5rem;
  border-radius: 10px;
  background: var(--gray-100, #f0f0f0);
  color: var(--gray-600, #555);
}

.comm-post__lesson-tag--general {
  background: rgba(197,165,90,0.1);
  color: var(--gold, #c5a55a);
}

.comm-post__badges {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.comm-post__pin {
  display: flex;
  align-items: center;
}

.comm-tag {
  font-size: 0.7rem;
  padding: 0.15rem 0.5rem;
  border-radius: 10px;
  font-weight: 600;
}

.comm-tag--question {
  background: rgba(90,143,197,0.12);
  color: #5a8fc5;
}

.comm-tag--win {
  background: rgba(90,197,138,0.12);
  color: #2d9d5e;
}

.comm-tag--resource {
  background: rgba(138,90,197,0.12);
  color: #8a5ac5;
}

.comm-post__content {
  font-size: 0.9rem;
  color: var(--gray-600, #555);
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
  margin-bottom: 0.5rem;
}

.comm-post__actions {
  display: flex;
  gap: 0.75rem;
}

.comm-post__action-btn {
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

.comm-post__action-btn:hover {
  color: var(--charcoal, #2d2d2d);
  background: var(--gray-50, #f8f8f8);
}

.comm-post__action-btn--liked {
  color: var(--gold, #c5a55a);
}

.comm-post__reply-area {
  margin-top: 0.5rem;
  margin-left: 2.5rem;
}

.comm-post__replies {
  margin-top: 0.5rem;
}

/* Empty & Error */
.comm-empty {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--gray-400, #999);
  font-size: 0.95rem;
  background: var(--white, #fff);
  border-radius: var(--radius, 12px);
  box-shadow: var(--shadow, 0 1px 3px rgba(0,0,0,0.08));
}

.comm-error {
  text-align: center;
  padding: 2rem;
  color: var(--red, #ef4444);
  font-size: 0.9rem;
  background: var(--white, #fff);
  border-radius: var(--radius, 12px);
}

.comm-error .btn {
  margin-top: 0.5rem;
}

.comm-load-more {
  display: block;
  margin: 1rem auto 0;
}

/* Skeleton */
.comm-skeleton__post {
  display: flex;
  gap: 0.75rem;
  padding: 1.25rem;
  background: var(--white, #fff);
  border-radius: var(--radius, 12px);
  margin-bottom: 0.75rem;
}

.comm-skeleton__avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--gray-100, #f0f0f0);
  animation: comm-pulse 1.5s ease-in-out infinite;
}

.comm-skeleton__lines {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.comm-skeleton__line {
  height: 12px;
  border-radius: 6px;
  background: var(--gray-100, #f0f0f0);
  animation: comm-pulse 1.5s ease-in-out infinite;
  width: 100%;
}

.comm-skeleton__line--short {
  width: 30%;
}

.comm-skeleton__line--med {
  width: 65%;
}

@keyframes comm-pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}
`;export{Y as default};
