import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Card, { CardActionButtons, CardActions, CardMedia, CardPrimaryContent } from "@material/react-card";
import Dialog, { DialogTitle, DialogContent, DialogFooter, DialogButton } from "@material/react-dialog";
import { Grid, Row, Cell } from "@material/react-layout-grid";
import { Image, Transformation } from "cloudinary-react";
import { getToken } from "../redux/selectors";
import { Button } from "@material/react-button";
import { Link } from "react-router-dom";

const ListInfluencers = ({token}) => {
  // useState for influencers and dialogOpen
  const [influencers, setInfluencers] = useState([]);
  const [influencer, setInfluencer] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);

  /**
   * Gets all the influencers from the api
   */
  const getInfluencers = async() => {
    try {
      let headers = new Headers();
      headers.set("x-access-token", token);
      const response = await fetch("http://localhost:8000/api/users/influencers", { headers: headers });
      const jsonData = await response.json();
      console.log(jsonData);
      setInfluencers(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getInfluencers();
  }, [])

  return (
    <Fragment>
      {" "}
      <Grid align="right" className='d-flex align-items-center justify-content-center'>
        <Row>
          {influencers.map(influencer => (
            <Cell desktopColumns={3} phoneColumns={3} tabletColumns={3} key={influencer.id}>
              <Card outlined className="my-card">
                <CardPrimaryContent>
                  <h3 className="text-center mt-3">{influencer.firstName} {influencer.lastName}</h3>
                  <CardMedia square>
                    <Image cloudName="dwxbdkark" publicId={influencer.photo}>
                      <Transformation crop="scale" width="300" angle="0" />
                    </Image>
                  </CardMedia>
                </CardPrimaryContent>
                <CardActions className='d-flex align-items-center justify-content-center'>
                  <CardActionButtons>
                    <Button onClick={() => {
                      setInfluencer(influencer);
                      setDialogOpen(true);
                    }}>View Profile</Button>
                  </CardActionButtons>
                </CardActions>
              </Card>
            </Cell>
          ))}
        </Row>
      </Grid>
      
      <Dialog open={dialogOpen}>
      <DialogTitle>Influencer Profile</DialogTitle>
      <DialogContent>
        <p>First Name: {influencer.firstName}</p>
        <p>Last Name: {influencer.lastName}</p>
        <p>Email: {influencer.email}</p>
        <p>Preferences: {influencer.preference}</p>
        <p>Allergies: {influencer.allergy}</p>
      </DialogContent>
      <DialogFooter>
        <Link
          to="/order"
          state={{
            influencerId: influencer.id,
            influencerEmail: influencer.email,
          }}
          style={{ textDecoration: 'none' }}
        >
          <DialogButton action="accept">Order Food</DialogButton>
        </Link>
        <DialogButton action="cancel" onClick={() => setDialogOpen(false)}>Cancel</DialogButton>
      </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

/**
 * Gets token from the redux store
 * @param state 
 * @returns token of the current logged in user
 */
const mapStateToProps = state => {
  const token = getToken(state);
  return { token: token };
};

export default connect(mapStateToProps)(ListInfluencers);