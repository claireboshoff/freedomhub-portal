import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../lib/api';

/* ---- Helpers ---- */

function timeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now - date) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  return date.toLocaleDateString();
}

function avatarColor(name) {
  let hash = 0;
  for (let i = 0; i < (name || '').length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = [
    '#c5a55a', '#5a8fc5', '#c55a5a', '#5ac58a',
    '#8a5ac5', '#c5895a', '#5ac5c5', '#c55a8a',
  ];
  return colors[Math.abs(hash) % colors.length];
}

const TAG_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'question', label: 'Questions' },
  { value: 'win', label: 'Wins' },
  { value: 'resource', label: 'Resources' },
];

/* ---- Icons ---- */

const HeartIcon = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24"
    fill={filled ? 'var(--gold, #c5a55a)' : 'none'}
    stroke={filled ? 'var(--gold, #c5a55a)' : 'currentColor'}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ReplyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 17 4 12 9 7" />
    <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
  </svg>
);

const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--gold, #c5a55a)"
    stroke="var(--gold, #c5a55a)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
);

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

/* ---- PostComposer ---- */

function CommunityComposer({ clientName, onPost }) {
  const [text, setText] = useState('');
  const [tag, setTag] = useState('');
  const [posting, setPosting] = useState(false);

  const letter = (clientName || '?').charAt(0).toUpperCase();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim() || posting) return;
    setPosting(true);
    try {
      await onPost(text.trim(), tag);
      setText('');
      setTag('');
    } finally {
      setPosting(false);
    }
  }

  return (
    <form className="comm-composer" onSubmit={handleSubmit}>
      <div className="comm-composer__avatar" style={{ background: avatarColor(clientName) }}>
        {letter}
      </div>
      <div className="comm-composer__body">
        <textarea
          className="comm-composer__input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share a win, ask a question, or post a resource..."
          rows={3}
          maxLength={2000}
        />
        <div className="comm-composer__footer">
          <div className="comm-composer__left">
            <select
              className="comm-composer__tag-select"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            >
              <option value="">Tag (optional)</option>
              <option value="question">Question</option>
              <option value="win">Win</option>
              <option value="resource">Resource</option>
            </select>
            <span className="comm-composer__count">{text.length}/2000</span>
          </div>
          <button
            type="submit"
            className="btn btn--primary btn--sm"
            disabled={!text.trim() || posting}
          >
            {posting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </form>
  );
}

/* ---- ReplyComposer ---- */

function ReplyComposer({ clientName, onPost }) {
  const [text, setText] = useState('');
  const [posting, setPosting] = useState(false);

  const letter = (clientName || '?').charAt(0).toUpperCase();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim() || posting) return;
    setPosting(true);
    try {
      await onPost(text.trim());
      setText('');
    } finally {
      setPosting(false);
    }
  }

  return (
    <form className="comm-reply-composer" onSubmit={handleSubmit}>
      <div className="comm-reply-avatar" style={{ background: avatarColor(clientName) }}>
        {letter}
      </div>
      <div className="comm-reply-body">
        <textarea
          className="comm-reply-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a reply..."
          rows={2}
          maxLength={2000}
        />
        <div className="comm-reply-footer">
          <span className="comm-composer__count">{text.length}/2000</span>
          <button
            type="submit"
            className="btn btn--primary btn--sm"
            disabled={!text.trim() || posting}
          >
            {posting ? '...' : 'Reply'}
          </button>
        </div>
      </div>
    </form>
  );
}

/* ---- CommunityPost ---- */

