import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('PostsService', () => {
  let service: PostsService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    posts: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    prismaService = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of posts with correct format', async () => {
      const mockPosts = [
        {
          id: 1,
          slug: 'test-post-1',
          title: 'Test Post 1',
          summary: 'Summary 1',
          content: 'Content 1',
          author: 'Author 1',
          publish_date: '2024-12-27',
          category: 'Tech',
          image_url: 'https://example.com/image1.jpg',
        },
        {
          id: 2,
          slug: 'test-post-2',
          title: 'Test Post 2',
          summary: 'Summary 2',
          content: 'Content 2',
          author: 'Author 2',
          publish_date: '2024-12-28',
          category: 'News',
          image_url: 'https://example.com/image2.jpg',
        },
      ];

      mockPrismaService.posts.findMany.mockResolvedValue(mockPosts);

      const result = await service.findAll();

      expect(mockPrismaService.posts.findMany).toHaveBeenCalledWith({
        orderBy: {
          publish_date: 'desc',
        },
      });

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: '1',
        slug: 'test-post-1',
        title: 'Test Post 1',
        summary: 'Summary 1',
        content: 'Content 1',
        author: 'Author 1',
        publishDate: '2024-12-27',
        category: 'Tech',
        imageUrl: 'https://example.com/image1.jpg',
      });
      expect(result[1]).toEqual({
        id: '2',
        slug: 'test-post-2',
        title: 'Test Post 2',
        summary: 'Summary 2',
        content: 'Content 2',
        author: 'Author 2',
        publishDate: '2024-12-28',
        category: 'News',
        imageUrl: 'https://example.com/image2.jpg',
      });
    });

    it('should return empty array when no posts exist', async () => {
      mockPrismaService.posts.findMany.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a post with correct format', async () => {
      const mockPost = {
        id: 1,
        slug: 'test-post',
        title: 'Test Post',
        summary: 'Test Summary',
        content: 'Test Content',
        author: 'Test Author',
        publish_date: '2024-12-27',
        category: 'Tech',
        image_url: 'https://example.com/image.jpg',
      };

      mockPrismaService.posts.findUnique.mockResolvedValue(mockPost);

      const result = await service.findOne('test-post');

      expect(mockPrismaService.posts.findUnique).toHaveBeenCalledWith({
        where: { slug: 'test-post' },
      });

      expect(result).toEqual({
        id: '1',
        slug: 'test-post',
        title: 'Test Post',
        summary: 'Test Summary',
        content: 'Test Content',
        author: 'Test Author',
        publishDate: '2024-12-27',
        category: 'Tech',
        imageUrl: 'https://example.com/image.jpg',
      });
    });

    it('should throw NotFoundException when post does not exist', async () => {
      mockPrismaService.posts.findUnique.mockResolvedValue(null);

      await expect(service.findOne('non-existent-slug')).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.findOne('non-existent-slug')).rejects.toThrow(
        'Artigo com slug "non-existent-slug" não encontrado',
      );
    });
  });
});
