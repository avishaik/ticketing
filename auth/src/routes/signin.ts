import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError, ValidateRequest } from '@avishaitickets/common';

import { Password } from '../services/password';
import { User } from '../models/user';

const router = express.Router();

router.post('/api/users/signin', 
[
    body('email').isEmail()
    .withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password')
],
ValidateRequest,
    async (req: Request, res: Response) => { 
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
    
        if(!existingUser) {
            throw new BadRequestError('Login failed!');
        }

        const passwordMatch = await Password.compare(existingUser.password, password);
        if(!passwordMatch) {
            throw new BadRequestError('Login failed!');
        }

        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, process.env.JWT_KEY!);
    
        req.session = {
            jwt: userJwt
        };
            
    
        res.status(200).send(existingUser);
    
    }
);

export { router as signinRouter };