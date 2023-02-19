import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function NavBar(props) {
  return (
    <div className="Nav">
      {/*App Bar  */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Stock Tracking App
            </Typography>
            <button
              onClick={() => props.doSomething(true)}
            >
              {props.buttonName}
            </button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default NavBar;
