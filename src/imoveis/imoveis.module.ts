import { Module } from '@nestjs/common';
import { ImoveisService } from './imoveis.service';
import { DatabaseModule } from 'src/database/database.module';
import { imoveisProviders } from './imoveis.providers';
import { ImoveisController } from './imoveis.controller';

@Module({
 imports: [DatabaseModule],
 providers: [ImoveisService, ...imoveisProviders],
 controllers: [ImoveisController]
})
export class ImoveisModule {}
