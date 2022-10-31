import React, { useState } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
} from "@material/react-dialog";
import { connect } from "react-redux";
import { getToken, getUserId } from "../../redux/selectors";


const Payment = ({userId, token}) => {
  // useState for loading, message, and dialoOpen
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  // Gets the infomation from the previous page
  const location = useLocation();
  const { influencerId, influencerEmail, quantity, size, total } = location.state;

  /**
   * Creates a history in the api, updates the credit of the influencer and sends email to the influencer
   */
  const placeOrder = async(e) => {
    e.preventDefault();

    try {
      setLoading(true);
      let sizeStr;
      switch(size) {
        case 0:
          sizeStr = "Small";
          break;
        case 1:
          sizeStr = "Medium";
          break;
        case 2:
          sizeStr = "Large";
          break;
        default:
          sizeStr = "";
      }
      const creditBody = {
        credit: total,
      };
      const historyBody = {
        influencerId: influencerId,
        quantity: quantity,
        size: sizeStr,
        total: total,
      };
      let headers = new Headers();
      headers.set("Content-Type", "application/json")
      headers.append("x-access-token", token);
      fetch(`http://localhost:8000/api/users/credit/${influencerId}`, {
        method: "PUT",
        mode: "cors",
        headers: headers,
        body: JSON.stringify(creditBody),
      });
      fetch(`http://localhost:8000/api/histories/users/${userId}`, {
        method: "POST",
        mode: "cors",
        headers: headers,
        body: JSON.stringify(historyBody),
      });
      setDialogOpen(true);
      emailjs.send("service_5pofts6","template_ec2x788",{
        message: message,
        email: influencerEmail,
      },"MUFkdv-5z4ISILJfS");
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
        <Card>
          <Card.Body>
            <h2 className='text-center mb-4'>Pay with Card</h2>
            {/* Card info */}
            <Form>
              <Form.Group id='card-number' className='mt-3'>
                <Form.Label>Card Number</Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group id='exp-date' className='mt-3'>
                <Form.Label>Expiration Date (MM/YY)</Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group id='CVC' className='mt-3'>
                <Form.Label>CVC</Form.Label>
                <Form.Control type='password' />
              </Form.Group>
              <Form.Group id='message' className='mt-3'>
                <Form.Label>Your message to him/her</Form.Label>
                <Form.Control onChange={(e) => setMessage(e.target.value)} as='textarea' row={3} />
              </Form.Group>
              <Button type='submit' className='w-100 mt-3' disabled={loading} onClick={placeOrder}>Place Order</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <Dialog open={dialogOpen}>
        <DialogTitle>Food Ordering App</DialogTitle>
        <DialogContent>Order placed successfully</DialogContent>
        <DialogFooter>
          <DialogButton action="accept" isDefault onClick={() => { window.location = "/"; }}>Ok</DialogButton>
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
    
export default connect(mapStateToProps)(Payment);