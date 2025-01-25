import { Route, Routes } from "react-router-dom";
import ChatWindow from "./components/ChatWindow";

const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<ChatWindow />} />
        <Route path="*" element={<h2>Not Found</h2>} />
      </Routes>
    </>
  );
};

export default App;
