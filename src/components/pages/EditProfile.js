import React, { useState } from "react";
import Axios from "axios";
import { Image, Transformation } from "cloudinary-react";
import TextField, { Input } from "@material/react-text-field";
import { Button } from "@material/react-button";
import { connect } from "react-redux";
import { getToken, getUserId } from "../../redux/selectors";
import Dialog, { DialogButton, DialogContent, DialogFooter, DialogTitle } from "@material/react-dialog";
import { Alert, Container } from "react-bootstrap";

const EditProfile = ({userId, token}) => {

  // useState for user infomations
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [preference, setPreference] = useState("");
  const [allergy, setAllergy] = useState("");
  const [imageId, setImageId] = useState("");
  const [imageSelected, setImageSelected] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  /**
   * Posts image to Cloudinary and gets the public id of the image
   */
  const uploadImage = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', imageSelected);
    formData.append('upload_preset', 'o909kmkv');

    const cloudinary_res = await Axios.post("http://api.cloudinary.com/v1_1/dwxbdkark/image/upload", formData);

    // Retrieve the image public_id and store in the user database
    setImageId(cloudinary_res.data.public_id);
    setShowImage(true);
  }

  /**
   * Updates the users' infomation and posts to the api
   */
  const submitEdit = async(e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const body = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        photo: imageId,
        preference: preference,
        allergy: allergy,
      };
      let headers = new Headers();
      headers.set("Content-Type", "application/json")
      headers.append("x-access-token", token);
      const response = await fetch(`http://localhost:8000/api/users/profile/${userId}`, {
        method: "PUT",
        mode: "cors",
        headers: headers,
        body: JSON.stringify(body)
      });
      if (response.status === 400) {
        return setError("Cannot edit profile.");
      }
      if (response.status === 200) {
        setDialogOpen(true);
      }
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  }

  return (
    <Container
      className='d-flex align-items-center justify-content-center'
      style={{ minHeight: '80vh'}}
    >
      <div className='w-100' style={{maxWidth: '500px'}}>
      <div>
      {/* Upload the image */}
        {error && <Alert variant='danger'>{error}</Alert>}
        <TextField
          label="Photo"
          outlined
        >
          <Input 
            type='file'
            onChange={(event) => {
              setImageSelected(event.target.files[0]);
            }}
          />
        </TextField>
        <Button raised onClick={uploadImage}>Upload</Button>
         
        {showImage && (
          // this block is used to display image from cloudinary
          <Image cloudName="dwxbdkark" publicId={imageId}>
            <Transformation crop="scale" width="200" angle="0" />
          </Image>
        )}
      </div>
      <div>
        <TextField
          label="First Name"
          outlined
        >
          <Input
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </TextField>
      </div>
      <div>
        <TextField
          label="Last Name"
          outlined
        >
          <Input
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </TextField>
      </div>
      <div>
        <TextField
          label="Address"
          outlined
        >
          <Input
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </TextField>
      </div>
      <div>
        <TextField
          label="Preference"
          outlined
        >
          <Input
            value={preference}
            onChange={e => setPreference(e.target.value)}
          />
        </TextField>
      </div>
      <div>
        <TextField
          label="Allergies"
          outlined
        >
          <Input
            value={allergy}
            onChange={e => setAllergy(e.target.value)}
          />
        </TextField>
      </div>
      <Button
        disabled={loading}
        raised
        onClick={submitEdit}
      >
        Submit
      </Button>
      </div>
      <Dialog open={dialogOpen}>
        <DialogTitle>Food Ordering App</DialogTitle>
        <DialogContent>Edited successfully</DialogContent>
        <DialogFooter>
          <DialogButton action="accept" isDefault onClick={() => { window.location= "/"; }}>Ok</DialogButton>
        </DialogFooter>
      </Dialog>
    </Container>
  );
}

/**
 * Gets id and token from the redux store
 * @param state 
 * @returns id and token of the current user
 */
const mapStateToProps = state => {
  const userId = getUserId(state);
  const token = getToken(state);
  return {
    userId: userId,
    token: token,
  };
};

export default connect(mapStateToProps)(EditProfile);