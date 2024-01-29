import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import {NextUIProvider} from "@nextui-org/react"
import NavigationBar from './components/NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <NextUIProvider>
      <NavigationBar />
    </NextUIProvider>
  );
}

export default App;
