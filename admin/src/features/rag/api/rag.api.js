import api from "../../../api/client";

export async function getQuestions() {
  const { data } = await api.get("/rag/questions");
  return data.data;
}

export async function getQuestion(id) {
  const { data } = await api.get(`/rag/questions/${id}`);
  return data.data;
}

export async function createQuestion(values) {
  const { data } = await api.post("/rag/questions", values);
  return data.data;
}

export async function updateQuestion({ id, values }) {
  const { data } = await api.patch(`/rag/questions/${id}`, values);
  return data.data;
}

export async function deleteQuestion(id) {
  const { data } = await api.delete(`/rag/questions/${id}`);
  return data.data;
}