import { BadRequestException, Headers, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { CalCounter } from './calCounter.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import jwt_decode from "jwt-decode";
import { UsersService } from 'src/users/users.service';
import { CategoriesService } from './categories.service';
import { Categories } from './categories.entity';



@Controller('calCounter')
export class calCounterController {
    constructor(
        @InjectRepository(CalCounter)
        private readonly calCounterRep: MongoRepository<CalCounter>,
        private readonly userService: UsersService,
        private readonly categService: CategoriesService
      ) {}
    @Get()
    async getcalCounter(): Promise<CalCounter[]> {
        return await this.calCounterRep.find();
    }
    @Get(':id')
    async getcalCounters(@Param('id') id): Promise<CalCounter> {
        const calCounter = ObjectID.isValid(id) && await this.calCounterRep.findOne(id);
        if (!calCounter) {
            // Entity not found
            throw new NotFoundException();
        }
        return calCounter;
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    async createcalCounter(@Body() calCounter: Partial<CalCounter>, @Headers() headers): Promise<CalCounter> {
        if (!calCounter || !calCounter.name || !calCounter.cost) {
            throw new BadRequestException(`An calCounter must have at least name and cost defined`);
        }
        if(!calCounter.categories){
            let categ: string[] = ["others"]
            calCounter.categories = categ;
        }else{
            var i: number = 0;
            let categ: string[] = [];
            for(i = 0; i < calCounter.categories.length; i++ ){
                let category: Categories = await this.categService.getByName(calCounter.categories[i]);
                if(category){
                    categ.push(calCounter.categories[i]);
                }
            }
            calCounter.categories = categ;
        }
        var decoded = jwt_decode(String(headers.authorization).replace("Bearer ", ""));
        let user: string[] = [(await this.userService.getByUsername(decoded['username'])).id.toString()];
        calCounter.user = user
        return await this.calCounterRep.save(new CalCounter(calCounter));
    }
    @Put(':id')
    @HttpCode(204)
    async updatecalCounter(@Param('id') id, @Body() calCounter: Partial<CalCounter>): Promise<void> {

        const exists = ObjectID.isValid(id) && await this.calCounterRep.findOne(id);
        if (!exists) {
            throw new NotFoundException();
        }
        if(calCounter.categories){
            var i: number = 0;
            let categ: string[] = [];
            for(i = 0; i < calCounter.categories.length; i++ ){
                let category: Categories = await this.categService.getByName(calCounter.categories[i]);
                if(category){
                    categ.push(calCounter.categories[i]);
                }
            }
            calCounter.categories = categ;
        }
        await this.calCounterRep.update(id, calCounter);
    }
    @Delete(':id')
    @HttpCode(204)
    async deletecalCounter(@Param('id') id): Promise<void> {
        // Check if entity exists
        const exists = ObjectID.isValid(id) && await this.calCounterRep.findOne(id);
        if (!exists) {
            throw new NotFoundException();
        }
        await this.calCounterRep.delete(id);
    }
}
