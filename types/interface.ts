import { ParamListBase } from '@react-navigation/native';

export interface StackProps extends ParamListBase {
  RecipeList: undefined;
  RecipeCreate: undefined;
  RecipeDetail: { id: string };
  RecipeEdit: { id: string };  
  SettingList: undefined;
  SettingDetail: { id: string };
  TodoList: undefined;
  TodoShare: undefined;
  SignIn: undefined;
  SignUp: undefined;
}

export interface Recipe {
  id: string;
  image: string;
  name: string;
  memo: string;
  steps: Step[];
  ingredients: Ingredient[];
  userId: string;
}

export interface Step {
  id: number;
  text: string;
  image: string | null;
}

export interface Ingredient {
  id: number;
  text: string;
  quantity: string;
}

export interface ToDo {
  id: string;
  userIds: string[];
  text: string;
  done: boolean;
}

export interface Setting {
  title: string;
  icon: string;
  id?: string;
  func?: () => void;
}

export interface RecipeWithUserName extends Recipe {
  userName: string;
}

export interface User {
  id: string;
  email?: string | null;
  userName: string;
  password: string;
}

