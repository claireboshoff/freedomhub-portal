import{u as I,r as o,a as O,j as e}from"./index-DYHhggTF.js";const Y=["All","Business","Marketing","Leadership","Mindset","Finance","Wellness"],$=["All","Video","Audio","Article","Meditation"],f="cs__recent_searches",F=5;function v(){try{return JSON.parse(localStorage.getItem(f)||"[]")}catch{return[]}}function V(n){if(!n.trim())return;const a=v().filter(t=>t!==n);a.unshift(n),localStorage.setItem(f,JSON.stringify(a.slice(0,F)))}function G(){localStorage.removeItem(f)}function H({type:n}){const a=(n||"").toLowerCase();return a==="video"?e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polygon",{points:"5 3 19 12 5 21 5 3"})}):a==="audio"?e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M9 18V5l12-2v13"}),e.jsx("circle",{cx:"6",cy:"18",r:"3"}),e.jsx("circle",{cx:"18",cy:"16",r:"3"})]}):a==="meditation"?e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("path",{d:"M12 8v4l3 3"})]}):e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),e.jsx("polyline",{points:"14 2 14 8 20 8"}),e.jsx("line",{x1:"16",y1:"13",x2:"8",y2:"13"}),e.jsx("line",{x1:"16",y1:"17",x2:"8",y2:"17"}),e.jsx("polyline",{points:"10 9 9 9 8 9"})]})}function m(){return e.jsxs("div",{className:"cs__skeleton-card",children:[e.jsx("div",{className:"cs__skeleton-line cs__skeleton-line--title"}),e.jsx("div",{className:"cs__skeleton-line cs__skeleton-line--text"}),e.jsx("div",{className:"cs__skeleton-line cs__skeleton-line--short"})]})}function K(){var k,w,N,C,S,L;const n=I(),a=o.useRef(null),t=o.useRef(null),[i,d]=o.useState(""),[h,z]=o.useState("All"),[x,R]=o.useState("All"),[r,l]=o.useState(null),[p,c]=o.useState(!1),[y,b]=o.useState(v());o.useEffect(()=>{var s;(s=a.current)==null||s.focus()},[]);const j=o.useCallback((s,_,g)=>{if(!s.trim()){l(null),c(!1);return}c(!0);const u={};_&&_!=="All"&&(u.category=_),g&&g!=="All"&&(u.contentType=g),O.searchCourses(s,u).then(W=>{l(W),V(s.trim()),b(v())}).catch(()=>{l({courses:[],lessons:[]})}).finally(()=>c(!1))},[]);o.useEffect(()=>{if(clearTimeout(t.current),!i.trim()){l(null),c(!1);return}return c(!0),t.current=setTimeout(()=>{j(i,h,x)},300),()=>clearTimeout(t.current)},[i,h,x,j]);const T=s=>{d(s)},E=()=>{G(),b([])},M=r&&(((k=r.courses)==null?void 0:k.length)>0||((w=r.lessons)==null?void 0:w.length)>0),A=r&&((N=r.courses)==null?void 0:N.length)===0&&((C=r.lessons)==null?void 0:C.length)===0,B=!i.trim()&&y.length>0;return e.jsxs("div",{className:"cs__page",children:[e.jsx("style",{children:`
        .cs__page {
          max-width: 860px;
          margin: 0 auto;
        }
        .cs__back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--gray-500);
          font-size: 0.8125rem;
          font-weight: 500;
          cursor: pointer;
          background: none;
          border: none;
          font-family: var(--font-body);
          margin-bottom: 20px;
          transition: color var(--transition);
        }
        .cs__back:hover { color: var(--charcoal); }
        .cs__search-wrap {
          position: relative;
          margin-bottom: 20px;
        }
        .cs__search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--gray-400);
          pointer-events: none;
        }
        .cs__search-input {
          width: 100%;
          padding: 14px 16px 14px 48px;
          border: 2px solid var(--gray-200);
          border-radius: var(--radius);
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--charcoal);
          background: var(--white);
          transition: border-color var(--transition), box-shadow var(--transition);
          box-shadow: var(--shadow-sm);
        }
        .cs__search-input:focus {
          outline: none;
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(197,165,90,0.15);
        }
        .cs__search-input::placeholder { color: var(--gray-400); }

        /* Filter chips */
        .cs__filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }
        .cs__filter-label {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--gray-500);
          display: flex;
          align-items: center;
          margin-right: 4px;
        }
        .cs__chip {
          padding: 5px 14px;
          border: 1px solid var(--gray-200);
          border-radius: 20px;
          background: var(--white);
          font-size: 0.8125rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition);
          font-family: var(--font-body);
          color: var(--gray-600);
        }
        .cs__chip:hover { border-color: var(--gold); }
        .cs__chip--active {
          background: var(--charcoal);
          color: var(--white);
          border-color: var(--charcoal);
        }

        /* Recent searches */
        .cs__recent {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius);
          padding: 20px;
          box-shadow: var(--shadow-sm);
        }
        .cs__recent-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .cs__recent-header h4 {
          font-family: var(--font-heading);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--gray-600);
          margin: 0;
        }
        .cs__recent-clear {
          background: none;
          border: none;
          color: var(--gray-400);
          font-size: 0.75rem;
          cursor: pointer;
          font-family: var(--font-body);
        }
        .cs__recent-clear:hover { color: var(--red); }
        .cs__recent-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .cs__recent-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: var(--gray-50);
          border: 1px solid var(--gray-200);
          border-radius: 20px;
          font-size: 0.8125rem;
          color: var(--gray-600);
          cursor: pointer;
          transition: all var(--transition);
          font-family: var(--font-body);
        }
        .cs__recent-item:hover {
          border-color: var(--gold);
          background: rgba(197,165,90,0.06);
        }

        /* Section headers */
        .cs__section {
          margin-bottom: 28px;
        }
        .cs__section-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }
        .cs__section-header h3 {
          font-family: var(--font-heading);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--charcoal);
          margin: 0;
        }
        .cs__section-count {
          font-size: 0.75rem;
          font-weight: 600;
          background: var(--gray-100);
          color: var(--gray-500);
          padding: 2px 8px;
          border-radius: 12px;
        }

        /* Course result cards */
        .cs__course-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .cs__course-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius);
          padding: 18px 20px;
          cursor: pointer;
          transition: all var(--transition);
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .cs__course-card:hover {
          border-color: var(--gold);
          box-shadow: var(--shadow-md);
          transform: translateY(-1px);
        }
        .cs__course-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: rgba(197,165,90,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--gold);
        }
        .cs__course-body {
          flex: 1;
          min-width: 0;
        }
        .cs__course-title {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 600;
          color: var(--charcoal);
          margin: 0 0 4px;
        }
        .cs__course-desc {
          font-size: 0.8125rem;
          color: var(--gray-500);
          line-height: 1.5;
          margin: 0 0 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .cs__course-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .cs__category-badge {
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          padding: 2px 8px;
          border-radius: 4px;
          background: rgba(197,165,90,0.12);
          color: var(--gold-dark);
        }
        .cs__lesson-count {
          font-size: 0.75rem;
          color: var(--gray-400);
        }
        .cs__enrolled-badge {
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 4px;
          background: var(--green-light);
          color: #065f46;
        }

        /* Lesson result cards */
        .cs__lesson-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .cs__lesson-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius);
          padding: 14px 18px;
          cursor: pointer;
          transition: all var(--transition);
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .cs__lesson-card:hover {
          border-color: var(--gold);
          box-shadow: var(--shadow-md);
          transform: translateY(-1px);
        }
        .cs__lesson-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: var(--gray-50);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--gray-500);
        }
        .cs__lesson-body {
          flex: 1;
          min-width: 0;
        }
        .cs__lesson-title {
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--charcoal);
          margin: 0 0 2px;
        }
        .cs__lesson-course {
          font-size: 0.75rem;
          color: var(--gray-400);
        }
        .cs__lesson-duration {
          font-size: 0.75rem;
          color: var(--gray-400);
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* No results */
        .cs__no-results {
          text-align: center;
          padding: 48px 24px;
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius);
          box-shadow: var(--shadow-sm);
        }
        .cs__no-results-icon {
          color: var(--gray-300);
          margin-bottom: 16px;
        }
        .cs__no-results h3 {
          font-family: var(--font-heading);
          font-size: 1.125rem;
          color: var(--charcoal);
          margin: 0 0 8px;
        }
        .cs__no-results p {
          color: var(--gray-500);
          font-size: 0.875rem;
          margin: 0 0 20px;
          line-height: 1.5;
        }
        .cs__suggestions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }
        .cs__suggestion {
          padding: 6px 14px;
          background: var(--gray-50);
          border: 1px solid var(--gray-200);
          border-radius: 20px;
          font-size: 0.8125rem;
          color: var(--gray-600);
          cursor: pointer;
          transition: all var(--transition);
          font-family: var(--font-body);
        }
        .cs__suggestion:hover {
          border-color: var(--gold);
          background: rgba(197,165,90,0.06);
        }

        /* Skeleton loading */
        .cs__skeleton-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .cs__skeleton-card {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius);
          padding: 20px;
          box-shadow: var(--shadow-sm);
        }
        .cs__skeleton-line {
          height: 14px;
          background: var(--gray-100);
          border-radius: 4px;
          animation: cs__pulse 1.5s ease-in-out infinite;
        }
        .cs__skeleton-line--title {
          width: 55%;
          height: 16px;
          margin-bottom: 10px;
        }
        .cs__skeleton-line--text {
          width: 80%;
          margin-bottom: 8px;
        }
        .cs__skeleton-line--short {
          width: 35%;
        }
        @keyframes cs__pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .cs__course-card {
            flex-direction: column;
            gap: 10px;
          }
          .cs__course-icon {
            width: 36px;
            height: 36px;
          }
          .cs__filters {
            gap: 6px;
          }
          .cs__chip {
            padding: 4px 10px;
            font-size: 0.75rem;
          }
        }
      `}),e.jsxs("button",{className:"cs__back",onClick:()=>n("/learn"),children:[e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"15 18 9 12 15 6"})}),"Back to Academy"]}),e.jsxs("div",{className:"page-header",children:[e.jsx("h2",{children:"Search Courses"}),e.jsx("p",{className:"page-subtitle",children:"Find courses and lessons across the entire academy."})]}),e.jsxs("div",{className:"cs__search-wrap",children:[e.jsx("div",{className:"cs__search-icon",children:e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"11",cy:"11",r:"8"}),e.jsx("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]})}),e.jsx("input",{ref:a,type:"text",className:"cs__search-input",placeholder:"Search courses, lessons, topics...",value:i,onChange:s=>d(s.target.value)})]}),e.jsxs("div",{className:"cs__filters",children:[e.jsx("span",{className:"cs__filter-label",children:"Category:"}),Y.map(s=>e.jsx("button",{className:`cs__chip${h===s?" cs__chip--active":""}`,onClick:()=>z(s),children:s},s))]}),e.jsxs("div",{className:"cs__filters",children:[e.jsx("span",{className:"cs__filter-label",children:"Type:"}),$.map(s=>e.jsx("button",{className:`cs__chip${x===s?" cs__chip--active":""}`,onClick:()=>R(s),children:s},s))]}),B&&e.jsxs("div",{className:"cs__recent",children:[e.jsxs("div",{className:"cs__recent-header",children:[e.jsx("h4",{children:"Recent Searches"}),e.jsx("button",{className:"cs__recent-clear",onClick:E,children:"Clear all"})]}),e.jsx("div",{className:"cs__recent-list",children:y.map(s=>e.jsxs("button",{className:"cs__recent-item",onClick:()=>T(s),children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("polyline",{points:"1 4 1 10 7 10"}),e.jsx("path",{d:"M3.51 15a9 9 0 1 0 2.13-9.36L1 10"})]}),s]},s))})]}),p&&e.jsxs("div",{className:"cs__skeleton-list",children:[e.jsx(m,{}),e.jsx(m,{}),e.jsx(m,{})]}),!p&&M&&e.jsxs(e.Fragment,{children:[((S=r.courses)==null?void 0:S.length)>0&&e.jsxs("div",{className:"cs__section",children:[e.jsxs("div",{className:"cs__section-header",children:[e.jsx("h3",{children:"Courses"}),e.jsx("span",{className:"cs__section-count",children:r.courses.length})]}),e.jsx("div",{className:"cs__course-list",children:r.courses.map(s=>e.jsxs("div",{className:"cs__course-card",onClick:()=>n(`/learn/${s.slug}`),children:[e.jsx("div",{className:"cs__course-icon",children:e.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"}),e.jsx("path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"})]})}),e.jsxs("div",{className:"cs__course-body",children:[e.jsx("h4",{className:"cs__course-title",children:s.title}),s.description&&e.jsx("p",{className:"cs__course-desc",children:s.description}),e.jsxs("div",{className:"cs__course-meta",children:[s.category&&e.jsx("span",{className:"cs__category-badge",children:s.category}),s.lessonCount!=null&&e.jsxs("span",{className:"cs__lesson-count",children:[s.lessonCount," lesson",s.lessonCount!==1?"s":""]}),s.enrolled&&e.jsx("span",{className:"cs__enrolled-badge",children:"Enrolled"})]})]})]},s.id))})]}),((L=r.lessons)==null?void 0:L.length)>0&&e.jsxs("div",{className:"cs__section",children:[e.jsxs("div",{className:"cs__section-header",children:[e.jsx("h3",{children:"Lessons"}),e.jsx("span",{className:"cs__section-count",children:r.lessons.length})]}),e.jsx("div",{className:"cs__lesson-list",children:r.lessons.map(s=>e.jsxs("div",{className:"cs__lesson-card",onClick:()=>n(`/learn/${s.courseSlug}/lesson/${s.id}`),children:[e.jsx("div",{className:"cs__lesson-icon",children:e.jsx(H,{type:s.contentType})}),e.jsxs("div",{className:"cs__lesson-body",children:[e.jsx("div",{className:"cs__lesson-title",children:s.title}),e.jsx("div",{className:"cs__lesson-course",children:s.courseTitle})]}),s.duration&&e.jsx("span",{className:"cs__lesson-duration",children:s.duration})]},s.id))})]})]}),!p&&A&&e.jsxs("div",{className:"cs__no-results",children:[e.jsx("div",{className:"cs__no-results-icon",children:e.jsxs("svg",{width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"11",cy:"11",r:"8"}),e.jsx("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"}),e.jsx("line",{x1:"8",y1:"8",x2:"14",y2:"14"}),e.jsx("line",{x1:"14",y1:"8",x2:"8",y2:"14"})]})}),e.jsx("h3",{children:"No results found"}),e.jsxs("p",{children:['We could not find anything matching "',i,'". Try a different keyword or browse by category.']}),e.jsx("div",{className:"cs__suggestions",children:["Leadership","Marketing","Mindset","Business"].map(s=>e.jsx("button",{className:"cs__suggestion",onClick:()=>d(s),children:s},s))})]})]})}export{K as default};
