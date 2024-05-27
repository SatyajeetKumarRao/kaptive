import { Box, Button, Flex, Heading, Select, useModal } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CashFlowCharts = ({ data = [] }) => {
  const getMonthlyData = (data) => {
    const months = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Iterate through months to compute Revenue, COGS, and Gross Profit for each month
    const monthlyData = months.map((month) => {
      let revenue = 0;
      let cogs = 0;
      let grossProfit = 0;

      // Accumulate values for each category (Revenue, COGS, Gross Profit) for the current month
      data.forEach((row) => {
        if (
          row.Overhead === "Accrued Revenue" ||
          row.Overhead === "Deferred Revenue"
        ) {
          revenue += row[month];
        } else if (
          [
            "COGS - Labour",
            "COGS - Raw Material",
            "COGS - Freight",
            "COGS - Overheads",
            "COGS - Other",
          ].includes(row.Overhead)
        ) {
          cogs += row[month];
        } else if (row.Overhead === "Gross Profit") {
          grossProfit += row[month];
        }
      });

      return {
        month,
        revenue: revenue,
        cogs: cogs,
        grossProfit: grossProfit,
      };
    });

    return monthlyData;
  };

  const filteredData = useMemo(() => getMonthlyData(data), [data]);

  const [timePeriod, setTimePeriod] = useState("monthly");

  const getQuarterlyData = () => {
    const quarterlyData = [];

    for (let i = 0; i < 4; i++) {
      let start = i * 3;
      let end = start + 3;

      const quarterRawData = filteredData.slice(start, end);

      let revenue = 0;
      let cogs = 0;
      let grossProfit = 0;

      quarterRawData.forEach((data) => {
        revenue += data.revenue;
        cogs += data.cogs;
        grossProfit += data.grossProfit;
      });

      quarterlyData.push({
        month: "Quarter" + (i + 1),
        revenue: revenue,
        cogs: cogs,
        grossProfit: grossProfit,
      });
    }

    return quarterlyData;
  };

  const filteredQuarterlyData = useMemo(() => getQuarterlyData(), [data]);

  const gatHalfYearlyData = () => {
    const halfYearlyData = [];

    for (let i = 0; i < 2; i++) {
      let start = i * 6;
      let end = start + 6;

      const halfYearlyRawData = filteredData.slice(start, end);

      let revenue = 0;
      let cogs = 0;
      let grossProfit = 0;

      halfYearlyRawData.forEach((data) => {
        revenue += data.revenue;
        cogs += data.cogs;
        grossProfit += data.grossProfit;
      });

      halfYearlyData.push({
        month: "Half Year" + (i + 1),
        revenue: revenue,
        cogs: cogs,
        grossProfit: grossProfit,
      });
    }

    return halfYearlyData;
  };

  const filteredHalfYearlyData = useMemo(() => gatHalfYearlyData(), [data]);

  return (
    <Box
      id="cashFlowChart"
      bgColor={"white"}
      m={{ sm: 2, md: 3, lg: 5 }}
      p={{ sm: 2, md: 3, lg: 5 }}
      borderRadius={5}
    >
      <Flex wrap={"wrap"} justify={"space-between"}>
        <Flex gap={2} wrap={"wrap"}>
          <Button>Summary</Button>
          <Button>Balance Sheet</Button>
          <Button>Income Statement</Button>
          <Button>CashFlow</Button>
          <Button>+</Button>
        </Flex>

        <Flex gap={2} wrap={"wrap"}>
          <Button>Normal View</Button>
          <Button>Growth View</Button>

          <Box>
            <Select placeholder="Select View">
              <option value="normal">Normal View</option>
              <option value="growth">Growth View</option>
            </Select>
          </Box>
          <Box>
            <Select
              value={timePeriod}
              onChange={(e) => {
                setTimePeriod(e.target.value);
              }}
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="halfYearly">Half Yearly</option>
            </Select>
          </Box>
        </Flex>
      </Flex>
      <Box
        mt={10}
        p={4}
        borderWidth="1px"
        borderRadius="md"
        width="100%"
        overflowX="auto"
      >
        <Box width={{ base: "700px", md: "100%" }}>
          <Heading size="md" mb={4}>
            Revenue, COGS, and Gross Profit by Month
          </Heading>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={
                timePeriod == "monthly"
                  ? filteredData
                  : timePeriod == "quarterly"
                  ? filteredQuarterlyData
                  : filteredHalfYearlyData
              }
              margin={{
                top: 10,
                right: 10,
                left: 50,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                fontSize="12px"

                // tick={<CustomizedLabel />}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="revenue"
                fill="#b888dc"
                name="Revenue"
                //   label={{ position: "top" }}
              />
              <Bar
                dataKey="cogs"
                fill="#01b1f2"
                name="COGS"
                //   label={{ position: "top" }}
              />
              <Bar
                dataKey="grossProfit"
                fill="#ee7d34"
                name="Gross Profit"
                //   label={{ position: "top" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export { CashFlowCharts };
