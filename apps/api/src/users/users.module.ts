import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PostsModule } from 'src/posts/posts.module';
import { LoggerMiddleware } from 'src/midddleware/logger.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PostsModule],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}
