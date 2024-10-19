import React, { useEffect, useState } from "react";
import { account, database } from "./appwriteConfig";
import { Query } from 'appwrite';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  CardMedia,
  Box,
  useTheme,
  useMediaQuery,
  Avatar,
  Divider,
} from "@mui/material";

export default function Yourpic() {
  const [user, setUser] = useState(null);
  const [userPics, setUserPics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const DATABASE_ID = '670d6b3d002583d9a7d3';
  const COLLECTION_ID = '670d71ed00246f60b0ee';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const loggedInUser = await account.get();
        setUser(loggedInUser);

        const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
          Query.equal('Email', loggedInUser.email)
        ]);

        setUserPics(response.documents);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom align="center">
        Your Picture Gallery
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" align="center" my={4}>
          {error}
        </Typography>
      )}

      {!loading && userPics.length > 0 && (
        <Box>
          {userPics.map((doc) => (
            <Box key={doc.$id} mb={4}>
              <Card elevation={3} sx={{ mb: 2 }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar 
                      sx={{ 
                        width: 56, 
                        height: 56, 
                        bgcolor: theme.palette.primary.main,
                        mr: 2
                      }}
                    >
                      {doc.Name[0].toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{doc.Name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {doc.Email}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Typography variant="h6" gutterBottom>Your Images:</Typography>
              <Grid container spacing={2}>
                {doc.image_url.map((image, index) => (
                  <Grid item xs={12} sm={isSmallScreen ? 12 : 6} key={index}>
                    <Card>
                      <CardMedia
                        component="img"
                        image={`https://cloud.appwrite.io/v1/storage/buckets/670e09ec003860954e5c/files/${image}/view?project=67066f050003ee6c49a2&mode=admin`}
                        alt={`Image ${index + 1}`}
                        sx={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: 1,
                        }}
                      />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Box>
      )}

      {!loading && userPics.length === 0 && (
        <Typography align="center" my={4}>
          No pictures found for your account.
        </Typography>
      )}
    </Container>
  );
}