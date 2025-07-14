"use client";
import getUsers from "@/lib/users";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Users = () => {
  const [users, setUsers] = useState([""]);

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  return (
    <div>
      {users.map((user) => (
        <li key={user}>
          {user}
          <Link href={`/users/${user}`}>подробнее</Link>
        </li>
      ))}
    </div>
  );
};

export default Users;
