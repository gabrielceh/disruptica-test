export class AuthUserResponse {
  public token: string;
  public user: UserRespnse;

  constructor({token, user}: {token: string, user: UserRespnse}) {
    this.token = token;
    this.user = user;
  }

  static fromJSON(json: any): AuthUserResponse {
    return new AuthUserResponse({
      token: json.token ?? '',
      user: UserRespnse.fromJSON(json.user ?? {}),
    });
  }
}

export class UserRespnse {
  public id:    string;
  public email: string;
  public name:  string;
  public role:  string;

  constructor({id, email, name, role}: {id: string, email: string, name: string, role: string}) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.role = role;
  }

  static fromJSON(json: any): UserRespnse {
    return new UserRespnse({
      id:    json.id ?? '',
      email: json.email ?? '',
      name:  json.name ?? '',
      role:  json.role ?? '',
    });
  }
    
}