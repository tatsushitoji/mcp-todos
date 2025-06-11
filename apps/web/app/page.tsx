"use client";
import { useChat } from "@ai-sdk/react";
import { useQuery } from "@tanstack/react-query";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const getTodos = async () => {
  const res = await fetch("http://localhost:8787/todos");
  return res.json();
};

export default function Home() {
  const query = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  }) as { data: Todo[] | undefined };

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    experimental_throttle: 50,
  });

  return (
    <div>
      {query.data?.map((todo) => (
        <div
          key={todo.id}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <input type="checkbox" checked={todo.completed} readOnly />
          <span>{todo.title}</span>
          <span style={{ color: "#888", fontSize: 12 }}>id: {todo.id}</span>
        </div>
      ))}
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" value={input} onChange={handleInputChange} />
          <button type="submit">send</button>
        </form>
        {messages.map((message) => (
          <div key={message.id}>{message.content}</div>
        ))}
      </div>
    </div>
  );
}
