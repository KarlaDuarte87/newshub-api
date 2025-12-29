import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const posts = await this.prisma.posts.findMany({
      orderBy: {
        publish_date: 'desc',
      },
    });

    return posts.map((post) => ({
      id: String(post.id),
      slug: post.slug,
      title: post.title,
      summary: post.summary,
      content: post.content,
      author: post.author,
      publishDate: post.publish_date,
      category: post.category,
      imageUrl: post.image_url,
    }));
  }

  async findOne(slug: string) {
    const post = await this.prisma.posts.findUnique({
      where: { slug },
    });

    if (!post) {
      throw new NotFoundException(`Artigo com slug "${slug}" não encontrado`);
    }

    return {
      id: String(post.id),
      slug: post.slug,
      title: post.title,
      summary: post.summary,
      content: post.content,
      author: post.author,
      publishDate: post.publish_date,
      category: post.category,
      imageUrl: post.image_url,
    };
  }
}