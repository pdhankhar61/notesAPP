import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Container,
  Button,
  CardContent,
  CardActions,
  Divider,
  CardActionArea,
  Card,
  Typography,
  Grid,
  useTheme,
  CardHeader
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

const collectBucketNames = function (notes, bucket_new, setBucket) {
  bucket_new = [];
  if (notes.length <= 0) {
    localStorage.setItem("buckets", JSON.stringify(bucket_new));
    setBucket(bucket_new);
    return;
  }
  for (let i = 0; i < notes.length; i++) {
    if (i === 0) {
      bucket_new.push(notes[i].bucket_name);
      continue;
    }
    let count = 0;
    for (let d = 0; d < bucket_new.length; d++) {
      if (bucket_new[d] === notes[i].bucket_name) {
        count++;
      }
    }
    console.log("count ", count);
    if (count === 0) {
      bucket_new.push(notes[i].bucket_name);
    }
    console.log("bucket :", bucket_new);
  }
  localStorage.setItem("buckets", JSON.stringify(bucket_new));
  setBucket(bucket_new);
  if (bucket_new.length > 1) {
    toast.success(
      `${bucket_new.length} Bucket(s) are present. And Notes have been grouped.`
    );
  }
  if (bucket_new.length === 1) {
    toast.success(
      `${bucket_new.length} Bucket(s) is present. And Notes have been grouped.`
    );
  } else if (bucket_new.length === 0) {
    toast.success(`No Buckets.`);
  }
};

