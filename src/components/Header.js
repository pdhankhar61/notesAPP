import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { Container, Box, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },

  menuButton: {
    marginRight: theme.spacing(2)
  }
}));

function Header({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <Box pt={2} pb={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: {
                    md: "space-between",
                    xs: "center",
                    sm: "space-between",
                    lg: "space-between"
                  }
                }}
              >

                <Typography
                  variant="h6"
                  color="primary"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  Messaging Affinity <KeyboardArrowDownIcon />
                </Typography>
                {children}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default Header;
