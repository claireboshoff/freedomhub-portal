import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import ServiceForm from './ServiceForm';

/* ===========================
   COACHING PACKAGES
   =========================== */
const COACHING_TYPES = [
  {
    id: 'life',
    title: 'Life Coaching',
    badge: 'Silver',
    tagline: 'Identity. Mindset. Leadership.',
    framework: 'BE',
    frameworkDesc: 'Who are you becoming? This foundational layer addresses inner transformation — identity, mindset, beliefs, and leadership — before any external changes occur. The patterns in your life show up in your business. We start here.',
    color: '#8a8a8a',
    perSession: 950,
    tiers: [
      { sessions: 1, price: 'R950', label: 'Single Session', discount: null },
      { sessions: 4, price: 'R3,600', label: '4 Sessions', discount: 'Save 5%' },
      { sessions: 6, price: 'R5,100', label: '6 Sessions', discount: 'Save 10%' },
      { sessions: 12, price: 'R9,600', label: '12 Sessions', discount: 'Save 15%' },
    ],
  },
  {
    id: 'business',
    title: 'Business / AI Coaching',
    badge: 'Gold',
    tagline: 'Systems. Strategy. Smart growth.',
    framework: 'BUILD + AUTOMATE',
    frameworkDesc: 'Real capacity is not hired — it is engineered. We design the systems, processes, and frameworks your business needs, then layer in AI and automation to multiply your output. Strategy that changes trajectory, not just results.',
    color: '#C5A55A',
    perSession: 1300,
    tiers: [
      { sessions: 1, price: 'R1,300', label: 'Single Session', discount: null },
      { sessions: 4, price: 'R4,900', label: '4 Sessions', discount: 'Save 5%' },
      { sessions: 6, price: 'R7,000', label: '6 Sessions', discount: 'Save 10%' },
      { sessions: 12, price: 'R13,200', label: '12 Sessions', discount: 'Save 15%' },
    ],
  },
  {
    id: 'holistic',
    title: 'Holistic Coaching',
    badge: 'Platinum',
    tagline: 'The full spectrum. Life and business.',
    framework: 'BE + BUILD + AUTOMATE',
    frameworkDesc: 'All of it is connected. Most people try to automate before they know what they are building, and build before they know who they are becoming. This is the complete journey — identity, systems, and automation in one integrated coaching experience.',
    color: '#2D2D2D',
    perSession: 1150,
    tiers: [
      { sessions: 1, price: 'R1,150', label: 'Single Session', discount: null },
      { sessions: 4, price: 'R4,300', label: '4 Sessions', discount: 'Save 5%' },
      { sessions: 6, price: 'R6,200', label: '6 Sessions', discount: 'Save 10%' },
      { sessions: 12, price: 'R11,700', label: '12 Sessions', discount: 'Save 15%' },
    ],
  },
  {
    id: 'advisory',
    title: 'Advisory',
    badge: null,
    tagline: 'Premium. Limited to 10 slots.',
    framework: 'BE + BUILD + AUTOMATE',
    frameworkDesc: 'Work directly with Claire at the highest level. 10x your results in life, business, or both. This is not coaching — it is strategic partnership. Limited to 10 clients per advisory track. For leaders ready to move fast and think bigger.',
    color: '#1a1a1a',
    perSession: null,
    isAdvisory: true,
    tiers: [
      { sessions: null, price: 'R150,000', label: 'Life Design Advisory', discount: '3 months' },
      { sessions: null, price: 'R250,000', label: 'Life Design Advisory', discount: '6 months' },
      { sessions: null, price: 'R150,000', label: 'Business Architect Advisory', discount: '3 months' },
      { sessions: null, price: 'R250,000', label: 'Business Architect Advisory', discount: '6 months' },
      { sessions: null, price: 'R300,000', label: 'Freedom Architect Advisory', discount: '6 months' },
    ],
  },
  {
    id: 'speaking',
    title: 'Corporate & Speaking',
    badge: null,
    tagline: 'For businesses, events, and organisations.',
    framework: 'BE + BUILD + AUTOMATE',
    frameworkDesc: 'Claire brings the Be + Build + Automate framework into organisations, events, and corporate environments — as a facilitator, trainer, keynote speaker, or guest expert. Whether you are looking to transform a team, open a conference with impact, or energise a business forum, the work is the same: helping humans get unstuck and build something that works.',
    color: '#1a1a1a',
    perSession: null,
    isSpeaking: true,
    tiers: [
      { sessions: null, price: 'Custom', label: 'Business Retreats & Corporate Training', discount: 'Full-day or half-day' },
      { sessions: null, price: 'Custom', label: 'Keynote Speaking & Guest Appearances', discount: 'Conferences & forums' },
    ],
    speakingTopics: [
      'The Be + Build + Automate Framework',
      'AI Without the Fear',
      'Burnout Is a Design Problem',
      'Leadership & Identity Under Pressure',
      'Building a Business That Doesn\'t Need You',
      'Time, Money & Location Freedom',
    ],
    speakingVenues: 'Business forums & conferences, Women\'s events & ladies luncheons, Leadership retreats, Corporate training days, Guest expert panels, Online summits & webinars',
  },
];

