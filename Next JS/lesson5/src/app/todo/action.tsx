"use server";

const TODOS = [
    {id:1, title:'Learn Next.js'},
    {id:2, title:'Write code'},
];

export async function getTodos() {
    return TODOS;
}

export async function addTodo(data: FormData) {
  const title = data.get("title") as string;
  if (!title) {
    return;
  }
  TODOS.push({id:Date.now(), title});

}
