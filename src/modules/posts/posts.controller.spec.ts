import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { NotFoundException } from '@nestjs/common';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  const mockPostsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: mockPostsService,
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      const mockPosts = [
        {
          id: '1',
          slug: 'test-post-1',
          title: 'Test Post 1',
          summary: 'Summary 1',
          content: 'Content 1',
          author: 'Author 1',
          publishDate: '2024-12-27',
          category: 'Tech',
          imageUrl: 'https://example.com/image1.jpg',
        },
      ];

      mockPostsService.findAll.mockResolvedValue(mockPosts);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockPosts);
    });
  });

  describe('findOne', () => {
    it('should return a single post', async () => {
      const mockPost = {
        id: '1',
        slug: 'test-post',
        title: 'Test Post',
        summary: 'Test Summary',
        content: 'Test Content',
        author: 'Test Author',
        publishDate: '2024-12-27',
        category: 'Tech',
        imageUrl: 'https://example.com/image.jpg',
      };

      mockPostsService.findOne.mockResolvedValue(mockPost);

      const result = await controller.findOne('test-post');

      expect(service.findOne).toHaveBeenCalledWith('test-post');
      expect(result).toEqual(mockPost);
    });

    it('should throw NotFoundException when post does not exist', async () => {
      mockPostsService.findOne.mockRejectedValue(
        new NotFoundException('Artigo com slug "non-existent" não encontrado'),
      );

      await expect(controller.findOne('non-existent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