/* ===========================
   DONE-FOR-YOU SERVICES
   =========================== */
const SERVICE_TYPES = [
  {
    id: 'website',
    title: 'Website Build',
    tagline: 'Your vision, expertly crafted.',
    description: 'We handle everything from strategy to launch. You just approve.',
    frameworkTag: 'BUILD',
    learnMore: 'A complete website project — research, strategy, copywriting, design, development, SEO, and deployment. We audit your current presence, design for conversion, and launch a site that works as hard as you do. Includes project management, revisions, and post-launch support.',
    icon: 'globe',
    color: '#C5A55A',
    packages: [
      { label: 'Starter (1-4 pages)', price: 'from R5,000' },
      { label: 'Business (5-8 pages)', price: 'from R12,000' },
      { label: 'Professional (8-15 pages + CMS)', price: 'from R25,000' },
      { label: 'E-Commerce (full store)', price: 'from R25,000' },
    ],
    addons: [
      { label: 'SEO Audit + Setup', price: 'from R7,000' },
      { label: 'Monthly SEO Retainer', price: 'from R7,500/mo' },
      { label: 'Local SEO (Google Business Profile)', price: 'from R5,000/mo' },
      { label: 'GEO (AI Search Optimisation)', price: 'from R5,000/mo' },
      { label: 'Blog Content (SEO-optimised)', price: 'from R1,500/article' },
    ],
    steps: [
      {
        title: 'About Your Business',
        fields: [
          { name: 'businessName', label: 'Business Name', type: 'text', required: true },
          { name: 'industry', label: 'Industry', type: 'text', required: true },
          { name: 'currentUrl', label: 'Current Website (if any)', type: 'text', placeholder: 'https://...' },
          { name: 'businessDescription', label: 'What does your business do?', type: 'textarea', required: true, placeholder: 'Tell us in a few sentences...' },
        ],
      },
      {
        title: 'Goals & Audience',
        fields: [
          { name: 'websiteGoal', label: 'Main goal for the website', type: 'select', required: true, options: ['Generate leads', 'Sell products/services', 'Build credibility', 'Inform & educate', 'Book appointments', 'Other'] },
          { name: 'targetAudience', label: 'Who is your ideal customer?', type: 'textarea', required: true, placeholder: 'Age, location, interests, pain points...' },
          { name: 'competitors', label: 'Competitors or sites you admire', type: 'textarea', placeholder: 'Share URLs or names...' },
        ],
      },
      {
        title: 'Brand & Content',
        fields: [
          { name: 'hasLogo', label: 'Do you have a logo?', type: 'select', required: true, options: ['Yes, I will provide it', 'No, I need one designed', 'I have one but it needs updating'] },
          { name: 'brandColors', label: 'Brand colours (if any)', type: 'text', placeholder: 'e.g. Navy blue, gold, white' },
          { name: 'pages', label: 'Pages needed', type: 'multicheck', options: ['Home', 'About', 'Services', 'Contact', 'Blog', 'Portfolio', 'Pricing', 'FAQ', 'Testimonials', 'Shop', 'Other'] },
          { name: 'otherPages', label: 'Describe other pages needed', type: 'textarea', placeholder: 'Tell us about any custom pages — booking, gallery, downloads, members area, etc.' },
          { name: 'content', label: 'Do you have written content?', type: 'select', required: true, options: ['Yes, I will provide all copy', 'I have some, need help with the rest', 'No, I need all copy written for me'] },
          { name: 'references', label: 'Reference websites you like', type: 'textarea', placeholder: 'URLs and what you like about them...' },
        ],
      },
      {
        title: 'Package & Timeline',
        fields: [
          { name: 'package', label: 'Choose a package', type: 'select', required: true, options: [
            'Starter (1-4 pages) — from R5,000',
            'Business (5-8 pages) — from R12,000',
            'Professional (8-15 pages + CMS) — from R25,000',
            'E-Commerce (full store) — from R25,000',
            'Not sure — advise me'
          ]},
          { name: 'seoAddons', label: 'SEO & Visibility add-ons', type: 'multicheck', options: ['SEO Audit + Setup — from R7,000', 'Monthly SEO Retainer — from R7,500/mo', 'Local SEO (Google Business Profile) — from R5,000/mo', 'GEO (AI Search Optimisation) — from R5,000/mo', 'Blog Content (SEO-optimised) — from R1,500/article', 'None needed right now'] },
          { name: 'timeline', label: 'When do you need this?', type: 'select', required: true, options: ['ASAP (1-2 weeks)', 'Within a month', '1-2 months', 'No rush — quality over speed'] },
          { name: 'additionalNotes', label: 'Anything else we should know?', type: 'textarea', placeholder: 'Special requirements, integrations, must-haves...' },
        ],
      },
    ],
  },
  {
    id: 'landing-page',
    title: 'Landing Page',
    tagline: 'Engineered for conversions.',
    description: 'Tell us your goal. We will build the machine that gets you there.',
    frameworkTag: 'BUILD',
    learnMore: 'High-converting landing pages built on research — audience analysis, pain point mapping, competitor review, and conversion psychology. Includes A/B testing setup, lead capture forms, email sequences, and analytics tracking. Every element is designed to convert.',
    icon: 'target',
    color: '#C5A55A',
    packages: [
      { label: 'Single Landing Page', price: 'from R3,500' },
      { label: 'Multi-variant + A/B Testing', price: 'from R8,000' },
    ],
    steps: [
      {
        title: 'Your Offer',
        fields: [
          { name: 'offerName', label: 'What are you promoting?', type: 'text', required: true, placeholder: 'e.g. Free consultation, course, product launch' },
          { name: 'offerDescription', label: 'Describe the offer', type: 'textarea', required: true, placeholder: 'What does the customer get? Why is it valuable?' },
          { name: 'offerType', label: 'Type of offer', type: 'select', required: true, options: ['Free lead magnet', 'Paid product/service', 'Event/webinar registration', 'Consultation booking', 'Waitlist', 'Other'] },
        ],
      },
      {
        title: 'Target Audience',
        fields: [
          { name: 'targetAudience', label: 'Who is this for?', type: 'textarea', required: true, placeholder: 'Describe your ideal customer for this offer...' },
          { name: 'painPoints', label: 'What problem does this solve?', type: 'textarea', required: true, placeholder: 'What keeps your audience up at night?' },
          { name: 'urgency', label: 'Is there urgency?', type: 'select', options: ['Yes — limited time/spots', 'Seasonal relevance', 'Evergreen — no rush', 'Launch date specific'] },
        ],
      },
      {
        title: 'Content & Style',
        fields: [
          { name: 'tone', label: 'Tone of voice', type: 'select', required: true, options: ['Professional & authoritative', 'Warm & conversational', 'Bold & provocative', 'Calm & reassuring', 'Energetic & exciting'] },
          { name: 'hasTestimonials', label: 'Do you have testimonials?', type: 'select', options: ['Yes, I will provide them', 'No, but I can get some', 'No'] },
          { name: 'callToAction', label: 'Primary call to action', type: 'text', required: true, placeholder: 'e.g. Book Now, Download Free Guide, Join the Waitlist' },
          { name: 'package', label: 'Choose a package', type: 'select', required: true, options: [
            'Single Landing Page — from R3,500',
            'Multi-variant + A/B Testing — from R8,000',
            'Not sure — advise me'
          ]},
          { name: 'additionalNotes', label: 'Anything else?', type: 'textarea' },
        ],
      },
    ],
  },
  {
    id: 'social-campaign',
    title: 'Social Media Campaign',
    tagline: 'Content that connects.',
    description: 'Multi-platform campaigns created, scheduled, and optimised. Hands-free.',
    frameworkTag: 'BUILD + AUTOMATE',
    learnMore: 'Full-service social media — content strategy, creation, scheduling, and management across all platforms. We handle everything from copy and visuals to hashtag strategy and paid ad management. Monthly reporting and optimisation included.',
    icon: 'share',
    color: '#2D2D2D',
    packages: [
      { label: 'Content Creation (12 posts/month)', price: 'from R4,000/mo' },
      { label: 'Content Creation (20 posts/month)', price: 'from R7,000/mo' },
      { label: 'Full Management (per platform)', price: 'from R3,500/mo' },
      { label: 'Paid Ad Management (FB/IG)', price: 'from R5,000/mo' },
      { label: 'Paid Ad Management (Google Ads)', price: 'from R5,600/mo' },
    ],
    steps: [
      {
        title: 'Campaign Goals',
        fields: [
          { name: 'campaignGoal', label: 'What do you want to achieve?', type: 'select', required: true, options: ['Brand awareness', 'Lead generation', 'Sales/conversions', 'Community engagement', 'Event promotion', 'Product launch'] },
          { name: 'platforms', label: 'Platforms', type: 'multicheck', required: true, options: ['Instagram', 'Facebook', 'LinkedIn', 'TikTok', 'X (Twitter)', 'YouTube', 'Pinterest'] },
          { name: 'duration', label: 'Campaign duration', type: 'select', required: true, options: ['1 week sprint', '2 weeks', '1 month', 'Ongoing monthly'] },
        ],
      },
      {
        title: 'Brand Voice',
        fields: [
          { name: 'tone', label: 'Tone of voice', type: 'select', required: true, options: ['Professional', 'Casual & friendly', 'Bold & edgy', 'Inspirational', 'Educational', 'Humorous'] },
          { name: 'doPost', label: 'Content we should create', type: 'textarea', required: true, placeholder: 'Topics, themes, messages you want covered...' },
          { name: 'dontPost', label: 'Content to avoid', type: 'textarea', placeholder: 'Topics, competitors, styles to stay away from...' },
          { name: 'hasAssets', label: 'Do you have photos/videos?', type: 'select', options: ['Yes, I will share them', 'Some — need more created', 'No, create everything for me'] },
        ],
      },
      {
        title: 'Details & Notes',
        fields: [
          { name: 'keyMessages', label: 'Key messages to communicate', type: 'textarea', required: true, placeholder: 'The most important things your audience should know...' },
          { name: 'hashtags', label: 'Preferred hashtags (if any)', type: 'text', placeholder: '#YourBrand #Industry' },
          { name: 'package', label: 'Choose a package', type: 'select', required: true, options: [
            'Content Creation (12 posts/month) — from R4,000/month',
            'Content Creation (20 posts/month) — from R7,000/month',
            'Full Management (per platform) — from R3,500/month',
            'Paid Ad Management (Facebook/Instagram) — from R5,000/month',
            'Paid Ad Management (Google Ads) — from R5,600/month',
            'Not sure — advise me'
          ]},
          { name: 'additionalNotes', label: 'Anything else?', type: 'textarea' },
        ],
      },
    ],
  },
  {
    id: 'automation',
    title: 'AI & Automation',
    tagline: 'Systems that work while you sleep.',
    description: 'We build the automations that free up your time and scale your business.',
    frameworkTag: 'AUTOMATE',
    learnMore: 'Custom automation solutions — chatbots, WhatsApp integrations, email sequences, CRM workflows, and bespoke integrations. We identify the repetitive tasks draining your time and build systems that handle them automatically. From simple automations to complex multi-step workflows.',
    icon: 'zap',
    color: '#C5A55A',
    packages: [
      { label: 'Website Chatbot', price: 'from R5,000' },
      { label: 'WhatsApp Business Automation', price: 'from R10,000' },
      { label: 'Email Automation Sequences', price: 'from R8,000' },
      { label: 'CRM Setup + Workflow Automation', price: 'from R10,000' },
      { label: 'Custom Integration (per workflow)', price: 'from R3,000' },
    ],
    steps: [
      {
        title: 'What Needs Automating?',
        fields: [
          { name: 'automationType', label: 'What do you want to automate?', type: 'multicheck', required: true, options: ['Lead capture & follow-up', 'Email sequences', 'Social media posting', 'Invoicing & payments', 'Booking & scheduling', 'Customer onboarding', 'Reporting & analytics', 'Other'] },
          { name: 'currentTools', label: 'Tools you currently use', type: 'textarea', placeholder: 'e.g. Gmail, WhatsApp, Excel, WordPress...' },
          { name: 'biggestBottleneck', label: 'What takes up most of your time?', type: 'textarea', required: true, placeholder: 'The repetitive task you wish would just... handle itself.' },
        ],
      },
      {
        title: 'Scale & Goals',
        fields: [
          { name: 'teamSize', label: 'Team size', type: 'select', required: true, options: ['Just me', '2-5 people', '6-15 people', '15+'] },
          { name: 'package', label: 'Choose a package', type: 'select', required: true, options: [
            'Website Chatbot — from R5,000 once-off',
            'WhatsApp Business Automation — from R10,000 setup',
            'Email Automation Sequences — from R8,000 once-off',
            'CRM Setup + Workflow Automation — from R10,000 once-off',
            'Custom Integration (per workflow) — from R3,000',
            'Not sure — advise me'
          ]},
          { name: 'timeline', label: 'When do you need this?', type: 'select', required: true, options: ['ASAP', 'Within a month', 'Planning for next quarter', 'Just exploring'] },
          { name: 'additionalNotes', label: 'Anything else?', type: 'textarea', placeholder: 'Dream big — what would your ideal automated business look like?' },
        ],
      },
    ],
  },
  {
    id: 'app',
    title: 'App Building',
    tagline: 'Custom systems built for your business.',
    description: 'Databases, automations, dashboards, portals, and bespoke tools — built around how you work.',
    frameworkTag: 'BUILD + AUTOMATE',
    learnMore: 'Bespoke business applications — client portals, booking systems, inventory management, CRM tools, and internal dashboards. We design and build the exact system your business needs, with integrations to your existing tools. Includes training, documentation, and ongoing support options.',
    icon: 'database',
    color: '#2D2D2D',
    packages: [
      { label: 'Lite System (database + basic UI)', price: 'from R15,000' },
      { label: 'Standard System (full features + integrations)', price: 'from R30,000' },
      { label: 'Advanced System (complex logic + admin)', price: 'from R50,000' },
      { label: 'Ongoing Development (monthly retainer)', price: 'from R8,000/mo' },
    ],
    steps: [
      {
        title: 'What Do You Need Built?',
        fields: [
          { name: 'appName', label: 'Project name (or working title)', type: 'text', required: true },
          { name: 'appType', label: 'Type of system', type: 'select', required: true, options: ['Database & Backend System', 'Client Portal / Dashboard', 'Internal Business Tool', 'Booking / Scheduling System', 'Inventory / Stock Management', 'CRM / Client Management', 'Web App (browser-based)', 'Progressive Web App (mobile-friendly)', 'Workflow Automation System', 'Not sure — advise me'] },
          { name: 'appDescription', label: 'What should the system do?', type: 'textarea', required: true, placeholder: 'Describe the core problem this needs to solve and how you want it to work...' },
          { name: 'targetUsers', label: 'Who will use it?', type: 'textarea', required: true, placeholder: 'Your team, your clients, specific departments, the public?' },
        ],
      },
      {
        title: 'Features & Integrations',
        fields: [
          { name: 'coreFeatures', label: 'Must-have features', type: 'textarea', required: true, placeholder: 'List the essential features (e.g. user login, reporting, notifications, data entry, approvals...)' },
          { name: 'niceToHave', label: 'Nice-to-have features', type: 'textarea', placeholder: 'Features you would love but could live without for launch...' },
          { name: 'integrations', label: 'Integrations needed', type: 'multicheck', options: ['Payment gateway (Stripe/PayFast)', 'Email/SMS notifications', 'WhatsApp messaging', 'Google Workspace (Sheets, Calendar, Drive)', 'Airtable / Database', 'Accounting (Xero, Sage, QuickBooks)', 'Calendar/Booking', 'File uploads & storage', 'Reporting & analytics', 'Other'] },
          { name: 'existingSystem', label: 'Replacing an existing system?', type: 'select', options: ['No — brand new build', 'Yes — replacing spreadsheets/manual processes', 'Yes — replacing an existing app/tool', 'Adding onto an existing system'] },
          { name: 'dataNeeds', label: 'What data does the system need to manage?', type: 'textarea', placeholder: 'e.g. Client records, orders, stock levels, appointments, invoices, reports...' },
        ],
      },
      {
        title: 'Package & Timeline',
        fields: [
          { name: 'package', label: 'Choose a package', type: 'select', required: true, options: [
            'Lite System (database + basic UI) — from R15,000',
            'Standard System (full features + integrations) — from R30,000',
            'Advanced System (complex logic, admin panel, automations) — from R50,000',
            'Ongoing Development (monthly retainer) — from R8,000/month',
            'Not sure — advise me'
          ]},
          { name: 'timeline', label: 'When do you need this?', type: 'select', required: true, options: ['ASAP (2-4 weeks)', 'Within 1-2 months', 'Within 3 months', 'No rush — quality over speed', 'Just exploring the idea'] },
          { name: 'budget', label: 'Budget range', type: 'select', options: ['Under R15,000', 'R15,000 – R30,000', 'R30,000 – R50,000', 'R50,000+', 'Flexible — depends on scope'] },
          { name: 'references', label: 'Tools or systems you admire', type: 'textarea', placeholder: 'Share names, URLs, or describe tools similar to what you want...' },
          { name: 'additionalNotes', label: 'Anything else we should know?', type: 'textarea', placeholder: 'Current pain points, team size, deadline drivers, must-haves...' },
        ],
      },
    ],
  },
  {
    id: 'branding',
    title: 'Branding & Identity',
    tagline: 'Your complete brand, defined.',
    description: 'Logo, style guide, colours, typography, letterheads — everything that makes your brand yours.',
    frameworkTag: 'BUILD',
    learnMore: 'Complete brand identity design — from logo concepts through to a full brand guidelines document. We create the visual language that makes your business unmistakable. Includes multiple concepts, revision rounds, and final delivery in all formats you need.',
    icon: 'pen-tool',
    color: '#a88d44',
    packages: [
      { label: 'Logo Only (2-3 concepts, 2 revisions)', price: 'from R2,500' },
      { label: 'Logo + Style Guide', price: 'from R5,000' },
      { label: 'Full Brand Identity (logo, stationery, guidelines)', price: 'from R8,000' },
      { label: 'Brand Refresh (modernise existing brand)', price: 'from R4,000' },
    ],
    steps: [
      {
        title: 'About Your Brand',
        fields: [
          { name: 'businessName', label: 'Business Name', type: 'text', required: true },
          { name: 'industry', label: 'Industry', type: 'text', required: true },
          { name: 'businessDescription', label: 'What does your business do?', type: 'textarea', required: true, placeholder: 'In a few sentences...' },
          { name: 'brandPersonality', label: 'Brand personality', type: 'multicheck', required: true, options: ['Professional', 'Friendly', 'Bold', 'Elegant', 'Playful', 'Minimal', 'Luxurious', 'Modern', 'Traditional', 'Edgy'] },
        ],
      },
      {
        title: 'Design Preferences',
        fields: [
          { name: 'logoStyle', label: 'Logo style preference', type: 'select', required: true, options: ['Wordmark (text only)', 'Icon + Text', 'Icon only', 'Monogram/Initials', 'Emblem/Badge', 'Not sure — advise me'] },
          { name: 'colorPreferences', label: 'Colour preferences', type: 'textarea', placeholder: 'Colours you love, colours to avoid, or leave blank and let us suggest' },
          { name: 'existingLogo', label: 'Do you have an existing logo?', type: 'select', options: ['No — starting fresh', 'Yes — needs a complete redesign', 'Yes — needs a refresh/modernisation'] },
          { name: 'references', label: 'Logos or brands you admire', type: 'textarea', placeholder: 'Share names, URLs, or describe styles you like...' },
          { name: 'mustInclude', label: 'Anything the logo must include?', type: 'textarea', placeholder: 'Specific icon, symbol, tagline, etc.' },
        ],
      },
      {
        title: 'Package & Deliverables',
        fields: [
          { name: 'package', label: 'Choose a package', type: 'select', required: true, options: [
            'Logo Only (2-3 concepts, 2 revisions) — from R2,500',
            'Logo + Style Guide (colours, typography, usage rules) — from R5,000',
            'Full Brand Identity (logo, style guide, letterhead, business cards, email signature) — from R8,000',
            'Brand Refresh (modernise existing brand) — from R4,000',
            'Not sure — advise me'
          ]},
          { name: 'deliverables', label: 'What do you need?', type: 'multicheck', options: ['Logo', 'Colour Palette', 'Typography Guide', 'Letterhead', 'Business Card', 'Email Signature', 'Social Media Templates', 'Brand Guidelines Document', 'Favicon & Icons'] },
          { name: 'additionalNotes', label: 'Anything else?', type: 'textarea' },
        ],
      },
    ],
  },
];

