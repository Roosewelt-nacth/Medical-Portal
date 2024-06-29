import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './frontend/Home';
import Login from './frontend/Login';
import Register from './frontend/Register';
import View from './frontend/View';
import Chat from './frontend/chat';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="view" element={<View />} />
        <Route path="chat" element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
  );
}



// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);






// if (!root.hasOwnProperty('_fiber')) {
//   root.render(<App />);
// } else {
//   // If the root has already been rendered, update it using render()
//   root.render(<App />);
// }
// ReactDOM.render(<App />, document.getElementById('root')); // Render the App component
// export default App;