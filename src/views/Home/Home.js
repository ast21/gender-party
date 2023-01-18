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
    </>
  );
}

export default Home;
