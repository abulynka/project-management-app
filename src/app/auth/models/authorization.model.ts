export interface SignInData {
  login: string;
  password: string;
}

export interface SignInResponse {
  token: string;
}

export interface SignUpData {
  name: string;
  login: string;
  password: string;
}

export interface SignUpResponse {
  id: string;
  login: string;
  name: string;
}
