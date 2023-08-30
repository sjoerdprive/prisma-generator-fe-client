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

export class __Model__CRUD {
  protected baseURL: string;
  protected headers: Record<string, any>;

  constructor(baseUrl: string, accessToken?: string | null) {
    this.baseURL = baseUrl;
    this.headers = {
      ...(!!accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };
  }

  async create__Model__(data: CreateArgsData): Promise<__Model__ | null> {
    try {
      const response = await fetch(`${this.baseURL}/__model__`, {
        method: "POST",
        headers: { ...this.headers, "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return response.json() as Promise<__Model__>;
      }
      return null;
    } catch (error) {
      console.error("Error creating __model__:", error);
      return null;
    }
  }

  async get__Model__ById(id: string): Promise<__Model__ | null> {
    try {
      const response = await fetch(`${this.baseURL}/__model__/${id}`, {
        headers: this.headers,
      });
      if (response.ok) {
        return response.json() as Promise<__Model__>;
      }
      return null;
    } catch (error) {
      console.error("Error getting __model__:", error);
      return null;
    }
  }

  async getMany__Model__s(ids: string[]): Promise<__Model__[]> {
    try {
      const response = await fetch(`${this.baseURL}/__model__/many`, {
        method: "POST",
        headers: { ...this.headers, "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });

      if (response.ok) {
        return response.json() as Promise<__Model__[]>;
      }
      return [];
    } catch (error) {
      console.error("Error getting many __model__s:", error);
      return [];
    }
  }

  async getAll__Model__s(): Promise<__Model__[]> {
    try {
      const response = await fetch(`${this.baseURL}/__model__/all`, {
        headers: this.headers,
      });
      if (response.ok) {
        return response.json() as Promise<__Model__[]>;
      }
      return [];
    } catch (error) {
      console.error("Error getting __model__s:", error);
      return [];
    }
  }

  async update__Model__(
    id: string,
    updatedData: UpdateArgsData
  ): Promise<__Model__ | null> {
    try {
      const response = await fetch(`${this.baseURL}/__model__/${id}`, {
        method: "PUT",
        headers: {
          ...this.headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        return response.json() as Promise<__Model__>;
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
        headers: {
          ...this.headers,
        },
      });
      return response.ok;
    } catch (error) {
      console.error("Error deleting __model__:", error);
      return false;
    }
  }
}
