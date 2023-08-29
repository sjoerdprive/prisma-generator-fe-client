import { User, Prisma } from "@prisma/client";

type CreateArgsData = Prisma.Without<
  Prisma.UserCreateInput,
  Prisma.UserUncheckedCreateInput
> &
  Prisma.UserUncheckedCreateInput;

type UpdateArgsData = Prisma.Without<
  Prisma.UserUpdateInput,
  Prisma.UserUncheckedUpdateInput
> &
  Prisma.UserUncheckedUpdateInput;

class UserClient {
  private baseURL: string;

  constructor(baseUrl: string) {
    this.baseURL = baseUrl;
  }

  async createUser(data: CreateArgsData): Promise<User | null> {
    try {
      const response = await fetch(`${this.baseURL}/user`, {
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
      console.error("Error creating user:", error);
      return null;
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const response = await fetch(`${this.baseURL}/user/${id}`);
      if (response.ok) {
        return response.json();
      }
      return null;
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  }

  async updateUser(
    id: string,
    updatedData: UpdateArgsData
  ): Promise<User | null> {
    try {
      const response = await fetch(`${this.baseURL}/users/${id}`, {
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
      console.error("Error updating user:", error);
      return null;
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/user/${id}`, {
        method: "DELETE",
      });
      return response.ok;
    } catch (error) {
      console.error("Error deleting user:", error);
      return false;
    }
  }
}

export default UserClient;
