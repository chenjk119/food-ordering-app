import React from 'react';
import MenuSurface, {Corner} from '@material/react-menu-surface';
import List, { ListItem, ListItemText } from '@material/react-list';
import MaterialIcon from '@material/react-material-icon';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
} from "@material/react-dialog";
import { connect } from "react-redux";
import { destroyToken } from "../redux/action";

// Drop down menu for dashboard
class AccountMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorElement: null,
      dialogOpen: false,
    };
  }

  /**
   * Anchors the menu to a button
   */
  setAnchorElement = (element) => {
    if (this.state.anchorElement) {
      return;
    }
    this.setState({anchorElement: element});
  }

  /**
   * Logs out and set the token in the redux store to initial state
   */
  logOut = () => {
    this.props.destroyToken();
    this.setState({dialogOpen: true});
  }

  render() {
    return (
      <div>
        <div
          className='mdc-menu-surface--anchor'
          ref={this.setAnchorElement}
        >
          <MaterialIcon
            hasRipple
            icon='account_circle' 
            onClick={() => this.setState({open: true})}
          />
          <MenuSurface
            open={this.state.open}
            anchorCorner={Corner.BOTTOM_LEFT}
            onClose={() => this.setState({open: false})}
            anchorElement={this.state.anchorElement}
          >
            <List>
              <ListItem onClick={() => { window.location = '/signup'; }}>
                <ListItemText primaryText="Sign Up" />
              </ListItem>
              <ListItem onClick={() => { window.location = '/login'; }}>
                <ListItemText primaryText="Log In" />
              </ListItem>
              <ListItem onClick={() => { window.location = '/edit_profile'; }}>
                <ListItemText primaryText="Edit Profile" />
              </ListItem>
              <ListItem onClick={() => { window.location = '/history'; }}>
                <ListItemText primaryText="View History" />
              </ListItem>
              <ListItem onClick={() => { window.location = '/credit'; }}>
                <ListItemText primaryText="View Credit" />
              </ListItem>
              <ListItem onClick={this.logOut}>
                <ListItemText primaryText="Log Out" />
              </ListItem>
            </List>
          </MenuSurface>
        </div>
        <Dialog open={this.state.dialogOpen}>
          <DialogTitle>Food Ordering App</DialogTitle>
          <DialogContent>Logged out successfully</DialogContent>
          <DialogFooter>
            <DialogButton action="accept" isDefault onClick={() => { window.location = "/login"; }}>Ok</DialogButton>
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}

export default connect(
  null,
  { destroyToken },
)(AccountMenu);