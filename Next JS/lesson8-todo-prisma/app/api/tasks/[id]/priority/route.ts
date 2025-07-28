
import prisma from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { priority } = await request.json();
    const taskId = parseInt(params.id);

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { priority }
    });

    return Response.json(updatedTask);
  } catch (error) {
    return Response.json(
      { error: 'Failed to update task priority' },
      { status: 500 }
    );
  }
} 