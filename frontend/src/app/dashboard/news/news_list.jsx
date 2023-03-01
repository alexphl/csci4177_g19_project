"use client";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import Image from "next/image";
import styles from "../../../styles/header.module.css";
import jsondata from "../../../dummy_data/news_list.json";

const data = jsondata.newslist;

export default function news_list() {
  return (
    <div className={styles.newslistBox}>
      {data.map((element, index) => (
        <div className={styles.mediacard} key={index}>
          <Link
            href={{
              pathname: "/dashboard/single_news",
              query: {
                id: element.source.id,
                author: element.author,
              },
            }}
          >
            <Grid container>
              <Grid item xs={12} md={7}>
                <Typography variant="h6">{element.title}</Typography>
                <Typography variant="body2">
                  Written by: {element.author} &emsp; publishded:{" "}
                  {element.publishedAt}
                </Typography>
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography variant="body1">
                  {element.relative_stock.company}
                </Typography>
                <Typography variant="body1">
                  {element.relative_stock.price}
                </Typography>
                {element.relative_stock.Change > 0 ? (
                  <Typography
                    variant="body1"
                    style={{ color: "var(--color-up)" }}
                  >
                    + {element.relative_stock.Change} %
                  </Typography>
                ) : (
                  <Typography
                    variant="body1"
                    style={{ color: "var(--color-down)" }}
                  >
                    {element.relative_stock.Change}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6} md={3}>
                <Image
                  alt="sorry for the not display news image, because all news image
                  are private company server which we can access;"
                  src="http://placehold.it/32x32"
                  width={100}
                  height={100}
                />
                <Typography
                  variant="body1"
                  style={{ fontSize: "5px" }}
                ></Typography>
              </Grid>
            </Grid>
          </Link>
        </div>
      ))}
    </div>
  );
}
