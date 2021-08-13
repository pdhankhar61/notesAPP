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
  // button: {
  //   backgroundColor: "#000",
  //   color: "#fff"
  // }
}));

function Header() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="100%">
        <Box pt={2} pb={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={8}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: {
                    md: "flex-start",
                    xs: "center",
                    sm: "center",
                    lg: "flex-start"
                  }
                }}
              >
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  color="primary"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  Messaging Affinity <KeyboardArrowDownIcon />
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { sm: "center", xs: "center", lg: "flex-end" }
                }}
              >
                <Button
                  variant="contained"
                  style={{ marginRight: "8px" }}
                  color="primary"
                >
                  Group Highlights
                </Button>
                <Button variant="contained" color="primary">
                  Dot Voting
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default Header;
