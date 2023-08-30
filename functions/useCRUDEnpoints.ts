import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

export default function useCRUDEndpoints(
  prisma: PrismaClient,
  model: string,
  router: Router
) {
  return {
    create: (middleware?: any) =>
      router.post(
        `/${model}`,
        middleware,
        async (req: Request, res: Response) => {
          const { name } = req.body;
          try {
            const createdModel = await prisma[model].create({
              data: {
                name,
              },
            });
            res.json(createdModel);
          } catch (error) {
            console.error(`Error creating ${model}:`, error);
            res.status(500).json({ error: `Error creating ${model}` });
          }
        }
      ),
    read: (middleware?: any) =>
      router.get(
        `/${model}/:id`,
        middleware,
        async (req: Request, res: Response) => {
          const id = req.params.id;
          try {
            const response = await prisma[model].findUnique({
              where: {
                id,
              },
            });
            if (response) {
              res.json(response);
            } else {
              res.status(404).json({ error: `${model} not found` });
            }
          } catch (error) {
            console.error(`Error getting ${model}:`, error);
            res.status(500).json({ error: `Error getting ${model}` });
          }
        }
      ),
    update: (middleware?: any) =>
      router.put(
        `/${model}/:id`,
        middleware,
        async (req: Request, res: Response) => {
          const id = req.params.id;
          const { name } = req.body;
          try {
            const updatedModel = await prisma[model].update({
              where: {
                id,
              },
              data: {
                name,
              },
            });
            res.json(updatedModel);
          } catch (error) {
            console.error(`Error updating ${model}:`, error);
            res.status(500).json({ error: `Error updating ${model}` });
          }
        }
      ),
    delete: (middleware?: any) =>
      router.delete(
        `/${model}/:id`,
        middleware,
        async (req: Request, res: Response) => {
          const id = req.params.id;
          try {
            await prisma[model].delete({
              where: {
                id,
              },
            });
            res.json({ message: `${model} deleted successfully` });
          } catch (error) {
            console.error(`Error deleting ${model}:`, error);
            res.status(500).json({ error: `Error deleting ${model}` });
          }
        }
      ),
    createMany: (middleware?: any) =>
      router.post(
        `/${model}/many`,
        middleware,
        async (req: Request, res: Response) => {
          const modelsData = req.body;
          try {
            const createdModels = await prisma[model].createMany({
              data: modelsData,
            });
            res.json(createdModels);
          } catch (error) {
            console.error(`Error creating ${model}s:`, error);
            res.status(500).json({ error: `Error creating ${model}s` });
          }
        }
      ),
    deleteMany: (middleware?: any) =>
      router.delete(
        `/${model}/many`,
        middleware,
        async (req: Request, res: Response) => {
          const modelIdsToDelete = req.body.ids;
          try {
            await prisma[model].deleteMany({
              where: {
                id: {
                  in: modelIdsToDelete,
                },
              },
            });
            res.json({ message: `${model}s deleted successfully` });
          } catch (error) {
            console.error(`Error deleting ${model}s:`, error);
            res.status(500).json({ error: `Error deleting ${model}s` });
          }
        }
      ),
  };
}
