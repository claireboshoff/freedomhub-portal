# FreedomHub Portal — Courses & Learning Section
## Team Leader Implementation Plan

**Target:** Build a Mindvalley-quality learning experience inside the FreedomHub Client Portal
**Stack:** React 18 + Vite, vanilla CSS (gold/charcoal/cream design system), Airtable backend via n8n webhook API
**Live:** portal.freedomhub.io

---

## WHY THIS WINS

Every platform forces a compromise:
- **Skool** = community but no real courses, no video hosting, no content types beyond text+embed
- **Kajabi** = courses but community is bolted on, $89-399/mo, fragmented experience
- **Circle** = community-first but courses are shallow, no quizzes/certs, 0.5-4% transaction fees
- **Teachable** = course-only, glitchy, horror stories of held payouts, no community
- **Thinkific** = no mobile app in 2026, essential features locked at $199/mo
- **Mighty Networks** = clunky UX, 2-3% transaction fees, buggy video playback
- **Podia** = no mobile app, no customization, outgrow it fast

**What NOBODY does well:**
1. Multi-content-type support (video + audio + meditations + podcasts + articles + attachments)
2. Real gamification beyond basic badges
3. Mobile-first learning experience
4. AI-personalized learning paths
5. Unified experience (courses + community + content in one home)
6. Meaningful analytics
7. Cohort-based social learning

**Our advantage:** We own the portal. No transaction fees. No feature gating. No monthly platform cost per client. Clients already live here. We add courses and they never need Skool, Kajabi, or Teachable.

---

## RESEARCH-BACKED DESIGN DECISIONS

### Content Architecture (Mindvalley-inspired)
- **Quests** = structured multi-day/week programs with daily micro-lessons (not binge courses)
- **Lessons** = 3-10 minute micro-units (80% completion rate vs 15% for long-form)
- **Content types per lesson:** video, audio, written article, meditation, podcast, attachment/download, quiz
- **Drip scheduling** = release lessons on a schedule to prevent overwhelm (85-96% completion with cohort+drip)

### Gamification (Duolingo-proven mechanics)
- **Streaks** = #1 retention mechanic. 7-day streak users are 3.6x more likely to stay. Loss aversion > reward seeking.
- **XP points** = earned for lesson completion, quiz scores, community participation, streak maintenance
- **Leaderboards** = users on leaderboards complete 40% more content per week
- **Levels** = level up unlocks visual badges and optional gated content
- **Progress bars** = Zeigarnik effect (incomplete tasks nag the brain) — trivial to build, massive impact
- **Badges** = meaningful only (30-day streak, course complete, top 10 leaderboard) — not participation trophies

### Community (Hybrid model)
- **Per-lesson discussions** = inline threads on each lesson page (highest impact, prevents isolation)
- **Course community feed** = social feed per course for wins, questions, accountability
- **Cohort pods** = small groups of 5-8 matched by progress, with shared accountability

### Client Interaction
- **Coaching integration** = 1:1 booking, session notes, progress sharing (already have coaching in portal)
- **Certificates** = auto-generated on course/quest completion, shareable
- **Live sessions** = scheduled events with Zoom/Meet links, auto-recorded to lesson library
- **Nudge system** = automated reminders for inactive learners, streak warnings, milestone celebrations

---

## AIRTABLE SCHEMA

### New Tables Needed

**1. Courses**
| Field | Type | Notes |
|-------|------|-------|
| Title | Single line text | |
| Slug | Single line text | URL-safe identifier |
| Description | Long text | Rich text |
| Type | Single select | course, quest, challenge, meditation-series, podcast-series |
| Category | Single select | business, wellness, marketing, mindset, skills, finance, coaching |
| Thumbnail | Attachment | Course card image |
| Creator | Link to Clients | Who created/teaches this |
| Status | Single select | draft, published, archived |
| Visibility | Single select | private, unlisted, public |
| Price (ZAR) | Currency | 0 = free |
| Price (USD) | Currency | For international clients |
| Drip Enabled | Checkbox | Release lessons on schedule |
| Drip Interval Days | Number | Days between lesson unlocks |
| Estimated Duration | Single line text | e.g. "4 weeks", "30 days" |
| Lesson Count | Count | Auto from linked lessons |
| Enrollment Count | Count | Auto from linked enrollments |
| Tags | Multiple select | Searchable tags |
| Featured | Checkbox | Show on dashboard |
| Sort Order | Number | For manual ordering |

