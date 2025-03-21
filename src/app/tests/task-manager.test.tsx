import { renderHook, act } from "@testing-library/react";
import { useTaskManager } from "../components/task-manager-hook";

describe("useTaskManager", () => {
  it("should initialize with empty tasks", () => {
    const { result } = renderHook(() => useTaskManager());
    expect(result.current.tasks).toEqual([]);
    expect(result.current.newTask).toBe("");
    expect(result.current.filter).toBe("all");
    expect(result.current.filteredTasks).toEqual([]);
  });

  it("should add a new task", () => {
    const { result } = renderHook(() => useTaskManager());
    act(() => {
      result.current.setNewTask("Nouvelle tâche");
    });
    expect(result.current.newTask).toBe("Nouvelle tâche");
    act(() => {
      result.current.addTask();
    });
    expect(result.current.tasks.length).toBe(1);
    expect(result.current.tasks[0].title).toBe("Nouvelle tâche");
    expect(result.current.tasks[0].completed).toBe(false);
    expect(result.current.newTask).toBe("");
  });

  it("should not add empty tasks", () => {
    const { result } = renderHook(() => useTaskManager());
    act(() => {
      result.current.setNewTask("   ");
      result.current.addTask();
    });
    expect(result.current.tasks.length).toBe(0);
  });

  it("should toggle task completion status", () => {
    const { result } = renderHook(() => useTaskManager());
    act(() => {
      result.current.setNewTask("Tâche à basculer");
    });
    act(() => {
      result.current.addTask();
    });
    const taskId = result.current.tasks[0].id;
    act(() => {
      result.current.toggleTask(taskId);
    });
    expect(result.current.tasks[0].completed).toBe(true);
    act(() => {
      result.current.toggleTask(taskId);
    });
    expect(result.current.tasks[0].completed).toBe(false);
  });

  it("should delete a task", () => {
    const { result } = renderHook(() => useTaskManager());
    act(() => {
      result.current.setNewTask("Tâche 1");
    });
    act(() => {
      result.current.addTask();
    });
    setTimeout(() => {
      act(() => {
        result.current.setNewTask("Tâche 2");
      });
      act(() => {
        result.current.addTask();
      });
      expect(result.current.tasks.length).toBe(2);
      const taskIdToDelete = result.current.tasks[0].id;
      act(() => {
        result.current.deleteTask(taskIdToDelete);
      });
      expect(result.current.tasks.length).toBe(1);
      expect(result.current.tasks[0].title).toBe("Tâche 2");
    }, 200);
  });

  it("should update task title", () => {
    const { result } = renderHook(() => useTaskManager());
    act(() => {
      result.current.setNewTask("Tâche initiale");
      result.current.addTask();
    });
    act(() => {
      result.current.addTask();
    });
    const taskId = result.current.tasks[0].id;
    act(() => {
      result.current.updateTask(taskId, "Tâche modifiée");
    });
    expect(result.current.tasks[0].title).toBe("Tâche modifiée");
  });

  it("should filter completed tasks", () => {
    const { result } = renderHook(() => useTaskManager());
    act(() => {
      result.current.setNewTask("Tâche incomplète");
    });
    act(() => {
      result.current.addTask();
    });
    setTimeout(() => {
      act(() => {
        result.current.setNewTask("Tâche complète");
      });
      act(() => {
        result.current.addTask();
      });
      const completeTaskId = result.current.tasks[1].id;
      act(() => {
        result.current.toggleTask(completeTaskId);
      });
      act(() => {
        result.current.setFilter("completed");
      });
      expect(result.current.filteredTasks.length).toBe(1);
      expect(result.current.filteredTasks[0].title).toBe("Tâche complète");
      act(() => {
        result.current.setFilter("incomplete");
      });
      expect(result.current.filteredTasks.length).toBe(1);
      expect(result.current.filteredTasks[0].title).toBe("Tâche incomplète");
      act(() => {
        result.current.setFilter("all");
      });
      expect(result.current.filteredTasks.length).toBe(2);
    }, 200);
  });

  it("should handle key press", () => {
    const { result } = renderHook(() => useTaskManager());
    act(() => {
      result.current.setNewTask("Tâche par touche Entrée");
    });
    act(() => {
      const enterKeyEvent = { key: "Enter" } as React.KeyboardEvent;
      result.current.handleKeyPress(enterKeyEvent);
    });
    expect(result.current.tasks.length).toBe(1);
    expect(result.current.tasks[0].title).toBe("Tâche par touche Entrée");
    act(() => {
      result.current.setNewTask("Tâche non ajoutée");
      const otherKeyEvent = { key: "Tab" } as React.KeyboardEvent;
      result.current.handleKeyPress(otherKeyEvent);
    });
    expect(result.current.tasks.length).toBe(1);
    expect(result.current.newTask).toBe("Tâche non ajoutée");
  });

  it("should format date correctly", () => {
    const { result } = renderHook(() => useTaskManager());
    const testDate = new Date(2023, 0, 15);
    const formattedDate = result.current.formatDate(testDate);
    expect(formattedDate).toBe("15/01/2023");
  });
});
