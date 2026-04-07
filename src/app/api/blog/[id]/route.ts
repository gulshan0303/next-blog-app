import { blogController } from '../../../../modules/blog/blog.controller';



export async function GET(req: Request,context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; 

  return blogController.getById(id);
}

export async function PUT(req: Request,context: { params: Promise<{ id: string }> }) {
     const { id } = await context.params; 
    return blogController.update(req, id);
}

export async function DELETE(
  req: Request,context: { params: Promise<{ id: string }> },
) {
   const {id} = await context.params; 
  return blogController.delete(id);
}