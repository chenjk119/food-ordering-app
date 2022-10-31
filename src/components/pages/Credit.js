import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUserId, getToken } from "../../redux/selectors";
import { Table } from "react-bootstrap";

const Credit = ({userId, token}) => {
  // useState for histories and credits
  const [histories, setHistories] = useState([]);
  const [credit, setCredit] = useState(0);

  /**
   * Gets the history of orders of the influencer from the api
   */
  const getHistory = async() => {
    try {
      let headers = new Headers();
      headers.set("x-access-token", token);
      const response = await fetch(`http://localhost:8000/api/histories/influencers/${userId}`, { headers: headers });
      const jsonData = await response.json();
      setHistories(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }
  
  /**
   * Gets the credit in the account of the influencer from the api
   */
  const getCredit = async() => {
    try {
      let headers = new Headers();
      headers.set("x-access-token", token);
      const response = await fetch(`http://localhost:8000/api/users/credit/${userId}`, { headers: headers });
      const jsonData = await response.json();
      setCredit(jsonData.credit);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getHistory();
    getCredit();
  }, [])

  return (
    <Fragment>
      {" "}
      <h2 className="text-center mt-5">Current Credit: {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(credit)}</h2>
      <Table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Food</th>
            <th>Details</th>
            <th>Credit</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {histories.map(history => (
            <tr key={history.id}>
              <td>Pizza</td>
              <td>Quantity: {history.quantity}, Size: {history.size}</td>
              <td>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(history.total)}</td>
              <td>
                {new Intl.DateTimeFormat("en-Us", { dateStyle: "medium", timeStyle: "short" }).format(new Date(history.createdAt))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

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
    token: token
  };
};

export default connect(mapStateToProps)(Credit);