import styled from "styled-components";

interface IPriceProps {
  percent30m: number | undefined;
  percent1h: number | undefined;
  percent12h: number | undefined;
  percent7d: number | undefined;
  percent30d: number | undefined;
  percent1y: number | undefined;
}

const Container = styled.div`
  display: grid;
  justify-items: center;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
`;

const Box = styled.div`
  background-color: ${(props) => props.theme.divColor};
  padding: 20px;
  border-radius: 15px;
  width: 100%;
`;

const Time = styled.span`
  font-size: 18px;
  display: block;
  margin-bottom: 10px;
  color: ${(props) => props.theme.grayText};
  font-weight: 600;
  @media screen and (max-width: 440px) {
    font-size: 15px;
  }
  @media screen and (max-width: 400px) {
    font-size: 13px;
  }
`;

const PercentBox = styled.div<{ percent: number | undefined }>`
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: ${(props) =>
    props.percent
      ? props.percent > 0
        ? "#DA5157"
        : props.percent < 0
        ? "#4880EE"
        : "#000"
      : "none"};
`;

const Percent = styled.span`
  font-size: 35px;
  font-weight: 600;
  @media screen and (max-width: 440px) {
    font-size: 30px;
  }
  @media screen and (max-width: 400px) {
    font-size: 25px;
  }
`;

function Price({
  percent30m,
  percent1h,
  percent12h,
  percent7d,
  percent30d,
  percent1y,
}: IPriceProps) {
  const percentList = [
    { text: "30m", value: percent30m },
    { text: "1h", value: percent1h },
    { text: "12h", value: percent12h },
    { text: "7d", value: percent7d },
    { text: "30d", value: percent30d },
    { text: "1y", value: percent1y },
  ];
  const mql = matchMedia("screen and (min-width: 400px)");
  return (
    <Container>
      {percentList.map((item) => (
        <Box key={item.text}>
          <Time>From {item.text} ago</Time>
          <PercentBox percent={item.value}>
            <Percent>
              {item.value && item.value > 0
                ? `+${item.value}%`
                : `${item.value}%`}
            </Percent>
            {item.value ? (
              item.value > 0 ? (
                mql.matches ? (
                  <i className="fa-solid fa-arrow-trend-up fa-2x"></i>
                ) : (
                  <i className="fa-solid fa-arrow-trend-up fa-lg"></i>
                )
              ) : item.value < 0 ? (
                mql.matches ? (
                  <i className="fa-solid fa-arrow-trend-down fa-2x"></i>
                ) : (
                  <i className="fa-solid fa-arrow-trend-down fa-lg"></i>
                )
              ) : mql.matches ? (
                <i className="fa-solid fa-minus fa-2x"></i>
              ) : (
                <i className="fa-solid fa-minus fa-lg"></i>
              )
            ) : mql.matches ? (
              <i className="fa-solid fa-minus fa-2x"></i>
            ) : (
              <i className="fa-solid fa-minus fa-lg"></i>
            )}
          </PercentBox>
        </Box>
      ))}
    </Container>
  );
}

export default Price;
