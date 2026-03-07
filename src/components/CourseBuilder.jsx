import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

function slugify(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const TYPES = ['course', 'quest', 'challenge', 'meditation-series', 'podcast-series'];
const CATEGORIES = ['business', 'wellness', 'marketing', 'mindset', 'skills', 'finance', 'coaching'];
const STATUSES = ['draft', 'published', 'archived'];
const VISIBILITY = ['private', 'unlisted', 'public'];
const CONTENT_TYPES = ['video', 'audio', 'text', 'mixed'];
const QUESTION_TYPES = ['multiple-choice', 'true-false', 'open-ended'];

export default function CourseBuilder() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const isEdit = !!courseId;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'saved' | 'error'
  const [course, setCourse] = useState({
    title: '', slug: '', description: '', type: 'course', category: 'business',
    status: 'draft', visibility: 'private', priceZAR: 0, priceUSD: 0,
    featured: false, dripEnabled: false, dripIntervalDays: 7, estimatedDuration: '',
  });
  const [modules, setModules] = useState([]);
  const [expandedModule, setExpandedModule] = useState(null);
  const [showAddModule, setShowAddModule] = useState(false);
  const [newModule, setNewModule] = useState({ title: '', description: '' });
  const [editingLesson, setEditingLesson] = useState(null); // { moduleId, lesson?, index? }
  const [lessonForm, setLessonForm] = useState(null);
  const [editingQuiz, setEditingQuiz] = useState(null); // lessonId
  const [quizForm, setQuizForm] = useState(null);

  useEffect(() => {
    if (isEdit) {
      // Load course data + modules + lessons
      Promise.all([
        api.adminCourses(),
      ]).then(([data]) => {
        const c = (data.courses || []).find((x) => x.id === courseId);
        if (c) {
          setCourse({
            title: c.title || '', slug: c.slug || '', description: c.description || '',
            type: c.type || 'course', category: c.category || 'business',
            status: c.status || 'draft', visibility: c.visibility || 'private',
            priceZAR: c.priceZAR || 0, priceUSD: c.priceUSD || 0,
            featured: c.featured || false, dripEnabled: c.dripEnabled || false,
            dripIntervalDays: c.dripIntervalDays || 7, estimatedDuration: c.estimatedDuration || '',
          });
          setModules(c.modules || []);
        }
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [courseId, isEdit]);

  const handleCourseChange = useCallback((field, value) => {
    setCourse((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'title' && (!prev.slug || prev.slug === slugify(prev.title))) {
        updated.slug = slugify(value);
      }
      return updated;
    });
    setSaveStatus(null);
  }, []);

  async function saveCourse() {
    setSaving(true);
    setSaveStatus(null);
    try {
      if (isEdit) {
        await api.adminUpdateCourse(courseId, course);
      } else {
        const result = await api.adminCreateCourse(course);
        if (result.courseId) {
          navigate(`/admin/courses/${result.courseId}`, { replace: true });
        }
      }
      setSaveStatus('saved');
    } catch (err) {
      console.error('Save failed:', err);
      setSaveStatus('error');
    }
    setSaving(false);
  }

  async function addModule() {
    if (!newModule.title.trim()) return;
    setSaving(true);
    try {
      const result = await api.adminCreateModule(courseId, {
        title: newModule.title,
        description: newModule.description,
        sortOrder: modules.length + 1,
      });
      setModules((prev) => [...prev, {
        id: result.moduleId || Date.now().toString(),
        title: newModule.title,
        description: newModule.description,
        sortOrder: modules.length + 1,
        lessons: [],
      }]);
      setNewModule({ title: '', description: '' });
      setShowAddModule(false);
    } catch (err) {
      console.error('Add module failed:', err);
    }
    setSaving(false);
  }

  async function moveModule(index, direction) {
    const newModules = [...modules];
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= newModules.length) return;
    [newModules[index], newModules[swapIndex]] = [newModules[swapIndex], newModules[index]];
    newModules.forEach((m, i) => { m.sortOrder = i + 1; });
    setModules(newModules);
    try {
      await api.adminUpdateModule(newModules[index].id, { sortOrder: newModules[index].sortOrder });
      await api.adminUpdateModule(newModules[swapIndex].id, { sortOrder: newModules[swapIndex].sortOrder });
    } catch (err) {
      console.error('Reorder failed:', err);
    }
  }

  function openLessonForm(moduleId, lesson, index) {
    setEditingLesson({ moduleId, index });
    setLessonForm(lesson ? { ...lesson } : {
      title: '', contentType: 'video', status: 'draft', durationMinutes: 0,
      videoUrl: '', audioUrl: '', writtenContent: '', reflectionPrompt: '',
      quizEnabled: false, dripDay: 0, sortOrder: 0,
    });
  }

  async function saveLesson() {
    if (!lessonForm || !editingLesson) return;
    const { moduleId, index } = editingLesson;
    setSaving(true);
    try {
      if (index !== undefined && index !== null) {
        // Edit existing
        const mod = modules.find((m) => m.id === moduleId);
        const existing = mod?.lessons?.[index];
        if (existing?.id) {
          await api.adminUpdateLesson(existing.id, lessonForm);
        }
        setModules((prev) => prev.map((m) => {
          if (m.id !== moduleId) return m;
          const lessons = [...(m.lessons || [])];
          lessons[index] = { ...lessons[index], ...lessonForm };
          return { ...m, lessons };
        }));
      } else {
        // Create new
        const result = await api.adminCreateLesson(moduleId, {
          courseId,
          ...lessonForm,
          sortOrder: (modules.find((m) => m.id === moduleId)?.lessons?.length || 0) + 1,
        });
        setModules((prev) => prev.map((m) => {
          if (m.id !== moduleId) return m;
          return {
            ...m,
            lessons: [...(m.lessons || []), { id: result.lessonId || Date.now().toString(), ...lessonForm }],
          };
        }));
      }
      setEditingLesson(null);
      setLessonForm(null);
    } catch (err) {
      console.error('Save lesson failed:', err);
    }
    setSaving(false);
  }

  async function moveLesson(moduleId, index, direction) {
    setModules((prev) => prev.map((m) => {
      if (m.id !== moduleId) return m;
      const lessons = [...(m.lessons || [])];
      const swapIndex = index + direction;
      if (swapIndex < 0 || swapIndex >= lessons.length) return m;
      [lessons[index], lessons[swapIndex]] = [lessons[swapIndex], lessons[index]];
      lessons.forEach((l, i) => { l.sortOrder = i + 1; });
      return { ...m, lessons };
    }));
  }

  function openQuizBuilder(lessonId) {
    setEditingQuiz(lessonId);
    // Find existing quiz data
    let existingQuiz = null;
    for (const m of modules) {
      for (const l of (m.lessons || [])) {
        if (l.id === lessonId && l.quiz) {
          existingQuiz = l.quiz;
          break;
        }
      }
    }
    setQuizForm(existingQuiz || {
      questions: [],
      passScore: 70,
      type: 'practice',
    });
  }

  function addQuestion() {
    setQuizForm((prev) => ({
      ...prev,
      questions: [...(prev.questions || []), {
        type: 'multiple-choice',
        question: '',
        options: ['', '', '', ''],
        correctIndex: 0,
        explanation: '',
        points: 10,
      }],
    }));
  }

  function updateQuestion(qi, field, value) {
    setQuizForm((prev) => {
      const questions = [...prev.questions];
      questions[qi] = { ...questions[qi], [field]: value };
      return { ...prev, questions };
    });
  }

  function updateQuestionOption(qi, oi, value) {
    setQuizForm((prev) => {
      const questions = [...prev.questions];
      const options = [...questions[qi].options];
      options[oi] = value;
      questions[qi] = { ...questions[qi], options };
      return { ...prev, questions };
    });
  }

  function removeQuestion(qi) {
    setQuizForm((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== qi),
    }));
  }

  async function saveQuiz() {
    if (!quizForm || !editingQuiz) return;
    setSaving(true);
    try {
      // Check if quiz already has an id
      let existingQuizId = null;
      for (const m of modules) {
        for (const l of (m.lessons || [])) {
          if (l.id === editingQuiz && l.quiz?.id) {
            existingQuizId = l.quiz.id;
          }
        }
      }
      const quizData = {
        questions: JSON.stringify(quizForm.questions),
        passScore: quizForm.passScore,
        type: quizForm.type,
      };
      if (existingQuizId) {
        await api.adminUpdateQuiz(existingQuizId, quizData);
      } else {
        const result = await api.adminCreateQuiz(editingQuiz, quizData);
        quizData.id = result.quizId || Date.now().toString();
      }
      // Update local state
      setModules((prev) => prev.map((m) => ({
        ...m,
        lessons: (m.lessons || []).map((l) => {
          if (l.id !== editingQuiz) return l;
          return { ...l, quiz: { ...quizForm, id: existingQuizId || quizData.id } };
        }),
      })));
      setEditingQuiz(null);
      setQuizForm(null);
    } catch (err) {
      console.error('Save quiz failed:', err);
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner" />
        <p>Loading course...</p>
      </div>
    );
  }

  const contentTypeIcon = (type) => {
    switch (type) {
      case 'video': return '▶';
      case 'audio': return '♫';
      case 'text': return '¶';
      default: return '◈';
    }
  };

  return (
    <div className="course-builder-page">
      <style>{`
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
      `}</style>

      <button className="cb-back" onClick={() => navigate('/admin/courses')}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
        Back to Courses
      </button>

      <div className="cb-header">
        <h2>{isEdit ? 'Edit Course' : 'Create Course'}</h2>
        <div className="cb-save-area">
          {saving && <span className="cb-save-status cb-save-status--saving">Saving...</span>}
          {saveStatus === 'saved' && <span className="cb-save-status cb-save-status--saved">Saved</span>}
          {saveStatus === 'error' && <span className="cb-save-status cb-save-status--error">Save failed</span>}
          <button className="btn-gold" onClick={saveCourse} disabled={saving || !course.title.trim()}>
            {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Course'}
          </button>
        </div>
      </div>

      {/* Course Details */}
      <div className="cb-section">
        <h3>Course Details</h3>

        <div className="cb-field">
          <label>Title</label>
          <input type="text" value={course.title} onChange={(e) => handleCourseChange('title', e.target.value)} placeholder="e.g. Business Growth Masterclass" />
        </div>

        <div className="cb-field">
          <label>Slug</label>
          <input type="text" value={course.slug} onChange={(e) => handleCourseChange('slug', e.target.value)} placeholder="auto-generated-from-title" />
        </div>

        <div className="cb-field">
          <label>Description</label>
          <textarea value={course.description} onChange={(e) => handleCourseChange('description', e.target.value)} placeholder="Course description..." />
        </div>

        <div className="cb-row">
          <div className="cb-field">
            <label>Type</label>
            <select value={course.type} onChange={(e) => handleCourseChange('type', e.target.value)}>
              {TYPES.map((t) => <option key={t} value={t}>{t.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</option>)}
            </select>
          </div>
          <div className="cb-field">
            <label>Category</label>
            <select value={course.category} onChange={(e) => handleCourseChange('category', e.target.value)}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
          </div>
        </div>

        <div className="cb-row-3">
          <div className="cb-field">
            <label>Status</label>
            <select value={course.status} onChange={(e) => handleCourseChange('status', e.target.value)}>
              {STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
          </div>
          <div className="cb-field">
            <label>Visibility</label>
            <select value={course.visibility} onChange={(e) => handleCourseChange('visibility', e.target.value)}>
              {VISIBILITY.map((v) => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
            </select>
          </div>
          <div className="cb-field">
            <label>Estimated Duration</label>
            <input type="text" value={course.estimatedDuration} onChange={(e) => handleCourseChange('estimatedDuration', e.target.value)} placeholder="e.g. 4 weeks" />
          </div>
        </div>

        <div className="cb-row">
          <div className="cb-field">
            <label>Price (ZAR)</label>
            <input type="number" min="0" value={course.priceZAR} onChange={(e) => handleCourseChange('priceZAR', Number(e.target.value))} />
          </div>
          <div className="cb-field">
            <label>Price (USD)</label>
            <input type="number" min="0" value={course.priceUSD} onChange={(e) => handleCourseChange('priceUSD', Number(e.target.value))} />
          </div>
        </div>

        <label className="cb-checkbox">
          <input type="checkbox" checked={course.featured} onChange={(e) => handleCourseChange('featured', e.target.checked)} />
          <span>Featured Course</span>
        </label>

        <label className="cb-checkbox">
          <input type="checkbox" checked={course.dripEnabled} onChange={(e) => handleCourseChange('dripEnabled', e.target.checked)} />
          <span>Enable Drip Content</span>
        </label>

        {course.dripEnabled && (
          <div className="cb-field" style={{ maxWidth: '200px' }}>
            <label>Drip Interval (Days)</label>
            <input type="number" min="1" value={course.dripIntervalDays} onChange={(e) => handleCourseChange('dripIntervalDays', Number(e.target.value))} />
          </div>
        )}
      </div>

      {/* Modules Section - only shown when editing */}
      {isEdit && (
        <div className="cb-section">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ margin: 0 }}>Modules & Lessons</h3>
            <button className="btn-outline" onClick={() => setShowAddModule(true)}>+ Add Module</button>
          </div>

          {modules.length === 0 && !showAddModule && (
            <div className="cb-no-lessons">
              <p>No modules yet. Add your first module to start building the course structure.</p>
            </div>
          )}

          {modules.map((mod, mi) => (
            <div key={mod.id} className="cb-module">
              <div className="cb-module-header" onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}>
                <span className="cb-module-order">{mi + 1}</span>
                <span className="cb-module-title">{mod.title}</span>
                <span className="cb-module-meta">{(mod.lessons || []).length} lessons</span>
                <div className="cb-module-arrows" onClick={(e) => e.stopPropagation()}>
                  <button className="cb-arrow-btn" onClick={() => moveModule(mi, -1)} disabled={mi === 0} title="Move up">&#9650;</button>
                  <button className="cb-arrow-btn" onClick={() => moveModule(mi, 1)} disabled={mi === modules.length - 1} title="Move down">&#9660;</button>
                </div>
                <svg className={`cb-chevron ${expandedModule === mod.id ? 'cb-chevron--open' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>

              {expandedModule === mod.id && (
                <div className="cb-module-body">
                  {mod.description && <p style={{ fontSize: '13px', color: 'var(--gray-400)', margin: '0 0 12px' }}>{mod.description}</p>}

                  {(mod.lessons || []).length === 0 && (
                    <div className="cb-no-lessons">No lessons in this module yet.</div>
                  )}

                  {(mod.lessons || []).map((lesson, li) => (
                    <div key={lesson.id || li} className="cb-lesson">
                      <div className="cb-lesson-icon">{contentTypeIcon(lesson.contentType)}</div>
                      <span className="cb-lesson-title">{lesson.title}</span>
                      <span className={`cb-lesson-status cb-lesson-status--${lesson.status || 'draft'}`}>
                        {lesson.status || 'draft'}
                      </span>
                      {lesson.durationMinutes > 0 && (
                        <span className="cb-lesson-dur">{lesson.durationMinutes}m</span>
                      )}
                      {lesson.quizEnabled && (
                        <button className="btn-ghost btn-sm" onClick={() => openQuizBuilder(lesson.id)}>Quiz</button>
                      )}
                      <div className="cb-lesson-actions">
                        <button className="cb-arrow-btn" style={{ width: '24px', height: '24px', fontSize: '11px' }} onClick={() => moveLesson(mod.id, li, -1)} disabled={li === 0}>&#9650;</button>
                        <button className="cb-arrow-btn" style={{ width: '24px', height: '24px', fontSize: '11px' }} onClick={() => moveLesson(mod.id, li, 1)} disabled={li === (mod.lessons || []).length - 1}>&#9660;</button>
                        <button className="btn-ghost btn-sm" onClick={() => openLessonForm(mod.id, lesson, li)}>Edit</button>
                      </div>
                    </div>
                  ))}

                  <button className="btn-outline btn-sm" style={{ marginTop: '8px' }} onClick={() => openLessonForm(mod.id)}>
                    + Add Lesson
                  </button>
                </div>
              )}
            </div>
          ))}

          {showAddModule && (
            <div className="cb-inline-form">
              <h4>New Module</h4>
              <div className="cb-field">
                <label>Module Title</label>
                <input type="text" value={newModule.title} onChange={(e) => setNewModule((p) => ({ ...p, title: e.target.value }))} placeholder="e.g. Getting Started" />
              </div>
              <div className="cb-field">
                <label>Description (optional)</label>
                <input type="text" value={newModule.description} onChange={(e) => setNewModule((p) => ({ ...p, description: e.target.value }))} placeholder="Brief module description" />
              </div>
              <div className="cb-form-actions">
                <button className="btn-gold btn-sm" onClick={addModule} disabled={saving || !newModule.title.trim()}>
                  {saving ? 'Adding...' : 'Add Module'}
                </button>
                <button className="btn-ghost" onClick={() => { setShowAddModule(false); setNewModule({ title: '', description: '' }); }}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Lesson Editor Modal */}
      {lessonForm && (
        <div className="cb-lesson-overlay" onClick={() => { setEditingLesson(null); setLessonForm(null); }}>
          <div className="cb-lesson-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editingLesson?.index !== undefined && editingLesson?.index !== null ? 'Edit Lesson' : 'Add Lesson'}</h3>

            <div className="cb-field">
              <label>Title</label>
              <input type="text" value={lessonForm.title} onChange={(e) => setLessonForm((p) => ({ ...p, title: e.target.value }))} placeholder="Lesson title" />
            </div>

            <div className="cb-row">
              <div className="cb-field">
                <label>Content Type</label>
                <select value={lessonForm.contentType} onChange={(e) => setLessonForm((p) => ({ ...p, contentType: e.target.value }))}>
                  {CONTENT_TYPES.map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                </select>
              </div>
              <div className="cb-field">
                <label>Status</label>
                <select value={lessonForm.status} onChange={(e) => setLessonForm((p) => ({ ...p, status: e.target.value }))}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div className="cb-row">
              <div className="cb-field">
                <label>Duration (Minutes)</label>
                <input type="number" min="0" value={lessonForm.durationMinutes} onChange={(e) => setLessonForm((p) => ({ ...p, durationMinutes: Number(e.target.value) }))} />
              </div>
              {course.dripEnabled && (
                <div className="cb-field">
                  <label>Drip Day</label>
                  <input type="number" min="0" value={lessonForm.dripDay} onChange={(e) => setLessonForm((p) => ({ ...p, dripDay: Number(e.target.value) }))} />
                </div>
              )}
            </div>

            {(lessonForm.contentType === 'video' || lessonForm.contentType === 'mixed') && (
              <div className="cb-field">
                <label>Video URL</label>
                <input type="text" value={lessonForm.videoUrl} onChange={(e) => setLessonForm((p) => ({ ...p, videoUrl: e.target.value }))} placeholder="https://..." />
              </div>
            )}

            {(lessonForm.contentType === 'audio' || lessonForm.contentType === 'mixed') && (
              <div className="cb-field">
                <label>Audio URL</label>
                <input type="text" value={lessonForm.audioUrl} onChange={(e) => setLessonForm((p) => ({ ...p, audioUrl: e.target.value }))} placeholder="https://..." />
              </div>
            )}

            <div className="cb-field">
              <label>Written Content</label>
              <textarea value={lessonForm.writtenContent} onChange={(e) => setLessonForm((p) => ({ ...p, writtenContent: e.target.value }))} placeholder="Lesson content (plain text or markdown)..." style={{ minHeight: '120px' }} />
            </div>

            <div className="cb-field">
              <label>Reflection Prompt</label>
              <textarea value={lessonForm.reflectionPrompt} onChange={(e) => setLessonForm((p) => ({ ...p, reflectionPrompt: e.target.value }))} placeholder="Optional reflection question..." style={{ minHeight: '60px' }} />
            </div>

            <label className="cb-checkbox">
              <input type="checkbox" checked={lessonForm.quizEnabled} onChange={(e) => setLessonForm((p) => ({ ...p, quizEnabled: e.target.checked }))} />
              <span>Quiz Enabled</span>
            </label>

            <div className="cb-form-actions">
              <button className="btn-gold" onClick={saveLesson} disabled={saving || !lessonForm.title.trim()}>
                {saving ? 'Saving...' : editingLesson?.index !== undefined && editingLesson?.index !== null ? 'Update Lesson' : 'Add Lesson'}
              </button>
              <button className="btn-ghost" onClick={() => { setEditingLesson(null); setLessonForm(null); }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Builder Modal */}
      {quizForm && editingQuiz && (
        <div className="cb-lesson-overlay" onClick={() => { setEditingQuiz(null); setQuizForm(null); }}>
          <div className="cb-lesson-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Quiz Builder</h3>

            <div className="cb-row">
              <div className="cb-field">
                <label>Quiz Type</label>
                <select value={quizForm.type} onChange={(e) => setQuizForm((p) => ({ ...p, type: e.target.value }))}>
                  <option value="practice">Practice</option>
                  <option value="graded">Graded</option>
                </select>
              </div>
              <div className="cb-field">
                <label>Pass Score (%)</label>
                <input type="number" min="0" max="100" value={quizForm.passScore} onChange={(e) => setQuizForm((p) => ({ ...p, passScore: Number(e.target.value) }))} />
              </div>
            </div>

            <div style={{ marginTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <strong style={{ fontSize: '14px' }}>Questions ({(quizForm.questions || []).length})</strong>
                <button className="btn-outline btn-sm" onClick={addQuestion}>+ Add Question</button>
              </div>

              {(quizForm.questions || []).map((q, qi) => (
                <div key={qi} className="cb-question">
                  <div className="cb-question-header">
                    <span className="cb-question-num">Q{qi + 1}</span>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <select style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--gray-100)', fontSize: '12px' }} value={q.type} onChange={(e) => updateQuestion(qi, 'type', e.target.value)}>
                        {QUESTION_TYPES.map((t) => <option key={t} value={t}>{t.replace(/-/g, ' ')}</option>)}
                      </select>
                      <input type="number" style={{ width: '60px', padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--gray-100)', fontSize: '12px' }} placeholder="pts" value={q.points} onChange={(e) => updateQuestion(qi, 'points', Number(e.target.value))} />
                      <button className="btn-ghost btn-sm btn-danger" onClick={() => removeQuestion(qi)}>Remove</button>
                    </div>
                  </div>

                  <div className="cb-field" style={{ marginBottom: '10px' }}>
                    <input type="text" value={q.question} onChange={(e) => updateQuestion(qi, 'question', e.target.value)} placeholder="Question text..." />
                  </div>

                  {q.type === 'multiple-choice' && (
                    <div>
                      {(q.options || []).map((opt, oi) => (
                        <div key={oi} className="cb-option-row">
                          <input type="radio" className="cb-option-radio" name={`q${qi}-correct`} checked={q.correctIndex === oi} onChange={() => updateQuestion(qi, 'correctIndex', oi)} />
                          <input type="text" className="cb-option-input" value={opt} onChange={(e) => updateQuestionOption(qi, oi, e.target.value)} placeholder={`Option ${oi + 1}`} />
                        </div>
                      ))}
                    </div>
                  )}

                  {q.type === 'true-false' && (
                    <div>
                      {['True', 'False'].map((opt, oi) => (
                        <div key={oi} className="cb-option-row">
                          <input type="radio" className="cb-option-radio" name={`q${qi}-tf`} checked={q.correctIndex === oi} onChange={() => updateQuestion(qi, 'correctIndex', oi)} />
                          <span style={{ fontSize: '13px' }}>{opt}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="cb-field" style={{ marginTop: '10px', marginBottom: 0 }}>
                    <input type="text" value={q.explanation || ''} onChange={(e) => updateQuestion(qi, 'explanation', e.target.value)} placeholder="Explanation (shown after answering)" style={{ fontSize: '12px' }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="cb-form-actions">
              <button className="btn-gold" onClick={saveQuiz} disabled={saving}>
                {saving ? 'Saving...' : 'Save Quiz'}
              </button>
              <button className="btn-ghost" onClick={() => { setEditingQuiz(null); setQuizForm(null); }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
