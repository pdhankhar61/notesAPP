import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import { Container, Box, CssBaseline, ThemeProvider } from "@material-ui/core";
import { createCustomTheme } from "./theme";
import { Toaster } from "react-hot-toast";
import DarkModeSwitch from "./components/DarkModeSwitch.js/DarkModeSwitch";

function App() {
  const [dark, setDark] = useState(false);
  // useEffect(() => {
  //   if (JSON.parse(localStorage.getItem("DarkMode")) !== null) {
  //     setDark(JSON.parse(localStorage.getItem("DarkMode")));
  //   }
  // }, []);

  const theme = createCustomTheme({
    responsiveFontSizes: true,
    roundedCorners: true,
    theme: dark ? "DARK" : "LIGHT"
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-center" />
      <div className="App">
        <Header>
          <DarkModeSwitch setDark={setDark} />
        </Header>
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
