import React, { useState, useEffect, useCallback } from 'react';
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

/* ---- PostComposer ---- */

function PostComposer({ clientName, onPost, placeholder, compact }) {
  const [text, setText] = useState('');
  const [posting, setPosting] = useState(false);

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

  const letter = (clientName || '?').charAt(0).toUpperCase();

  return (
    <form className={`disc-composer ${compact ? 'disc-composer--compact' : ''}`} onSubmit={handleSubmit}>
      <div className="disc-composer__avatar" style={{ background: avatarColor(clientName) }}>
        {letter}
      </div>
      <div className="disc-composer__body">
        <textarea
          className="disc-composer__input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder || 'Share your thoughts...'}
          rows={compact ? 2 : 3}
          maxLength={2000}
        />
        <div className="disc-composer__footer">
          <span className="disc-composer__count">{text.length}/2000</span>
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

/* ---- PostCard ---- */

function PostCard({ post, clientName, onLike, onReply, depth = 0 }) {
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

  return (
    <div className={`disc-post ${depth > 0 ? 'disc-post--reply' : ''} ${post.pinned ? 'disc-post--pinned' : ''}`}>
      <div className="disc-post__header">
        <div className="disc-post__avatar" style={{ background: avatarColor(post.authorName) }}>
          {letter}
        </div>
        <div className="disc-post__meta">
          <span className="disc-post__author">{post.authorName || 'Unknown'}</span>
          <span className="disc-post__time">{timeAgo(post.created)}</span>
        </div>
        {post.pinned && (
          <span className="disc-post__pin" title="Pinned">
            <PinIcon />
          </span>
        )}
      </div>
      <div className="disc-post__content">{post.content}</div>
      <div className="disc-post__actions">
        <button
          className={`disc-post__action-btn ${liked ? 'disc-post__action-btn--liked' : ''}`}
          onClick={handleLike}
          title="Like"
        >
          <HeartIcon filled={liked} />
          <span>{likeCount > 0 ? likeCount : ''}</span>
        </button>
        {depth === 0 && (
          <button
            className="disc-post__action-btn"
            onClick={() => setShowReply(!showReply)}
            title="Reply"
          >
            <ReplyIcon /> <span>Reply</span>
          </button>
        )}
      </div>

      {showReply && (
        <div className="disc-post__reply-composer">
          <PostComposer
            clientName={clientName}
            onPost={handleReplySubmit}
            placeholder="Write a reply..."
            compact
          />
        </div>
      )}

      {post.replies && post.replies.length > 0 && (
        <div className="disc-post__replies">
          {post.replies.map((reply) => (
            <PostCard
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

function DiscussionSkeleton() {
  return (
    <div className="disc-skeleton">
      {[1, 2, 3].map((i) => (
        <div key={i} className="disc-skeleton__post">
          <div className="disc-skeleton__avatar" />
          <div className="disc-skeleton__lines">
            <div className="disc-skeleton__line disc-skeleton__line--short" />
            <div className="disc-skeleton__line" />
            <div className="disc-skeleton__line disc-skeleton__line--med" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---- Main Component ---- */

export default function LessonDiscussion({ lessonId, courseId, client }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10);

  const clientName = client?.name || client?.businessName || 'You';

  const loadDiscussions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.lessonDiscussions(lessonId);
      const items = res.discussions || [];
      // Thread: separate top-level from replies
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
      setError(err.message || 'Failed to load discussions');
    } finally {
      setLoading(false);
    }
  }, [lessonId]);

  useEffect(() => {
    if (lessonId) loadDiscussions();
  }, [lessonId, loadDiscussions]);

  async function handlePost(text, parentId) {
    const data = {
      lessonId,
      courseId: courseId || '',
      content: text,
    };
    if (parentId) data.parentId = parentId;
    await api.postDiscussion(data);
    await loadDiscussions();
  }

  async function handleLike(discussionId) {
    await api.likeDiscussion(discussionId);
  }

  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <div className="lesson-discussion">
      <style>{STYLES}</style>

      <h3 className="lesson-discussion__title">Discussion</h3>
      <p className="lesson-discussion__xp-hint">+3 XP for posting, +2 XP for replying</p>

      <PostComposer
        clientName={clientName}
        onPost={(text) => handlePost(text, null)}
        placeholder="Share your thoughts on this lesson..."
      />

      {loading && <DiscussionSkeleton />}

      {error && (
        <div className="disc-error">
          <p>{error}</p>
          <button className="btn btn--outline btn--sm" onClick={loadDiscussions}>Retry</button>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="disc-empty">
          <p>Be the first to start a discussion on this lesson</p>
        </div>
      )}

      {!loading && visiblePosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          clientName={clientName}
          onLike={handleLike}
          onReply={(text, parentId) => handlePost(text, parentId)}
        />
      ))}

      {!loading && posts.length > visibleCount && (
        <button
          className="btn btn--outline btn--sm disc-load-more"
          onClick={() => setVisibleCount((c) => c + 10)}
        >
          Load more ({posts.length - visibleCount} remaining)
        </button>
      )}
    </div>
  );
}

/* ---- Styles ---- */

const STYLES = `
.lesson-discussion {
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--white, #fff);
  border-radius: var(--radius, 12px);
  box-shadow: var(--shadow, 0 1px 3px rgba(0,0,0,0.08));
}

.lesson-discussion__title {
  font-family: var(--font-heading, 'League Spartan', sans-serif);
  font-size: 1.25rem;
  color: var(--charcoal, #2d2d2d);
  margin: 0 0 0.25rem;
}

.lesson-discussion__xp-hint {
  font-size: 0.8rem;
  color: var(--gold, #c5a55a);
  margin: 0 0 1rem;
  font-style: italic;
}

/* Composer */
.disc-composer {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.disc-composer--compact {
  margin-bottom: 0.5rem;
}

.disc-composer__avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.disc-composer--compact .disc-composer__avatar {
  width: 28px;
  height: 28px;
  font-size: 0.75rem;
}

.disc-composer__body {
  flex: 1;
  min-width: 0;
}

.disc-composer__input {
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

.disc-composer__input:focus {
  outline: none;
  border-color: var(--gold, #c5a55a);
}

.disc-composer__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.4rem;
}

.disc-composer__count {
  font-size: 0.75rem;
  color: var(--gray-400, #999);
}

/* Post Card */
.disc-post {
  padding: 1rem 0;
  border-bottom: 1px solid var(--gray-100, #f0f0f0);
}

.disc-post:last-child {
  border-bottom: none;
}

.disc-post--reply {
  margin-left: 2.5rem;
  padding: 0.75rem 0;
  border-left: 2px solid var(--gray-100, #f0f0f0);
  padding-left: 1rem;
  border-bottom: none;
}

.disc-post--pinned {
  background: linear-gradient(135deg, rgba(197,165,90,0.06) 0%, rgba(197,165,90,0.02) 100%);
  border-radius: var(--radius, 12px);
  padding: 1rem;
  margin-bottom: 0.5rem;
  border: 1px solid rgba(197,165,90,0.15);
}

.disc-post__header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.disc-post__avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.disc-post--reply .disc-post__avatar {
  width: 24px;
  height: 24px;
  font-size: 0.7rem;
}

.disc-post__meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
}

.disc-post__author {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--charcoal, #2d2d2d);
}

.disc-post__time {
  font-size: 0.75rem;
  color: var(--gray-400, #999);
}

.disc-post__pin {
  display: flex;
  align-items: center;
}

.disc-post__content {
  font-size: 0.9rem;
  color: var(--gray-600, #555);
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
  margin-bottom: 0.5rem;
}

.disc-post__actions {
  display: flex;
  gap: 0.75rem;
}

.disc-post__action-btn {
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

.disc-post__action-btn:hover {
  color: var(--charcoal, #2d2d2d);
  background: var(--gray-50, #f8f8f8);
}

.disc-post__action-btn--liked {
  color: var(--gold, #c5a55a);
}

.disc-post__reply-composer {
  margin-top: 0.5rem;
  margin-left: 2.5rem;
}

.disc-post__replies {
  margin-top: 0.25rem;
}

/* Empty & Error */
.disc-empty {
  text-align: center;
  padding: 2rem 1rem;
  color: var(--gray-400, #999);
  font-size: 0.9rem;
}

.disc-error {
  text-align: center;
  padding: 1.5rem;
  color: var(--red, #ef4444);
  font-size: 0.9rem;
}

.disc-error .btn {
  margin-top: 0.5rem;
}

.disc-load-more {
  display: block;
  margin: 1rem auto 0;
}

/* Skeleton */
.disc-skeleton__post {
  display: flex;
  gap: 0.75rem;
  padding: 1rem 0;
}

.disc-skeleton__avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--gray-100, #f0f0f0);
  animation: disc-pulse 1.5s ease-in-out infinite;
}

.disc-skeleton__lines {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.disc-skeleton__line {
  height: 12px;
  border-radius: 6px;
  background: var(--gray-100, #f0f0f0);
  animation: disc-pulse 1.5s ease-in-out infinite;
  width: 100%;
}

.disc-skeleton__line--short {
  width: 30%;
}

.disc-skeleton__line--med {
  width: 65%;
}

@keyframes disc-pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}
`;
