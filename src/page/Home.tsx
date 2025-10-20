import { useState, useEffect } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import Table from "../components/Table";
import Card from "../components/Card";
import { CheckCircle, Clock, ListTodo, Plus } from "lucide-react";
import Modal, { type ModelData } from "../components/Model";
import { addTask, deleteTask, getTasks, updateTask } from "../utils/mockApi";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  status: "Done" | "Pending";
}

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<ModelData | undefined>(
    undefined
  );

  useEffect(() => {
    getTasks().then((data: any) => {
      setTasks(data);
    });
  }, []);

  const handleAdd = () => {
    setEditingTask(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    const updated = await getTasks();
    setTasks(updated);
  };

  const handleSubmit = async (data: ModelData) => {
    if (data.id) {
      await updateTask(data);
    } else {
      await addTask({ ...data, status: data.status || "Pending" });
    }
    const updated = await getTasks();
    setTasks(updated);
    setIsModalOpen(false);
  };

  return (
    <div className="my-12 space-y-10 w-auto sm:max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Header
          title="Task Tracker"
          subtitle="List all your tasks and track them easily."
        />
        <Button
          label="Add Task"
          icon={<Plus size={16} />}
          onClick={handleAdd}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title="Total"
          count={tasks.length}
          color="text-teal-600"
          icon={<ListTodo />}
        />
        <Card
          title="Pending"
          count={tasks.filter((t) => t.status === "Pending").length}
          color="text-yellow-600"
          icon={<Clock />}
        />
        <Card
          title="Done"
          count={tasks.filter((t) => t.status === "Done").length}
          color="text-gray-600"
          icon={<CheckCircle />}
        />
      </div>

      <Table tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={editingTask ? "edit" : "add"}
        initialValues={editingTask}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Home;
