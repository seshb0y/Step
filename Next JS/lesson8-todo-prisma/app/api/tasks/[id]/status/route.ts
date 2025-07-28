
import prisma from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { isCompleted } = await request.json();
    const taskId = parseInt(params.id);

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { isCompleted }
    });

    return Response.json(updatedTask);
  } catch (error) {
    return Response.json(
      { error: 'Failed to update task status' },
      { status: 500 }
    );
  }
} 