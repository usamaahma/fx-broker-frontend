import './App.css';
import Navbar from './components/navbar/navbar';
import AppRouter from './routes';

function App() {
  return (
    <div className="App">
      <Navbar />
      <AppRouter />
    </div>
  );
}

export default App;
