import{u as k,r as l,a as h,j as e}from"./index-h96dWn9f.js";const _={published:"var(--green, #22c55e)",draft:"var(--gold, #c5a55a)",archived:"var(--gray-400, #9ca3af)"},z={course:"Course",quest:"Quest",challenge:"Challenge","meditation-series":"Meditation","podcast-series":"Podcast"};function A(){const r=k(),[m,c]=l.useState(!0),[i,u]=l.useState([]),[o,f]=l.useState("All"),[n,g]=l.useState("");l.useEffect(()=>{b()},[]);function b(){c(!0),h.adminCourses().then(a=>{u(a.courses||[]),c(!1)}).catch(()=>c(!1))}async function v(a,s){a.stopPropagation();try{await h.adminUpdateCourse(s.id,{featured:!s.featured}),u(d=>d.map(t=>t.id===s.id?{...t,featured:!t.featured}:t))}catch(d){console.error("Failed to toggle featured:",d)}}async function y(a,s){a.stopPropagation();const d=s.status==="published"?"archived":"published";try{await h.adminUpdateCourse(s.id,{status:d}),u(t=>t.map(p=>p.id===s.id?{...p,status:d}:p))}catch(t){console.error("Failed to update status:",t)}}if(m)return e.jsxs("div",{className:"page-loading",children:[e.jsx("div",{className:"spinner"}),e.jsx("p",{children:"Loading courses..."})]});const j=["All","Published","Draft","Archived"],x=i.filter(a=>{var s;return o==="All"||((s=a.status)==null?void 0:s.toLowerCase())===o.toLowerCase()}).filter(a=>{var s;return!n||((s=a.title)==null?void 0:s.toLowerCase().includes(n.toLowerCase()))}),w=i.filter(a=>a.status==="published").length,N=i.filter(a=>a.status==="draft").length,C=i.reduce((a,s)=>a+(s.enrollmentCount||0),0);return e.jsxs("div",{className:"admin-courses-page",children:[e.jsx("style",{children:`
        .admin-courses-page { max-width: 1100px; }
        .admin-courses-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .admin-courses-header h2 { margin: 0; font-family: var(--font-heading, 'League Spartan', sans-serif); }
        .admin-courses-header .page-subtitle { margin: 4px 0 0; color: var(--gray-400, #9ca3af); font-size: 14px; }
        .admin-courses-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 12px;
          margin-bottom: 24px;
        }
        .admin-courses-stat {
          background: var(--white, #fff);
          border: 1px solid var(--gray-100, #e5e7eb);
          border-radius: var(--radius, 12px);
          padding: 16px;
          text-align: center;
        }
        .admin-courses-stat__value {
          font-size: 28px;
          font-weight: 700;
          font-family: var(--font-heading, 'League Spartan', sans-serif);
          color: var(--charcoal, #2d2d2d);
        }
        .admin-courses-stat__label {
          font-size: 12px;
          color: var(--gray-400, #9ca3af);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 4px;
        }
        .admin-courses-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .admin-courses-search {
          flex: 1;
          min-width: 200px;
          padding: 10px 14px;
          border: 1px solid var(--gray-100, #e5e7eb);
          border-radius: var(--radius, 12px);
          font-size: 14px;
          font-family: var(--font-body, 'Inter', sans-serif);
          background: var(--white, #fff);
          outline: none;
          transition: border-color 0.2s;
        }
        .admin-courses-search:focus { border-color: var(--gold, #c5a55a); }
        .admin-courses-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          background: var(--white, #fff);
          border-radius: var(--radius, 12px);
          border: 1px solid var(--gray-100, #e5e7eb);
          overflow: hidden;
        }
        .admin-courses-table th {
          text-align: left;
          padding: 12px 16px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--gray-400, #9ca3af);
          background: var(--gray-50, #f9fafb);
          border-bottom: 1px solid var(--gray-100, #e5e7eb);
          font-family: var(--font-body, 'Inter', sans-serif);
        }
        .admin-courses-table td {
          padding: 14px 16px;
          font-size: 14px;
          border-bottom: 1px solid var(--gray-100, #e5e7eb);
          vertical-align: middle;
        }
        .admin-courses-table tr:last-child td { border-bottom: none; }
        .admin-courses-table tbody tr {
          cursor: pointer;
          transition: background 0.15s;
        }
        .admin-courses-table tbody tr:hover { background: var(--gray-50, #f9fafb); }
        .course-thumb {
          width: 48px;
          height: 36px;
          border-radius: 6px;
          object-fit: cover;
          background: var(--gray-100, #e5e7eb);
          display: block;
        }
        .course-thumb--placeholder {
          width: 48px;
          height: 36px;
          border-radius: 6px;
          background: var(--gray-100, #e5e7eb);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gray-400, #9ca3af);
          font-size: 16px;
        }
        .course-title-cell { display: flex; align-items: center; gap: 12px; }
        .course-title-text {
          font-weight: 600;
          color: var(--charcoal, #2d2d2d);
        }
        .course-type-pill {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          background: var(--cream, #faf9f6);
          color: var(--charcoal, #2d2d2d);
          border: 1px solid var(--gray-100, #e5e7eb);
        }
        .course-status-dot {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
        }
        .course-status-dot::before {
          content: '';
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--dot-color);
        }
        .featured-star {
          color: var(--gold, #c5a55a);
          font-size: 16px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 2px;
          opacity: 0.3;
          transition: opacity 0.2s;
        }
        .featured-star--active { opacity: 1; }
        .course-actions {
          display: flex;
          gap: 6px;
        }
        .course-action-btn {
          padding: 6px 10px;
          border: 1px solid var(--gray-100, #e5e7eb);
          border-radius: 6px;
          background: var(--white, #fff);
          cursor: pointer;
          font-size: 12px;
          color: var(--gray-600, #4b5563);
          transition: all 0.15s;
          font-family: var(--font-body, 'Inter', sans-serif);
        }
        .course-action-btn:hover {
          border-color: var(--gold, #c5a55a);
          color: var(--gold, #c5a55a);
        }
        .btn-create-course {
          padding: 10px 20px;
          background: var(--gold, #c5a55a);
          color: var(--white, #fff);
          border: none;
          border-radius: var(--radius, 12px);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          font-family: var(--font-body, 'Inter', sans-serif);
          transition: opacity 0.2s;
          white-space: nowrap;
        }
        .btn-create-course:hover { opacity: 0.9; }
        .empty-state-card {
          text-align: center;
          padding: 48px 24px;
          background: var(--white, #fff);
          border: 1px solid var(--gray-100, #e5e7eb);
          border-radius: var(--radius, 12px);
          color: var(--gray-400, #9ca3af);
        }
        @media (max-width: 768px) {
          .admin-courses-table th:nth-child(5),
          .admin-courses-table td:nth-child(5),
          .admin-courses-table th:nth-child(6),
          .admin-courses-table td:nth-child(6) { display: none; }
        }
        @media (max-width: 600px) {
          .admin-courses-table th:nth-child(3),
          .admin-courses-table td:nth-child(3),
          .admin-courses-table th:nth-child(4),
          .admin-courses-table td:nth-child(4) { display: none; }
          .course-actions { flex-direction: column; }
        }
      `}),e.jsxs("div",{className:"admin-courses-header",children:[e.jsxs("div",{children:[e.jsx("h2",{children:"Course Management"}),e.jsxs("p",{className:"page-subtitle",children:[i.length," courses total"]})]}),e.jsx("button",{className:"btn-create-course",onClick:()=>r("/admin/courses/new"),children:"+ Create Course"})]}),e.jsxs("div",{className:"admin-courses-stats",children:[e.jsxs("div",{className:"admin-courses-stat",children:[e.jsx("div",{className:"admin-courses-stat__value",children:i.length}),e.jsx("div",{className:"admin-courses-stat__label",children:"Total Courses"})]}),e.jsxs("div",{className:"admin-courses-stat",children:[e.jsx("div",{className:"admin-courses-stat__value",style:{color:"var(--green, #22c55e)"},children:w}),e.jsx("div",{className:"admin-courses-stat__label",children:"Published"})]}),e.jsxs("div",{className:"admin-courses-stat",children:[e.jsx("div",{className:"admin-courses-stat__value",style:{color:"var(--gold, #c5a55a)"},children:N}),e.jsx("div",{className:"admin-courses-stat__label",children:"Draft"})]}),e.jsxs("div",{className:"admin-courses-stat",children:[e.jsx("div",{className:"admin-courses-stat__value",children:C}),e.jsx("div",{className:"admin-courses-stat__label",children:"Total Enrollments"})]})]}),e.jsxs("div",{className:"admin-courses-controls",children:[e.jsx("div",{className:"filter-pills",children:j.map(a=>e.jsx("button",{className:`filter-pill ${o===a?"filter-pill--active":""}`,onClick:()=>f(a),children:a},a))}),e.jsx("input",{className:"admin-courses-search",type:"text",placeholder:"Search courses...",value:n,onChange:a=>g(a.target.value)})]}),x.length===0?e.jsxs("div",{className:"empty-state-card",children:[e.jsxs("p",{children:["No courses ",o!=="All"?`with status "${o.toLowerCase()}"`:""," ",n?`matching "${n}"`:"yet","."]}),!n&&o==="All"&&e.jsx("button",{className:"btn-create-course",style:{marginTop:"16px"},onClick:()=>r("/admin/courses/new"),children:"Create Your First Course"})]}):e.jsxs("table",{className:"admin-courses-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Course"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Status"}),e.jsx("th",{children:"Category"}),e.jsx("th",{children:"Lessons"}),e.jsx("th",{children:"Enrolled"}),e.jsx("th",{style:{width:"36px"}}),e.jsx("th",{children:"Actions"})]})}),e.jsx("tbody",{children:x.map(a=>e.jsxs("tr",{onClick:()=>r(`/admin/courses/${a.id}`),children:[e.jsx("td",{children:e.jsxs("div",{className:"course-title-cell",children:[a.thumbnail?e.jsx("img",{src:a.thumbnail,alt:"",className:"course-thumb"}):e.jsx("div",{className:"course-thumb--placeholder",children:e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"}),e.jsx("path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"})]})}),e.jsx("span",{className:"course-title-text",children:a.title})]})}),e.jsx("td",{children:e.jsx("span",{className:"course-type-pill",children:z[a.type]||a.type||"Course"})}),e.jsx("td",{children:e.jsx("span",{className:"course-status-dot",style:{"--dot-color":_[a.status]||"#9ca3af"},children:a.status||"draft"})}),e.jsx("td",{style:{textTransform:"capitalize",color:"var(--gray-600, #4b5563)",fontSize:"13px"},children:a.category||"--"}),e.jsx("td",{style:{textAlign:"center",color:"var(--gray-600, #4b5563)"},children:a.lessonCount||0}),e.jsx("td",{style:{textAlign:"center",color:"var(--gray-600, #4b5563)"},children:a.enrollmentCount||0}),e.jsx("td",{children:e.jsx("button",{className:`featured-star ${a.featured?"featured-star--active":""}`,onClick:s=>v(s,a),title:a.featured?"Remove featured":"Mark as featured",children:"★"})}),e.jsx("td",{children:e.jsxs("div",{className:"course-actions",children:[e.jsx("button",{className:"course-action-btn",onClick:s=>{s.stopPropagation(),r(`/admin/courses/${a.id}`)},children:"Edit"}),e.jsx("button",{className:"course-action-btn",onClick:s=>{s.stopPropagation(),r(`/learn/${a.slug}`)},children:"View"}),e.jsx("button",{className:"course-action-btn",onClick:s=>{s.stopPropagation(),r(`/admin/courses/${a.id}/analytics`)},children:"Analytics"}),e.jsx("button",{className:"course-action-btn",onClick:s=>y(s,a),children:a.status==="published"?"Archive":"Publish"})]})})]},a.id))})]})]})}export{A as default};
