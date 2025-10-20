import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Dropdown from "./Dropdown";

export interface ModelData {
  id?: number;
  title: string;
  dueDate: string;
  status?: "Done" | "Pending";
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  initialValues?: ModelData;
  onSubmit: (data: ModelData) => void;
}

const Modal = ({
  isOpen,
  onClose,
  mode,
  initialValues,
  onSubmit,
}: ModalProps) => {
  const [formData, setFormData] = useState<ModelData>({
    title: "",
    dueDate: "",
    status: "Pending",
  });

  useEffect(() => {
    if (initialValues) {
      setFormData({
        title: initialValues.title,
        dueDate: initialValues.dueDate,
        status: initialValues.status || "Pending",
        id: initialValues.id,
      });
    } else {
      setFormData({ title: "", dueDate: "", status: "Pending" });
    }
  }, [initialValues, isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 w-full h-full">
      <div className="bg-white rounded-xl shadow-lg w-11/12 max-w-lg p-10 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-10">
          {mode === "add" ? "Add Task" : "Edit Task"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter task title"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <Dropdown
            label="Status"
            value={formData.status || "Pending"}
            onChange={(val) => setFormData({ ...formData, status: val })}
            options={["Pending", "Done"]}
          />

          <div className="flex justify-end gap-4 mt-10">
            <button
              type="button"
              className="px-6 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700"
            >
              {mode === "add" ? "Add Task" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
