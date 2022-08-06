import { Injectable } from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(@InjectModel('user') private readonly userModel:Model<User>) {}

    async findAll(): Promise<User[]> {
        return await this.userModel.find();
    }

    async delete(id: string): Promise<User> {
        return await this.userModel.findByIdAndRemove(id);
    }

    async insertUser(userName: string, password: string, email: string) {
        const username = userName.toLowerCase();
        const newUser = new this.userModel({
            username,
            password,
            email,
        });
        await newUser.save();
        return newUser;
    }

    async getUser(userName: string) {
        const username = userName.toLowerCase();
        const user = await this.userModel.findOne({username});
        return user;
    }

}

