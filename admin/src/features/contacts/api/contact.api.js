import api from "../../../api/client";

export async function getContactMessages() {
  const { data } = await api.get("/contacts");
  return data.data;
}

export async function getContactMessage(id) {
  const { data } = await api.get(`/contacts/${id}`);
  return data.data;
}

export async function updateReadStatus({ id, isRead }) {
  const { data } = await api.patch(`/contacts/${id}/read`, {
    isRead,
  });

  return data.data;
}

export async function updateRepliedStatus({ id, replied }) {
  const { data } = await api.patch(`/contacts/${id}/replied`, {
    replied,
  });

  return data.data;
}

export async function deleteContactMessage(id) {
  const { data } = await api.delete(`/contacts/${id}`);
  return data.data;
}