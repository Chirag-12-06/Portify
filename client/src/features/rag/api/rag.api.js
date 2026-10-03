import api from "../../../shared/api/api";

export async function getAnswer({ question }) {
  const { data } = await api.post("/rag/ask", {
    question,
  });

  return data;
}