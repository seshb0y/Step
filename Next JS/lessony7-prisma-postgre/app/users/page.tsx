import prisma from "../../lib/prisma";

export default async function UsersPage() {
  const users = await prisma.user.findMany();

  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Список пользователей</h1>
      <ul className="grid gap-6">
        {users.map((user) => (
          <li key={user.id} className="rounded-xl shadow bg-white p-6 border border-gray-100 flex flex-col gap-2">
            <strong className="text-lg text-blue-700">{user.name}</strong>
            <p className="text-gray-600">{user.email}</p>
            <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold w-fit">{user.role}</span>
            <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold w-fit">Объявлений: {user.announcementCount}</span>
          </li>
        ))}
      </ul>
    </main>
  );
} 