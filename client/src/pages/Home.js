import React, { useState } from "react";
import Todos from "../components/Todos";
import CreateModal from "../components/Modals/CreateModal";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <CreateModal onClose={() => setShowModal(false)} />}
      <Todos openModal={() => setShowModal(true)} />
    </>
  );
};

export default Home;
