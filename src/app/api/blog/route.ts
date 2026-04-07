import { blogController } from '../../../modules/blog/blog.controller';

export async function POST(req: Request) {
  return blogController.create(req);
}

export async function GET(req: Request) {
  return blogController.getAll(req);
}