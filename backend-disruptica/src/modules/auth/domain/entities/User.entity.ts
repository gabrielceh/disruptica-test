export class User {
  public id: string;
  public email: string;
  public password: string;
  public name: string;
  public role: string;

  constructor(
    id: string,
    email: string,
    password: string,
    name: string,
    role: string

  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.role = role;
  }
}
