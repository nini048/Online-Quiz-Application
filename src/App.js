

import './App.scss';
import Header from './components/Header/Header';
import { Outlet, Link } from 'react-router-dom';



const App = () => {
  return (
    <div className="app-container">
      <div className='header-container'>
        <Header />
      </div>
      <div class="main-container">
        <div class="sidenav-container">

        </div>
        <div class="app-container">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}
export default App;
