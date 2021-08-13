import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Container,
  Button,
  CardContent,
  CardActions,
  CardActionArea,
  Card,
  Typography,
  Grid
} from "@material-ui/core";
import NoteModal from "./NoteComponents/NoteModal";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    borderRadius: 0
  },
  media: {
    height: 140
  }
});

function Home() {
  const [notes, setNotes] = useState([]);
  const [hide, setHide] = useState(false);
  const [found, setFound] = useState(false);

  useEffect(() => {
    // getting saved notes if any
    if (JSON.parse(localStorage.getItem("notes")) !== null) {
      setNotes(JSON.parse(localStorage.getItem("notes")));
      setFound(true);
    }
    setHide(true);
  }, []);

  const classes = useStyles();
  return (
    <div>
      {/* --------button to add Note/highlight------------------ */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Box sx={{ display: "flex", justifyContent: { xs: "flex-end" } }}>
            <NoteModal notes={notes} setNotes={setNotes} />
          </Box>
        </Grid>
        {/* ------------------button to add Note/highlight---ENDS-------- */}

        <Grid item lg={12} xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              width: "100%",
              flexWrap: "wrap"
            }}
          >
            <Typography hidden={hide} variant="h5" component="h2">
              Fetching...
            </Typography>
            {notes.length === 0 && (
              <Typography hidden={found} variant="h5" component="h2">
                No notes are found. Create a new.
              </Typography>
            )}
            {/* -----------------Data_-_-_Card--------------------- */}
            {notes.length > 0 &&
              notes.map((item, index) => (
                <Box
                  sx={{ minWidth: "320px", maxWidth: "320px" }}
                  key={index}
                  mr={1}
                  mt={1}
                >
                  <Card className={classes.root}>
                    <CardActionArea
                      style={{ backgroundColor: `${item.color}` }}
                    >
                      <CardContent style={{ textAlign: "left" }}>
                        <Typography variant="h5" component="h2">
                          {item.tag_name}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="textSecondary"
                          component="p"
                        >
                          {item.content}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {item.user}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <NoteModal
                        edit={true}
                        item={item}
                        setNotes={setNotes}
                        index={index}
                      />
                      <Button
                        size="small"
                        color="error"
                        onClick={() => {
                          setNotes((prev) => {
                            localStorage.setItem(
                              "notes",
                              JSON.stringify(
                                prev.filter((element) => element !== item)
                              )
                            );
                            return prev.filter((element) => element !== item);
                          });
                          toast.success("Successfully Removed");
                        }}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              ))}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
