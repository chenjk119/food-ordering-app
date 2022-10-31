import React from "react";
import { Container, Form, Button, Card, Alert} from "react-bootstrap";
import { Link } from "react-router-dom";
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
} from "@material/react-dialog";
import { connect } from "react-redux";
import { addToken } from "../../redux/action";

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      passwd: "",
      error: "",
      loading: false,
      dialogOpen: false,
    };
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

  /**
   * Posts user input to api and validates to log in
   */
  submitLogin = async(e) => {
    e.preventDefault();

    try {
      this.setState({
        error: "",
        loading: true,
      });
      const body = {
        email: this.state.email,
        password: this.state.passwd,
      };
      let headers = new Headers();
      headers.set("Content-Type", "application/json");
      const response = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        mode: "cors",
        headers: headers,
        body: JSON.stringify(body)
      });
      if (response.status === 404) {
        this.setState({
          loading: false,
          error: "User not found"
        });
        return;
      }
      if (response.status === 400) {
        this.setState({
          loading: false,
          error: "Cannot log in",
        });
        return;
      }
      if (response.status === 200) {
        let json = await response.json();
        this.props.addToken(json.id, json.token);
        this.setState({dialogOpen: true});
      }
    } catch (err) {
      this.setState({error: "Cannot log in"});
      console.log(err.message);
    }
    this.setState({loading: false});
  }

  render() {
    return (
      <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: '80vh'}}>
        <div className='w-100' style={{maxWidth: '500px'}}>
          <Card>
            <Card.Body>
              <h2 className='text-center mb-4'>Log In</h2>
              {this.state.error && <Alert variant='danger'>{this.state.error}</Alert>}
              <Form onSubmit={this.submitLogin}>
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
                <Button disabled={this.state.loading} className='w-100 mt-2' type='submit'>Log In</Button>
              </Form>
            </Card.Body>
          </Card>
          <p className="w-100 text-center mt-2">Need a new account? <Link to='/signup'>Sign Up</Link></p>
        </div>
        <Dialog open={this.state.dialogOpen}>
          <DialogTitle>Food Ordering App</DialogTitle>
          <DialogContent>Logged in successfully</DialogContent>
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
)(Login);