"use client";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import styles from "@/styles/header.module.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import apiURL from "@/APIurl";
const baseURL = apiURL + "/news/";
var userURL = apiURL + "/news/user/111";

export default function News_list() {
  const { isSuccess, isLoading, data } = useQuery({ queryKey: [userURL] });
  const [open, setOpen] = React.useState(false);
  const [select, setSelect] = React.useState(null);

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
                  <img
                    alt=""
                    src={element.urlToImage}
                    width={150}
                    height={150}
                  />
                ) : (
                  <Image
                    alt="sorry for the not display news image, because all news image
                  are private company server which we can access;"
                    src="http://placehold.it/32x32"
                    width={100}
                    height={100}
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
              <Typography variant="h6">{select.title}</Typography>
              <Typography variant="body2">
                {select.author != null ? (
                  <span>Written by: {select.author} &nbsp;</span>
                ) : null}
                publishded: {select.publishedAt}
              </Typography>
              {select.urlToImage != null ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img alt="" src={select.urlToImage} width={150} height={150} />
              ) : (
                <Image
                  alt="sorry for the not display news image, because all news image
                  are private company server which we can access;"
                  src="http://placehold.it/32x32"
                  width={100}
                  height={100}
                />
              )}
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
