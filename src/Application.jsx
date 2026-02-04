import { useState } from "react";

export function Application() {
    const [tasks] = useState([
        { description: "Create project", completed: true },
        { description: "Create React webapp", completed: false },
        { description: "Create Hono backend", completed: false },
    ]);

    return (
        <>
            <h1>My Task Manager</h1>
            <ul>
                {tasks.map((t, index) => (
                    <li key={index}>{t.description}</li>
                ))}
            </ul>
        </>
    );
}
