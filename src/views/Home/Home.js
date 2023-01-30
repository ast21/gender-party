import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import {ReactComponent as Bear} from "./../../images/bear.svg";
import {Chart as ChartJS, ArcElement, Tooltip} from "chart.js";
import {Pie} from "react-chartjs-2";
import {useEffect, useState} from "react";
import API from "../../api";

ChartJS.register(ArcElement, Tooltip);

function hexToRGB(hex, alpha) {
  let
    r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } else {
    return `rgb(${r}, ${g}, ${b})`;
  }
}

function Home() {
  const [voteData, setVoteData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [form, setForm] = useState({
    name: null,
    gender_id: null,
  });

  const data = {
    labels: genderData.map((val) => val.name),
    datasets: [
      {
        label: '# Ответы',
        data: genderData.map((val) => val.votes_count),
        backgroundColor: genderData.map((val) => hexToRGB(val.color, 1)),
        // borderColor: genderData.map((val) => hexToRGB(val.color)),
        borderWidth: 0,
      },
    ],
  };

  useEffect(() => {
    getVotes();
    getGenders();
  }, []);

  function getVotes() {
    API
      .get(`/gp/votes`)
      .then(({ data }) => setVoteData(data))
      .catch((error) => {
        console.error('get votes:', error);
      });
  }
  function getGenders() {
    API
      .get('/gp/genders')
      .then(({ data }) => setGenderData(data))
      .catch((error) => {
        console.error('get genders:', error);
      });
  }

  function setNameToForm(e) {
    setForm((prevState) => {
      return {...prevState, name: e.target.value}
    });
  }

  function setGenderIdToForm(id) {
    setForm((prevState) => {
      return {...prevState, gender_id: id}
    });
  }

  function sendVote() {
    API
      .post('/gp/votes', form)
      .then(() => {
        getVotes()
        getGenders()
      })
      .catch((error) => {
        console.error('post votes:', error);
      });
  }

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
        <h3 className="mb-5 mt-5">
          Мы понимаем что не все смогут присутствовать в такой знаменательный день,
          поэтому нам пришла идея создать сайт для того чтобы вы тоже смогли участвовать в Гендер-Пати!
        </h3>

        <div className="voting">
          <h1>Голосование</h1>
          <Form.Group className="mb-4" controlId="inputName">
            <Form.Control type="text" size="lg" placeholder="Введите имя и фамилию" onChange={(e) => setNameToForm(e)}/>
          </Form.Group>
          <Row className="gender-container">
            {genderData.map((val) => (
              <Col key={val.id}>
                <div className={`gender ${val.code}`} onClick={() => setGenderIdToForm(val.id)}>
                  <Bear fill={val.color}/>
                  <h1 className="title">{val.name}</h1>
                </div>
              </Col>
            ))}
          </Row>
          <Button className="mb-5" onClick={() => sendVote()}>
            Отправить
          </Button>
          <hr/>

          <Row>
            <Col md={4}>
              <Pie data={data}/>
            </Col>

            <Col md={8}>
              <Table striped bordered hover>
                <tbody>
                  {voteData.map((val) => {
                    return <tr key={val.id}>
                      <td>{val.id}</td>
                      <td>{val.name}</td>
                      <td>{val.gender}</td>
                    </tr>;
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default Home;
