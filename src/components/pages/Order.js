import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import pizza from '../../img/pizza.jpeg'
import pizzaIcon from '../../img/pizzaIcon.png'
import styles from '../../styles/Order.module.css'


export default function Order() {
  // useState for quantity, size and total price
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(0);
  const [total, setTotal] = useState(15.8);

  // Pizza description
  const pizzaDesc = {
    id: 1,
    price: [15.8, 19.8, 24.8],
    desc: 'Order pizza for your favorite influencer now'
  }

  // Gets the id and email of the influencer from the previous page
  const location = useLocation();
  const { influencerId, influencerEmail } = location.state;

  return (
    <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: '80vh'}}>
      <div className='w-100' style={{maxWidth: '500px'}}>
        <div>
          <div>
            {/* Pizza image displayed at the top of the page */}
            <img src={pizza} alt='' width='500' height='400' layout='fill'/>
          </div>
        </div>
        <div>
          <div>
            {/* Display size and price */}
            <h1>pizza</h1>
            <p>{pizzaDesc.desc}</p>
            <span className={styles['price']}>${pizzaDesc.price[size]}</span>
            <h3>Choose a size</h3>
            <div className={styles['sizes']}>
              <div onClick={() => {
                setSize(0);
                setTotal(15.8);
              }}>
                {/* Display three different sizes and click to change price */}
                <img src={pizzaIcon} alt='' className={styles['size_s']}/>
                <span className={styles['size']}>Small</span>
              </div>
              <div onClick={() => {
                setSize(1);
                setTotal(19.8);
              }}>
                <img src={pizzaIcon} alt='' className={styles['size_m']}/>
                <span className={styles['size']}>Medium</span>
              </div>
              <div onClick={() => {
                setSize(2);
                setTotal(24.8);
              }}>
                <img src={pizzaIcon} alt='' className={styles['size_l']}/>
                <span className={styles['size']}>Large</span>
              </div>
            </div>
            {/* More options to choose from */}
            <h3>More options</h3>
            <div className={styles['ingredients']}>
              <div className={styles['option']}>
                <input 
                  type='checkbox'
                  id='onion'
                  name='onion'
                  className={styles['checkbox']}
                />
                <label htmlFor='double'>Onions</label>
              </div>
              <div className={styles['option']}>
                <input 
                  type='checkbox'
                  id='mushroom'
                  name='mushroom'
                  className={styles['checkbox']}
                />
                <label htmlFor='cheese'>Mushrooms</label>
              </div>
              <div className={styles['option']}>
                <input 
                  type='checkbox'
                  id='cheese'
                  name='cheese'
                  className={styles['checkbox']}
                />
                <label htmlFor='sauce'>Extra Cheese</label>
              </div>
            </div>
            <div>
              {/* Choose quantity */}
              <input 
                type='number'
                defaultValue={1}
                className={styles['quantity']}
                onChange={e => {
                  setQuantity(e.target.value);
                  setTotal(total * e.target.value);
                }}
              />
              {/* Link to payment page */}
              <Link
                to='/payment'
                state={{
                  influencerId: influencerId,
                  influencerEmail: influencerEmail,
                  quantity: quantity,
                  size: size,
                  total: total,
                }}
                style={{ textDecoration: 'none' }}>
                <button className={styles['button']}>Continute to Payment</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}