**2. Modules**
| Field | Type | Notes |
|-------|------|-------|
| Title | Single line text | |
| Course | Link to Courses | Parent course |
| Sort Order | Number | |
| Description | Long text | Module intro text |

**3. Lessons**
| Field | Type | Notes |
|-------|------|-------|
| Title | Single line text | |
| Module | Link to Modules | Parent module |
| Course | Link to Courses | For direct lookup |
| Sort Order | Number | Within module |
| Content Type | Single select | video, audio, article, meditation, podcast, mixed |
| Video URL | URL | YouTube, Vimeo, or hosted |
| Audio URL | URL | For audio/meditation/podcast |
| Written Content | Long text | Rich text / markdown |
| Attachments | Attachment | PDFs, worksheets, templates |
| Duration Minutes | Number | |
| Drip Day | Number | Which day this unlocks (if drip enabled) |
| Quiz Enabled | Checkbox | |
| Reflection Prompt | Long text | Journal/reflection question |
| Status | Single select | draft, published |

**4. Quizzes**
| Field | Type | Notes |
|-------|------|-------|
| Lesson | Link to Lessons | Parent lesson |
| Question | Long text | |
| Type | Single select | multiple-choice, true-false, open-ended |
| Options | Long text | JSON array for MC options |
| Correct Answer | Single line text | |
| Sort Order | Number | |
| Points | Number | XP awarded for correct answer |

**5. Enrollments**
| Field | Type | Notes |
|-------|------|-------|
| Client | Link to Clients | |
| Course | Link to Courses | |
| Enrolled Date | Date | |
| Status | Single select | active, completed, paused, expired |
| Progress Percent | Percent | Auto-calculated |
| Current Lesson | Link to Lessons | Last accessed |
| Completed Date | Date | |
| Certificate ID | Single line text | Auto-generated unique ID |

**6. Lesson Progress**
| Field | Type | Notes |
|-------|------|-------|
| Client | Link to Clients | |
| Lesson | Link to Lessons | |
| Enrollment | Link to Enrollments | |
| Status | Single select | not-started, in-progress, completed |
| Completed Date | Date | |
| Quiz Score | Number | Percentage |
| Quiz Answers | Long text | JSON of answers |
| Time Spent Minutes | Number | |
| Notes | Long text | Personal notes/journal |
| Reflection Response | Long text | Response to reflection prompt |

**7. Gamification**
| Field | Type | Notes |
|-------|------|-------|
| Client | Link to Clients | |
| Total XP | Number | Lifetime points |
| Current Streak | Number | Consecutive active days |
| Longest Streak | Number | Personal best |
| Last Active Date | Date | For streak calculation |
| Level | Number | Calculated from XP |
| Badges | Long text | JSON array of earned badges |

**8. Course Discussions**
| Field | Type | Notes |
|-------|------|-------|
| Lesson | Link to Lessons | Which lesson this is on |
| Course | Link to Courses | For course-level discussions |
| Client | Link to Clients | Author |
| Content | Long text | The message |
| Parent | Link to Course Discussions | For threading (null = top-level) |
| Created | Date | |
| Likes | Number | |
| Pinned | Checkbox | Instructor can pin |

**9. Live Sessions**
| Field | Type | Notes |
|-------|------|-------|
| Title | Single line text | |
| Course | Link to Courses | |
| Date Time | Date | With time |
| Duration Minutes | Number | |
| Meeting URL | URL | Zoom/Meet link |
| Recording URL | URL | Post-session recording |
| Host | Link to Clients | Instructor |
| Description | Long text | |
| Status | Single select | scheduled, live, completed, cancelled |

