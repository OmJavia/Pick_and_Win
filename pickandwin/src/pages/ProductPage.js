import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import products from '../products';
import BuyButton from '../components/BuyButton';

function ProductPage() {
    const { id } = useParams();
    const product = products.find((item) => item.id === id);

    if (!product) {
        return <p>Product not found.</p>;
    }

    return (
        <Container className='mt-3'>
            <Row>
                <Col>
                    <img src={product.image_url} alt={product.title} style={{ width: '100%' }} />
                </Col>
                <Col>
                    <Row>
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p><strong>Price: ${product.price}</strong></p>
                        <p><strong>Quantity Available: {product.quantity}</strong></p>
                    </Row>
                    <Row>
                       <BuyButton/>
                    </Row>
                </Col>
            </Row>
            <Row>
                <h3>HOW TO PLAY?</h3>
                <ul>
                    <li>Purchase a ticket to enter the game and qualify for prize draws.</li>
                    <li>Ticket sales close once all are sold or the purchase period ends.</li>
                    <li>Winners are chosen randomly after the ticket purchase period closes.</li>
                    <li>More tickets increase your chances, but each ticket qualifies for one win only.</li>
                    <li>Fair play is mandatory; any manipulation results in disqualification.</li>
                    <li>Keep tickets safe and check winning numbers once results are announced.</li>
                </ul>
            </Row>
        </Container>
    );
}

export default ProductPage;

