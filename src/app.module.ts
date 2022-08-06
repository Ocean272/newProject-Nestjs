import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule, ItemsModule, MongooseModule.forRoot(config.mongoURI), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
