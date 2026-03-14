/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {
  Table,
  Tr,
  Th,
  Td,
  Text,
  useColorModeValue,
  Progress,
  Box,
} from "@chakra-ui/react";
import {
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableFooter,
} from "@mui/material";
import { useQuery } from "react-query";
import EcosystemTokenQuick from "./EcosystemTokenQuick";
import numbro from "numbro";
import { fetchCovalentData, getChainItems } from "../../../utils/api";

const tableStyles = {
  minWidth: 750,
};

const tableContainerStyles = {
  borderRadius: 15,
  margin: "10px 10px",
  maxWidth: 1130,
};

const statusStyles = {
  fontWeight: "bold",
  fontSize: "0.75rem",
  borderRadius: 8,
  padding: "3px 10px",
  display: "inline-block",
};

const chainID = 137;
const dexName = "quickswap";

export default function TokenQuick() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // used React-Query to fetch Covalent API
  const { data, error, isFetching } = useQuery(["ecosystem32"], async () => {
    return await fetchCovalentData("tokens", chainID, dexName);
  });

  const chainItems = data?.data?.items || [];

  //console.log(chainItems);

  if (isFetching) return <Progress size="xs" isIndeterminate />;

  if (error) {
    return (
      <Box p="4" bg="red.50" borderRadius="md">
        <Text color="red.600">Error: {error.message}</Text>
        <Text fontSize="sm" color="red.500" mt="2">
          Please check your API key configuration and network connection.
        </Text>
      </Box>
    );
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {" "}
      <div>
        <EcosystemTokenQuick />

        <TableContainer component={Paper} sx={tableContainerStyles}>
          <Table
            borderColor="green.900"
            borderWidth={1}
            sx={tableStyles}
            aria-label="simple table"
            bg={useColorModeValue("inherit", "gray.800")}
          >
            <TableHead>
              <TableRow>
                <Th>
                  <Text color={useColorModeValue("inherit", "gray.500")}>
                    NAME
                  </Text>
                </Th>
                <Th>
                  <Text color={useColorModeValue("inherit", "gray.500")}>
                    SYMBOL
                  </Text>
                </Th>
                <Th>
                  <Text color={useColorModeValue("inherit", "gray.500")}>
                    LIQUIDITY
                  </Text>
                </Th>
                <Th>
                  <Text color={useColorModeValue("inherit", "gray.500")}>
                    VOLUME(24H)
                  </Text>
                </Th>
                <Th>
                  <Text color={useColorModeValue("inherit", "gray.500")}>
                    PRICE
                  </Text>
                </Th>
                <Th>
                  <Text color={useColorModeValue("inherit", "gray.500")}>
                    SWAP(24H)
                  </Text>
                </Th>
              </TableRow>
            </TableHead>
            <TableBody>
              {chainItems
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((items) => (
                  <Tr key={items.chain_id}>
                    <Td color={useColorModeValue("inherit", "gray.200")}>
                      {items.contract_name}
                    </Td>
                    <Td color={useColorModeValue("inherit", "gray.200")}>
                      {items.contract_ticker_symbol}
                    </Td>
                    <Td color={useColorModeValue("inherit", "gray.200")}>
                      {numbro(items.total_liquidity_quote).formatCurrency({
                        average: true,
                        mantissa: 2,
                        optionalMantissa: true,
                      })}
                    </Td>
                    <Td color={useColorModeValue("inherit", "gray.200")}>
                      {numbro(items.total_volume_24h_quote).formatCurrency({
                        average: true,
                        mantissa: 2,
                        optionalMantissa: true,
                      })}
                    </Td>
                    <Td color={useColorModeValue("inherit", "gray.200")}>
                      {numbro(items.quote_rate).formatCurrency({
                        average: true,
                        mantissa: 2,
                        optionalMantissa: true,
                      })}
                    </Td>
                    <Td color={useColorModeValue("inherit", "gray.200")}>
                      {items.swap_count_24h}
                    </Td>
                  </Tr>
                ))}
            </TableBody>
            <TableFooter>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                count={chainItems.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                bg={useColorModeValue("white", "gray.800")}
              />
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
