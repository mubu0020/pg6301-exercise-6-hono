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

    async function handleCompleted(taskId, completed) {
        await fetch(`/api/tasks/${taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed }),
        });

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
                {tasks.map((t) => (
                    <li key={t.id}>
                        <input
                            type="checkbox"
                            checked={t.completed}
                            onChange={(e) =>
                                handleCompleted(t.id, e.target.checked)
                            }
                        />
                        {t.description}
                    </li>
                ))}
            </ul>
        </>
    );
}