**10. Certificates**
| Field | Type | Notes |
|-------|------|-------|
| Client | Link to Clients | |
| Course | Link to Courses | |
| Certificate ID | Single line text | Unique (e.g. FH-CERT-0001) |
| Issued Date | Date | |
| Completion Score | Number | Average quiz score |

---

## PORTAL COMPONENTS (React)

### New Routes
| Route | Component | Purpose |
|-------|-----------|---------|
| `/learn` | Academy | Main learning dashboard — enrolled courses, featured, browse |
| `/learn/browse` | CourseBrowse | Browse/search all available courses |
| `/learn/:slug` | CourseDetail | Course overview, modules, enroll button, reviews |
| `/learn/:slug/lesson/:id` | LessonPlayer | The actual learning experience |
| `/learn/:slug/community` | CourseCommunity | Discussion feed for this course |
| `/learn/:slug/leaderboard` | CourseLeaderboard | XP rankings for this course |
| `/learn/:slug/live` | CourseLiveSessions | Upcoming and past live sessions |
| `/learn/my-progress` | MyProgress | All enrollments, streaks, badges, XP |
| `/learn/certificates` | MyCertificates | Earned certificates |

### Admin Routes (Claire)
| Route | Component | Purpose |
|-------|-----------|---------|
| `/admin/courses` | AdminCourses | All courses CRUD |
| `/admin/courses/new` | CourseBuilder | Create/edit course, modules, lessons |
| `/admin/courses/:id/analytics` | CourseAnalytics | Enrollment, completion, engagement stats |

### Component Architecture
```
Academy (main dashboard)
  -- FeaturedCourses (hero carousel/cards)
  -- ContinueLearning (resume where you left off)
  -- StreakWidget (current streak + calendar heatmap)
  -- XPWidget (level, total XP, next level progress)
  -- LeaderboardMini (top 5 + your rank)
  -- RecommendedCourses (based on completed courses)

CourseDetail (course overview page)
  -- CourseHero (thumbnail, title, description, stats)
  -- CourseModules (accordion with lesson list)
  -- CourseInstructor (creator profile card)
  -- EnrollButton (free or priced)
  -- CourseReviews (ratings from completions)
  -- CourseMeta (duration, lesson count, level, type)

LessonPlayer (the learning experience)
  -- LessonNav (sidebar with module/lesson tree, progress checkmarks)
  -- VideoPlayer (responsive, playback speed, progress tracking)
  -- AudioPlayer (waveform, background-capable, speed control)
  -- ArticleContent (rich text with inline images)
  -- AttachmentList (downloadable resources)
  -- MeditationPlayer (ambient bg, timer, guided audio)
  -- QuizSection (inline quiz after content)
  -- ReflectionJournal (text area for journaling prompts)
  -- LessonDiscussion (threaded comments on this lesson)
  -- LessonActions (mark complete, next lesson, bookmark)
  -- ProgressBar (course-level progress at top)

CourseCommunity (social feed)
  -- PostComposer (write a post, share a win)
  -- PostFeed (chronological, filterable)
  -- PostCard (author, content, likes, replies, timestamp)

Gamification (shared components)
  -- StreakCounter (flame icon + count)
  -- XPBadge (level indicator)
  -- ProgressRing (circular progress)
  -- BadgeGrid (earned badges display)
  -- LeaderboardTable (rank, avatar, name, XP)
  -- LevelUpModal (celebration animation on level up)
  -- StreakWarning (push notification when streak at risk)
```

---

## GAMIFICATION SYSTEM DESIGN

