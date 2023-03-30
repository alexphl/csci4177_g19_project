/**Author: Liam Osler */
import { memo } from "react";
import Link from "next/link";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

function CustomerCard(customer) {
  const customerURL = "/dashboard/customers/" + customer.content.username;
  return (
    <Card
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {customer.content.username}
        </Typography>
        <Typography variant="h5" component="div">
          {customer.content.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {customer.content.email}
        </Typography>
        <Typography variant="body2">{customer.content.address}</Typography>
      </CardContent>
      <CardActions>
        <Link href={customerURL} passHref>
          <Button size="small">View Customer</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default memo(CustomerCard);
