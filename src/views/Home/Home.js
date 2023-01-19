import {Col, Container, Form, Row} from "react-bootstrap";
import {ReactComponent as Bear} from "./../../images/bear.svg";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

const data = {
  labels: ['Мальчик', 'Девочка'],
  datasets: [
    {
      label: '# Ответы',
      data: [19, 2],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

function Home() {
  return (
    <>
      <div className="first-screen">
        <div className="first-screen_title">
          <span>Мы рады что в этот</span>
          <span>важный день</span>
          <span>вы с нами</span>
        </div>

        <div className="timer">
          <span className="title">До конца голосования осталось</span>
          <div className="cells">
            <div className="days">
              <span className="number">14</span>
              <span className="title">дней</span>
            </div>
            <div className="hours">
              <span className="number">14</span>
              <span className="title">часов</span>
            </div>
            <div className="minutes">
              <span className="number">14</span>
              <span className="title">минут</span>
            </div>
            <div className="seconds">
              <span className="number">14</span>
              <span className="title">секунд</span>
            </div>
          </div>
        </div>
      </div>

      <Container style={{padding: '150px'}}>
        <div className="voting">
          <h1>Голосование</h1>
          <Form.Group className="mb-4" controlId="inputName">
            <Form.Control type="text" size="lg" placeholder="Введите имя и фамилию"/>
          </Form.Group>
          <Row className="gender-container">
            <Col>
              <div className="gender male">
                <Bear fill="#5663F6"/>
                <h1 className="title">Мальчик</h1>
              </div>
            </Col>
            <Col>
              <div className="gender female">
                <Bear fill="#CC8DFF"/>
                <h1 className="title">Девочка</h1>
              </div>
            </Col>
          </Row>
          <hr/>

          <Row>
            <Col md={4}>
              <Pie data={data}/>
            </Col>
            <Col md={8}>
              <div>This table</div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default Home;
