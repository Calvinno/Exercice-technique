import React from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { TaskList } from "./task-list";
import { useTaskManager, FilterType } from "./task-manager-hooks";

export default function TaskManager() {
  const {
    newTask,
    filter,
    filteredTasks,
    setNewTask,
    setFilter,
    addTask,
    handleKeyPress,
    toggleTask,
    deleteTask,
    updateTask,
    formatDate,
  } = useTaskManager();

  return (
    <div className="p-6 max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Gestion des tâches</h1>
      <div className="flex gap-2 mb-4">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Nouvelle tâche"
          aria-label="Entrer une nouvelle tâche"
        />
        <Button onClick={addTask}>Ajouter</Button>
      </div>

      <div className="flex gap-2 mb-4">
        {[
          { value: "all", label: "Toutes" },
          { value: "completed", label: "Terminées" },
          { value: "incomplete", label: "Non Terminées" },
        ].map((option) => (
          <Button
            key={option.value}
            variant={filter === option.value ? "default" : "outline"}
            onClick={() => setFilter(option.value as FilterType)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      <TaskList
        tasks={filteredTasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        updateTask={updateTask}
        formatDate={formatDate}
      />
    </div>
  );
}
