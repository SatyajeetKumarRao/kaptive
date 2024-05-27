import { Box } from "@chakra-ui/react";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const CashflowSummary = ({ data = [] }) => {
  const monthNames = [
    "January",
    "February",
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

  return (
    <Box id="cashFlowTable" bgColor={"white"} m={5} p={5} borderRadius={5}>
      <Box maxH="300px" overflowY="auto" borderWidth="1px" borderRadius="md">
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>CashFlow</Th>
                {monthNames.map((month) => {
                  return <Th key={month}>{month}</Th>;
                })}
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item) => {
                return (
                  <Tr key={item.Overhead}>
                    {Object.keys(item).map((key) => {
                      return <Td key={key}>{item[key]}</Td>;
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export { CashflowSummary };
