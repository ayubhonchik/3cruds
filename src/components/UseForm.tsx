import React, { useState } from 'react';

interface Item {
  id: number;
  title: string;
  desc: string;
}

const UseFormPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [edit, setEdit] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = form.get('title')?.toString() || '';
    const desc = form.get('desc')?.toString() || '';

    if (edit !== null) {
      setItems(items.map(i => (i.id === edit ? { ...i, title, desc } : i)));
      setEdit(null);
    } else {
      setItems([...items, { id: Date.now(), title, desc }]);
    }

    e.currentTarget.reset();
  };

  const handleEdit = (item: Item) => {
    const form = document.forms.namedItem('crud-form')!;
    (form.elements.namedItem('title') as HTMLInputElement).value = item.title;
    (form.elements.namedItem('desc') as HTMLInputElement).value = item.desc;
    setEdit(item.id);
  };

  const handleDelete = (id: number) => {
    setItems(items.filter(i => i.id !== id));
    if (edit === id) {
      setEdit(null);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">useForm</h1>
      <form onSubmit={handleSubmit} name="crud-form">
        <input name="title" placeholder="Title" className="border p-1 mr-2" />
        <input name="desc" placeholder="Desc" className="border p-1 mr-2" />
        <button type="submit" className="bg-purple-600 text-white px-3 py-1">
          {edit ? 'save' : 'submit'}
        </button>
      </form>

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

export default UseFormPage;
