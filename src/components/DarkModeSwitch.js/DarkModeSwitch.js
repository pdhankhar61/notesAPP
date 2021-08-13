import { useState, useEffect } from "react";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function DarkModeSwitch(props) {
  const [checked, setChecked] = useState(false);

  const toggleChecked = () => {
    setChecked((prev) => {
      localStorage.setItem("DarkMode", !prev);
      props.setDark(!prev);
      return !prev;
    });
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("DarkMode")) !== null) {
      setChecked(JSON.parse(localStorage.getItem("DarkMode")));
      props.setDark(JSON.parse(localStorage.getItem("DarkMode")));
    }
  }, []);

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch color="primary" checked={checked} onChange={toggleChecked} />
        }
        label={checked ? "Switch to LightMode" : "Switch to DarkMode"}
      />
    </FormGroup>
  );
}
