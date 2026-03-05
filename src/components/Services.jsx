import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import ServiceForm from './ServiceForm';

const SERVICE_TYPES = [
  {
    id: 'website',
    title: 'Website Build',
    tagline: 'Your vision, expertly crafted.',
    description: 'We handle everything from strategy to launch. You just approve.',
    icon: 'globe',
    color: '#C5A55A',
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
    icon: 'target',
    color: '#6366f1',
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
    icon: 'share',
    color: '#10b981',
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
    id: 'seo',
    title: 'SEO & Visibility',
    tagline: 'Be found where it matters.',
    description: 'We optimise your presence for search engines, AI, and real humans.',
    icon: 'search',
    color: '#f59e0b',
    steps: [
      {
        title: 'Current State',
        fields: [
          { name: 'websiteUrl', label: 'Website URL', type: 'text', required: true, placeholder: 'https://...' },
          { name: 'currentSeo', label: 'Have you done SEO before?', type: 'select', required: true, options: ['Never', 'Some basics', 'Had a professional do it', 'Currently working with someone'] },
          { name: 'googleProfile', label: 'Do you have a Google Business Profile?', type: 'select', options: ['Yes', 'No', 'Not sure'] },
        ],
      },
      {
        title: 'Goals',
        fields: [
          { name: 'targetKeywords', label: 'Keywords you want to rank for', type: 'textarea', required: true, placeholder: 'e.g. "life coach Cape Town", "business automation SA"' },
          { name: 'targetLocation', label: 'Target location', type: 'text', required: true, placeholder: 'e.g. Cape Town, Johannesburg, South Africa, Global' },
          { name: 'competitors', label: 'Main competitors', type: 'textarea', placeholder: 'URLs or names of competitors ranking for your keywords...' },
          { name: 'package', label: 'Choose a package', type: 'select', required: true, options: [
            'SEO Audit + Setup (once-off) — from R7,000',
            'Monthly SEO Retainer — from R7,500/month',
            'Local SEO (Google Business Profile) — from R5,000/month',
            'GEO (AI Search Optimisation) — from R5,000/month',
            'Blog Content (per article, SEO-optimised) — from R1,500/article',
            'Not sure — advise me'
          ]},
          { name: 'additionalNotes', label: 'Specific concerns or goals?', type: 'textarea' },
        ],
      },
    ],
  },
  {
    id: 'automation',
    title: 'AI & Automation',
    tagline: 'Systems that work while you sleep.',
    description: 'We build the automations that free up your time and scale your business.',
    icon: 'zap',
    color: '#8b5cf6',
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
    icon: 'smartphone',
    color: '#0ea5e9',
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
    id: 'logo',
    title: 'Logo Design',
    tagline: 'Your brand, distilled.',
    description: 'A logo that captures who you are — professional, memorable, and uniquely yours.',
    icon: 'pen-tool',
    color: '#ec4899',
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
          { name: 'package', label: 'Choose a package', type: 'select', required: true, options: [
            'Basic Logo (2-3 concepts, 2 revisions) — from R2,500',
            'Premium Logo + Brand Guidelines — from R5,000',
            'Not sure — advise me'
          ]},
          { name: 'additionalNotes', label: 'Anything else?', type: 'textarea' },
        ],
      },
    ],
  },
];

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
  smartphone: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  'pen-tool': (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" />
    </svg>
  ),
};

export default function Services({ client }) {
  const [selectedService, setSelectedService] = useState(null);
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
    return result;
  };

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
        <h2>Done-for-You Services</h2>
        <p className="page-subtitle">
          Tell us what you need. We will handle the rest — from strategy to delivery.
        </p>
      </div>

      <div className="services-intro">
        <div className="services-intro__card">
          <h3>How it works</h3>
          <div className="services-intro__steps">
            <div className="services-intro__step">
              <div className="services-intro__number">1</div>
              <div>
                <strong>Choose a service</strong>
                <p>Pick what you need from the options below.</p>
              </div>
            </div>
            <div className="services-intro__step">
              <div className="services-intro__number">2</div>
              <div>
                <strong>Fill in your brief</strong>
                <p>Answer a few questions so we understand your vision.</p>
              </div>
            </div>
            <div className="services-intro__step">
              <div className="services-intro__number">3</div>
              <div>
                <strong>We get to work</strong>
                <p>Track progress in real-time under Projects.</p>
              </div>
            </div>
            <div className="services-intro__step">
              <div className="services-intro__number">4</div>
              <div>
                <strong>Review & launch</strong>
                <p>Approve the final work. We handle deployment.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="services-grid">
        {SERVICE_TYPES.map((service) => (
          <button
            key={service.id}
            className="service-card"
            onClick={() => setSelectedService(service.id)}
          >
            <div className="service-card__icon" style={{ color: service.color }}>
              {serviceIcons[service.icon]}
            </div>
            <h3 className="service-card__title">{service.title}</h3>
            <p className="service-card__tagline">{service.tagline}</p>
            <p className="service-card__desc">{service.description}</p>
            <span className="service-card__cta">Start Brief</span>
          </button>
        ))}
      </div>

      {requests.length > 0 && (
        <div className="services-requests">
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
                    <strong>{serviceType?.title || req.service}</strong>
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
