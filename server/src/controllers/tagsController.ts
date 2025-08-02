import { Request, Response } from 'express';
import { getAllTags } from '../services/tagService';

export const getTags = async (_: Request, res: Response) => {
  try {
    const tags = await getAllTags();
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};