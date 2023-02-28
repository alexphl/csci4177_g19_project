import { Container } from "@mui/material";
import NavBar from "./NavBar";
import { useContext } from "react";
import { userContext } from "../UserContext";

function Dashboard(props) {
  // user context - has properties: loggedIn, email
  const { user, dispatchUser } = useContext(userContext);

  return (
    <div>
      <NavBar
        doSomething={() => {
          dispatchUser({ type: "LOGOUT_USER" });
          props.setOpen(false);
        }}
        buttonName="Logout"
      />
      <Container>
        <div>
          <h1> Dashboard</h1>
          <p>Welcome {user.email}</p>
          <img
            alt="chart to represent eventual stock dashboard"
            width="100%"
            src="https://upload.wikimedia.org/wikipedia/commons/2/27/Excel_chart.PNG"
          />
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;
