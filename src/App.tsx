import { BrowserRouter, Routes, Route } from "react-router-dom";
import ComingSoon from "./pages/ComingSoon";
import { CustomCursor } from "./components/CustomCursor";

const App = () => (
  <BrowserRouter>
    <CustomCursor />
    <Routes>
      <Route path="*" element={<ComingSoon />} />
    </Routes>
  </BrowserRouter>
);

export default App;
