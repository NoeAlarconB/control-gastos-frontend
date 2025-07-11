import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/authRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
  </Router>
  );
}

export default App;
