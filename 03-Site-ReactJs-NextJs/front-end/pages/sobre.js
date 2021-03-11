import Menu from '../components/Menu';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Jumbotron, Container } from 'reactstrap';

const Sobre = (data) => (
    <div>
        <Menu />
        <Jumbotron fluid className="head-sobre">
            <style>{`.head-sobre{
                    padding-top: 80px;
                    padding-bottom: 80px;
                    background-color: #000;
                    color: #fff;
                    margin-bottom: 0rem !important;
                }`}</style>
            <Container>
                <div className="text-center">
                    <h1 className='display-4'>Sobre a Empresa</h1>
                </div>
            </Container>
        </Jumbotron>

        <Jumbotron fluid className="sobre">
            <style>{`.sobre{
                padding-top: 80px;
                padding-bottom: 80px;
                background-color: #fff;
                margin-bottom: 0rem !important;
            }
            .featurette-divider {
                margin: 5rem 0; 
              }`}</style>
            <Container>
                <div>
                    {data.response.sobre.map(sobre => (
                        <div key={sobre._id}>
                            <div className="row featurette">
                                <div className="col-md-7 order-md-2">
                                    <h2 className="featurette-heading">{sobre.titulo} </h2>
                                    <p className="lead">{sobre.descricao}</p>
                                </div>
                                <div className="col-md-5 order-md-1">
                                    <img src={data.response.urlFile + sobre.fileName} className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" />
                                </div>
                            </div>

                            <hr className="featurette-divider"></hr>
                        </div>
                    ))}

                </div>
            </Container>
        </Jumbotron>

    </div>
);

Sobre.getInitialProps = async () => {
    var response = await axios.get('http://localhost:8080/sobre');
    /*console.log(response.data)*/
    return { response: response.data }
}

export default Sobre
