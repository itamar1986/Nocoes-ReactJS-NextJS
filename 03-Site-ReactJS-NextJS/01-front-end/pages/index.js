import React from 'react';
import axios from 'axios';
import Head from 'next/head';

import Menu from '../components/Menu';

import { Jumbotron, Container } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

const Home = (data) => (
    <div>
        <Head>
            <title>Home</title>
            <meta name='description' content='Site de ... sobre ...' />
        </Head>
        <Menu />
        <Jumbotron fluid className="servicos">
            <style>{`.servicos{
                    padding-top: 80px;
                    padding-bottom: 80px;
                    background-color: #000;
                    color: #fff;
                    margin-bottom: 0rem !important;
                }
                .circulo{
                    width:140px;
                    height: 140px;
                    background-color: #fed136;
                    font-size: 52px;
                    padding-top: 24px;
                }
                .centralizar{
                    margin: 0 auto !important;
                    float: none !important;
                }`}</style>
            <Container className='text-center'>
                <div>
                    <h1 className='display-4'>{data.response.titulo}</h1>
                    <p className='lead pb-4'>{data.response.subtitulo}</p>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="rounded-circle circulo centralizar">
                            <FontAwesomeIcon icon={data.response.servUmIcone} />
                        </div>
                        <h2 className='mt-4 mb-4'>{data.response.servUmTitulo}</h2>
                        <p>{data.response.servUmDescricao}</p>
                    </div>
                    <div className="col-lg-4">
                        <div className="rounded-circle circulo centralizar">
                            <FontAwesomeIcon icon={data.response.servDoisIcone} />
                        </div>
                        <h2 className='mt-4 mb-4'>{data.response.servDoisTitulo}</h2>
                        <p>{data.response.servDoisDescricao}</p>
                    </div>
                    <div className="col-lg-4">
                        <div className="rounded-circle circulo centralizar">
                            <FontAwesomeIcon icon={data.response.servTresIcone} />
                        </div>
                        <h2 className='mt-4 mb-4'>{data.response.servTresTitulo}</h2>
                        <p>{data.response.servTresDescricao}</p>
                    </div>
                </div>
            </Container>
        </Jumbotron>
    </div>
);

Home.getInitialProps = async () => {
    var response = await axios.get('http://localhost:8080/home');
    //console.log(response.data);
    return { response: response.data }
}

export default Home;
