import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import {Col, Container, Image, Spinner} from "react-bootstrap";
import {PokemonData} from "../../interfaces/PokemonModel";

const Details = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<PokemonData>();
    useEffect(() => {
        const fetchPokemonDetails = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
                setData(res.data)
                setLoading(false)
            }
            catch (e) {
                console.error(e);
            }
        }
        fetchPokemonDetails().catch();
    },[])
    return (
        <Container>
            {loading ?
                <Spinner className='loader' animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> : (
                    <Container className='poke-card'>
                        <Col className='justify-content-center d-flex mt-5'>
                            <Image className='poke-image' src={data?.sprites.front_default}/>
                        </Col>
                        <Col className='justify-content-center d-flex'>
                            <div><b>Name:</b> {data?.name}</div>
                        </Col>
                        <Col className='justify-content-center d-flex'>
                            <div><b>Type:</b> {data?.types[0].type.name}</div>
                        </Col>
                        <Col className='justify-content-center d-flex'>
                            <div><b>Height:</b> {data?.height}</div>
                        </Col>
                        <Col className='justify-content-center d-flex'>
                            <div><b>Weight:</b> {data?.weight}</div>
                        </Col>
                        <Col className='justify-content-center d-flex'>
                            <div><b>Base experience:</b> {data?.base_experience}</div>
                        </Col>
                    </Container>
                )}
        </Container>
    );
};

export default Details;