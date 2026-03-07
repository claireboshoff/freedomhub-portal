import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

function slugify(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const CATEGORIES = ['Business', 'Marketing', 'Leadership', 'Sales', 'Tech', 'Personal Development', 'Other'];
const CONTENT_TYPES = ['video', 'audio', 'article', 'meditation', 'podcast', 'mixed'];
const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];
const QUESTION_TYPES = [
  { value: 'mc', label: 'Multiple Choice' },
  { value: 'tf', label: 'True/False' },
  { value: 'open', label: 'Open Ended' },
];

export default function CourseBuilder() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const isEdit = !!courseId;

  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const [course, setCourse] = useState({
    title: '',
    slug: '',
    description: '',
    category: 'Business',
    thumbnail: '',
    status: 'Draft',
    difficulty: 'Beginner',
  });

  const [modules, setModules] = useState([]);
  const [expandedModule, setExpandedModule] = useState(null);
  const [showAddModule, setShowAddModule] = useState(false);
  const [newModule, setNewModule] = useState({ title: '', description: '' });

  // Lesson form state
  const [editingLesson, setEditingLesson] = useState(null);
  const [lessonForm, setLessonForm] = useState(null);

  // Quiz form state
  const [editingQuizLesson, setEditingQuizLesson] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    if (isEdit) {
      loadCourse();
    }
  }, [courseId, isEdit]);

  async function loadCourse() {
    try {
      setLoading(true);
      setError(null);
      const data = await api.adminCourseDetail(courseId);
      const c = data.course || data;
      setCourse({
        title: c.title || '',
        slug: c.slug || '',
        description: c.description || '',
        category: c.category || 'Business',
        thumbnail: c.thumbnail || '',
        status: c.status || 'Draft',
        difficulty: c.difficulty || 'Beginner',
      });
      setModules(c.modules || []);
    } catch (err) {
      setError(err.message || 'Failed to load course');
    } finally {
      setLoading(false);
    }
  }

  const handleCourseChange = useCallback((field, value) => {
    setCourse(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'title' && (!prev.slug || prev.slug === slugify(prev.title))) {
        updated.slug = slugify(value);
      }
      return updated;
    });
    setSaveStatus(null);
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaveStatus(null);
    try {
      const payload = {
        ...course,
        modules: modules.map((mod, mi) => ({
          ...mod,
          sortOrder: mi + 1,
          lessons: (mod.lessons || []).map((les, li) => ({
            ...les,
            sortOrder: li + 1,
          })),
        })),
      };

      if (isEdit) {
        await api.adminUpdateCourse(courseId, payload);
      } else {
        const result = await api.adminCreateCourse(payload);
        if (result.courseId) {
          navigate(`/admin/courses/${result.courseId}/edit`, { replace: true });
        }
      }
      setSaveStatus('saved');
    } catch (err) {
      console.error('Save failed:', err);
      setSaveStatus('error');
    }
    setSaving(false);
  }

  // Module operations
  async function addModule() {
    if (!newModule.title.trim()) return;
    setSaving(true);
    try {
      let newId;
      if (isEdit) {
        const result = await api.adminCreateModule(courseId, {
          title: newModule.title,
          description: newModule.description,
          sortOrder: modules.length + 1,
        });
        newId = result.moduleId || result.id;
      }
      setModules(prev => [...prev, {
        id: newId || 'temp-' + Date.now(),
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

  async function deleteModule(moduleId) {
    if (!window.confirm('Delete this module and all its lessons?')) return;
    try {
      if (isEdit && !String(moduleId).startsWith('temp-')) {
        await api.adminDeleteModule(moduleId);
      }
      setModules(prev => prev.filter(m => m.id !== moduleId));
    } catch (err) {
      console.error('Delete module failed:', err);
    }
  }

  function moveModule(index, direction) {
    const newModules = [...modules];
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= newModules.length) return;
    [newModules[index], newModules[swapIndex]] = [newModules[swapIndex], newModules[index]];
    newModules.forEach((m, i) => { m.sortOrder = i + 1; });
    setModules(newModules);
  }

  // Lesson operations
  function openLessonForm(moduleId, lesson, index) {
    setEditingLesson({ moduleId, index });
    setLessonForm(lesson ? { ...lesson } : {
      title: '',
      contentType: 'video',
      contentUrl: '',
      durationMinutes: 0,
      description: '',
    });
  }

  async function saveLesson() {
    if (!lessonForm || !editingLesson) return;
    const { moduleId, index } = editingLesson;
    setSaving(true);
    try {
      if (index !== undefined && index !== null) {
        const mod = modules.find(m => m.id === moduleId);
        const existing = mod?.lessons?.[index];
        if (isEdit && existing?.id && !String(existing.id).startsWith('temp-')) {
          await api.adminUpdateLesson(existing.id, lessonForm);
        }
        setModules(prev => prev.map(m => {
          if (m.id !== moduleId) return m;
          const lessons = [...(m.lessons || [])];
          lessons[index] = { ...lessons[index], ...lessonForm };
          return { ...m, lessons };
        }));
      } else {
        let newId;
        if (isEdit && !String(moduleId).startsWith('temp-')) {
          const result = await api.adminCreateLesson(moduleId, {
            ...lessonForm,
            sortOrder: (modules.find(m => m.id === moduleId)?.lessons?.length || 0) + 1,
          });
          newId = result.lessonId || result.id;
        }
        setModules(prev => prev.map(m => {
          if (m.id !== moduleId) return m;
          return {
            ...m,
            lessons: [...(m.lessons || []), {
              id: newId || 'temp-' + Date.now(),
              ...lessonForm,
            }],
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

  async function deleteLesson(moduleId, lessonIndex) {
    const mod = modules.find(m => m.id === moduleId);
    const lesson = mod?.lessons?.[lessonIndex];
    if (!lesson) return;
    if (!window.confirm('Delete this lesson?')) return;
    try {
      if (isEdit && lesson.id && !String(lesson.id).startsWith('temp-')) {
        await api.adminDeleteLesson(lesson.id);
      }
      setModules(prev => prev.map(m => {
        if (m.id !== moduleId) return m;
        return { ...m, lessons: (m.lessons || []).filter((_, i) => i !== lessonIndex) };
      }));
    } catch (err) {
      console.error('Delete lesson failed:', err);
    }
  }

  function moveLesson(moduleId, index, direction) {
    setModules(prev => prev.map(m => {
      if (m.id !== moduleId) return m;
      const lessons = [...(m.lessons || [])];
      const swapIndex = index + direction;
      if (swapIndex < 0 || swapIndex >= lessons.length) return m;
      [lessons[index], lessons[swapIndex]] = [lessons[swapIndex], lessons[index]];
      lessons.forEach((l, i) => { l.sortOrder = i + 1; });
      return { ...m, lessons };
    }));
  }

  // Quiz operations
  function openQuizBuilder(lessonId) {
    setEditingQuizLesson(lessonId);
    let existing = [];
    for (const m of modules) {
      for (const l of (m.lessons || [])) {
        if (l.id === lessonId && l.quiz?.questions) {
          existing = Array.isArray(l.quiz.questions) ? l.quiz.questions : [];
          break;
        }
      }
    }
    setQuizQuestions(existing.length > 0 ? existing : []);
  }

  function addQuestion() {
    setQuizQuestions(prev => [...prev, {
      question: '',
      type: 'mc',
      options: ['', '', '', ''],
      correctIndex: 0,
      explanation: '',
      points: 10,
    }]);
  }

  function updateQuestion(qi, field, value) {
    setQuizQuestions(prev => {
      const updated = [...prev];
      updated[qi] = { ...updated[qi], [field]: value };
      return updated;
    });
  }

  function updateOption(qi, oi, value) {
    setQuizQuestions(prev => {
      const updated = [...prev];
      const options = [...updated[qi].options];
      options[oi] = value;
      updated[qi] = { ...updated[qi], options };
      return updated;
    });
  }

  function removeQuestion(qi) {
    setQuizQuestions(prev => prev.filter((_, i) => i !== qi));
  }

  async function saveQuiz() {
    if (!editingQuizLesson) return;
    setSaving(true);
    try {
      let existingQuizId = null;
      for (const m of modules) {
        for (const l of (m.lessons || [])) {
          if (l.id === editingQuizLesson && l.quiz?.id) {
            existingQuizId = l.quiz.id;
          }
        }
      }
      const quizData = { questions: quizQuestions };
      if (existingQuizId) {
        await api.adminUpdateQuiz(existingQuizId, quizData);
      } else if (isEdit && !String(editingQuizLesson).startsWith('temp-')) {
        const result = await api.adminCreateQuiz(editingQuizLesson, quizData);
        quizData.id = result.quizId || result.id;
      }
      setModules(prev => prev.map(m => ({
        ...m,
        lessons: (m.lessons || []).map(l => {
          if (l.id !== editingQuizLesson) return l;
          return { ...l, quiz: { id: existingQuizId || quizData.id, questions: quizQuestions } };
        }),
      })));
      setEditingQuizLesson(null);
      setQuizQuestions([]);
    } catch (err) {
      console.error('Save quiz failed:', err);
    }
    setSaving(false);
  }

  const contentTypeIcon = (type) => {
    switch (type) {
      case 'video': return '\u25B6';
      case 'audio': return '\u266B';
      case 'article': return '\u00B6';
      case 'meditation': return '\u2728';
      case 'podcast': return '\u{1F399}';
      default: return '\u25C8';
    }
  };

  if (loading) {
    return (
      <div className="cb__container">
        <style>{cbStyles}</style>
        <div className="cb__loading">
          <div className="cb__spinner" />
          <p>Loading course...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cb__container">
        <style>{cbStyles}</style>
        <div className="cb__error-box">
          <h3>Failed to load course</h3>
          <p>{error}</p>
          <button className="cb__btn cb__btn--primary" onClick={loadCourse}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cb__container">
      <style>{cbStyles}</style>

      {/* Back Button */}
      <button className="cb__back" onClick={() => navigate('/admin/courses')}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
        Back to Courses
      </button>

      {/* Header */}
      <div className="cb__header">
        <h1 className="cb__title">{isEdit ? 'Edit Course' : 'Create Course'}</h1>
        <div className="cb__save-area">
          {saving && <span className="cb__save-msg cb__save-msg--saving">Saving...</span>}
          {saveStatus === 'saved' && <span className="cb__save-msg cb__save-msg--saved">Saved successfully</span>}
          {saveStatus === 'error' && <span className="cb__save-msg cb__save-msg--error">Save failed</span>}
          <button
            className="cb__btn cb__btn--primary"
            onClick={handleSave}
            disabled={saving || !course.title.trim()}
          >
            {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Course'}
          </button>
        </div>
      </div>

      {/* Course Details Form */}
      <div className="cb__section">
        <h2 className="cb__section-title">Course Details</h2>

        <div className="cb__field">
          <label className="cb__label">Title</label>
          <input
            type="text"
            className="cb__input"
            value={course.title}
            onChange={e => handleCourseChange('title', e.target.value)}
            placeholder="e.g. Business Growth Masterclass"
          />
        </div>

        <div className="cb__field">
          <label className="cb__label">Slug</label>
          <input
            type="text"
            className="cb__input"
            value={course.slug}
            onChange={e => handleCourseChange('slug', e.target.value)}
            placeholder="auto-generated-from-title"
          />
        </div>

        <div className="cb__field">
          <label className="cb__label">Description</label>
          <textarea
            className="cb__textarea"
            value={course.description}
            onChange={e => handleCourseChange('description', e.target.value)}
            placeholder="Course description..."
          />
        </div>

        <div className="cb__row">
          <div className="cb__field">
            <label className="cb__label">Category</label>
            <select
              className="cb__select"
              value={course.category}
              onChange={e => handleCourseChange('category', e.target.value)}
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="cb__field">
            <label className="cb__label">Difficulty</label>
            <select
              className="cb__select"
              value={course.difficulty}
              onChange={e => handleCourseChange('difficulty', e.target.value)}
            >
              {DIFFICULTIES.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="cb__row">
          <div className="cb__field">
            <label className="cb__label">Thumbnail URL</label>
            <input
              type="text"
              className="cb__input"
              value={course.thumbnail}
              onChange={e => handleCourseChange('thumbnail', e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div className="cb__field">
            <label className="cb__label">Status</label>
            <select
              className="cb__select"
              value={course.status}
              onChange={e => handleCourseChange('status', e.target.value)}
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>
        </div>
      </div>

      {/* Modules Section */}
      <div className="cb__section">
        <div className="cb__section-header">
          <h2 className="cb__section-title">Modules</h2>
          <button className="cb__btn cb__btn--outline" onClick={() => setShowAddModule(true)}>
            + Add Module
          </button>
        </div>

        {modules.length === 0 && !showAddModule && (
          <div className="cb__empty-msg">
            No modules yet. Add your first module to start building the course structure.
          </div>
        )}

        {modules.map((mod, mi) => (
          <div key={mod.id} className="cb__module">
            <div
              className="cb__module-header"
              onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}
            >
              <span className="cb__module-order">{mi + 1}</span>
              <span className="cb__module-name">{mod.title}</span>
              <span className="cb__module-count">{(mod.lessons || []).length} lessons</span>
              <div className="cb__module-arrows" onClick={e => e.stopPropagation()}>
                <button
                  className="cb__arrow"
                  onClick={() => moveModule(mi, -1)}
                  disabled={mi === 0}
                  title="Move up"
                >&#9650;</button>
                <button
                  className="cb__arrow"
                  onClick={() => moveModule(mi, 1)}
                  disabled={mi === modules.length - 1}
                  title="Move down"
                >&#9660;</button>
                <button
                  className="cb__arrow cb__arrow--danger"
                  onClick={() => deleteModule(mod.id)}
                  title="Delete module"
                >&#10005;</button>
              </div>
              <svg
                className={`cb__chevron ${expandedModule === mod.id ? 'cb__chevron--open' : ''}`}
                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>

            {expandedModule === mod.id && (
              <div className="cb__module-body">
                {mod.description && (
                  <p className="cb__module-desc">{mod.description}</p>
                )}

                {(mod.lessons || []).length === 0 && (
                  <div className="cb__empty-msg">No lessons in this module yet.</div>
                )}

                {(mod.lessons || []).map((lesson, li) => (
                  <div key={lesson.id || li} className="cb__lesson">
                    <span className="cb__lesson-icon">{contentTypeIcon(lesson.contentType)}</span>
                    <span className="cb__lesson-title">{lesson.title || 'Untitled'}</span>
                    <span className="cb__lesson-type">{lesson.contentType || 'video'}</span>
                    {lesson.durationMinutes > 0 && (
                      <span className="cb__lesson-dur">{lesson.durationMinutes}m</span>
                    )}
                    <div className="cb__lesson-actions">
                      <button className="cb__arrow" onClick={() => moveLesson(mod.id, li, -1)} disabled={li === 0}>&#9650;</button>
                      <button className="cb__arrow" onClick={() => moveLesson(mod.id, li, 1)} disabled={li === (mod.lessons || []).length - 1}>&#9660;</button>
                      <button className="cb__btn-sm" onClick={() => openLessonForm(mod.id, lesson, li)}>Edit</button>
                      <button className="cb__btn-sm" onClick={() => openQuizBuilder(lesson.id)}>Quiz</button>
                      <button className="cb__btn-sm cb__btn-sm--danger" onClick={() => deleteLesson(mod.id, li)}>Del</button>
                    </div>
                  </div>
                ))}

                <button
                  className="cb__btn cb__btn--outline cb__btn--small"
                  style={{ marginTop: 8 }}
                  onClick={() => openLessonForm(mod.id)}
                >
                  + Add Lesson
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Add Module Inline Form */}
        {showAddModule && (
          <div className="cb__inline-form">
            <h4 className="cb__inline-title">New Module</h4>
            <div className="cb__field">
              <label className="cb__label">Module Title</label>
              <input
                type="text"
                className="cb__input"
                value={newModule.title}
                onChange={e => setNewModule(p => ({ ...p, title: e.target.value }))}
                placeholder="e.g. Getting Started"
              />
            </div>
            <div className="cb__field">
              <label className="cb__label">Description (optional)</label>
              <input
                type="text"
                className="cb__input"
                value={newModule.description}
                onChange={e => setNewModule(p => ({ ...p, description: e.target.value }))}
                placeholder="Brief module description"
              />
            </div>
            <div className="cb__form-actions">
              <button
                className="cb__btn cb__btn--primary cb__btn--small"
                onClick={addModule}
                disabled={saving || !newModule.title.trim()}
              >
                {saving ? 'Adding...' : 'Add Module'}
              </button>
              <button
                className="cb__btn cb__btn--ghost"
                onClick={() => { setShowAddModule(false); setNewModule({ title: '', description: '' }); }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Lesson Editor Modal */}
      {lessonForm && (
        <div className="cb__overlay" onClick={() => { setEditingLesson(null); setLessonForm(null); }}>
          <div className="cb__modal" onClick={e => e.stopPropagation()}>
            <h3 className="cb__modal-title">
              {editingLesson?.index !== undefined && editingLesson?.index !== null ? 'Edit Lesson' : 'Add Lesson'}
            </h3>

            <div className="cb__field">
              <label className="cb__label">Title</label>
              <input
                type="text"
                className="cb__input"
                value={lessonForm.title}
                onChange={e => setLessonForm(p => ({ ...p, title: e.target.value }))}
                placeholder="Lesson title"
              />
            </div>

            <div className="cb__row">
              <div className="cb__field">
                <label className="cb__label">Content Type</label>
                <select
                  className="cb__select"
                  value={lessonForm.contentType}
                  onChange={e => setLessonForm(p => ({ ...p, contentType: e.target.value }))}
                >
                  {CONTENT_TYPES.map(t => (
                    <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div className="cb__field">
                <label className="cb__label">Duration (minutes)</label>
                <input
                  type="number"
                  className="cb__input"
                  min="0"
                  value={lessonForm.durationMinutes}
                  onChange={e => setLessonForm(p => ({ ...p, durationMinutes: Number(e.target.value) }))}
                />
              </div>
            </div>

            <div className="cb__field">
              <label className="cb__label">Content URL</label>
              <input
                type="text"
                className="cb__input"
                value={lessonForm.contentUrl}
                onChange={e => setLessonForm(p => ({ ...p, contentUrl: e.target.value }))}
                placeholder="https://..."
              />
            </div>

            <div className="cb__field">
              <label className="cb__label">Description</label>
              <textarea
                className="cb__textarea"
                value={lessonForm.description}
                onChange={e => setLessonForm(p => ({ ...p, description: e.target.value }))}
                placeholder="Lesson description..."
                style={{ minHeight: 80 }}
              />
            </div>

            <div className="cb__form-actions">
              <button
                className="cb__btn cb__btn--primary"
                onClick={saveLesson}
                disabled={saving || !lessonForm.title.trim()}
              >
                {saving ? 'Saving...' : editingLesson?.index !== undefined && editingLesson?.index !== null ? 'Update Lesson' : 'Add Lesson'}
              </button>
              <button
                className="cb__btn cb__btn--ghost"
                onClick={() => { setEditingLesson(null); setLessonForm(null); }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Builder Modal */}
      {editingQuizLesson && (
        <div className="cb__overlay" onClick={() => { setEditingQuizLesson(null); setQuizQuestions([]); }}>
          <div className="cb__modal" onClick={e => e.stopPropagation()}>
            <h3 className="cb__modal-title">Quiz Builder</h3>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span className="cb__label" style={{ margin: 0 }}>Questions ({quizQuestions.length})</span>
              <button className="cb__btn cb__btn--outline cb__btn--small" onClick={addQuestion}>+ Add Question</button>
            </div>

            {quizQuestions.length === 0 && (
              <div className="cb__empty-msg">No questions yet. Add one to build the quiz.</div>
            )}

            {quizQuestions.map((q, qi) => (
              <div key={qi} className="cb__question">
                <div className="cb__question-header">
                  <span className="cb__question-num">Q{qi + 1}</span>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <select
                      className="cb__select cb__select--mini"
                      value={q.type}
                      onChange={e => updateQuestion(qi, 'type', e.target.value)}
                    >
                      {QUESTION_TYPES.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      className="cb__input cb__input--mini"
                      value={q.points}
                      onChange={e => updateQuestion(qi, 'points', Number(e.target.value))}
                      style={{ width: 60 }}
                      placeholder="pts"
                    />
                    <button className="cb__btn-sm cb__btn-sm--danger" onClick={() => removeQuestion(qi)}>Remove</button>
                  </div>
                </div>

                <div className="cb__field" style={{ marginBottom: 10 }}>
                  <input
                    type="text"
                    className="cb__input"
                    value={q.question}
                    onChange={e => updateQuestion(qi, 'question', e.target.value)}
                    placeholder="Question text..."
                  />
                </div>

                {q.type === 'mc' && (
                  <div className="cb__options">
                    {(q.options || ['', '', '', '']).map((opt, oi) => (
                      <div key={oi} className="cb__option-row">
                        <input
                          type="radio"
                          className="cb__option-radio"
                          name={`quiz-q${qi}`}
                          checked={q.correctIndex === oi}
                          onChange={() => updateQuestion(qi, 'correctIndex', oi)}
                        />
                        <input
                          type="text"
                          className="cb__option-input"
                          value={opt}
                          onChange={e => updateOption(qi, oi, e.target.value)}
                          placeholder={`Option ${oi + 1}`}
                        />
                      </div>
                    ))}
                    <span className="cb__hint">Select the radio button next to the correct answer</span>
                  </div>
                )}

                {q.type === 'tf' && (
                  <div className="cb__options">
                    {['True', 'False'].map((opt, oi) => (
                      <div key={oi} className="cb__option-row">
                        <input
                          type="radio"
                          className="cb__option-radio"
                          name={`quiz-tf-${qi}`}
                          checked={q.correctIndex === oi}
                          onChange={() => updateQuestion(qi, 'correctIndex', oi)}
                        />
                        <span style={{ fontSize: 14 }}>{opt}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="cb__field" style={{ marginTop: 10, marginBottom: 0 }}>
                  <input
                    type="text"
                    className="cb__input"
                    value={q.explanation || ''}
                    onChange={e => updateQuestion(qi, 'explanation', e.target.value)}
                    placeholder="Explanation (shown after answering)"
                    style={{ fontSize: 12 }}
                  />
                </div>
              </div>
            ))}

            <div className="cb__form-actions">
              <button
                className="cb__btn cb__btn--primary"
                onClick={saveQuiz}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Quiz'}
              </button>
              <button
                className="cb__btn cb__btn--ghost"
                onClick={() => { setEditingQuizLesson(null); setQuizQuestions([]); }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const cbStyles = `
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
`;
