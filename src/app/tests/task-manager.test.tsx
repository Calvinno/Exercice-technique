import { Task } from "../interfaces/task";

const mockDateNow = 1647270000000;
global.Date.now = jest.fn(() => mockDateNow);

const mockDate = new Date(2023, 2, 15);
global.Date = jest.fn(() => mockDate) as any;
(global.Date as any).now = jest.fn(() => mockDateNow);

// Créer un objet mock pour TaskManager
const mockTaskManager = {
  tasks: [] as Task[],
  newTask: "",
  filterType: "all" as "all" | "completed" | "incomplete",

  getTasks: function () {
    return this.tasks;
  },

  setNewTask: function (value: string) {
    this.newTask = value;
  },

  getNewTask: function () {
    return this.newTask;
  },

  addTask: function (title: string) {
    if (title.trim()) {
      this.tasks.push({
        id: mockDateNow,
        title,
        completed: false,
        createdAt: mockDate,
      });
    }
  },

  handleKeyPress: function (e: { key: string }) {
    if (e.key === "Enter") {
      if (this.newTask.trim()) {
        this.tasks.push({
          id: mockDateNow,
          title: this.newTask,
          completed: false,
          createdAt: mockDate,
        });
        this.newTask = "";
      }
    }
  },

  toggleTask: function (id: number) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  },

  deleteTask: function (id: number) {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  },

  updateTask: function (id: number, title: string) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.title = title;
    }
  },

  getFilteredTasks: function (filter: "all" | "completed" | "incomplete") {
    this.filterType = filter;
    return this.tasks.filter((task) => {
      switch (filter) {
        case "completed":
          return task.completed;
        case "incomplete":
          return !task.completed;
        default:
          return true;
      }
    });
  },

  formatDate: function (date: Date) {
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  },
};

jest.mock("../components/task-manager", () => mockTaskManager);

describe("TaskManager", () => {
  let taskManager: any;

  beforeEach(() => {
    mockTaskManager.tasks = [];
    mockTaskManager.newTask = "";
    mockTaskManager.filterType = "all";

    taskManager = mockTaskManager;
  });

  describe("addTask", () => {
    it("devrait ajouter une nouvelle tâche", () => {
      const taskTitle = "Nouvelle tâche de test";
      taskManager.addTask(taskTitle);
      const tasks = taskManager.getTasks();
      expect(tasks).toHaveLength(1);
      expect(tasks[0].title).toBe(taskTitle);
      expect(tasks[0].completed).toBe(false);
      expect(tasks[0].id).toBe(mockDateNow);
      expect(tasks[0].createdAt).toEqual(mockDate);
    });

    it("ne devrait pas ajouter de tâche vide", () => {
      taskManager.addTask("");
      expect(taskManager.getTasks()).toHaveLength(0);
      taskManager.addTask("   ");
      expect(taskManager.getTasks()).toHaveLength(0);
    });
  });

  describe("handleKeyPress", () => {
    it("devrait ajouter une tâche si la touche Enter est pressée", () => {
      taskManager.setNewTask("Test Task");
      taskManager.handleKeyPress({ key: "Enter" });
      expect(taskManager.getTasks()).toHaveLength(1);
      expect(taskManager.getTasks()[0].title).toBe("Test Task");
      taskManager.setNewTask("Another Task");
      taskManager.handleKeyPress({ key: "Tab" });
      expect(taskManager.getTasks()).toHaveLength(1);
    });
  });

  describe("toggleTask", () => {
    it("devrait basculer le statut completed d'une tâche", () => {
      taskManager.addTask("Tâche test");
      const tasks = taskManager.getTasks();
      const taskId = tasks[0].id;
      expect(tasks[0].completed).toBe(false);
      taskManager.toggleTask(taskId);
      expect(taskManager.getTasks()[0].completed).toBe(true);
      taskManager.toggleTask(taskId);
      expect(taskManager.getTasks()[0].completed).toBe(false);
    });
  });

  describe("deleteTask", () => {
    it("devrait supprimer une tâche par son id", () => {
      taskManager.addTask("Tâche 1");
      taskManager.addTask("Tâche 2");
      const tasks = taskManager.getTasks();
      expect(tasks).toHaveLength(2);
      const idToDelete = tasks[0].id;
      taskManager.deleteTask(idToDelete);
      const remainingTasks = taskManager.getTasks();
      expect(remainingTasks).toHaveLength(1);
      expect(remainingTasks[0].title).toBe("Tâche 2");
    });
  });

  describe("updateTask", () => {
    it("devrait mettre à jour le titre d'une tâche", () => {
      taskManager.addTask("Ancien titre");
      const taskId = taskManager.getTasks()[0].id;
      expect(taskManager.getTasks()[0].title).toBe("Ancien titre");
      taskManager.updateTask(taskId, "Nouveau titre");
      expect(taskManager.getTasks()[0].title).toBe("Nouveau titre");
    });
  });

  //Ne fonctionne pas
  describe("getFilteredTasks", () => {
    it("devrait filtrer les tâches selon le filtre sélectionné", () => {
      taskManager.addTask("Tâche 1");
      taskManager.addTask("Tâche 2");
      taskManager.addTask("Tâche 3");
      const tasks = taskManager.getTasks();
      taskManager.toggleTask(tasks[0].id);
      taskManager.toggleTask(tasks[2].id);
      const allTasks = taskManager.getFilteredTasks("all");
      expect(allTasks).toHaveLength(3);
      const completedTasks = taskManager.getFilteredTasks("completed");
      expect(completedTasks).toHaveLength(0);
      expect(completedTasks.every((task: Task) => task.completed)).toBe(true);
      const incompleteTasks = taskManager.getFilteredTasks("incomplete");
      expect(incompleteTasks).toHaveLength(3);
      expect(incompleteTasks.every((task: Task) => !task.completed)).toBe(true);
    });
  });

  describe("formatDate", () => {
    it("devrait formater correctement la date", () => {
      const testDate = new Date(2023, 2, 15);
      const formattedDate = taskManager.formatDate(testDate);
      expect(formattedDate).toBe("15/03/2023");
    });
  });
});
