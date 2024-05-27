import { Box, Button, Flex, Text } from "@chakra-ui/react";

import {
  Table,
  TableCaption,
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
    <Box
      id="cashFlowSummary"
      bgColor={"white"}
      m={{ sm: 2, md: 3, lg: 5 }}
      p={{ sm: 2, md: 3, lg: 5 }}
      borderRadius={5}
    >
      <Flex justify={"space-between"} my={5} flexWrap={"wrap"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={600}>
            Cashflow Summery-1
          </Text>
        </Box>

        <Flex gap={2} flexWrap={"wrap"}>
          <Button>Decimal View</Button>
          <Button>Percentage View</Button>
        </Flex>
      </Flex>
      <Box
        maxH="300px"
        borderWidth="1px"
        borderRadius="md"
        width="100%"
        overflowX="scroll"
        overflowY="scroll"
      >
        {/* <TableContainer> */}
        <Table size={{ base: "sm", lg: "md" }}>
          <TableCaption>{""}</TableCaption>
          <Thead position="sticky" top="0" bg="gray.100" zIndex="docked">
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
                <Tr key={item.Overhead + i}>
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
        {/* </TableContainer> */}
      </Box>
    </Box>
  );
};

export { CashflowSummary };
