import React from 'react';
import MySelect from './UI/select/MySelect';
import MyInput from './UI/input/MyInput';

const selectOptions = [
  { value: 'title', name: 'По заголовку' },
  { value: 'body', name: 'По содержимому' },
];

export default function PostFilter({ filter, setFilter }) {
  return (
    <div>
      <MyInput
        placeholder="Поиск..."
        value={filter.query}
        onChange={e => setFilter({ ...filter, query: e.target.value })}
      />
      <MySelect
        value={filter.sort}
        onChange={selectedSort => setFilter({ ...filter, sort: selectedSort })}
        options={selectOptions}
        defaultValue="Сортировка по"
      />
    </div>
  );
}
