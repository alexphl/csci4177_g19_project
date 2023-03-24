"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Grid,
  Typography,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import styles from "@/styles/header.module.css";

import apiURL from "@/APIurl";
const baseURL = apiURL + "/news/";
var userURL = apiURL + "/news/user/111";

export default function News_list() {
  const { isSuccess, isLoading, data } = useQuery({ queryKey: [userURL] });
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState(null);

  const handleOpen = (parameter) => (event) => {
    setSelect(parameter);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.newslistBox}>
      {isSuccess &&
        data.map((element, index) => (
          <div
            className={styles.mediacard}
            key={index}
            onClick={handleOpen(element)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={9}>
                <Typography variant="h6">{element.title}</Typography>
                <Typography variant="body1">{element.description}</Typography>
                <Typography variant="body2">
                  {element.author != null ? (
                    <span>Written by: {element.author} &nbsp;</span>
                  ) : null}
                  publishded: {element.publishedAt}
                </Typography>
              </Grid>
              <Grid item xs={6} md={1}>
                <Typography variant="body1">{element.ticker_symbol}</Typography>
              </Grid>
              <Grid item xs={6} md={2}>
                {element.urlToImage != null ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img alt="" src={element.urlToImage} width={200} />
                ) : (
                  <Image
                    alt="sorry for the not display news image, because all news image
                  are private company server which we can access;"
                    src="http://placehold.it/32x32"
                    width={200}
                    height={200}
                  />
                )}
              </Grid>
            </Grid>
          </div>
        ))}
      {isLoading && (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <CircularProgress color="success" />
        </Grid>
      )}
      <div>
        {select && (
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title"></DialogTitle>
            <DialogContent>
              <Typography variant="h5">{select.title}</Typography>
              <Typography variant="body2">
                {select.author != null ? (
                  <span>Written by: {select.author} &nbsp;</span>
                ) : null}
                publishded: {select.publishedAt}
              </Typography>
              {select.urlToImage != null ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img alt="" src={select.urlToImage} width={400} />
              ) : (
                <Image
                  alt="sorry for the not display news image, because all news image
                  are private company server which we can access;"
                  src="http://placehold.it/32x32"
                  width={200}
                  height={200}
                />
              )}
              <Typography variant="body2">{select.content}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>
                Because of api limitation we could not offer full news
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </div>
  );
}
