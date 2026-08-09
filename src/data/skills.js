/* ---------------------------------------------------------------
   skills.js: the short rail under the hero, and the full grouped
   list shown further down the page.
   --------------------------------------------------------------- */

/* A deliberately small set. The full list lives lower on the page. */
export const heroStack = ['Python', 'PySpark', 'Databricks', 'React', 'AI', 'SQL']

export const skillGroups = [
  {
    id: 'programming',
    label: 'Programming',
    items: ['Python', 'Java', 'C', 'C++', 'SQL', 'R', 'HTML', 'CSS', 'SML'],
  },
  {
    id: 'data-engineering',
    label: 'Data Engineering',
    items: [
      'Databricks',
      'Apache Spark',
      'PySpark',
      'ETL Pipeline Development',
      'Data Transformation',
      'Distributed Computing',
      'Parallel Processing',
    ],
  },
  {
    id: 'ai-ds',
    label: 'AI / Data Science',
    items: [
      'LangChain',
      'LangGraph',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Agentic AI Workflows',
    ],
  },
  {
    id: 'software',
    label: 'Software Engineering',
    items: [
      'Git',
      'GitHub',
      'Jira',
      'Docker',
      'Agile',
      'Software Engineering',
      'Software Construction',
    ],
  },
  {
    id: 'systems',
    label: 'Systems / Databases',
    items: ['MySQL', 'Database Systems', 'Operating Systems', 'Computer Organization'],
  },
  {
    id: 'core-cs',
    label: 'Core CS',
    items: [
      'Data Structures & Algorithms',
      'Theory of Computation',
      'Discrete Mathematics',
      'Probability',
      'Linear Algebra',
    ],
  },
]
