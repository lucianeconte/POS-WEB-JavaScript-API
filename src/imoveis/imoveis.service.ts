import { Injectable, Inject } from '@nestjs/common';
import { CreateImoveisDto } from './dto/create-imoveis.dto';
import { Imoveis } from './interfaces/imoveis.interface';
import { Model } from 'mongoose';

@Injectable()
export class ImoveisService {
    constructor(
        @Inject('ImoveisModelToken') private readonly imoveisModel: Model<Imoveis>
    ) {}
    async create(imoveis: CreateImoveisDto): Promise<Imoveis> {
        const createdImoveis = new this.imoveisModel(imoveis);
        return await createdImoveis.save();
    }
    async findAll(): Promise<Imoveis[]>{
        return await this.imoveisModel.find().exec(); 
    }
    async findOneById(id: string): Promise<Imoveis> {
        return await this.imoveisModel.findById(id).exec();
    }
    async update(id: string, imoveis: CreateImoveisDto): Promise<Imoveis> {
        return await this.imoveisModel.findByIdAndUpdate(id, imoveis);
    }
    async delete(id: string): Promise<Imoveis> {
        return await this.imoveisModel.findByIdAndDelete(id).exec();
    }
}
