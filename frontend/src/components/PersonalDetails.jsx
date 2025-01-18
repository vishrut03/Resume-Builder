import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Grid2,
} from "@mui/material";

const obj = {
  fname: "",
  lname: "",
  phone: "",
  address: "",
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Full page height
    padding: "10px",
  },
  card: {
    width: "70%", // Take full width of the container
  //   maxWidth: "600px", // Ensure card doesn't stretch too wide on large screens
    padding: "20px",
  },
}));

const PersonalDetails = (props) => {
  const [profileData, setProfileData] = useState(obj);
  const classes = useStyles();

  const handleChange = (event) => {
    const { name, value } = event.target;
    const prevdata = { ...profileData };

    prevdata[name] = value;
    setProfileData(prevdata); // Update state
    props?.SaveProfileData?.(prevdata); // Call props function if provided
  };

  return (
    <div className={classes.root}>
      Personal Details
      {/* <form autoComplete="off" noValidate>
        <Card className={classes.card}>
          <CardHeader title="Profile Details" subheader="Add your profile details" />
            <Grid2 container spacing={3}>
              <Grid2 item md={6} xs={12}>
                <TextField
                  fullWidth
                  name="fname"
                  value={profileData.fname}
                  label="First Name"
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid2>
              <Grid2 item md={6} xs={12}>
                <TextField
                  fullWidth
                  name="lname"
                  value={profileData.lname}
                  label="Last Name"
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid2>

              <Grid2 item md={6} xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  name="phone"
                  value={profileData.phone}
                  label="Phone Number"
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid2>
              <Grid2 imd={6} xs={12}>
                <TextField
                  fullWidth
                  name="address"
                  value={profileData.address}
                  label="Address"
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid2>
            </Grid2>
        </Card>
      </form> */}
    </div>
  );
};

export default PersonalDetails;
