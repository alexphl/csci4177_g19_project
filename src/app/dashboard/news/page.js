"use client";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import styles from "@/styles/header.module.css";

import apiURL from "@/APIurl";
const baseURL = apiURL + "/news/";
var userURL = apiURL + "/news/user/371138";

export default function News_list() {
  const { isSuccess, isLoading, data } = useQuery({ queryKey: [userURL] });
  return (
    <div className={styles.newslistBox}>
      {isSuccess &&
        data.map((element, index) => (
          <div className={styles.mediacard} key={index}>
            <Link
              href={{
                pathname: "/dashboard/single_news",
              }}
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
                  <Typography variant="body1">
                    {element.ticker_symbol}
                  </Typography>
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

                  <Typography
                    variant="body1"
                    style={{ fontSize: "5px" }}
                  ></Typography>
                </Grid>
              </Grid>
            </Link>
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
    </div>
  );
}
