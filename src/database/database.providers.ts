import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect('mongodb://dbuser:qwe123@ds145828.mlab.com:45828/pos-web-js', {
        useNewUrlParser: true
      }),
  },
];