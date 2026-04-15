export type StudyMemo = {
  id: string;
  title: string;
  goal: string;
  decision: string;
  notes: string;
  createdAt: string;
};

export type StudyMemoFormValues = {
  title: string;
  goal: string;
  decision: string;
  notes: string;
};

export type ProjectMeta = {
  title: string;
  category: string;
  slug: string;
  question: string;
  scenario: string;
  frontendTechStack: string[];
  backendTechStack: string[];
  endpoints: string[];
};
