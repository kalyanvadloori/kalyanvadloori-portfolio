export const profile = {
  name: 'Kalyan Vadloori',
  role: 'Senior Software Engineer',
  tagline:
    'I build enterprise-scale platforms in regulated, high-availability environments — secure document systems, healthcare data exchange and production releases owned end-to-end.',
  summary:
    'Senior Software Engineer with nearly 4 years of experience building enterprise-scale platforms across Healthcare, Telemedicine, Event Services, E-commerce and Booking domains — including systems serving 11M+ global learners, 3.5M+ annual patient encounters and 100M+ indexed clinical documents.',
  summary2:
    'Strong expertise in React, TypeScript, Node.js, AWS S3 and Azure Blob Storage. I architected a secure Document Management System with file uploads, dynamic folder hierarchy management, audit trails and Azure Blob Storage integration, plus automated malware scanning and file validation using Microsoft Defender so only verified documents reach production. I own production releases end-to-end and collaborate across Product, Platform, QA and Engineering organizations.',
  phone: '+91 9676522928',
  email: 'kalyanwd25@gmail.com',
  location: 'Hyderabad, India',
  linkedin: 'https://www.linkedin.com/in/kalyan-vadloori',
  github: '',
  photo: '/profile.jpeg',
  // How the photo sits inside the circular avatar (CSS object-position).
  // Second value = vertical: lower % pulls the crop UP toward the face.
  // Tune this if your headshot isn't a tight square crop.
  photoPosition: '50% 8%',
  resumeFile: '/Kalyan_Vadloori_Senior_Software_Engineer_2026.pdf',
  availability: 'Open to new opportunities',
  responseTime: '12–24 hours',
  timezone: 'IST (UTC+5:30)',
}

/** Options in the contact form's "Opportunity type" dropdown. */
export const opportunityTypes = [
  'Hiring',
  'Freelance Project',
  'Contract Work',
  'Startup Collaboration',
  'Technical Partnership',
  'Other',
]

export const stats = [
  { value: '4+', label: 'Years Experience' },
  { value: '3.5M+', label: 'Annual Patient Encounters' },
  { value: '100M+', label: 'Clinical Documents Indexed' },
  { value: '250+', label: 'Clinical Sites Supported' },
]

export const highlights = [
  'Secure Document Management System with dynamic folder hierarchy, audit trails and Azure Blob Storage',
  'Automated malware scanning and file validation with Microsoft Defender before production storage',
  'RESTful APIs for PDF, TIF and RTF healthcare document exchange over SFTP integrations',
  'Multi-environment CI/CD via Azure App Service, Azure DevOps Pipelines and GitLab CI',
  'Micro Frontends (MFE) and Backend-for-Frontend (BFF) architecture patterns',
  'Production release ownership in regulated, high-availability environments',
]

export const skills = [
  {
    title: 'Programming Languages',
    icon: 'terminal',
    items: ['JavaScript', 'TypeScript', 'SQL'],
  },
  {
    title: 'Frontend',
    icon: 'code',
    items: ['React', 'Next.js', 'Redux', 'Material UI', 'Tailwind', 'HTML5', 'CSS3'],
  },
  {
    title: 'Backend & APIs',
    icon: 'server',
    items: ['Node.js', 'Express.js', 'REST APIs', 'Socket.io'],
  },
  {
    title: 'Architecture',
    icon: 'architecture',
    items: [
      'MVC',
      'Micro Frontends (MFE)',
      'Backend-for-Frontend (BFF)',
      'Distributed Systems',
      'System Integration Design',
    ],
  },
  {
    title: 'Cloud Platforms',
    icon: 'cloud',
    items: ['AWS S3', 'Azure App Service', 'Azure DevOps', 'Azure Blob Storage'],
  },
  {
    title: 'CI/CD & Release',
    icon: 'pipeline',
    items: ['GitLab CI', 'Azure DevOps Pipelines', 'Git', 'GitHub'],
  },
  {
    title: 'Databases & Storage',
    icon: 'database',
    items: ['MySQL', 'MongoDB', 'Redis'],
  },
]

