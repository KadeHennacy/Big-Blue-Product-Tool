import { Box } from "@mui/material";
import React from "react";

const Home = () => {
  return (
    <Box
      sx={{
        padding: 3,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1>Big Blue Product Tool</h1>
      <Box sx={{ textAlign: "left", marginLeft: 1, marginTop: 3 }}>
        <h3>Instructions:</h3>
        <Box sx={{ marginLeft: 2, marginTop: 1 }}>
          <ul>
            <li>
              Click <strong>New Lot</strong> to create a new lot
              <ul style={{ paddingLeft: 16 }}>
                <li>
                  After adding items, click <strong>Submit</strong> to submit
                  the lot.
                </li>
                <li>
                  The submit button will download a zip file with the product
                  information and open an email with the correct information
                  loaded.
                </li>
                <li>
                  The email may not open on some phones. If this happens,
                  manually send an email to bigbluethriftstore@gmail.com with
                  the subject "New lot" and attach the zip file that was
                  downloaded. You can reach out to this email if you have any
                  issues
                </li>
              </ul>
            </li>
            <li>
              Click <strong>Browse Lots</strong> to view existing lots
              <ul style={{ paddingLeft: 16 }}>
                <li>
                  This app is setup to save lots locally. If you clear your
                  browser cache, you will lose all saved lots.
                </li>
                <li>
                  Make sure you delete old lots if the app starts to run slowly.
                </li>
              </ul>
            </li>
          </ul>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
