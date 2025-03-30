import React, { useState } from "react";
import Todos from "../components/Todos";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Todos openModal={() => setShowModal(true)} />
    </>
  );
};

export default Home;
