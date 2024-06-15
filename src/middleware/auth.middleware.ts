import { HttpException, HttpStatus, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken'
import { JWT_KEY } from "../../config";

export class AuthMiddle implements NestMiddleware{
    use(req: any, res: Response, next: NextFunction) {
        // 获取token
        const token = req.headers.authorization
        console.log("token", token);
        try {
         const currentUser  =  jwt.verify(token, JWT_KEY)
         req.currentUser = currentUser
         next()
        } catch (error) {
            return {message: error.message, code: 401};
        }

    }
}