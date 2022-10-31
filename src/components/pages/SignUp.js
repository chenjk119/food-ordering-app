import React from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
} from "@material/react-dialog";
import { connect } from "react-redux";
import { addToken } from "../../redux/action";

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      passwd: "",
      confirmPasswd: "",
      isInfluencer: false,
      error: "",
      loading: false,
      dialogOpen: false,
    }
  }

  updateEmail = (email) => {
    this.setState({
      email: email
    });
  }

  updatePasswd = (passwd) => {
    this.setState({
      passwd: passwd
    });
  }

  updateConfirmPasswd = (confirmPasswd) => {
    this.setState({
      confirmPasswd: confirmPasswd
    });
  }

  /**
   * Creates a user in the api, writes the token in redux store
   */ 
  submitSignUp = async(e) => {
    e.preventDefault();

    if (this.state.passwd !== this.state.confirmPasswd) {
      return this.setState({error: "Passwords do not match"});
    }

    try {
      this.setState({
        error: "",
        loading: true,
      });
      const body = {
        email: this.state.email,
        password: this.state.passwd,
        isInfluencer: this.state.isInfluencer,
      };
      let headers = new Headers();
      headers.set("Content-Type", "application/json");
      const response = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        mode: "cors",
        headers: headers,
        body: JSON.stringify(body)
      });
      if (response.status === 400) {
        this.setState({
          loading: false,
          error: "Cannot sign up",
        });
        return;
      }
      if (response.status === 201) {
        let json = await response.json();
        this.props.addToken(json.id, json.token);
        this.setState({dialogOpen: true});
      }
    } catch (err) {
      this.setState({error: "Cannot sign up"});
      console.log(err.message);
    }
    this.setState({loading: false});
  }

  render() {
    return (
      <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: '80vh'}}>
        <div className='w-100' style={{maxWidth: '500px'}}>
          {/* Username and password */}
          <Card>
            <Card.Body>
              <h2 className='text-center mb-4'>Sign Up</h2>
              {this.state.error && <Alert variant='danger'>{this.state.error}</Alert>}
              <Form onSubmit={this.submitSignUp}>
                <Form.Group id='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    onChange={e => this.updateEmail(e.target.value)}
                    value={this.state.email}
                    required
                  />
                </Form.Group>
                <Form.Group id='password'>
                  <Form.Label>password</Form.Label>
                  <Form.Control
                    type='password'
                    onChange={e => this.updatePasswd(e.target.value)}
                    value={this.state.passwd}
                    required
                  />
                </Form.Group>
                <Form.Group id='password-confirm'>
                  <Form.Label>Comfrim Password</Form.Label>
                  <Form.Control
                    type='password'
                    onChange={e => this.updateConfirmPasswd(e.target.value)}
                    value={this.state.confirmPasswd}
                    required
                  />
                </Form.Group>
                {/* Choose to sign up as user or Influencer */}
                <label>Sign up as</label>
                <select id='user' onChange={(e) => {
                  if (e.target.value === "Influencer") {
                    this.setState({isInfluencer: true});
                  }
                }}>
                  <option value='User'>User</option>
                  <option value='Influencer'>Influencer</option>
                </select>
                <Button disabled={this.state.loading} className='w-100 mt-2' type='submit'>Sign Up</Button>
              </Form>
            </Card.Body>
          </Card>
          {/* Switch to login page */}
          <p className="w-100 text-center mt-2">Have an account already? <Link to='/login'>Log in</Link></p>
        </div>
        <Dialog open={this.state.dialogOpen}>
          <DialogTitle>Food Ordering App</DialogTitle>
          <DialogContent>Signed up successfully</DialogContent>
          <DialogFooter>
            <DialogButton action="accept" isDefault onClick={() => { window.location = "/"; }}>Ok</DialogButton>
          </DialogFooter>
        </Dialog>
      </Container>
    );
  }
}

export default connect(
  null,
  { addToken },
)(SignUp);