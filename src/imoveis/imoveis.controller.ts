import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ImoveisService } from './imoveis.service';
import { CreateImoveisDto } from './dto/create-imoveis.dto';
import { async } from 'rxjs/internal/scheduler/async';
import { timingSafeEqual } from 'crypto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('imoveis')
export class ImoveisController {
    constructor(
        private readonly imoveisService: ImoveisService
    ) {}
    @Get()
    async retrieve(){
        return await this.imoveisService.findAll();
    }
    @Get(':id')
    async get(@Param('id') id: string){
        return await this.imoveisService.findOneById(id);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() imoveis: CreateImoveisDto) {
        return await this.imoveisService.create(imoveis);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async update(@Param('id') id: string, @Body() imoveis: CreateImoveisDto){
        return await this.imoveisService.update(id, imoveis);       
    }
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(@Param('id') id: string) {
        return await this.imoveisService.delete(id);
    }
}
