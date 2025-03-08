interface User {
  id: number;
  name: string;
  email: string;
}

export default async function Home() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", { cache: "no-store" });
  const users: User[] =  await res.json();
  return (
      <main>
        <h1>Home Page</h1>
        <p>{new Date().toLocaleTimeString()}</p>
        <ul>
          {users.map((user: User) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </main>
  );
}
