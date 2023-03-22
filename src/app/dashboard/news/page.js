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
var userURL = apiURL + "/news/user/";

export default function News_list() {
  const { isSuccess, isLoading, data } = useQuery({ queryKey: [baseURL] });
  console.log(data[0]);
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
              <Grid container>
                <Grid item xs={12} md={7}>
                  <Typography variant="h6">{element.title}</Typography>

                  {element.author != null ? (
                    <Typography variant="body2">
                      Written by: {element.author}
                    </Typography>
                  ) : null}
                  <Typography variant="body2">
                    publishded: {element.publishedAt}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={2}>
                  <Typography variant="body1">
                    {element.ticker_symbol}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  {element.urlToImage != null ? (
                    <Image
                      alt=""
                      src={element.urlToImage}
                      width={100}
                      height={100}
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
