import { ThemeProvider } from "@mui/material/styles";
import theme from './ui/Theme'
import QuestionsApp from "./views/QuestionsApp";
import NotFound from "./views/NotFound";
import Store from '../store'
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom'


function App() {


  return (
    <ThemeProvider theme={theme}>
      <Store>
        <Router>
          <Routes>
            <Route path="/" element={<QuestionsApp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Store>
    </ThemeProvider>
  );
}

export default App;