function CommunityPost({ post, clientName, onLike, onReply, depth = 0 }) {
  const [showReply, setShowReply] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);

  const letter = (post.authorName || '?').charAt(0).toUpperCase();

  async function handleLike() {
    if (liked) return;
    setLiked(true);
    setLikeCount((c) => c + 1);
    try {
      await onLike(post.id);
    } catch {
      setLiked(false);
      setLikeCount((c) => c - 1);
    }
  }

  async function handleReplySubmit(text) {
    await onReply(text, post.id);
    setShowReply(false);
  }

  const tagLabel = post.tag ? TAG_OPTIONS.find((t) => t.value === post.tag)?.label : null;

  return (
    <div className={`comm-post ${depth > 0 ? 'comm-post--reply' : ''} ${post.pinned ? 'comm-post--pinned' : ''}`}>
      <div className="comm-post__header">
        <div className="comm-post__avatar" style={{ background: avatarColor(post.authorName) }}>
          {letter}
        </div>
        <div className="comm-post__meta">
          <span className="comm-post__author">{post.authorName || 'Unknown'}</span>
          <span className="comm-post__time">{timeAgo(post.created)}</span>
          {post.lessonTitle && (
            <span className="comm-post__lesson-tag">{post.lessonTitle}</span>
          )}
          {!post.lessonTitle && !post.lessonId && depth === 0 && (
            <span className="comm-post__lesson-tag comm-post__lesson-tag--general">General Discussion</span>
          )}
        </div>
        <div className="comm-post__badges">
          {post.pinned && <span className="comm-post__pin" title="Pinned"><PinIcon /></span>}
          {tagLabel && <span className={`comm-tag comm-tag--${post.tag}`}>{tagLabel}</span>}
        </div>
      </div>
      <div className="comm-post__content">{post.content}</div>
      <div className="comm-post__actions">
        <button
          className={`comm-post__action-btn ${liked ? 'comm-post__action-btn--liked' : ''}`}
          onClick={handleLike}
          title="Like"
        >
          <HeartIcon filled={liked} />
          <span>{likeCount > 0 ? likeCount : ''}</span>
        </button>
        {depth === 0 && (
          <button
            className="comm-post__action-btn"
            onClick={() => setShowReply(!showReply)}
            title="Reply"
          >
            <ReplyIcon /> <span>Reply{post.replies?.length > 0 ? ` (${post.replies.length})` : ''}</span>
          </button>
        )}
      </div>

      {showReply && (
        <div className="comm-post__reply-area">
          <ReplyComposer clientName={clientName} onPost={handleReplySubmit} />
        </div>
      )}

      {post.replies && post.replies.length > 0 && (
        <div className="comm-post__replies">
          {post.replies.map((reply) => (
            <CommunityPost
              key={reply.id}
              post={reply}
              clientName={clientName}
              onLike={onLike}
              onReply={onReply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---- Skeleton ---- */

function CommSkeleton() {
  return (
    <div className="comm-skeleton">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="comm-skeleton__post">
          <div className="comm-skeleton__avatar" />
          <div className="comm-skeleton__lines">
            <div className="comm-skeleton__line comm-skeleton__line--short" />
            <div className="comm-skeleton__line" />
            <div className="comm-skeleton__line comm-skeleton__line--med" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---- Main Component ---- */

export default function CourseCommunity({ client }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);

  const clientName = client?.name || client?.businessName || 'You';

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [courseRes, discRes] = await Promise.all([
        api.courseDetail(slug),
        api.courseDiscussions(slug),
      ]);
      setCourse(courseRes.course);

      const items = discRes.discussions || [];
      const topLevel = items.filter((d) => !d.parentId);
      const replies = items.filter((d) => d.parentId);
      const threaded = topLevel.map((p) => ({
        ...p,
        replies: replies.filter((r) => r.parentId === p.id),
      }));
      // Pinned first, then newest first
      threaded.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return new Date(b.created) - new Date(a.created);
      });
      setPosts(threaded);
    } catch (err) {
      setError(err.message || 'Failed to load community');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handlePost(text, tag) {
    const data = {
      courseSlug: slug,
      courseId: course?.id || '',
      content: text,
    };
    if (tag) data.tag = tag;
    await api.postDiscussion(data);
    await loadData();
  }

  async function handleReply(text, parentId) {
    const data = {
      courseSlug: slug,
      courseId: course?.id || '',
      content: text,
      parentId,
    };
    await api.postDiscussion(data);
    await loadData();
  }

  async function handleLike(discussionId) {
    await api.likeDiscussion(discussionId);
  }

  // Filter by tag
  const filteredPosts = filter
    ? posts.filter((p) => p.tag === filter)
    : posts;

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  return (
    <div className="portal-page comm-page">
      <style>{STYLES}</style>

      <div className="comm-header">
        <button className="btn btn--ghost btn--sm comm-back" onClick={() => navigate(`/learn/${slug}`)}>
          <BackIcon /> Back to Course
        </button>
        <h2 className="comm-header__title">
          {course?.title ? `${course.title} -- Community` : 'Course Community'}
        </h2>
        <p className="comm-header__subtitle">
          Share wins, ask questions, and connect with fellow learners
        </p>
      </div>

      <CommunityComposer clientName={clientName} onPost={handlePost} />

      {/* Filter Tabs */}
      <div className="comm-filters">
        {TAG_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            className={`comm-filter-tab ${filter === opt.value ? 'comm-filter-tab--active' : ''}`}
            onClick={() => { setFilter(opt.value); setVisibleCount(10); }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {loading && <CommSkeleton />}

      {error && (
        <div className="comm-error">
          <p>{error}</p>
          <button className="btn btn--outline btn--sm" onClick={loadData}>Retry</button>
        </div>
      )}

      {!loading && !error && filteredPosts.length === 0 && (
        <div className="comm-empty">
          <p>No discussions yet. Share a win or ask a question!</p>
        </div>
      )}

      {!loading && visiblePosts.map((post) => (
        <CommunityPost
          key={post.id}
          post={post}
          clientName={clientName}
          onLike={handleLike}
          onReply={handleReply}
        />
      ))}

      {!loading && filteredPosts.length > visibleCount && (
        <button
          className="btn btn--outline btn--sm comm-load-more"
          onClick={() => setVisibleCount((c) => c + 10)}
        >
          Load more ({filteredPosts.length - visibleCount} remaining)
        </button>
      )}
    </div>
  );
}

/* ---- Styles ---- */

const STYLES = `
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
`;
