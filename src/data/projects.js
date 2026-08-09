/* ---------------------------------------------------------------
   projects.js: selected work.

   `links.website` / `links.github` are null until real URLs exist;
   ProjectCard hides any action whose href is null.
   `image` stays null until a real screenshot is supplied, the card
   falls back to a drawn placeholder frame instead of a broken <img>.
   --------------------------------------------------------------- */

export const projects = [
  {
    id: 1,
    slug: 'accessed',
    index: '01',
    category: 'Accessibility / Web platform',
    name: 'AccessEd',
    subtitle: 'PDF Accessibility Platform',
    description:
      'A web platform where users upload PDFs and have their documents analysed against WCAG accessibility requirements: surfacing what fails, why it matters, and how to fix it.',
    highlights: [
      'Accessibility validation against WCAG criteria',
      'Automated issue detection across document structure',
      'Readable reporting for non-technical users',
      'Remediation guidance per issue',
      'Built collaboratively across frontend and backend',
    ],
    tech: ['Web Platform', 'WCAG', 'PDF Processing', 'Frontend', 'Backend'],
    links: {
      website: null, // TODO: live URL
      github: null, // TODO: repository URL
    },
    image: null,
    featured: true,
  },
  {
    id: 2,
    slug: 'journalist-risk-patterns',
    index: '02',
    category: 'Data science / Machine learning',
    name: 'Journalist Risk Pattern Analysis',
    subtitle: 'Press freedom & safety indicators',
    description:
      'Data analysis and machine learning over journalist incident datasets, looking for the patterns that sit underneath journalist safety and press-freedom indicators.',
    highlights: [
      'Data collection from incident datasets',
      'Cleaning and preprocessing of messy real-world records',
      'Exploratory analysis of risk factors',
      'Clustering to surface incident groupings',
      'Machine learning models over the resulting features',
    ],
    tech: ['Python', 'Pandas', 'Clustering', 'Machine Learning', 'EDA'],
    links: {
      website: null,
      github: null, // TODO: repository URL
    },
    image: null,
    featured: true,
  },
  {
    id: 3,
    slug: 'aubconnect',
    index: '03',
    category: 'Product / Frontend',
    name: 'AUBConnect',
    subtitle: 'University Course & Professor Review Platform',
    description:
      'A platform for AUB students to rate and explore courses and professors: the information that usually travels by word of mouth, collected in one place.',
    highlights: [
      'Course and professor discovery',
      'Student-submitted ratings and reviews',
      'Responsive interface built with React and Tailwind',
    ],
    tech: ['React', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS'],
    links: {
      website: null,
      github: null, // TODO: repository URL
    },
    image: null,
    featured: true,
  },
  {
    id: 4,
    slug: 'cloud-cicd-aws',
    index: '04',
    category: 'Cloud / MLOps',
    name: 'Cloud Computing & CI/CD on AWS',
    subtitle: 'Automated end-to-end ML workflow',
    description:
      'An automated machine learning workflow on AWS covering data processing, training, evaluation, deployment and inference, with the whole path wired through CI/CD instead of run by hand.',
    highlights: [
      'Orchestration with AWS Step Functions',
      'Build and release through CodePipeline and CodeBuild',
      'Container images published to ECR',
      'Infrastructure defined in Terraform',
      'Deployment and inference automated end to end',
    ],
    tech: ['AWS', 'Step Functions', 'CodePipeline', 'CodeBuild', 'ECR', 'Terraform', 'CI/CD'],
    links: {
      website: null,
      github: null,
    },
    image: null,
    featured: true,
  },
  {
    id: 5,
    slug: 'mri-brain-tumor-classification',
    index: '05',
    category: 'Machine learning / Medical imaging',
    name: 'MRI Brain Tumor Classification',
    subtitle: 'Image classification pipeline',
    description:
      'A machine learning pipeline that classifies brain MRI scans into tumor-related categories, from raw image preprocessing through to model evaluation.',
    highlights: [
      'Image preprocessing and normalisation',
      'Model training over labelled MRI scans',
      'Evaluation across tumor categories',
    ],
    tech: ['Python', 'Machine Learning', 'Image Preprocessing', 'Model Evaluation'],
    links: {
      website: null,
      github: null,
    },
    image: null,
    featured: true,
  },
]

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug) ?? null
