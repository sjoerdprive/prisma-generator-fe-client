import { Media, Prisma } from "@prisma/client";

type CreateArgsData = Prisma.Without<
  Prisma.MediaCreateInput,
  Prisma.MediaUncheckedCreateInput
> &
  Prisma.MediaUncheckedCreateInput;

type UpdateArgsData = Prisma.Without<
  Prisma.MediaUpdateInput,
  Prisma.MediaUncheckedUpdateInput
> &
  Prisma.MediaUncheckedUpdateInput;

class MediaClient {
  private baseURL: string;

  constructor(baseUrl: string) {
    this.baseURL = baseUrl;
  }

  async createMedia(data: CreateArgsData): Promise<Media | null> {
    try {
      const response = await fetch(`${this.baseURL}/media`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return response.json();
      }
      return null;
    } catch (error) {
      console.error("Error creating media:", error);
      return null;
    }
  }

  async getMediaById(id: string): Promise<Media | null> {
    try {
      const response = await fetch(`${this.baseURL}/media/${id}`);
      if (response.ok) {
        return response.json();
      }
      return null;
    } catch (error) {
      console.error("Error getting media:", error);
      return null;
    }
  }

  async updateMedia(
    id: string,
    updatedData: UpdateArgsData
  ): Promise<Media | null> {
    try {
      const response = await fetch(`${this.baseURL}/medias/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        return response.json();
      }
      return null;
    } catch (error) {
      console.error("Error updating media:", error);
      return null;
    }
  }

  async deleteMedia(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/media/${id}`, {
        method: "DELETE",
      });
      return response.ok;
    } catch (error) {
      console.error("Error deleting media:", error);
      return false;
    }
  }
}

export default MediaClient;
