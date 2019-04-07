import { ImoveisSchema } from "./schemas/imoveis.schema";
import { Connection } from "mongoose";

export const imoveisProviders = [
    {
        provide: 'ImoveisModelToken',
        useFactory: (connection: Connection) => connection.model('Imoveis', ImoveisSchema),
        inject: ['DbConnectionToken'],
    },
];