/* Coaching brief form (shared for all coaching types) */
const COACHING_BRIEF = {
  id: 'coaching',
  title: 'Coaching Application',
  tagline: 'Begin your journey.',
  steps: [
    {
      title: 'About You',
      fields: [
        { name: 'fullName', label: 'Full Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'text', required: true },
        { name: 'phone', label: 'Phone Number', type: 'text', required: true },
        { name: 'business', label: 'Business Name (if applicable)', type: 'text' },
      ],
    },
    {
      title: 'Your Goals',
      fields: [
        { name: 'mainChallenge', label: 'What is your biggest challenge right now?', type: 'textarea', required: true, placeholder: 'Be as specific or general as you like...' },
        { name: 'desiredOutcome', label: 'What would success look like for you?', type: 'textarea', required: true, placeholder: 'Where do you want to be in 3-6 months?' },
        { name: 'previousCoaching', label: 'Have you worked with a coach before?', type: 'select', options: ['No — this is my first time', 'Yes — briefly', 'Yes — extensively'] },
      ],
    },
    {
      title: 'Availability',
      fields: [
        { name: 'preferredDay', label: 'Preferred day(s)', type: 'multicheck', options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] },
        { name: 'preferredTime', label: 'Preferred time', type: 'select', options: ['Morning (8-12)', 'Afternoon (12-5)', 'Evening (5-8)', 'Flexible'] },
        { name: 'sessionFormat', label: 'Session format', type: 'select', required: true, options: ['Online (Zoom/Google Meet)', 'In person', 'Phone call', 'Flexible'] },
        { name: 'additionalNotes', label: 'Anything else you want us to know?', type: 'textarea', placeholder: 'Concerns, preferences, health considerations...' },
      ],
    },
  ],
};

