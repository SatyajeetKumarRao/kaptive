import { Box, Button, Flex, Heading, Select, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
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

      // Add the computed values to the monthlyData array
      return {
        month,
        revenue: revenue.toFixed(2),
        cogs: cogs.toFixed(2),
        grossProfit: grossProfit.toFixed(2),
      };
    });

    return monthlyData;
  };

  // Processed data
  const filteredData = useMemo(() => getMonthlyData(data), [data]);

  // Customized label for XAxis
  const CustomizedLabel = ({ x, y, value }) => (
    <Text x={x} y={y} dy={-5} fontSize="10px" textAnchor="middle">
      {value}
    </Text>
  );

  return (
    <Box id="cashFlowChart" bgColor={"white"} m={5} p={5} borderRadius={5}>
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
            <Select placeholder="Select Term">
              <option value="monthly">Monthly </option>
              <option value="quarterly">Quarterly</option>
            </Select>
          </Box>
        </Flex>
      </Flex>
      <Box mt={10} p={4} borderWidth="1px" borderRadius="md">
        <Heading size="md" mb={4}>
          Revenue, COGS, and Gross Profit by Month
        </Heading>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"

              // tick={<CustomizedLabel />}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="revenue"
              fill="#B588D2"
              name="Revenue"
              //   label={{ position: "top" }}
            />
            <Bar
              dataKey="cogs"
              fill="#00B2F3"
              name="COGS"
              //   label={{ position: "top" }}
            />
            <Bar
              dataKey="grossProfit"
              fill="#ffc658"
              name="Gross Profit"
              //   label={{ position: "top" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export { CashFlowCharts };
