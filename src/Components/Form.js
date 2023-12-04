import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";

import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  TextField,
  InputLabel,
  FormGroup,
  FormHelperText,
  RadioGroup,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";


const initialValues = {
  textInput: "",
  passwordInput: "",
  confirmPassword: "",
  emailInput: "",
  checkboxInput: false,
  radioInput: "",
  selectInput: "",
  checkboxGroup: [],
  imageInput: null,
  ADARSH: '',
};

const validationSchema = Yup.object({
  textInput: Yup.string().required("Required"),
  passwordInput: Yup.string()
    .required("Required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("passwordInput"), null], "Passwords must match"),
  emailInput: Yup.string().email("Invalid email address").required("Required"),
  checkboxInput: Yup.boolean().oneOf(
    [true],
    "Must accept terms and conditions"
  ),
  radioInput: Yup.string().required("Required"),
  selectInput: Yup.string().required("Required"),
  checkboxGroup: Yup.array().min(1, "Please select at least one option"),
  imageInput: Yup.mixed().required("Image is required"),
  ADARSH: Yup.string().required('reCAPTCHA is required'),
});




const MyForm = ({ onSubmit }) => {
  const navigate = useNavigate();

  const [capVal, setCapVal] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmitHandler  = async (values, { setSubmitting, resetForm, setFieldValue }) => {
    try {
      const formData = { ...values };
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form data submitted:', formData);
      alert('Form submitted successfully!\n' + JSON.stringify(formData, null, 2));
      setFieldValue('imageInput', null);
      setSelectedImage(null);
      document.getElementById('imageInput').value = null;
      onSubmit(formData);

      setCapVal(null);
      resetForm();
      setSubmitting(false);

      // Trigger navigation to the view page after form submission
      navigate('/view');
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitting(false);
    }
  };


  const options = [
    { value: "yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  return (

    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmitHandler} // Use onSubmitHandler instead of onSubmit directly
    enctype="multipart/form-data"

  >
      {({ isSubmitting, isValid, dirty, resetForm, setFieldValue, values }) => (
        <Form>
          <Box p={2}>

            <InputLabel htmlFor="textInput">UserName</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              id="textInput"
              name="textInput"
              value={values.textInput}
              onChange={(e) => setFieldValue("textInput", e.target.value)}
            />
            <Typography color="error">
            <ErrorMessage name="textInput" component="div" />
            </Typography>
           
          </Box>


          <Box p={2}>
            <InputLabel htmlFor="passwordInput">Password</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              id="passwordInput"
              name="passwordInput"
              type={showPassword ? "text" : "password"}
              value={values.passwordInput}
              onChange={(e) => setFieldValue("passwordInput", e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography color="error">
            <ErrorMessage name="passwordInput" component="div" />
            </Typography>
          </Box>

          <Box p={2}>
            <InputLabel htmlFor="confirmPassword">Confirm Password:</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={values.confirmPassword}
              onChange={(e) =>
                setFieldValue("confirmPassword", e.target.value)
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography color="error">
            <ErrorMessage name="confirmPassword" component="div" />
            </Typography>
          </Box>
          <Box p={2}>
            <InputLabel htmlFor="emailInput">Email Input:</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              id="emailInput"
              name="emailInput"
              type="email"
              value={values.emailInput}
              onChange={(e) => setFieldValue("emailInput", e.target.value)}
            />
            <Typography color="error">
            <ErrorMessage name="emailInput" component="div" />
            </Typography>
          </Box>

          <Box p={2}>
            <FormControl>
              <FormLabel>Checkbox Group:</FormLabel>
              <FormGroup>
                {options.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    control={
                      <Checkbox
                        name="checkboxGroup"
                        value={option.value}
                        checked={values.checkboxGroup.includes(option.value)}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          if (isChecked) {
                            setFieldValue("checkboxGroup", [
                              ...values.checkboxGroup,
                              option.value,
                            ]);
                          } else {
                            setFieldValue(
                              "checkboxGroup",
                              values.checkboxGroup.filter(
                                (v) => v !== option.value
                              )
                            );
                          }
                        }}
                      />
                    }
                    label={option.label}
                  />
                ))}
              </FormGroup>
              <FormHelperText>
              <Typography color="error">
                <ErrorMessage name="checkboxGroup" />
                </Typography>
              </FormHelperText>
            
            </FormControl>
          </Box>

          <Box p={2}>
          <InputLabel htmlFor="imageInput">Image Input:</InputLabel>
          <input
            type="file"
            id="imageInput"
            name="imageInput"
            onChange={(event) => {
              const file = event.currentTarget.files[0];
              setFieldValue("imageInput", file);
              setSelectedImage(file ? URL.createObjectURL(file) : null);
            }}
          />
        
          {values.imageInput && (
            <img
              src={selectedImage}
              alt="Selected"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          )}
        
          <Typography color="error">
            <ErrorMessage name="imageInput" component="div" />
          </Typography>
        </Box>


        
          <Box p={2}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Radio Input:</FormLabel>
              <RadioGroup
                row
                name="radioInput"
                value={values.radioInput}
                onChange={(e) => setFieldValue("radioInput", e.target.value)}
              >
                <FormControlLabel
                  value="option1"
                  control={<Radio />}
                  label="Option 1"
                />
                <FormControlLabel
                  value="option2"
                  control={<Radio />}
                  label="Option 2"
                />
              </RadioGroup>
              <FormHelperText>
              <Typography color="error">
              <ErrorMessage name="radioInput" /></Typography>

               
              </FormHelperText>
            </FormControl>
          </Box>

          <Box p={2}>
          <InputLabel id="selectInputLabel">Select Input</InputLabel>
          <Select
            labelId="selectInputLabel"
            id="selectInput"
            name="selectInput"
            value={values.selectInput}
            onChange={(e) => setFieldValue("selectInput", e.target.value)}
            label="Select an option"
            displayEmpty  // Set displayEmpty to true
          >
            <MenuItem value="">
              Select an option
            </MenuItem>
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </Select>
          <FormHelperText>
          <Typography color="error">
            <ErrorMessage name="selectInput" />
          </Typography>
        </FormHelperText>
        </Box>
        


          <Box p={2}>
            <FormControlLabel
              control={
                <Checkbox
                  name="checkboxInput"
                  checked={values.checkboxInput}
                  onChange={(e) =>
                    setFieldValue("checkboxInput", e.target.checked)
                  }
                />
              }
              label="Accept Terms and Conditions"
            />
            <FormHelperText>
            <Typography color="error">
              <ErrorMessage name="checkboxInput" />
              </Typography>
            </FormHelperText>
          </Box>

          <Box p={2}>
            <ReCAPTCHA
              sitekey="6LdMMxEpAAAAALIjcNRnZ3GeW8VYKYc-YEt1axiP"
              onChange={(val) => setFieldValue("ADARSH", val)}
            />
            <FormHelperText>
            <Typography color="error">
              <ErrorMessage name="ADARSH" />
              </Typography>
            </FormHelperText>
          </Box>


          <Box p={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting || !dirty || capVal}
            >
              Submit
            </Button>

            <Button
              type="button"
              variant="outlined"
              onClick={() => {
                resetForm();
                setSelectedImage(null);
                setCapVal(null);
              }}
              disabled={!dirty}
            >
              Reset
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
