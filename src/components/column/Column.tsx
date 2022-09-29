import React from 'react';

const Column = (props: { column: [] }) => {
  return (
    <nav className="board-columns text-lg  overflow-auto p-5">
      <div className="column bg-stone-300 p-5 rounded-lg">
        <header className="mb-2 px-3">BrainStorm</header>
        <ul>
          <li className="bg-stone-200 px-3 py-2 rounded-lg">
            test
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Column;