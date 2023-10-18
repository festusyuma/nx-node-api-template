import {HTTPMethod} from "./controller";

export type PathRule = {
  roles?: string[] | "*";
  authRequired?: boolean;
};

export type PathMethod = Partial<Record<HTTPMethod | "ALL", PathRule>>;

export interface Path {
  paths: Record<string, Path>;
  rules: PathMethod;
}
