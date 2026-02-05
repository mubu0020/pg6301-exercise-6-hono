import { useEffect, useState } from "react";

export function Application() {
    const [tasks, setTasks] = useState([]);
    const [description, setDescription] = useState("");

    async function loadTasks() {
        const res = await fetch("/api/tasks");
        setTasks(await res.json());
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!description.trim()) return;

        await fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ description, completed: false }),
        });

        setDescription("");
        loadTasks();
    }

    useEffect(() => {
        loadTasks();
    }, []);

    return (
        <>
            <h1>My Task Manager</h1>

            <form onSubmit={handleSubmit}>
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button>Add</button>
            </form>

            <ul>
                {tasks.map((t, index) => (
                    <li key={index}>{t.description}</li>
                ))}
            </ul>
        </>
    );
}