### XP Awards
| Action | XP |
|--------|-----|
| Complete a lesson | 10 |
| Complete a quiz (pass) | 15 |
| Perfect quiz score | 25 |
| Complete a module | 50 |
| Complete a course/quest | 200 |
| Daily streak maintained | 5 |
| 7-day streak bonus | 50 |
| 30-day streak bonus | 200 |
| Post in community | 3 |
| Reply to discussion | 2 |
| Receive a like | 1 |
| Submit reflection journal | 5 |
| Attend live session | 20 |

### Levels
| Level | XP Required | Title |
|-------|-------------|-------|
| 1 | 0 | Newcomer |
| 2 | 100 | Explorer |
| 3 | 300 | Learner |
| 4 | 600 | Achiever |
| 5 | 1000 | Rising Star |
| 6 | 1500 | Knowledge Seeker |
| 7 | 2500 | Trailblazer |
| 8 | 4000 | Expert |
| 9 | 6000 | Master |
| 10 | 10000 | Legend |

### Badges
| Badge | Criteria |
|-------|----------|
| First Steps | Complete your first lesson |
| Quiz Whiz | Score 100% on any quiz |
| Week Warrior | 7-day streak |
| Month Master | 30-day streak |
| Century | 100-day streak |
| Course Complete | Finish any course |
| Quest Conqueror | Complete a quest (multi-week program) |
| Top 10 | Reach top 10 on any leaderboard |
| Helpful Hand | 10 community replies |
| Thought Leader | 5 posts with 3+ likes each |
| Bookworm | Complete 5 courses |
| Deep Thinker | Submit 20 reflection journals |
| Live Wire | Attend 5 live sessions |
| Certified Pro | Earn 3 certificates |

