import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Image, ListGroup, Row, Spinner} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {PokemonData} from "../../interfaces/PokemonModel";

const Home = () => {
    let initialLimit:number = 20;
    const [data, setData] = useState<PokemonData[]>([]);
    const [phrase, setPhrase] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [limit, setLimit] = useState(initialLimit);

    const pokes = (async (url:string) => {
        try {
            const { data } = await axios.get(url)
            return data
        }
        catch (e) {
            console.log(e)
        }
        return null
    })

    useEffect(() => {
        const fetchPokemons = async () => {
            setLoading(true)
            try {
                const {data : resData} = await axios.get('https://pokeapi.co/api/v2/pokemon', {
                    params: {
                        limit: limit
                    }
                })
                setLoading(false)
                const pokeData = await resData.results.map(async (result:any) => {
                    const copyPokes = await pokes(result.url)
                    return {...result, ...copyPokes}
                })
                const details = [];
                Promise.all(pokeData).then(
                    (results) => {
                        details.push(results);
                        setData(results)
                        console.log(results)
                    }
                )
                return pokeData
            }
            catch (e) {
                console.error(e);
            }
        }
        fetchPokemons().catch();
    },[limit])
    console.log(data)

    return (
        <Container>
            {loading ? (
                <Spinner className='loader' animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>) :
                (
                <Container>
                    <Col className='d-flex justify-content-center mt-5 mb-3'>
                        <h2>Welcome to the Pokédex</h2>
                    </Col>
                    <Col sm={3} className='justify-content-center m-auto'>
                        <Form onChange={(e) => {
                            setPhrase((e.target as HTMLInputElement).value);
                        }}>
                            <Form.Group className="mb-3" controlId="formSearch">
                                <Form.Control type="text" placeholder="Enter Pokémon name" />
                            </Form.Group>
                        </Form>
                    </Col>
                    {data?.filter( function(poke) {
                        return poke.name.toLocaleLowerCase().includes(phrase.toLocaleLowerCase().trim())
                    }).map((key) => (
                        <Row>
                            <ListGroup>
                                <ListGroup.Item>
                                    <Row>
                                        <Col sm={2}>
                                            <Image src={key?.sprites?.front_default}/>
                                        </Col>
                                        <Col className='justify-content-start m-auto'>
                                            <div><b>Name:</b> {key?.name}</div>
                                            <div><b>Type:</b> {key?.types[0].type.name}</div>
                                        </Col>
                                        <Col className='justify-content-end d-flex m-auto'>
                                            <Button onClick={() => navigate(`${key.id}`)}>Details</Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Row>
                    ))}
                    <Col className='justify-content-center d-flex m-auto mt-3 mb-3'>
                        <Button onClick={() => setLimit(limit + 5)}>Load more Pokémons</Button>
                        <Button className='mx-3' onClick={() => setLimit(initialLimit)}>Reset</Button>
                    </Col>
                </Container>)
            }
        </Container>
    );
};

export default Home;