import { Body, Controller, Get, Headers, HttpCode, Patch, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { User } from "./user.entity";
import { UsersService } from "./users.service";
import jwt_decode from "jwt-decode";

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService
    ){}
    @Patch()
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    async updateAsset(@Body() user: Partial<User>, @Headers() headers ): Promise<void> {
       // var decoded = jwt_decode(String(headers.authorization).replace("Bearer ", ""));
/*         let oldUser: User = await this.userService.getByUsername(decoded['username']);      
        if(user.username){
            oldUser.username = user.username;
        }
        if(user.password){
            oldUser.password = await this.userService.getHash(user.password);;
        }
        if(user.email){
            oldUser.email = user.email;
        }
        if(user.cart){
            oldUser.cart = oldUser.cart.concat(user.cart);
        } */
        this.userService.update(user, String(headers.authorization).replace("Bearer ", ""))
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getByToken(@Headers() headers): Promise<User> {
        var decoded = jwt_decode(String(headers.authorization).replace("Bearer ", ""));
        //let user: User = this.userService.getByUsername(decoded['username']); 
        return this.userService.getByUsername(decoded['username']);
    }
}