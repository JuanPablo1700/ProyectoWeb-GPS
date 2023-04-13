import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    console.log('validate token');
    const headerToken = req.headers['authorization'];

    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        //Tiene token
        try {            
            const bearerToken = headerToken.slice(7);
            Jwt.verify(bearerToken, 'secreto12345')
            next();
        } catch (error) {
            res.status(401).json({
                error: 'Token invalido'
            })
        }    
    } else {
        res.status(401).json({
            error: 'Acceso denegado'
        })
    }
}

export default validateToken;