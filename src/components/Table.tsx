import { useMemo, useState } from "react";
import { Trash2, SquarePen } from "lucide-react";
import { useDebounce } from "../hook/useDebounce";
import Dropdown from "./Dropdown";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  status: "Done" | "Pending";
}

interface TableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => Promise<void>;
}

const Table = ({ tasks, onEdit, onDelete }: TableProps) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Pending" | "Done">(
    "All"
);

  const [sortKey, setSortKey] = useState<"Title" | "DueDate">("Title");

  const debouncedSearch = useDebounce(search, 100);

  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    if (debouncedSearch.trim() !== "") {
      filtered = filtered.filter((t) =>
        t.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter((t) => t.status === statusFilter);
    }

    filtered.sort((a, b) => {
      if (sortKey === "Title") {
        return a.title.localeCompare(b.title);
      } else {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
    });

    return filtered;
  }, [tasks, debouncedSearch, statusFilter, sortKey]);

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="sm:flex-[2]">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="sm:flex-1">
          <Dropdown
            value={statusFilter}
            onChange={setStatusFilter}
            options={["All", "Pending", "Done"]}
          />
        </div>

        <div className="sm:flex-1">
          <Dropdown
            value={sortKey}
            onChange={setSortKey}
            options={["Title", "DueDate"]}
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-sm border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Task
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTasks.map((task) => (
              <tr key={task.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 text-sm font-medium text-slate-800">
                  {task.title}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {task.dueDate}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      task.status === "Done"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3 text-slate-500">
                    <button
                      className="hover:text-teal-700 transition text-teal-600"
                      onClick={() => onEdit(task)}
                    >
                      <SquarePen size={15} />
                    </button>
                    <button
                      className="hover:text-rose-700 transition text-rose-600"
                      onClick={() => onDelete(task.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredTasks.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
