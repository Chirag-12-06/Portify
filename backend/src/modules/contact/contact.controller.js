import {
  createContactMessageSchema,
  updateReadStatusSchema,
  updateRepliedStatusSchema,
} from "./contact.validation.js";

import {
  createContactMessage,
  getContactMessages,
  getContactById,
  updateReadStatus,
  updateRepliedStatus,
  deleteContactMessage,
} from "./contact.service.js";

import {asyncHandler} from "../../utils/asyncHandler.js";

export const createContactMessageController = asyncHandler(async (req, res) => {
  const data = createContactMessageSchema.parse(req.body);

  const message = await createContactMessage(data);

  return res.status(201).json({
    success: true,
    message: "Message sent successfully",
    data: message,
  });
});

export const getContactMessagesController = asyncHandler(async (req, res) => {
  const messages = await getContactMessages();

  return res.status(200).json({
    success: true,
    message: "Messages fetched successfully",
    data: messages,
  });
});

export const getContactByIdController = asyncHandler(async (req, res) => {
  const message = await getContactById(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Message fetched successfully",
    data: message,
  });
});

export const updateReadStatusController = asyncHandler(async (req, res) => {
  const data = updateReadStatusSchema.parse(req.body);

  const message = await updateReadStatus(req.params.id, data.isRead);

  return res.status(200).json({
    success: true,
    message: "Read status updated successfully",
    data: message,
  });
});

export const updateRepliedStatusController = asyncHandler(async (req, res) => {
  const data = updateRepliedStatusSchema.parse(req.body);

  const message = await updateRepliedStatus(req.params.id, data.replied);

  return res.status(200).json({
    success: true,
    message: "Replied status updated successfully",
    data: message,
  });
});

export const deleteContactMessageController = asyncHandler(async (req, res) => {
  await deleteContactMessage(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Message deleted successfully",
  });
});