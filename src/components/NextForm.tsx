"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type FormValues = {
  name: string;
  email: string;
};

export const NextForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  // State to store all submitted entries
  const [entries, setEntries] = useState<FormValues[]>([]);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editData, setEditData] = useState<FormValues>({ name: "", email: "" });

  const onSubmit = async (data: FormValues) => {
    setEntries((prev) => [...prev, data]);
    reset(); // Clear form after submit

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(entries),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        window.alert("User has been created");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Handler to delete an entry by index
  const handleDelete = (idx: number) => {
    setEntries((prev) => prev.filter((_, i) => i !== idx));
  };

  // Start editing
  const handleEdit = (idx: number) => {
    setEditIdx(idx);
    setEditData(entries[idx]);
  };

  // Save edit
  const handleSave = () => {
    setEntries((prev) =>
      prev.map((entry, idx) => (idx === editIdx ? editData : entry))
    );
    setEditIdx(null);
    setEditData({ name: "", email: "" });
  };

  // Cancel edit
  const handleCancel = () => {
    setEditIdx(null);
    setEditData({ name: "", email: "" });
  };

  return (
    <div className="flex gap-8">
      {/* Form Section */}
      <div className="w-1/2">
        <form
          className="grid grid-cols-1 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Input
              type="text"
              placeholder="Your full name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <div className="mt-2 text-red-500">{errors.name.message}</div>
            )}
          </div>
          <div>
            <Input
              type="email"
              placeholder="Your e-mail"
              {...register("email", { required: "E-mail is required" })}
            />
            {errors.email && (
              <div className="mt-2 text-red-500">{errors.email.message}</div>
            )}
          </div>
          <div>
            <Button variant="outline" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>

      {/* List Section */}
      <div className="w-1/2">
        <ul className="space-y-2">
          {entries.map((entry, idx) => (
            <li
              key={idx}
              className="border p-4 rounded flex justify-between items-center"
            >
              {editIdx === idx ? (
                <div className="flex-1 flex flex-col gap-2">
                  <input
                    className="border rounded px-2 py-1"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    placeholder="Name"
                  />
                  <input
                    className="border rounded px-2 py-1"
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                    placeholder="Email"
                  />
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <div>
                      <strong>Name:</strong> {entry.name}
                    </div>
                    <div>
                      <strong>Email:</strong> {entry.email}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="default"
                      type="button"
                      onClick={() => handleEdit(idx)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      type="button"
                      onClick={() => handleDelete(idx)}
                    >
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
