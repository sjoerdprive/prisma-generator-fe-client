import { __Model__, Prisma } from "@prisma/client";

type CreateArgsData = Prisma.Without<
  Prisma.__Model__CreateInput,
  Prisma.__Model__UncheckedCreateInput
> &
  Prisma.__Model__UncheckedCreateInput;

type UpdateArgsData = Prisma.Without<
  Prisma.__Model__UpdateInput,
  Prisma.__Model__UncheckedUpdateInput
> &
  Prisma.__Model__UncheckedUpdateInput;

class __Model__Client {
  private baseURL: string;

  constructor(baseUrl: string) {
    this.baseURL = baseUrl;
  }

  async create__Model__(data: CreateArgsData): Promise<__Model__ | null> {
    try {
      const response = await fetch(`${this.baseURL}/__model__`, {
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
      console.error("Error creating __model__:", error);
      return null;
    }
  }

  async get__Model__ById(id: string): Promise<__Model__ | null> {
    try {
      const response = await fetch(`${this.baseURL}/__model__/${id}`);
      if (response.ok) {
        return response.json();
      }
      return null;
    } catch (error) {
      console.error("Error getting __model__:", error);
      return null;
    }
  }

  async update__Model__(
    id: string,
    updatedData: UpdateArgsData
  ): Promise<__Model__ | null> {
    try {
      const response = await fetch(`${this.baseURL}/__model__s/${id}`, {
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
      console.error("Error updating __model__:", error);
      return null;
    }
  }

  async delete__Model__(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/__model__/${id}`, {
        method: "DELETE",
      });
      return response.ok;
    } catch (error) {
      console.error("Error deleting __model__:", error);
      return false;
    }
  }
}

export default __Model__Client;
