import React, { useState } from "react";
import Header from "../components/Header";
import Todos from "../components/Todos";
import CreateModal from "../components/CreateModal";
import "../App.css";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [createTodoFn, setCreateTodoFn] = useState(null);
  return (
    <>
      <Header openModal={() => setShowModal(true)} />
      <div className="pageContent">
        {showModal && createTodoFn && (
          <CreateModal
            closeModal={() => setShowModal(false)}
            onTodoCreated={createTodoFn}
          />
        )}
        <Todos passCreateTodo={(fn) => setCreateTodoFn(() => fn)} />
      </div>
    </>
  );
};

export default Home;
