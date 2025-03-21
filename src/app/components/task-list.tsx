import React from "react";
import { Task } from "../interfaces/task";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../components/ui/table";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Trash } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

interface TaskListProps {
  tasks: Task[];
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  updateTask: (id: number, title: string) => void;
  formatDate: (date: Date) => string;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  toggleTask,
  deleteTask,
  updateTask,
  formatDate,
}) => {
  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent>
          <div className="text-center py-6 text-gray-500">
            Aucune tâche à afficher. Ajoutez-en une!
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
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
              {tasks.map((task) => (
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
      </CardContent>
    </Card>
  );
};
