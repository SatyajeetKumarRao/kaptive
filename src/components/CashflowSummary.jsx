import { Box, Button, Flex, Text } from "@chakra-ui/react";

import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
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
      <Flex justify={"space-between"} my={5}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={600}>
            CashSummery - 1
          </Text>
        </Box>

        <Flex gap={2}>
          <Button>Decimal View</Button>
          <Button>Percentage View</Button>
        </Flex>
      </Flex>
      <Box maxH="300px" overflowY="auto" borderWidth="1px" borderRadius="md">
        <TableContainer>
          <Table variant="simple">
            <TableCaption>{""}</TableCaption>
            <Thead>
              <Tr>
                <Th maxW={"200px"} minW={"200px"} whiteSpace={"wrap"}>
                  CashFlow
                </Th>
                {monthNames.map((month) => {
                  return <Th key={month}>{month}</Th>;
                })}
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item, i) => {
                return (
                  <Tr key={item.Overhead}>
                    {Object.keys(item).map((key) => {
                      return (
                        <Td
                          key={key}
                          maxW={i === 0 ? "200px" : ""}
                          minW={i === 0 ? "200px" : ""}
                          whiteSpace={"wrap"}
                        >
                          {item[key]}
                        </Td>
                      );
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
