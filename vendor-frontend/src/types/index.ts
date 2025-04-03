export interface User {
    id?: string;
    email: string;
    role: 'admin' | 'user';
  }
  
  export interface Product {
    id?: string;
    name: string;
    description: string;
    price: number;
    image?: string;
  }
  
  export interface AuthResponse {
    token: string;
  }
  
  export interface LoginForm {
    email: string;
    password: string;
  }
  
  export interface RegisterForm extends LoginForm {
    confirmPassword: string;
  }