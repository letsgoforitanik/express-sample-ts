import { UserDto } from "@models";
import { Model } from "mongoose";

declare global {
    namespace Express {
        export interface Request {
            user?: UserDto;
        }
    }
}

export type InferredDoc<T> = T extends Model<any, any, any, any, infer X> ? X : never;

export type InferredType<T> = T extends Model<infer X> ? X : never;

export type WithId<T> = T & { id: string };
