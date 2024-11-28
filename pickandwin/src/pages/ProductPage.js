import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios'; // Import axios
import BuyButton from '../components/BuyButton';

function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true); // To handle loading state
    const [error, setError] = useState(null); // To handle error state

    // Fetch product data on mount
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/getproduct`, {
                    params: { id: id }, // Send product ID as query parameter
                });
                setProduct(response.data); // Set the product data
            } catch (error) {
                setError('Error fetching product data');
                console.error('Error fetching product data:', error);
            } finally {
                setLoading(false); // Set loading to false after the request completes
            }
        };

        fetchProduct();
    }, [id]); // Re-run the effect when the product ID changes

    // If loading or error, show appropriate message
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    // If product is not found, show a message
    if (!product) {
        return <p>Product not found.</p>;
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={6}>
                    <img src={product.image_url} alt={product.title} className="img-fluid" />
                </Col>
                <Col md={6}>
                    <Row className="mb-3">
                        <h2>{product.title}</h2>
                    </Row>
                    <Row className="mb-3">
                        <p>{product.description}</p>
                    </Row>
                    <Row className="mb-3">
                        <p><strong>Price: ${product.price}</strong></p>
                    </Row>
                    <Row className="mb-3">
                        <p><strong>Quantity Available: {product.quantity}</strong></p>
                    </Row>
                    <Row className="mb-3">
                        <BuyButton />
                    </Row>
                </Col>
            </Row>
            <Row className="mt-4">
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
