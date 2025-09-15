export interface AuthUser {
  token: string;
  user:  User;
}
  
export interface User {    
  id:    string;
  email: string;
  name:  string;
  role:  string;
}