import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const postgresUri = configService.get<string>('POSTGRES_URI');
        console.log('POSTGRES_URI:', postgresUri); // Tambahkan log di sini
        return {
          type: 'postgres',
          url: postgresUri,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class PostgresModule {}
