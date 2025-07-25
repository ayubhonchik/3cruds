import React, { useState } from 'react';

interface Item {
  id: number;
  title: string;
  desc: string;
}

const UseStatePage: React.FC = () => {
  const [form, setForm] = useState({ title: '', desc: '' });
  const [items, setItems] = useState<Item[]>([]);
  const [edit, setEdit] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (edit !== null) {
      setItems(items.map(i => (i.id === edit ? { ...i, ...form } : i)));
      setEdit(null);
    } else {
      setItems([...items, { id: Date.now(), ...form }]);
    }
    setForm({ title: '', desc: '' });
  };

  const handleEdit = (item: Item) => {
    setForm({ title: item.title, desc: item.desc });
    setEdit(item.id);
  };

  const handleDelete = (id: number) => {
    setItems(items.filter(i => i.id !== id));
    if (edit === id) {
      setEdit(null);
      setForm({ title: '', desc: '' });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">useState</h1>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-1 mr-2" />
      <input name="desc" value={form.desc} onChange={handleChange} placeholder="Desc" className="border p-1 mr-2" />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-3 py-1">
        {edit ? 'save' : 'submit'}
      </button>

      <ul className="mt-4">
        {items.map(item => (
          <li key={item.id} className="border-b py-1 flex justify-between">
            <span>{item.title} - {item.desc}</span>
            <span>
              <button onClick={() => handleEdit(item)} className="text-yellow-500 mr-2">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="text-red-500">Delete</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UseStatePage;
