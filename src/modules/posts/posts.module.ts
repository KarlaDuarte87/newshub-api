import { Module } from '@nestjs/common';
  import { PostsService } from './posts.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { PostsController } from './posts.controller';

@Module({
  imports: [PrismaModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}