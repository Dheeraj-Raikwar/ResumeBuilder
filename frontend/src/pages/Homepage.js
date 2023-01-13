import './homePage.css';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navigation from '../components/Navigation';
import Editor from '../components/Editor';
import Preview from './Preview';
import { Provider } from 'react-redux';
import { store } from '../state/store';
import Footer from '../components/Footer';

// HomePage component
function HomePage() {
  return (
      <Provider store={store}>
        <Container fluid className="bg-white p-0">
          <Navigation></Navigation>
          <br></br>
          <Routes>
            <Route path="/" element={<Editor />}></Route>
            <Route path="/preview" element={<Preview />}></Route>
          </Routes>
          <Footer></Footer>
        </Container>
      </Provider>
  );
}

export default HomePage;