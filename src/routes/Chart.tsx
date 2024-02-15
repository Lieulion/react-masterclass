import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";
import styled from "styled-components";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
interface IHistorical {
  time_open: string;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;
function Chart({ coinId }: ChartProps) {
  //
  const chartCandleMatch = useRouteMatch("/:coinId/chart/candleStick");
  const chartLineMath = useRouteMatch("/:coinId/chart/Line");
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      //refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price2",
              data: [1, 2, 3, 4, 5, 6],
            },
            {
              name: "Price",
              data: data?.map((price) => price.close) as number[],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            xaxis: {
              // categories: data?.map((date) => {
              //   const time = new Date(date.time_close * 1000);
              //   return time.toLocaleDateString();
              // }),
              categories: data?.map((price) =>
                new Date(price.time_close * 1000).toUTCString()
              ),
              axisBorder: { show: true },
              axisTicks: { show: true },
              labels: { show: false },
              type: "datetime",
            },
            grid: {
              show: true,
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
              colors: ["#0fbcf9"],
            },
            tooltip: {
              y: {
                formatter: (value) => `$ ${value?.toFixed(3)}`,
                //값을 소숫점 셋째자리 까지
              },
            },
          }}
        />
      )}
    </div>
  );
}
export default Chart;
