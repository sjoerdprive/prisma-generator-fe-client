import { Expo, Prisma } from "@prisma/client";

type CreateArgsData = Prisma.Without<
  Prisma.ExpoCreateInput,
  Prisma.ExpoUncheckedCreateInput
> &
  Prisma.ExpoUncheckedCreateInput;

type UpdateArgsData = Prisma.Without<
  Prisma.ExpoUpdateInput,
  Prisma.ExpoUncheckedUpdateInput
> &
  Prisma.ExpoUncheckedUpdateInput;

class ExpoClient {
  private baseURL: string;

  constructor(baseUrl: string) {
    this.baseURL = baseUrl;
  }

  async createExpo(data: CreateArgsData): Promise<Expo | null> {
    try {
      const response = await fetch(`${this.baseURL}/expo`, {
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
      console.error("Error creating expo:", error);
      return null;
    }
  }

  async getExpoById(id: string): Promise<Expo | null> {
    try {
      const response = await fetch(`${this.baseURL}/expo/${id}`);
      if (response.ok) {
        return response.json();
      }
      return null;
    } catch (error) {
      console.error("Error getting expo:", error);
      return null;
    }
  }

  async updateExpo(
    id: string,
    updatedData: UpdateArgsData
  ): Promise<Expo | null> {
    try {
      const response = await fetch(`${this.baseURL}/expos/${id}`, {
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
      console.error("Error updating expo:", error);
      return null;
    }
  }

  async deleteExpo(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/expo/${id}`, {
        method: "DELETE",
      });
      return response.ok;
    } catch (error) {
      console.error("Error deleting expo:", error);
      return false;
    }
  }
}

export default ExpoClient;
