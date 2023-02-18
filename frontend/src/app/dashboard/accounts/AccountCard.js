import Link from "next/link";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function AccountCard(account) {
  const accountURL = "accounts/" + account.content.account_id;
  return (
    <Card spacing={1}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {account.content.account_id}
        </Typography>
        <Typography variant="h5" component="div">
          {account.content.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={accountURL} passHref>
          <Button size="small">View Account</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
