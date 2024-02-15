import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";

interface IPriceProps {
  coinId: string;
}

interface ICoinHistory {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

const Message = styled.span`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  display: block;
  color: ${(props) => props.theme.textColor};
`;

function CandleStick({ coinId }: IPriceProps) {
  const isDark = useRecoilState(isDarkAtom);
  const { isLoading, data } = useQuery<ICoinHistory[]>(
    ["history", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 5000,
    }
  );
  const exceptData = data ?? [];
  let chartData = null;
  if (Array.isArray(data)) {
    chartData = exceptData?.map((i) => {
      return {
        x: i.time_close,
        y: [i.open, i.high, i.low, i.close],
      };
    });
  }
  return (
    <div>
      {isLoading ? (
        <Message>Loading chart...</Message>
      ) : chartData ? (
        <ApexChart
          type="candlestick"
          series={[{ data: chartData }]}
          options={{
            theme: {
              mode: isDark[0] ? "light" : "dark",
            },
            chart: {
              height: 500,
              width: 500,
              background: "transparent",
              toolbar: { show: false },
            },
            tooltip: {
              y: {
                formatter: (value) =>
                  `$${Number(value.toFixed(2)).toLocaleString()}`,
              },
            },
            grid: {
              show: false,
            },
            xaxis: {
              labels: {
                show: false,
              },
              type: "datetime",
            },
            yaxis: {
              labels: {
                show: false,
              },
              tooltip: {
                enabled: true,
              },
            },
          }}
        />
      ) : (
        <Message>Price data not found</Message>
      )}
    </div>
  );
}

export default CandleStick;