export const experience = [
  {
    company: 'InterScripts Software Pvt Ltd',
    role: 'Software Development Engineer II',
    project: 'Bytepad — Healthcare Information Platform',
    period: 'Aug 2025 – Present',
    location: 'Hyderabad, India',
    current: true,
    points: [
      'Owned development of a healthcare platform supporting 5+ hospitals, 250+ clinical sites and 3.5M+ annual patient encounters across patient onboarding, clinical encounters, radiology and laboratory modules.',
      'Architected a secure File Cabinet system with dynamic folder hierarchy management, document uploads, malware scanning and Azure Blob Storage integration.',
      'Automated file validation using Microsoft Defender, ensuring only safe documents were stored in production while maintaining audit trails.',
      'Designed and developed RESTful APIs handling PDF, TIF and RTF document formats, enabling secure healthcare data exchange through SFTP-based integrations across multiple clinical systems.',
      'Delivered multi-environment CI/CD deployments via Azure App Service and Azure DevOps, enabling reliable releases across multiple healthcare client environments and integrated legacy systems.',
      'Developed patient insurance statement generation and download functionality, automating creation of billing and insurance documents in PDF format for improved operational efficiency and patient accessibility.',
    ],
    stack: ['React', 'Node.js', 'MySQL', 'Azure Blob Storage', 'Azure DevOps', 'REST APIs'],
  },
  {
    company: 'Kompalli Data Solutions Pvt Ltd',
    role: 'Software Engineer',
    project: 'Event Services Booking Platform',
    period: 'April 2024 – Jul 2025',
    location: 'Hyderabad, India',
    current: false,
    points: [
      'Developed and maintained scalable full-stack web applications across event management, e-commerce and booking domains using Node.js, Express.js, React.js, Material UI and AWS S3.',
      'Created and consumed RESTful APIs, implemented authentication/authorization and integrated databases to support business-critical functionality.',
      'Designed responsive and reusable UI components with React.js and Material UI, improving application usability and maintainability.',
      'Enhanced application performance, security and scalability through optimization and best coding practices.',
      'Integrated AWS S3 buckets for secure file storage, retrieval and media asset management, improving application scalability and reliability.',
      'Implemented cron jobs to automate email notifications, reminders, booking confirmations and scheduled business workflows.',
      'Worked in Agile environments, collaborating with cross-functional teams to deliver scalable, client-focused solutions.',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'Material UI', 'MySQL', 'AWS S3'],
  },
  {
    company: 'eVaidya Pvt Ltd',
    role: 'Junior Software Developer',
    project: 'eVaidya — Telemedicine & Online Consultation Platform',
    period: 'Feb 2022 – March 2024',
    location: 'Hyderabad, India',
    current: false,
    points: [
      'Developed a telemedicine platform prototype enabling secure video consultations, patient registration and access to Electronic Health Records (EHR).',
      'Designed and developed RESTful APIs supporting patient management, appointment scheduling, clinical workflows and secure healthcare data exchange.',
      'Implemented comprehensive doctor-facing modules for diagnosis, medication prescribing, medical report generation, treatment tracking, appointment management and referral workflows.',
      'Enabled healthcare providers to create and manage electronic prescriptions (e-Prescriptions), improving treatment accuracy and patient care efficiency.',
      'Automated PDF prescription and medical report generation with secure email delivery to patients for timely access to treatment information.',
      'Integrated AWS S3 for secure storage and retrieval of prescriptions, medical reports and patient documents.',
      'Leveraged Socket.io for real-time communication between doctors and patients during virtual consultations.',
      'Developed scalable backend services using Node.js, Express.js and MySQL, ensuring high performance and maintainability.',
    ],
    stack: ['Node.js', 'Express.js', 'React', 'Socket.io', 'MySQL', 'AWS S3'],
  },
]

