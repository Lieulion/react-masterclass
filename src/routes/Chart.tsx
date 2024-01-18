import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
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
function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
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
              mode: "dark",
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
              categories: data?.map((date) => {
                const time = new Date(date.time_close * 1000);
                return time.toLocaleDateString();
              }),
              axisBorder: { show: true },
              axisTicks: { show: true },
              labels: { show: true },
            },
            grid: {
              show: true,
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
          }}
        />
      )}
    </div>
  );
}
export default Chart;
