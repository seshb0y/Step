
import prisma from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const taskId = parseInt(params.id);

    await prisma.task.delete({
      where: { id: taskId }
    });

    return Response.json({ message: 'Task deleted successfully' });
  } catch (error) {
    return Response.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
} 