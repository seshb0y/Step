import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const task1 = await prisma.task.create({
        data:{
            title: 'Task 1',
            priority: 'LOW',
        }
    })
    const task2 = await prisma.task.create({
        data:{
            title: 'Task 2',
            priority: 'MEDIUM',
        }
    })
    const task3 = await prisma.task.create({
        data:{
            title: 'Task 3',
            priority: 'HIGH',
        }
    })
    const task4 = await prisma.task.create({
        data:{
            title: 'Task 4',
            priority: 'LOW',
        }
    })
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})