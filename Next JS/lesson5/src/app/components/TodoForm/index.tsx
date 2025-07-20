"use client";

import { addTodo } from "@/app/todo/action";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useToggle } from "@/app/hooks/useToggle";

const TodoForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { value: isOpen, toggle, on, off } = useToggle(false);
  async function action(FormData: FormData) {
    await addTodo(FormData);
    startTransition(() => router.refresh());
  }

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        className="bg-gray-300 px-2 py-1 mr-2"
      >
        {isOpen ? "Скрыть форму" : "Показать форму"}
      </button>
      {isOpen && (
        <form action={action}>
          <input type="text" name="title" className="border px-2 py-1" />
          <button type="submit" className="bg-blue-600 text-white px-4">
            {isPending ? "...." : "Добавить"}
          </button>
        </form>
      )}
    </>
  );
};

export default TodoForm;
