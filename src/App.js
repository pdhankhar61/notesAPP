import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import { Container, Box, CssBaseline, ThemeProvider } from "@material-ui/core";
import { createCustomTheme } from "./theme";
import { Toaster } from "react-hot-toast";
function App() {
  const theme = createCustomTheme({
    responsiveFontSizes: true,
    roundedCorners: true,
    theme: "LIGHT"
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-center" />
      <div className="App">
        <Header></Header>
        <Container maxWidth="lg">
          <Box m={2}>
            <Home />
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
