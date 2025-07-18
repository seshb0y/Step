"use client";
import { handleSubmit } from "../actions";

export default function Page() {
  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const result = await handleSubmit(formData);
    alert(result);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Имя"
          required
          className="border p-2"
        />
        <input
          type="number"
          name="rate"
          placeholder="Рейтинг"
          required
          className="border p-2"
        />
        <textarea
          name="comment"
          placeholder="комментарий"
          required
          className="border p-2"
        />
        <button>Отправить</button>
      </form>
    </div>
  );
}
