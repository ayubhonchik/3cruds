import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import UseStatePage from './components/Usestate';
import UseRefPage from './components/Useref';
import UseFormPage from './components/UseForm';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route  path="/use-state" element={<UseStatePage />} />
        <Route path="/use-ref" element={<UseRefPage />} />
        <Route path="/use-form" element={<UseFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
