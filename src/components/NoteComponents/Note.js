import { useState } from "react";
import { Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {
  Typography,
  MenuItem,
  Select,
  TextField,
  Button
} from "@material-ui/core";

const defaultValues = {
  bucket_name: "risk",
  content: "content",
  user: "user-1",
  color: "#FFD371"
};
export default function Item(props) {
  const [initialValues, setInitialValues] = useState(
    props.item ? props.item : defaultValues
  );
  console.log(props);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        bucket_name: Yup.string().required(),
        content: Yup.string().required(),
        user: Yup.string().required(),
        color: Yup.string().required()
      })}
      onSubmit={(values, { setSubmitting, setStatus }) => {
        if (props.edit) {
          // ------------------Code for "Edit Button"---------------//

          props.setNotes((prev) => {
            let data = [...prev];
            data = data.map((element) => {
              if (element.noteId === props.item.noteId) {
                element = values;
              }
              return element;
            });

            // ----------------------------------------------------------------------//
            // ---if bucket_name field inside note is updated then bucket will also updated .--- //
            if (props.bucket.length !== 0) {
              props.collectBucketNames(data, props.bucket, props.setBucket);
            }
            localStorage.setItem("notes", JSON.stringify(data));
            return data;
          });

          toast.success("Details Successfully Updated");

          // ------------------Code for "Edit Button"--ENDS-------------//
        } else {
          // ------------------Code For adding details---------------//

          values["noteId"] = Math.floor(Math.random() * 100000000).toString();
          props.setNotes([...props.notes, values]);
          localStorage.setItem(
            "notes",
            JSON.stringify([...props.notes, values])
          );

          // ----------------------------------------------------------------------//
          // ---if new note is added with new bucket_name then new bucket will be added.--- //
          if (props.bucket.length !== 0) {
            props.collectBucketNames(
              [...props.notes, values],
              props.bucket,
              props.setBucket
            );
            props.setHideNote(true);
          }

          toast.success("Note successfully added");
          // ------------------Code For adding details---ENDS------------//
        }
        setSubmitting(true);
        setStatus({ success: true });
      }}
    >
      {({
        errors,
        handleBlur,
        handleSubmit,
        handleChange,
        touched,
        values,
        isSubmitting
      }) => (
        <form onSubmit={handleSubmit}>
          <TextField
            error={Boolean(touched.bucket_name && errors.bucket_name)}
            fullWidth
            helperText={touched.bucket_name && errors.bucket_name}
            label="Bucket name"
            name="bucket_name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.bucket_name}
            variant="outlined"
            style={{ marginBottom: "20px" }}
          />
          <TextField
            error={Boolean(touched.content && errors.content)}
            fullWidth
            helperText={touched.content && errors.content}
            label="Content"
            name="content"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.content}
            variant="outlined"
            style={{ marginBottom: "20px" }}
          />
          <TextField
            error={Boolean(touched.user && errors.user)}
            fullWidth
            helperText={touched.user && errors.user}
            label="User"
            name="user"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.user}
            variant="outlined"
            style={{ marginBottom: "20px" }}
          />
          <Typography color="textPrimary" sx={{ marginBottom: "14px" }}>
            Select Color
          </Typography>
          <Select
            id="color"
            name="color"
            value={values.color}
            onChange={handleChange}
            style={{ minWidth: "100%", marginBottom: "20px" }}
          >
            <MenuItem value="#FFD371">Yellow</MenuItem>
            <MenuItem value="#f9a1c8">Pink</MenuItem>
            <MenuItem value="#f56a79">Red</MenuItem>
            <MenuItem value="#66de93">Green</MenuItem>
            <MenuItem value="#00d7c8">Blue</MenuItem>
          </Select>

          <Button
            color="primary"
            disabled={isSubmitting}
            type="submit"
            variant="contained"
            onClick={() => {
              Object.keys(errors).length === 0
                ? props.handleClose()
                : console.log(errors);
            }}
          >
            Save
          </Button>
        </form>
      )}
    </Formik>
  );
}
