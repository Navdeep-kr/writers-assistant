export interface ProfessionalTool {
  id: string;
  title: string;
  description: string;
  icon: string;
  placeholder: string;
  actionLabel: string;
}

export interface ProfessionalCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  tools: ProfessionalTool[];
  accentColor: string;
}

export const PROFESSIONAL_DATA: Record<string, ProfessionalCategory> = {
  marketing: {
    id: 'marketing',
    title: 'Marketing Intelligence',
    description: 'Boost your brand with AI-powered marketing copy and strategy tools.',
    icon: '📈',
    accentColor: '#a855f7', // Purple
    tools: [
      { id: 'script-generator', title: 'AI Script Generator', description: 'Craft high-performing scripts for YouTube, Reels, or TikTok.', icon: '🎬', placeholder: 'Enter your video topic or key points...', actionLabel: 'Generate Script' },
      { id: 'caption-generator', title: 'AI Caption Generator', description: 'Create engaging captions for TikTok, Instagram, and LinkedIn.', icon: '💬', placeholder: 'Describe your post content...', actionLabel: 'Write Caption' },
      { id: 'tagline-generator', title: 'AI Tagline Generator', description: 'Craft catchy, impactful taglines for any product.', icon: '🏷️', placeholder: 'Enter your brand or product name...', actionLabel: 'Create Taglines' },
      { id: 'youtube-description', title: 'AI YouTube Description', description: 'Generate SEO-friendly and engaging video descriptions.', icon: '📺', placeholder: 'Enter your video title and main topics...', actionLabel: 'Generate Description' },
      { id: 'image-prompt-generator', title: 'AI Image Prompt Generator', description: 'Create detailed prompts for AI image generators.', icon: '🎨', placeholder: 'Describe the image you want to create...', actionLabel: 'Create Prompt' },
      { id: 'hashtag-generator', title: 'AI Hashtag Generator', description: 'Instantly create trending hashtags to increase reach.', icon: '＃', placeholder: 'Enter your post topic or keywords...', actionLabel: 'Find Hashtags' },
      { id: 'copywriter', title: 'AI Copywriter', description: 'Generate persuasive marketing copy for higher conversions.', icon: '✍️', placeholder: 'Explain your product and target audience...', actionLabel: 'Write Copy' },
      { id: 'slogan-generator', title: 'AI Slogan Generator', description: 'Create unique, high-converting slogans for any brand.', icon: '📣', placeholder: 'Enter your brand keywords...', actionLabel: 'Create Slogans' },
      { id: 'social-post-ideas', title: 'AI Social Post Ideas', description: 'Get captivated post ideas for all social platforms.', icon: '💡', placeholder: 'What category or industry?', actionLabel: 'Get Ideas' },
      { id: 'push-notification', title: 'AI Push Notification', description: 'Generate effective notifications to boost clicks.', icon: '🔔', placeholder: 'Describe the update or offer...', actionLabel: 'Write Notification' },
      { id: 'product-review', title: 'AI Product Review', description: 'Create detailed, engaging product reviews.', icon: '⭐', placeholder: 'Enter product name and key features...', actionLabel: 'Write Review' },
      { id: 'logo-prompt', title: 'AI Logo Designer', description: 'Generate concepts and prompts for logo design.', icon: '🆔', placeholder: 'Describe your brand identity...', actionLabel: 'Design Concepts' },
      { id: 'executive-summary', title: 'AI Executive Summary', description: 'Generate clear, concise executive summaries.', icon: '📑', placeholder: 'Paste your report or details...', actionLabel: 'Summarize' },
      { id: 'random-quote', title: 'AI Marketing Quote', description: 'Find inspiring quotes for social media or presentations.', icon: '💬', placeholder: 'Enter a theme (e.g. Innovation)...', actionLabel: 'Find Quote' },
      { id: 'content-brief', title: 'AI Content Brief', description: 'Generate detailed SEO-optimized content briefs.', icon: '📝', placeholder: 'Enter the main topic or target keyword...', actionLabel: 'Create Brief' }
    ]
  },
  hr: {
    id: 'hr',
    title: 'Human Resources',
    description: 'Streamline hiring, performance, and internal communications.',
    icon: '👥',
    accentColor: '#22c55e', // Green
    tools: [
      { id: 'job-description', title: 'AI Job Description', description: 'Create compelling, tailored job descriptions.', icon: '📄', placeholder: 'Role title and key requirements...', actionLabel: 'Create JD' },
      { id: 'job-posting', title: 'AI Job Posting', description: 'Write high-impact postings for LinkedIn and boards.', icon: '📢', placeholder: 'Job details and company perks...', actionLabel: 'Write Post' },
      { id: 'recommendation-letter', title: 'AI Recommendation Letter', description: 'Create personalized professional recommendation letters.', icon: '📜', placeholder: 'Employee name and their key achievements...', actionLabel: 'Author Letter' },
      { id: 'offer-letter', title: 'AI Offer Letter', description: 'Generate professional, tailored offer letters.', icon: '🤝', placeholder: 'Candidate name, role, salary, and benefits...', actionLabel: 'Draft Offer' },
      { id: 'resignation-email', title: 'AI Resignation Email', description: 'Write professional resignation emails.', icon: '📤', placeholder: 'Your role and reason (if any)...', actionLabel: 'Write Email' },
      { id: 'cover-letter', title: 'AI Cover Letter', description: 'Create tailored cover letters for specific roles.', icon: '✉️', placeholder: 'Paste your resume or list skills...', actionLabel: 'Generate Letter' },
      { id: 'pip-generator', title: 'AI PIP Generator', description: 'Create effective Performance Improvement Plans.', icon: '📈', placeholder: 'Areas for improvement and goals...', actionLabel: 'Draft PIP' },
      { id: 'smart-goals', title: 'AI SMART Goals', description: 'Create clear, measurable goals for employees.', icon: '🎯', placeholder: 'The general objective for the employee...', actionLabel: 'Design Goals' },
      { id: 'employee-handbook', title: 'AI Handbook Generator', description: 'Draft comprehensive internal policy documents.', icon: '📘', placeholder: 'Key policies or company values...', actionLabel: 'Draft Handbook' },
      { id: 'status-report', title: 'AI Status Report', description: 'Quickly generate professional progress reports.', icon: '📊', placeholder: 'List achievements and next steps...', actionLabel: 'Generate Report' },
      { id: 'memo-writer', title: 'AI Memo Writer', description: 'Create polished business memos for internal use.', icon: '📝', placeholder: 'Subject and main message...', actionLabel: 'Write Memo' },
      { id: 'sop-writer', title: 'AI SOP Writer', description: 'Draft professional Standard Operating Procedures.', icon: '⚙️', placeholder: 'The process name and main steps...', actionLabel: 'Write SOP' },
      { id: 'letter-generator', title: 'AI Formal Letter', description: 'Write professional business letters for any context.', icon: '🖊️', placeholder: 'The purpose of the letter...', actionLabel: 'Write Letter' },
      { id: 'process-documentation', title: 'AI Process Docs', description: 'Create clear documentation for internal workflows.', icon: '🗂️', placeholder: 'Describe the workflow...', actionLabel: 'Document Process' },
      { id: 'meeting-agenda', title: 'AI Meeting Agenda', description: 'Create structured, goal-driven meeting agendas.', icon: '📅', placeholder: 'Meeting topic and participants...', actionLabel: 'Draft Agenda' }
    ]
  },
  sales: {
    id: 'sales',
    title: 'Sales Intelligence',
    description: 'Close more deals with persuasive sales assets and outreach.',
    icon: '💰',
    accentColor: '#06b6d4', // Cyan
    tools: [
      { id: 'cold-email', title: 'AI Cold Email', description: 'Write compelling cold emails that land more meetings.', icon: '🧊', placeholder: 'Product description and target lead...', actionLabel: 'Write Email' },
      { id: 'sales-pitch', title: 'AI Sales Pitch', description: 'Generate impactful sales pitches that resonate.', icon: '🗣️', placeholder: 'What are you selling and who is the audience?', actionLabel: 'Generate Pitch' },
      { id: 'outreach-email', title: 'AI Outreach Email', description: 'Write effective outreach emails in seconds.', icon: '📧', placeholder: 'Goal of outreach and lead focus...', actionLabel: 'Craft Email' },
      { id: 'follow-up-email', title: 'AI Follow-up Email', description: 'Write professional follow-ups to keep momentum.', icon: '🔁', placeholder: 'Details of the previous interaction...', actionLabel: 'Write Follow-up' },
      { id: 'sales-email-templates', title: 'AI Sales Email', description: 'Helps you draft high-impact sales emails.', icon: '✉️', placeholder: 'The offer or deal you are proposing...', actionLabel: 'Generate Email' },
      { id: 'sales-playbook', title: 'AI Sales Playbook', description: 'Build effective sales strategies fast.', icon: '📋', placeholder: 'Target market and value prop...', actionLabel: 'Build Playbook' },
      { id: 'scope-of-work', title: 'AI Scope of Work', description: 'Draft professional, detailed SOW documents.', icon: '🗺️', placeholder: 'Project deliverables and timeline...', actionLabel: 'Draft SOW' },
      { id: 'project-proposal', title: 'AI Project Proposal', description: 'Create high-converting proposals for clients.', icon: '📄', placeholder: 'Project scope and client needs...', actionLabel: 'Write Proposal' },
      { id: 'business-plan', title: 'AI Business Plan', description: 'Generate detailed business plans for ideas.', icon: '💼', placeholder: 'Business concept and market focus...', actionLabel: 'Create Plan' },
      { id: 'deal-closer', title: 'AI Deal Closer', description: 'Generate persuasive closing arguments and emails.', icon: '🤝', placeholder: 'Current status of the deal...', actionLabel: 'Close Deal' },
      { id: 'objection-handler', title: 'AI Objection Handler', description: 'Generate responses to common sales objections.', icon: '🛡️', placeholder: 'Enter the objection you faced...', actionLabel: 'Handle Objection' },
      { id: 'elevator-pitch', title: 'AI Elevator Pitch', description: '30-second pitches for any business or idea.', icon: '🛗', placeholder: 'The core value of your project...', actionLabel: 'Draft Pitch' },
      { id: 'case-study-sales', title: 'AI Sales Case Study', description: 'Turn success stories into sales assets.', icon: '📈', placeholder: 'The results you achieved for a client...', actionLabel: 'Write Study' },
      { id: 'sales-training', title: 'AI Sales Script', description: 'Create training scripts for sales teams.', icon: '🎓', placeholder: 'The product features and common QA...', actionLabel: 'Write Script' },
      { id: 'roi-calculator-report', title: 'AI ROI Report', description: 'Generate persuasive ROI reports for clients.', icon: '💹', placeholder: 'Costs and expected savings/returns...', actionLabel: 'Generate Report' }
    ]
  },
  product: {
    id: 'product',
    title: 'Product Management',
    description: 'Document and launch products with technical precision.',
    icon: '📦',
    accentColor: '#f59e0b', // Amber
    tools: [
      { id: 'prd-generator', title: 'AI PRD Generator', description: 'Generates professional Product Requirement Documents.', icon: '📋', placeholder: 'Target feature and main user stories...', actionLabel: 'Create PRD' },
      { id: 'roadmap-generator', title: 'AI Roadmap', description: 'Create clear visual product roadmaps.', icon: '🗺️', placeholder: 'List of features and quarters/timing...', actionLabel: 'Build Roadmap' },
      { id: 'feature-announcement', title: 'AI Feature Update', description: 'Write compelling updates for new features.', icon: '🎉', placeholder: 'What changed and why it matters...', actionLabel: 'Write Update' },
      { id: 'release-notes', title: 'AI Release Notes', description: 'Generate polished notes for product updates.', icon: '📝', placeholder: 'List of bug fixes and enhancements...', actionLabel: 'Write Notes' },
      { id: 'product-spec', title: 'AI Product Spec', description: 'Draft detailed technical specification documents.', icon: '🔍', placeholder: 'Technical details and requirements...', actionLabel: 'Draft Spec' },
      { id: 'user-manual', title: 'AI User Manual', description: 'Create clear, professional user manuals.', icon: '📖', placeholder: 'The feature or product to explain...', actionLabel: 'Write Manual' },
      { id: 'product-name-generator', title: 'AI Product Naming', description: 'Generate unique and catchy names.', icon: '🏷️', placeholder: 'Describe the products purpose...', actionLabel: 'Generate Names' },
      { id: 'troubleshooting-guide', title: 'AI Troubleshooting', description: 'Create step-by-step support guides.', icon: '🛠️', placeholder: 'The problem and the solution steps...', actionLabel: 'Create Guide' },
      { id: 'project-brief', title: 'AI Project Brief', description: 'Create clear, concise project briefs.', icon: '📄', placeholder: 'Project goal and constraints...', actionLabel: 'Draft Brief' },
      { id: 'user-story-writer', title: 'AI User Story', description: 'Write expert user stories and acceptance criteria.', icon: '🧑', placeholder: 'As a [user], I want to [action]...', actionLabel: 'Write Story' },
      { id: 'feedback-analyzer', title: 'AI Feedback Analysis', description: 'Identify trends and pain points in feedback.', icon: '📉', placeholder: 'Paste customer feedback comments...', actionLabel: 'Analyze Now' },
      { id: 'instruction-manual', title: 'AI Instructions', description: 'Create professional instruction manuals.', icon: '📑', placeholder: 'Workflow or product setup steps...', actionLabel: 'Draft Manual' },
      { id: 'todo-list', title: 'AI Product Tasks', description: 'Generate actionable task lists for teams.', icon: '✅', placeholder: 'The project or feature goal...', actionLabel: 'Get Tasks' },
      { id: 'checklist-generator', title: 'AI Launch Checklist', description: 'Manage complex product launches.', icon: '✔️', placeholder: 'Project details and launch date...', actionLabel: 'Create Checklist' },
      { id: 'slack-message', title: 'AI Slack Update', description: 'Instantly create effective Slack messages.', icon: '💬', placeholder: 'The update for the team...', actionLabel: 'Write Message' }
    ]
  },
  'customer-service': {
    id: 'customer-service',
    title: 'Customer Service',
    description: 'Deliver world-class support with empathetic AI responses.',
    icon: '🎧',
    accentColor: '#3b82f6', // Blue
    tools: [
      { id: 'response-generator', title: 'AI Reply Generator', description: 'Generates smart, natural replies for support.', icon: '💬', placeholder: 'Paste the customers inquiry...', actionLabel: 'Draft Reply' },
      { id: 'email-writer', title: 'AI Support Email', description: 'Draft polished, professional support emails.', icon: '📧', placeholder: 'The issue or question to resolve...', actionLabel: 'Write Email' },
      { id: 'apology-email', title: 'AI Apology Email', description: 'Write empathetic apology emails to customers.', icon: '🙏', placeholder: 'The mistake or issue that occurred...', actionLabel: 'Write Apology' },
      { id: 'ticket-summarizer', title: 'AI Ticket Summary', description: 'Condense long support tickets into key points.', icon: '📝', placeholder: 'Paste the ticket history...', actionLabel: 'Summarize' },
      { id: 'knowledge-base-article', title: 'AI Help Article', description: 'Draft professional help center articles.', icon: '📚', placeholder: 'The feature or problem to document...', actionLabel: 'Draft Article' },
      { id: 'cs-tone-fixer', title: 'CS Tone Fixer', description: 'Make support responses sound friendlier.', icon: '✨', placeholder: 'Paste a draft response...', actionLabel: 'Fix Tone' },
      { id: 'refund-policy-doc', title: 'AI Policy Writer', description: 'Create clear customer-facing policy docs.', icon: '📋', placeholder: 'The terms of the policy...', actionLabel: 'Write Policy' },
      { id: 'customer-welcome', title: 'AI Welcome Message', description: 'Onboard customers with warm messages.', icon: '👋', placeholder: 'Company name and main benefit...', actionLabel: 'Write Welcome' },
      { id: 'feedback-response', title: 'AI Feedback Reply', description: 'Respond to positive or negative feedback.', icon: '🌟', placeholder: 'Paste the customer feedback...', actionLabel: 'Draft Response' },
      { id: 'escalation-email', title: 'AI Escalation', description: 'Write professional internal escalation emails.', icon: '⏫', placeholder: 'The issue that needs escalation...', actionLabel: 'Handle Issue' },
      { id: 'help-center-seo', title: 'Help SEO Optimizer', description: 'Optimize help articles for search.', icon: '🔍', placeholder: 'Article content and target keyword...', actionLabel: 'Optimize SEO' },
      { id: 'chat-response-pro', title: 'AI Chat Response', description: 'Generate concise, fast-paced chat replies.', icon: '⚡', placeholder: 'Customer query...', actionLabel: 'Get Reply' },
      { id: 'thank-you-note', title: 'AI Thank You', description: 'Send automated yet personal thank-you notes.', icon: '💝', placeholder: 'Reason for the thank-you...', actionLabel: 'Write Note' },
      { id: 'appointment-scheduler', title: 'AI Meeting Booker', description: 'Compose professional emails to book calls.', icon: '📅', placeholder: 'The goal of the meeting...', actionLabel: 'Draft Message' },
      { id: 'cs-status-update', title: 'AI Support Update', description: 'Update customers on their investigation status.', icon: '🕒', placeholder: 'The ticket ID and current status...', actionLabel: 'Write Update' }
    ]
  }
};