const serviceIcons = {
  globe: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  target: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  ),
  share: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
  search: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  zap: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  database: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  'pen-tool': (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" />
    </svg>
  ),
};

export default function Services({ client }) {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);
  const [coachingApply, setCoachingApply] = useState(null); // { type, tier }
  const [expandedCoaching, setExpandedCoaching] = useState(null); // coaching id
  const [expandedService, setExpandedService] = useState(null); // service id
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getServiceRequests()
      .then((data) => {
        setRequests(data.requests || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async (serviceId, formData) => {
    const result = await api.submitServiceRequest(serviceId, formData);
    setRequests((prev) => [
      { id: result.id || Date.now(), service: serviceId, status: 'Submitted', date: new Date().toISOString(), ...formData },
      ...prev,
    ]);
    setSelectedService(null);
    setCoachingApply(null);
    return result;
  };

  // Show coaching application form
  if (coachingApply) {
    const brief = {
      ...COACHING_BRIEF,
      title: `${coachingApply.type} — ${coachingApply.tier}`,
    };
    return (
      <ServiceForm
        service={brief}
        onSubmit={(data) => handleSubmit('coaching', { ...data, coachingType: coachingApply.type, selectedPackage: coachingApply.tier })}
        onBack={() => setCoachingApply(null)}
      />
    );
  }

  // Show done-for-you service form
  if (selectedService) {
    const service = SERVICE_TYPES.find((s) => s.id === selectedService);
    return (
      <ServiceForm
        service={service}
        onSubmit={(data) => handleSubmit(service.id, data)}
        onBack={() => setSelectedService(null)}
      />
    );
  }

  return (
    <div className="services-page">
      <div className="page-header">
        <h2>Our Services</h2>
        <p className="page-subtitle">
          Everything you need to grow — coaching, done-for-you services, and courses.
        </p>
      </div>

      {/* ===== SECTION 1: COACHING ===== */}
      <div className="services-section">
        <div className="services-section__header">
          <h3 className="services-section__title">Coaching</h3>
          <p className="services-section__subtitle">
            1-on-1 sessions tailored to where you are and where you want to go. Free 30-minute discovery call to get started.
          </p>
        </div>

        <div className="coaching-grid">
          {COACHING_TYPES.map((type) => (
            <div key={type.id} className="coaching-card" style={{ '--accent': type.color }}>
              <div className="coaching-card__header" style={{ background: type.color }}>
                {type.badge && <span className={`coaching-card__badge coaching-card__badge--${type.badge.toLowerCase()}`}>{type.badge}</span>}
                <h4>{type.title}</h4>
                <p>{type.tagline}</p>
                <div className="coaching-card__framework">
                  {type.framework.split(' + ').map((f) => (
                    <span key={f} className="coaching-framework-tag">{f}</span>
                  ))}
                </div>
              </div>

              {/* Learn More */}
              <button
                className="coaching-card__learn-more"
                onClick={() => setExpandedCoaching(expandedCoaching === type.id ? null : type.id)}
              >
                {expandedCoaching === type.id ? 'Show less' : 'Learn more'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: expandedCoaching === type.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {expandedCoaching === type.id && (
                <div className="coaching-card__about">
                  <p>{type.frameworkDesc}</p>
                </div>
              )}

              <div className="coaching-card__tiers">
                {type.tiers.map((tier) => (
                  <div key={tier.label + tier.price} className="coaching-tier">
                    <div className="coaching-tier__info">
                      <span className="coaching-tier__label">{tier.label}</span>
                      {tier.discount && <span className="coaching-tier__discount">{tier.discount}</span>}
                    </div>
                    <div className="coaching-tier__action">
                      <span className="coaching-tier__price">{tier.price}</span>
                      {type.isSpeaking ? (
                        <a
                          className="btn btn--sm btn--outline"
                          href={`mailto:hello@freedomhub.io?subject=${encodeURIComponent(tier.label + ' Enquiry')}`}
                          style={{ textDecoration: 'none' }}
                        >
                          Enquire
                        </a>
                      ) : (
                        <button
                          className="btn btn--sm btn--outline"
                          onClick={() => setCoachingApply({ type: type.title, tier: tier.label + ' — ' + tier.price })}
                        >
                          Apply
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {type.isSpeaking ? (
                <>
                  {type.speakingTopics && (
                    <div className="coaching-card__speaking-topics">
                      <h5>Signature Topics</h5>
                      <div className="speaking-signatures-list">
                        {type.speakingTopics.map((topic) => (
                          <span key={topic} className="speaking-signature-tag">{topic}</span>
                        ))}
                      </div>
                      {type.speakingVenues && (
                        <p className="speaking-venues">{type.speakingVenues}</p>
                      )}
                    </div>
                  )}
                  <a
                    className="coaching-card__discovery"
                    href="mailto:hello@freedomhub.io?subject=Speaking%20%2F%20Corporate%20Enquiry"
                    style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
                  >
                    Send an Enquiry
                  </a>
                </>
              ) : (
                <button
                  className="coaching-card__discovery"
                  onClick={() => setCoachingApply({ type: type.title, tier: 'Free Discovery Call (30 min)' })}
                >
                  Book a Free Discovery Call
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ===== SECTION 2: DONE-FOR-YOU ===== */}
      <div className="services-section">
        <div className="services-section__header">
          <h3 className="services-section__title">Done-for-You Services</h3>
          <p className="services-section__subtitle">
            Tell us what you need. We handle everything from strategy to delivery — you just approve.
          </p>
        </div>

        <div className="coaching-grid">
          {SERVICE_TYPES.map((service) => (
            <div key={service.id} className="coaching-card" style={{ '--accent': service.color }}>
              <div className="coaching-card__header" style={{ background: service.color }}>
                <div className="service-card__icon-inline">
                  {serviceIcons[service.icon]}
                </div>
                <h4>{service.title}</h4>
                <p>{service.tagline}</p>
                {service.frameworkTag && (
                  <div className="coaching-card__framework">
                    {service.frameworkTag.split(' + ').map((f) => (
                      <span key={f} className="coaching-framework-tag">{f}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Learn More */}
              <button
                className="coaching-card__learn-more"
                onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
              >
                {expandedService === service.id ? 'Show less' : 'Learn more'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: expandedService === service.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {expandedService === service.id && (
                <div className="coaching-card__about">
                  <p>{service.learnMore}</p>
                </div>
              )}

              {/* Packages */}
              <div className="coaching-card__tiers">
                {service.packages.map((pkg) => (
                  <div key={pkg.label} className="coaching-tier">
                    <div className="coaching-tier__info">
                      <span className="coaching-tier__label">{pkg.label}</span>
                    </div>
                    <div className="coaching-tier__action">
                      <span className="coaching-tier__price">{pkg.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* SEO Add-ons (website only) */}
              {service.addons && (
                <div className="coaching-card__addons">
                  <h5>SEO & Visibility Add-ons</h5>
                  {service.addons.map((addon) => (
                    <div key={addon.label} className="coaching-tier coaching-tier--addon">
                      <div className="coaching-tier__info">
                        <span className="coaching-tier__label">{addon.label}</span>
                      </div>
                      <div className="coaching-tier__action">
                        <span className="coaching-tier__price">{addon.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                className="coaching-card__discovery"
                onClick={() => setSelectedService(service.id)}
              >
                Start Brief
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ===== SECTION 3: COURSES ===== */}
      <div className="services-section">
        <div className="services-section__header">
          <h3 className="services-section__title">Courses</h3>
          <p className="services-section__subtitle">
            Learn at your own pace. Self-guided courses to build your skills and grow your business.
          </p>
        </div>

        <div className="courses-coming-soon">
          <div className="courses-coming-soon__card" onClick={() => navigate('/learn')} style={{ cursor: 'pointer' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#C5A55A' }}>
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            <h4>Academy</h4>
            <p>Courses, quests, and guided programs on business foundations, AI for entrepreneurs, and personal mastery. Learn at your own pace with gamification and community.</p>
            <button className="btn btn--primary btn--sm" style={{ marginTop: '12px' }}>Enter Academy</button>
          </div>
        </div>
      </div>

      {/* ===== EXISTING REQUESTS ===== */}
      {requests.length > 0 && (
        <div className="services-requests" style={{ marginTop: '40px' }}>
          <h3>Your Requests</h3>
          <div className="services-requests__list">
            {requests.map((req) => {
              const serviceType = SERVICE_TYPES.find((s) => s.id === req.service);
              return (
                <div key={req.id} className="request-item">
                  <div className="request-item__icon" style={{ color: serviceType?.color || '#C5A55A' }}>
                    {serviceIcons[serviceType?.icon || 'globe']}
                  </div>
                  <div className="request-item__info">
                    <strong>{serviceType?.title || (req.service === 'coaching' ? 'Coaching' : req.service)}</strong>
                    <span className="request-item__date">
                      {req.date ? new Date(req.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                    </span>
                  </div>
                  <span className={`status-badge status-badge--${(req.status || 'submitted').toLowerCase().replace(/\s+/g, '-')}`}>
                    {req.status || 'Submitted'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