### Streak Logic
- Activity = completing a lesson, taking a quiz, submitting a reflection, posting in community
- Streak resets at midnight (client's timezone or SAST)
- "Streak at risk" notification at 8pm if no activity that day
- Streak freeze: clients can "freeze" streak once per week (premium feature or earned at Level 5)

---

## CONTENT TYPE PLAYER DESIGNS

### Video Lessons
- Responsive video embed (YouTube/Vimeo/self-hosted)
- Playback speed controls (0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x)
- Progress tracked (auto-mark "in progress" on play, "complete" on 90% watched)
- Timestamp bookmarks (click to save a moment)

### Audio / Meditation / Podcast
- Custom audio player with waveform visualization
- Background playback support (screen off)
- Sleep timer for meditations (15m, 30m, 45m, 1h)
- Queue/playlist for sequential listening
- Speed controls
- Ambient background option for meditations (rain, ocean, forest — CSS animated)

### Written Articles
- Clean reading view (League Spartan headings, Inter body, optimal line width 65ch)
- Estimated read time
- Highlight and save quotes
- Print-friendly layout

### Attachments
- Inline preview for PDFs and images
- Download button with file type icon
- Organized by type (worksheets, templates, resources, tools)

### Quizzes
- Inline after lesson content (not a separate page)
- Multiple choice with instant feedback (correct/incorrect + explanation)
- True/false
- Open-ended (stored for instructor review)
- Score display with XP earned
- "Retry" option (best score kept)
- Gate next lesson behind quiz pass (optional per lesson)

### Reflection Journal
- Text area with prompt displayed above
- Auto-saves as draft
- Private to the student (instructor can see if enabled)
- Past reflections viewable in "My Progress"
- XP awarded on submission

---

## SPRINT PLAN

### Sprint 8: Foundation — Course Data + Browse (Week 1)
- [ ] Create all Airtable tables (Courses, Modules, Lessons, Quizzes, Enrollments, Lesson Progress, Gamification, Discussions, Live Sessions, Certificates)
- [ ] Add n8n API routes: courses, course-detail, modules, lessons, enroll, my-enrollments
- [ ] Build Academy dashboard (`/learn`) — featured courses, browse button
- [ ] Build CourseBrowse (`/learn/browse`) — card grid, category filters, search
- [ ] Build CourseDetail (`/learn/:slug`) — hero, modules accordion, enroll button
- [ ] Add "Academy" to portal sidebar navigation (book/graduation cap icon)
- [ ] Seed 2-3 sample courses for testing
- [ ] CSS: all new components match gold/charcoal/cream design system

### Sprint 9: Lesson Player + Content Types (Week 2)
- [ ] Build LessonPlayer (`/learn/:slug/lesson/:id`) — full learning experience
- [ ] Video player component (responsive, speed controls)
- [ ] Audio player component (waveform, speed, background play)
- [ ] Article/written content renderer (rich text)
- [ ] Attachment list with inline preview + download
- [ ] Meditation player (audio + ambient background + timer)
- [ ] Lesson sidebar navigation (module tree with progress checkmarks)
- [ ] Mark complete button + auto-progress tracking
- [ ] "Next Lesson" / "Previous Lesson" navigation
- [ ] n8n routes: lesson-detail, mark-complete, lesson-progress

### Sprint 10: Quizzes + Reflections + Certificates (Week 3)
- [ ] Quiz component (multiple choice, true/false, open-ended)
- [ ] Quiz scoring with instant feedback
- [ ] Quiz gate logic (optional: must pass to proceed)
- [ ] Reflection journal component (prompt + text area + auto-save)
- [ ] n8n routes: quiz-submit, reflection-submit, quiz-results
- [ ] Certificate auto-generation on course completion (HTML template, downloadable)
- [ ] MyCertificates page (`/learn/certificates`)
- [ ] Certificate sharing (generate image/link)

### Sprint 11: Gamification Engine (Week 3-4)
- [ ] Gamification Airtable table + n8n routes
- [ ] XP award system (triggered on lesson complete, quiz pass, reflection submit, etc.)
- [ ] Streak tracking (daily activity check, increment/reset)
- [ ] Level calculation (from total XP)
- [ ] StreakWidget component (flame icon, count, calendar heatmap)
- [ ] XPWidget component (level badge, progress to next level)
- [ ] BadgeGrid component (earned vs locked badges)
- [ ] LevelUpModal (celebration animation when leveling up)
- [ ] LeaderboardTable component (per-course and global)
- [ ] Streak notification logic (8pm warning if no activity)
- [ ] Integrate gamification widgets into Academy dashboard

### Sprint 12: Community + Discussions (Week 4)
- [ ] Per-lesson discussion threads (inline on LessonPlayer)
- [ ] Course community feed (`/learn/:slug/community`)
- [ ] PostComposer (write, reply)
- [ ] PostCard (author avatar, content, likes, replies, time)
- [ ] Like system
- [ ] Pin/highlight (instructor feature)
- [ ] n8n routes: discussions, post-discussion, like-discussion
- [ ] Notification: new reply to your post

### Sprint 13: Live Sessions + Coaching Integration (Week 5)
- [ ] Live Sessions table + n8n routes
- [ ] CourseLiveSessions page (`/learn/:slug/live`)
- [ ] Session cards (upcoming with countdown, past with recording link)
- [ ] Calendar view of upcoming sessions
- [ ] Recording auto-links to lesson library after session
- [ ] Connect existing Coaching section to courses (coach can assign courses to coaching clients)
- [ ] "Assigned to me" section on Academy dashboard

### Sprint 14: Creator/Admin Tools (Week 5-6)
- [ ] AdminCourses page — list all courses with stats
- [ ] CourseBuilder — create/edit course, add modules, add lessons
- [ ] Drag-and-drop lesson ordering (within modules)
- [ ] Bulk content upload (multiple lessons at once)
- [ ] Quiz builder (add questions to lessons)
- [ ] CourseAnalytics — enrollment trends, completion rates, quiz performance, engagement
- [ ] Student progress view (per student: which lessons done, quiz scores, time spent)
- [ ] n8n admin routes: create-course, update-course, create-lesson, update-lesson, create-quiz, course-analytics

### Sprint 15: Polish + Advanced Features (Week 6-7)
- [ ] MyProgress page (`/learn/my-progress`) — all enrollments, streaks, badges, stats
- [ ] Course recommendations (based on completed courses and category)
- [ ] Drip content scheduling (unlock lessons based on enrollment date + interval)
- [ ] "Continue Learning" widget on main portal Dashboard
- [ ] Search across all courses + lessons
- [ ] Mobile optimization pass (responsive layouts, touch-friendly, thumb-zone nav)
- [ ] Loading states, empty states, error states for all new components
- [ ] Telegram notifications: enrollment confirmation, streak warnings, course completion, certificate earned
- [ ] Admin: featured course management, course ordering

---

## UI/UX SPECIFICATIONS

### Design System Alignment
All new components use the existing portal CSS variables:
- Primary: `var(--gold)` / `var(--gold-light)` / `var(--gold-dark)`
- Background: `var(--cream)` for content areas, `var(--charcoal)` for dark sections
- Cards: white bg, `var(--shadow-sm)`, `border-radius: 10px`
- Typography: League Spartan headings, Inter body
- Buttons: `.btn--primary` (gold), `.btn--ghost`, `.btn--outline`
- Status badges: existing `.status-badge` pattern
- Forms: existing `.form-group`, `.form-input` patterns

### New CSS Patterns Needed
```
.course-card          — Card with thumbnail, title, meta, progress bar
.lesson-player        — Full-width content area with sidebar
.lesson-sidebar       — Module/lesson tree with checkmarks
.video-container      — Responsive 16:9 video wrapper
.audio-player         — Custom audio controls with waveform
.quiz-section         — Inline quiz with options and feedback
.reflection-box       — Journal prompt + textarea
.streak-widget        — Flame icon + number + mini calendar
.xp-badge             — Level indicator (circular)
.progress-ring        — SVG circular progress
.badge-item           — Badge icon + label (earned vs locked)
.leaderboard-row      — Rank + avatar + name + XP
.discussion-thread    — Comment with replies
.post-card            — Community post with actions
.certificate-card     — Certificate preview with download
.meditation-player    — Audio + ambient background + timer
.level-up-overlay     — Celebration modal with animation
```

### Content Type Icons (inline SVG, matching existing portal style)
- Video: play button in circle
- Audio: soundwave
- Article: document/page
- Meditation: lotus/zen circle
- Podcast: microphone
- Quiz: question mark in circle
- Attachment: paperclip
- Live: broadcast/signal icon

### Academy Dashboard Layout
```
+------------------------------------------+
| Academy                          [Browse] |
+------------------------------------------+
| [Streak: 12 days] [XP: 1,450] [Level: 5] |
+------------------------------------------+
| Continue Learning                         |
| +--------+ +--------+ +--------+         |
| |Course 1| |Course 2| |Course 3|         |
| |prog 45%| |prog 80%| |prog 12%|         |
| +--------+ +--------+ +--------+         |
+------------------------------------------+
| Featured Courses                          |
| +--------+ +--------+ +--------+         |
| | New!   | | Quest  | | Series |         |
| |        | |        | |        |         |
| +--------+ +--------+ +--------+         |
+------------------------------------------+
| Leaderboard (Top 5)    | My Badges       |
| 1. Sarah - 4,200 XP    | [x] Week Warrior|
| 2. You - 1,450 XP      | [x] Quiz Whiz   |
| 3. James - 1,100 XP    | [ ] Month Master |
+------------------------------------------+
```

### Lesson Player Layout
```
+---sidebar---+--------content-area--------+
| Module 1    | [< Prev]  Lesson 3/12 [Next >]|
|  [x] L1     | ========================== |
|  [x] L2     | [Course progress: 45%]     |
|  [>] L3 *   | +------------------------+ |
|  [ ] L4     | |                        | |
| Module 2    | |    VIDEO / AUDIO /     | |
|  [ ] L5     | |    ARTICLE CONTENT     | |
|  [ ] L6     | |                        | |
|  [ ] L7     | +------------------------+ |
| Module 3    | [Attachments: worksheet.pdf]|
|  [ ] L8     | +------------------------+ |
|  [ ] L9     | | Quiz: 3 questions      | |
|             | +------------------------+ |
|             | +------------------------+ |
|             | | Reflection:            | |
|             | | "What resonated..."    | |
|             | | [________________]     | |
|             | +------------------------+ |
|             | +------------------------+ |
|             | | Discussion (4 comments)| |
|             | +------------------------+ |
|             | [Mark Complete + Next >>]  |
+-----------+-----------------------------+
```

---

## FEATURES YOU DIDN'T THINK OF (Added by Team Leader)

### 1. Learning Paths
Group multiple courses into a recommended sequence. "Marketing Mastery Path" = SEO Basics > Content Strategy > Social Media > Paid Ads. Clients see a visual roadmap and earn a "Path Complete" mega-badge.

### 2. Bookmarks & Notes
Let clients bookmark specific lessons and add personal notes. Accessible from MyProgress. Creates a personal knowledge base they return to.

### 3. Course Reviews & Ratings
After completion, prompt for 1-5 star rating + text review. Display on CourseDetail page. Social proof drives enrollments.

### 4. Offline-Ready Content
For articles and audio — cache content for offline access (Service Worker). Critical for SA where data is expensive.

### 5. Guest/Preview Mode
Non-enrolled users can preview first 1-2 lessons of any course. Reduces friction to enrollment.

### 6. Cohort Mode
Optional: group enrollees who start within the same week into a "cohort." They see each other on the leaderboard and in discussions. Creates the Mindvalley "learning together" effect. 85-96% completion rates vs 3% solo.

### 7. Instructor Spotlight
Each course has an instructor profile card with bio, credentials, other courses. Builds trust and authority. Could be Claire, a client, or a guest expert.

### 8. Smart Nudges (Telegram)
- "You're 2 lessons away from completing [Course]. Finish today?"
- "Your streak is at risk! Open the academy to keep your 14-day streak alive."
- "Congrats! You earned the Quiz Whiz badge. You're now Level 4."
- "New course available: [Title]. Based on your interests, you'll love this."
- Weekly summary: "This week: 5 lessons completed, 75 XP earned, streak at 9 days."

### 9. Content Scheduling for Creators
Claire (or client-creators) can schedule course publish dates, lesson drip dates, and live sessions from the admin panel. Set it and forget it.

### 10. Multi-Currency Pricing
Courses can have ZAR and USD pricing. Portal detects client's currency preference from their profile. SA clients see Rand, international see Dollar.

### 11. Bundle & Subscription Pricing
- Individual course purchase
- Course bundle (3+ courses at discount)
- "All Access" subscription (unlimited courses for monthly fee)
- Free courses (lead magnets, onboarding, client education)

### 12. Progress Sharing
"Share your progress" button generates a card image showing course name, progress %, streak, and level. Shareable to social media. Free marketing.

### 13. Daily "Today" Tab
Mindvalley's killer feature adapted: a personalized "Today" view showing:
- Today's lesson (from active drip courses)
- Your streak status
- A meditation/audio pick
- Community activity you missed
- Upcoming live session

### 14. Prerequisite Courses
Course A requires Course B to be completed first. Prevents overwhelm, guides the learning journey.

### 15. Completion Webhooks
When a course is completed, fire a webhook that can trigger:
- Telegram notification to Claire
- Airtable update
- n8n workflow (send certificate email, trigger upsell, update CRM)
- Future: trigger FreedomOS actions

---

## MONETIZATION FOR CLIENTS

This isn't just for Claire's courses. FreedomOS clients can use this to sell THEIR courses to THEIR audiences:

### Client-as-Creator Model
- Claire creates courses for her clients (content marketing, education, training)
- Clients create their OWN courses through the admin panel
- Marcel (Minnesota House) could sell recovery courses
- Michael (Berco) could offer plant care training
- Any coaching client can package their knowledge

### Revenue Split Options
- Free courses (lead generation, client education)
- Paid courses (client keeps 100%, no transaction fees)
- Platform fee model (FreedomHub takes 5-10% — still way less than Teachable/Circle)

### New Service for FreedomHub
Add to Services page: "Course Creation" service
- Starter: R8,000 (5-lesson course, basic quiz, no community)
- Professional: R18,000 (20+ lessons, quizzes, community, live sessions)
- Enterprise: R35,000 (full quest program, gamification, cohort model)
- Monthly hosting: included in maintenance plan

---

## TECH IMPLEMENTATION NOTES

### n8n API Routes Needed
All routes follow existing pattern: `GET /webhook/portal-api?token=X&route=Y&payload=Z`

**Client routes:**
- `courses` — list published courses (with enrollment status)
- `course-detail` — single course with modules and lessons
- `enroll` — create enrollment record
- `my-enrollments` — client's enrolled courses with progress
- `lesson-detail` — single lesson with content, quiz, discussion
- `mark-complete` — mark lesson complete, award XP, check badges
- `quiz-submit` — submit quiz answers, return score + XP
- `reflection-submit` — save reflection response
- `discussions` — get lesson/course discussions
- `post-discussion` — create post/reply
- `like-discussion` — toggle like
- `my-progress` — gamification stats (XP, streak, level, badges)
- `leaderboard` — course or global leaderboard
- `live-sessions` — upcoming and past sessions for a course
- `certificates` — client's earned certificates
- `today` — personalized daily view data

**Admin routes:**
- `admin-courses` — all courses with stats
- `admin-create-course` — create course
- `admin-update-course` — update course
- `admin-create-module` — add module to course
- `admin-create-lesson` — add lesson to module
- `admin-update-lesson` — update lesson content
- `admin-create-quiz` — add quiz questions to lesson
- `admin-course-analytics` — enrollment, completion, engagement data
- `admin-student-progress` — per-student detail view

### Airtable Considerations
- Use linked records for relationships (Course > Module > Lesson)
- Gamification table: one record per client (update, don't create new)
- Lesson Progress: one record per client+lesson combination
- Discussions: self-referencing link for threading (Parent field)
- Streak calculation: compare Last Active Date with today on each activity
- Badge checking: run after each XP-awarding action

### Video/Audio Hosting
- Don't self-host video — use YouTube (unlisted), Vimeo, or Bunny.net CDN
- Audio files: Airtable attachments for small files, or external CDN for large libraries
- Meditation ambient sounds: local audio files (small, loopable .mp3s)

---

## PRIORITY ORDER (If time-constrained)

**Must-have (MVP):**
1. Course browse + detail pages
2. Enrollment
3. Lesson player (video + audio + article + attachments)
4. Progress tracking (checkmarks, percentage)
5. Mark complete + next lesson flow
6. Academy dashboard with "Continue Learning"

**High-value (Phase 2):**
7. Quizzes
8. Streaks + XP + leaderboard
9. Per-lesson discussions
10. Certificates
11. Admin course builder

**Differentiators (Phase 3):**
12. Reflection journals
13. Meditation player with ambient backgrounds
14. Course community feed
15. Live sessions
16. Daily "Today" tab
17. Cohort mode
18. Learning paths
19. Smart nudges (Telegram)
20. Creator tools for clients

---

## SUCCESS METRICS

| Metric | Target |
|--------|--------|
| Course completion rate | 60%+ (vs industry 10-15%) |
| Daily active learners | 40%+ of enrolled |
| Average streak length | 7+ days |
| Quiz participation | 80%+ of lesson completers |
| Community posts/week | 5+ per active course |
| Client satisfaction | 4.5+/5 rating |
| Certificate earned rate | 50%+ of enrollees |
| Retention (30-day) | 70%+ |

---

*Plan created: 2026-03-07*
*Architecture: FreedomHub Client Portal (React + Vite + Airtable + n8n)*
*Design system: Gold/charcoal/cream, League Spartan + Inter*
*Team Leader: Claude*