export const projects = [
  {
    name: 'Bytepad',
    link: 'https://www.interscripts.com/products/bytepad/',
    code: 'BP',
    tags: ['Healthcare SaaS', 'Web'],
    blurb:
      'One place for clinical teams to move through patients, encounters and records without losing context.',
    subtitle: 'Healthcare information platform for hospitals and clinical networks',
    category: 'Healthcare',
    accent: 'primary',
    points: [
      'Healthcare platform supporting 3.5M+ annual patient encounters with AI-powered semantic search across 100M+ clinical documents.',
      'Secure File Cabinet system with dynamic folder hierarchy, document upload, malware scanning and Azure Blob Storage integration.',
      'RESTful APIs handling PDF, TIF and RTF formats for secure data exchange via SFTP across multiple clinical systems.',
      'Automated patient insurance statement and billing document generation in PDF.',
      'Multi-environment CI/CD delivery through Azure App Service and Azure DevOps Pipelines.',
    ],
    tech: ['React', 'Node.js', 'MySQL', 'Azure AI Search', 'Azure Blob Storage', 'Azure DevOps'],
  },
  {
    name: 'EventNeedz',
    link: 'https://www.eventneedz.com/',
    code: 'EN',
    tags: ['Marketplace', 'Web'],
    blurb:
      'Customers post what an event needs, vendors bid on it, and both sides track the deal to completion.',
    subtitle: 'Event services marketplace connecting customers with vendors',
    category: 'Marketplace',
    accent: 'secondary',
    points: [
      'Scalable event services marketplace connecting customers with vendors for weddings, corporate events, parties and special occasions.',
      'Bidding management system for event requirements spanning rentals and sales across multiple service categories.',
      'Reward system for both vendor and customer roles, increasing engagement.',
      'Secure JWT authentication with role-based access control.',
      'Automated notifications across WhatsApp, SMS and email, driven by cron jobs.',
      'Reusable React components for forms, modals, tables and filters, improving maintainability.',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'Express.js', 'MySQL', 'AWS S3'],
  },
  {
    name: 'eVaidya',
    link: 'https://www.evaidya.com/',
    code: 'EV',
    tags: ['Telemedicine', 'Web'],
    blurb:
      'Consultations, prescriptions and health records in one flow, so care continues after the call ends.',
    subtitle: 'Telemedicine platform connecting doctors, patients and paramedics',
    category: 'Healthcare',
    accent: 'success',
    points: [
      'Telemedicine platform enabling patients to connect with healthcare providers through secure online consultations and appointment scheduling.',
      'Patient registration, consultation access and Electronic Health Record (EHR) viewing.',
      'Doctor workflows for diagnosis, reports, e-Prescriptions, treatment tracking and referrals to labs or paramedics.',
      'Automated PDF prescription and report generation with secure email delivery.',
      'Real-time doctor–patient communication during virtual consultations using Socket.io.',
    ],
    tech: ['Node.js', 'React', 'TypeScript', 'MySQL', 'Socket.io', 'AWS S3'],
  },
  {
    name: 'Simply Basics',
    code: 'SB',
    tags: ['E-commerce', 'Web'],
    blurb:
      'Storefront and admin console on one spine, so orders, stock and customers stay in sync.',
    subtitle: 'E-commerce website with integrated admin dashboard',
    category: 'E-commerce',
    accent: 'warning',
    points: [
      'Full-featured e-commerce website with an admin dashboard for product, order and inventory management.',
      'RazorPay payment gateway integration for seamless transactions.',
      'Complete order management with tracking, status updates and automated email notifications.',
      'Real-time analytics, inventory management and CRM tooling for business operations.',
      'HTML email templates for order confirmations and shipping updates via Nodemailer.',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'AWS S3', 'JWT'],
  },
  {
    name: 'Wavelengths',
    code: 'WL',
    tags: ['Booking', 'Web'],
    blurb:
      'Private bookings and public ticket sales share one calendar, so artists never get double-booked.',
    subtitle: 'Entertainment booking platform for artists, bands and organizers',
    category: 'Booking',
    accent: 'info',
    points: [
      'Platform for booking artists/bands for private events and selling tickets to public concerts.',
      'Dual booking system with real-time availability management across private and public events.',
      'RazorPay integration covering booking deposits, full payments and ticket purchases.',
      'JWT authentication and RBAC for customers, artists, bands and organizers with personalized dashboards.',
      'Artist/band profile management with portfolio showcase, pricing models, availability calendar and performance history.',
    ],
    tech: ['React.js', 'TypeScript', 'Node.js', 'Express.js', 'MySQL', 'Material UI'],
  },
]

export const education = [
  {
    title: 'B.Com in Computer Application',
    org: 'Arora College',
    location: 'Karimnagar, Telangana',
    period: '2014 – 2019',
    type: 'education',
  },
]

export const certifications = [
  {
    title: 'Full Stack Development Certification',
    org: 'DDU-GKY',
    location: 'Hyderabad, Telangana',
    period: 'Apr 2021 – Nov 2021',
    type: 'certification',
  },
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]
