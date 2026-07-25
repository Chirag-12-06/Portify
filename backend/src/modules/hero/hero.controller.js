import { asyncHandler } from "../../utils/asyncHandler.js";

import {
  getHero,
  updateHero,
} from "./hero.service.js";

import { updateHeroSchema } from "./hero.validation.js";

export const getHeroController = asyncHandler(async (req, res) => {
  const hero = await getHero();

  return res.status(200).json({
    success: true,
    data: hero,
  });
});

export const updateHeroController = asyncHandler(async (req, res) => {
  const data = updateHeroSchema.parse(req.body);

  const hero = await updateHero(data);

  return res.status(200).json({
    success: true,
    message: "Hero updated successfully",
    data: hero,
  });
});