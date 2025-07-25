import React, { useRef, useState } from 'react';

interface Item {
  id: number;
  title: string;
  desc: string;
}

const UseRefPage: React.FC = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = () => {
    const title = titleRef.current?.value || '';
    const desc = descRef.current?.value || '';

    if (!title || !desc) return;

    if (editId !== null) {
      setItems(items.map(i => (i.id === editId ? { ...i, title, desc } : i)));
      setEditId(null);
    } else {
      setItems([...items, { id: Date.now(), title, desc }]);
    }

    titleRef.current!.value = '';
    descRef.current!.value = '';
  };

  const handleEdit = (item: Item) => {
    if (titleRef.current && descRef.current) {
      titleRef.current.value = item.title;
      descRef.current.value = item.desc;
      setEditId(item.id);
    }
  };

  const handleDelete = (id: number) => {
    setItems(items.filter(i => i.id !== id));
    if (editId === id) {
      setEditId(null);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">useRef</h1>
      <input ref={titleRef} placeholder="Title" className="border p-1 mr-2" />
      <input ref={descRef} placeholder="Desc" className="border p-1 mr-2" />
      <button onClick={handleSubmit} className="bg-green-600 text-white px-3 py-1">
        {editId ? 'save' : 'submit'}
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

export default UseRefPage;
