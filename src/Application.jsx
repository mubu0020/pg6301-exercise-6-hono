import { useEffect, useState } from "react";

export function Application() {
    const [tasks, setTasks] = useState([]);

    async function loadTasks() {
        const res = await fetch("/api/tasks");
        setTasks(await res.json());
    }

    useEffect(() => {
        loadTasks();
    }, []);

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
