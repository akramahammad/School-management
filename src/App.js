import classes from './App.scss';
import 'antd/dist/antd.css';
import {Route,Switch,BrowserRouter} from 'react-router-dom'
import BatchPage from './Containers/BatchPage/BatchPage';
import StatsPage from './Containers/StatsPage/StatsPage';
import Header from './Components/Header/Header'
import { StoreProvider } from './Context/store';
import FooterComp from './Components/Footer/Footer';


function App() {
  return (
    <div className={classes.App}>
      <StoreProvider>
      <BrowserRouter>
        <Route render={(props)=> <Header {...props}/>}/>
        <Switch>
          <Route exact path="/stats" component={StatsPage}/>
          <Route exact path="/" component={BatchPage}/>
        </Switch>
      </BrowserRouter>
      <FooterComp/>
      </StoreProvider>
    </div>

  );
}

export default App;

