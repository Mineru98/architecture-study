import axios from "axios";
import qs from "qs";
import type { ProjectMeta, StudyMemo, StudyMemoFormValues } from "../types/project";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4301/api",
  headers: { "Content-Type": "application/json" },
  paramsSerializer: (params) => qs.stringify(params, { skipNulls: true }),
});

export async function fetchProjectMeta() {
  const response = await apiClient.get<ProjectMeta>("/project/meta");
  return response.data;
}

export async function fetchStudyMemos() {
  const response = await apiClient.get<StudyMemo[]>("/study-memos");
  return response.data;
}

export async function createStudyMemo(payload: StudyMemoFormValues) {
  const response = await apiClient.post<StudyMemo>("/study-memos", payload);
  return response.data;
}
