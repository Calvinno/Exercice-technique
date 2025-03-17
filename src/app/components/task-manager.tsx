import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../components/ui/table";
import { Checkbox } from "../components/ui/checkbox";
import { Trash } from "lucide-react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
}

type FilterType = "all" | "completed" | "incomplete";

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title: newTask,
          completed: false,
          createdAt: new Date(),
        },
      ]);
      setNewTask("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: number, title: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, title } : task)));
  };

  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case "completed":
        return task.completed;
      case "incomplete":
        return !task.completed;
      default:
        return true;
    }
  });

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

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

      <Card>
        <CardContent>
          {tasks.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead width="10%">Statut</TableHead>
                    <TableHead width="45%">Titre</TableHead>
                    <TableHead width="30%">Date de création</TableHead>
                    <TableHead width="15%">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => toggleTask(task.id)}
                          aria-label={`Marquer la tâche ${
                            task.completed ? "non terminée" : "terminée"
                          }`}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={task.title}
                          onChange={(e) => updateTask(task.id, e.target.value)}
                          aria-label="Modifier le titre de la tâche"
                        />
                      </TableCell>
                      <TableCell>{formatDate(task.createdAt)}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => deleteTask(task.id)}
                          aria-label="Supprimer la tâche"
                        >
                          <Trash size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              Aucune tâche à afficher. Ajoutez-en une!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
