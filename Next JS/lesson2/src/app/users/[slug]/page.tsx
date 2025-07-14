import getUsers from "@/lib/users";

export default function UserPage({ params }: { params: { slug: string } }) {
  const users = getUsers();
  const user = users.find((u) => u === params.slug);

  if (!user) {
    return <div>Пользователь не найден</div>;
  }

  return (
    <div>
      <h1>Пользователь: {user}</h1>
    </div>
  );
}
