import './HomePage.css';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Resume from '../components/Resume';
import PdfComponent from '../components/PdfComponent';
import { Provider } from 'react-redux';
import { store } from '../state/store';

function HomePage() {
  return (
      <Provider store={store}>
        <Container fluid className="bg-white p-0">
          {/* <Navigation></Navigation> */}
          <Routes>
            <Route exact path="/" element={<Resume />}></Route>
            <Route exact path="/preview" element={<PdfComponent />}></Route>
          </Routes>
          <Footer></Footer>
        </Container>
      </Provider>
  );
}

export default HomePage;