function Home() {
  // bucket means no. of different buckets. And bucket.length is not elements(Highlights/Notes) inside buckets
  const [bucket, setBucket] = useState([]);
  const [notes, setNotes] = useState([]);
  const [hide, setHide] = useState(false);
  const [hideNote, setHideNote] = useState(false);
  const [found, setFound] = useState(false);
  const theme = useTheme();
  const classes = useStyles();
  console.log("notes :", notes);
  console.log("bucket :", bucket);

  useEffect(() => {
    // getting saved notes if any
    if (JSON.parse(localStorage.getItem("notes")) !== null) {
      setNotes(JSON.parse(localStorage.getItem("notes")));
    }
    // getting saved buckets if any
    if (JSON.parse(localStorage.getItem("buckets")) !== null) {
      if (JSON.parse(localStorage.getItem("buckets")).length > 0) {
        setHideNote(true);
      }
      setBucket(JSON.parse(localStorage.getItem("buckets")));
    }

    setHide(true);
  }, []);

  return (
    <div style={{ height: "500vh" }}>
      <Grid container spacing={3}>
        {/* --------buttons------------------ */}

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Box sx={{ display: "flex", justifyContent: { xs: "flex-end" } }}>
            <Button
              variant="contained"
              style={{ marginRight: "8px" }}
              color="primary"
              onClick={() => {
                collectBucketNames(notes, bucket, setBucket);
                setHideNote(true);
              }}
            >
              {bucket.length !== 0
                ? "Group Highlights is ON"
                : "Group Highlights is OFF"}
            </Button>
            <Button
              style={{ marginRight: "8px" }}
              variant="contained"
              color="primary"
            >
              Dot Voting
            </Button>
            <NoteModal
              notes={notes}
              collectBucketNames={collectBucketNames}
              bucket={bucket}
              setBucket={setBucket}
              setNotes={setNotes}
              setHideNote={setHideNote}
            />
          </Box>
        </Grid>
        {/* ------------------buttons---ENDS-------- */}

        <Grid item lg={12} xs={12}>
          <Container
            style={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              height: "490vh",
              flexWrap: "wrap",
              alignContent: "flex-start"
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
            {/* --------------Note-Data_-_-_Card------------------------------------ */}
            <Box hidden={hideNote}>
              {" "}
              {notes.length > 0 &&
                notes.map((item, index) => (
                  <Box
                    draggable
                    sx={{ minWidth: "content" }}
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
                            {item.bucket_name}
                          </Typography>
                          <Typography variant="subtitle1" color="textPrimary">
                            {item.content}
                          </Typography>
                          <Typography variant="subtitle2" color="textPrimary">
                            {item.user}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <NoteModal
                          edit={true}
                          item={item}
                          collectBucketNames={collectBucketNames}
                          bucket={bucket}
                          setBucket={setBucket}
                          setNotes={setNotes}
                        />
                        <Button
                          size="small"
                          style={{ color: `${theme.palette.error.light}` }}
                          onClick={() => {
                            setNotes((prev) => {
                              localStorage.setItem(
                                "notes",
                                JSON.stringify(
                                  prev.filter((element) => element !== item)
                                )
                              );

                              collectBucketNames(
                                prev.filter((element) => element !== item),
                                bucket,
                                setBucket
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
            {/* -------------------------------Note-Data_-_-_Card_-_ENDS--------------- */}

            {/* Bucket */}

            {bucket.length > 0 &&
              bucket.map((item, index) => {
                return (
                  <Box
                    key={index}
                    className={"Bucket _ Name" + `${item}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "wrap",
                      width: "50vh",
                      padding: "10px",
                      margin: "30px",
                      boxShadow: "2px 4px 8px rgba(0,0,0,0.2)",
                      border: "1px solid white"
                    }}
                    onDragEnter={() => {
                      // console.log("entering me i am bucket");
                    }}
                    onDragLeave={() => {
                      // console.log("leaving card");
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      // console.log(e.target);
                      console.log(item);
                      localStorage.setItem("dragging_on_item", item);
                    }}
                    onDrop={(e) => {
                      // e.preventDefault();
                      console.log(item);
                      setNotes((prev) => {
                        let data = [...prev];
                        data = data.map((element) => {
                          if (
                            element.noteId ===
                            JSON.parse(localStorage.getItem("dragging_noteId"))
                          ) {
                            element.bucket_name = localStorage.getItem(
                              "dragging_on_item"
                            );
                          }
                          return element;
                        });
                        if (bucket.length !== 0) {
                          collectBucketNames(data, bucket, setBucket);
                        }
                        localStorage.setItem("notes", JSON.stringify(data));
                        return data;
                      });
                    }}
                  >
                    <Typography>{`Bucket _ Name : ${item} `}</Typography>

                    {notes.map((note, index) => {
                      if (note.bucket_name === item) {
                        return (
                          <Box
                            draggable
                            sx={{ minWidth: "content" }}
                            key={index}
                            mr={1}
                            mt={1}
                            onDragStart={(e) => {
                              localStorage.setItem(
                                "dragging_noteId",
                                JSON.stringify(note.noteId)
                              );
                            }}
                          >
                            <Card className={classes.root}>
                              <CardActionArea
                                style={{ backgroundColor: `${note.color}` }}
                              >
                                <CardContent style={{ textAlign: "left" }}>
                                  <Typography
                                    variant="h5"
                                    className={`${note.bucket_name}`}
                                    component="h2"
                                  >
                                    {note.bucket_name}
                                  </Typography>
                                  <Typography
                                    variant="subtitle1"
                                    color="textPrimary"
                                  >
                                    {note.content}
                                  </Typography>
                                  <Typography
                                    variant="subtitle2"
                                    color="textPrimary"
                                  >
                                    {note.user}
                                  </Typography>
                                </CardContent>
                              </CardActionArea>
                              <CardActions>
                                <NoteModal
                                  edit={true}
                                  item={note}
                                  collectBucketNames={collectBucketNames}
                                  bucket={bucket}
                                  setBucket={setBucket}
                                  setNotes={setNotes}
                                />
                                <Button
                                  size="small"
                                  style={{
                                    color: `${theme.palette.error.light}`
                                  }}
                                  onClick={() => {
                                    setNotes((prev) => {
                                      localStorage.setItem(
                                        "notes",
                                        JSON.stringify(
                                          prev.filter(
                                            (element) => element !== note
                                          )
                                        )
                                      );

                                      collectBucketNames(
                                        prev.filter(
                                          (element) => element !== note
                                        ),
                                        bucket,
                                        setBucket
                                      );
                                      return prev.filter(
                                        (element) => element !== note
                                      );
                                    });
                                    toast.success("Successfully Removed");
                                  }}
                                >
                                  Delete
                                </Button>
                              </CardActions>
                            </Card>
                          </Box>
                        );
                      }
                    })}
                  </Box>
                );
              })}

            {/* -----------------------------Bucket Ends---------- */}
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
