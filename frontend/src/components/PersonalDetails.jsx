import React, { useState } from "react";
import { makeStyles } from "@mui/styles";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Grid2,
} from "@mui/material";
// Fields: First Name, Last Name, Phone Number, Email Address, Address, LinkedIn Profile

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
    width: "400px", // Card width
    padding: "20px",
  },
}));

const PersonalDetails = (props) => {
  const [profileData, setProfileData] = useState(obj);
  const classes = useStyles();

  const handleChange = (event) => {
    const { name, value } = event.target;
    const prevdata = { ...profileData };

    if (name === "url") {
      if (event.target.files.length > 0) {
        prevdata[name] = URL.createObjectURL(event.target.files[0]);
        prevdata["FileName"] = event.target.files[0].name;
      }
    } else {
      prevdata[name] = value;
    }
    setProfileData(prevdata); // Update state
    props?.SaveProfileData?.(prevdata); // Call props function if provided
  };

  return (
    <div className={classes.root}>
      <form autoComplete="off" noValidate>
        <Card className={classes.card}>
          <CardHeader title="Profile Details" subheader="Add your profile details" />
          <CardContent>
            <Grid2 container spacing={2} direction="column">
              <Grid2 item>
                <TextField
                  fullWidth
                  name="fname"
                  value={profileData.fname}
                  label="First Name"
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid2>
              <Grid2 item>
                <TextField
                  fullWidth
                  name="lname"
                  value={profileData.lname}
                  label="Last Name"
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid2>
              <Grid2 item>
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
              <Grid2 item>
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
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default PersonalDetails;
