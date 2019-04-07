import { Injectable, Inject } from '@nestjs/common';
import { CreateImovelDto } from './dto/create-imoveis.dto';
import { Imovel } from './interfaces/imoveis.interface';
import { Model } from 'mongoose';

@Injectable()
export class ImoveisService {
    constructor(
        @Inject('ImoveisModelToken') private readonly imoveisModel: Model<Imovel>
    ) {}
    async create(imovel: CreateImovelDto): Promise<Imovel> {
        const createdImovel = new this.imoveisModel(imovel);
        return await createdImovel.save();
    }
    async findAll(): Promise<Imovel[]>{
        return await this.imoveisModel.find().exec(); 
    }
    async findOneById(id: string): Promise<Imovel> {
        return await this.imoveisModel.findById(id).exec();
    }
    async update(id: string, imoveis: CreateImovelDto): Promise<Imovel> {
        return await this.imoveisModel.findByIdAndUpdate(id, imoveis).exec();
    }
    async delete(id: string): Promise<Imovel> {
        return await this.imoveisModel.findByIdAndDelete(id).exec();
    }
}
