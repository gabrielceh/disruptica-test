import { User } from "@modules/auth/domain/entities";

export const usersData:User[] = [
  {
    id: "1",
    email: "admin@app.com",
    password: "123456789",
    name: "Ramiro",
    role: "admin"
  },
  {
    id: "2",
    email: "user@app.com",
    password: "123456789",
    name: "Juan",
    role: "user"
  },
  {
    id: "3",
    email: "user@app.com",
    password: "123456789",
    name: "Maria",
    role: "user"
  }
]