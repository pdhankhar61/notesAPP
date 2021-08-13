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
  tag_name: "risk",
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
        tag_name: Yup.string().required(),
        content: Yup.string().required(),
        user: Yup.string().required(),
        color: Yup.string().required()
      })}
      onSubmit={(values, { setSubmitting, setStatus }) => {
        console.log(values);
        if (props.edit) {
          // ------------------Code for "Edit Button"---------------//
          props.setNotes((prev) => {
            let data = [...prev];
            data[props.index] = values;
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
          toast.success("Note successfully added");
          // ------------------Code For adding details---ENDS------------//
        }
        setSubmitting(false);
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
            error={Boolean(touched.tag_name && errors.tag_name)}
            fullWidth
            helperText={touched.tag_name && errors.tag_name}
            label="Tag name"
            name="tag_name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.tag_name}
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
            <MenuItem value="#00d7c8">SkyBlue</MenuItem>
          </Select>

          <Button
            color="primary"
            disabled={isSubmitting}
            type="submit"
            variant="contained"
            onClick={props.handleClose}
          >
            Save
          </Button>
        </form>
      )}
    </Formik>
  );
}
