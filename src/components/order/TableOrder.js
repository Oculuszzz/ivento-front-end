import React, { useState, useEffect } from "react";
import {
  Text,
  Stack,
  Group,
  Divider,
  Box,
  SimpleGrid,
  Badge,
} from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { sortBy } from "lodash";
import DateUtils from "../../utils/DateUtils";
import { convertNumberToDecimal } from "../../utils/CurrencyUtils";

const PAGE_SIZE = 12;

const orderType = {
  NEW_ORDER: "New Order",
};
const orderColors = {
  NEW_ORDER: "blue",
};

const TableOrder = (props) => {
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState([]);
  const [sortStatus, setSortStatus] = useState([
    {
      columnAccessor: "invoice",
      direction: "asc",
    },
  ]);

  useEffect(() => {
    const sortedData = sortBy(props.tableData, sortStatus.columnAccessor);
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;

    setRecords(
      sortStatus.direction === "desc"
        ? sortedData.reverse().slice(from, to)
        : sortedData.slice(from, to)
    );
  }, [sortStatus, page, props.tableData]);

  const RawExpansionContent = (record) => {
    return (
      <Box
        sx={(theme) => ({
          backgroundColor: theme.colors.gray[0],
        })}
      >
        <Stack p="xs" spacing={6}>
          <Group>
            <Text>Company: </Text>
            <Text opacity={0.65}>{record.companyName}</Text>
          </Group>
          <Group>
            <Text>Company Address:</Text>
            <Text opacity={0.65}>{record.companyAddress}</Text>
          </Group>
          <Divider my="sm" />
          {record.products.map((item) => {
            return (
              <Box
                key={item.id}
                sx={(theme) => ({
                  display: "block",
                  backgroundColor: theme.colors.gray[1],
                  color: theme.colors.blue[7],
                  borderRadius: theme.radius.md,
                })}
              >
                <SimpleGrid
                  cols={4}
                  spacing="xl"
                  verticalSpacing="sm"
                  breakpoints={[{ maxWidth: "md", cols: 4, spacing: "xl" }]}
                >
                  <Text>Product Code: {item.productCode}</Text>
                  <Text>Brand: {item.brand}</Text>
                  <Text>Product: {item.name}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                </SimpleGrid>
                <SimpleGrid cols={4} spacing="xl" verticalSpacing="sm">
                  <Text>
                    Price per-unit (RM): {convertNumberToDecimal(item.price)}
                  </Text>
                  <Text>
                    Total Price (RM): {convertNumberToDecimal(item.totalPrice)}
                  </Text>
                </SimpleGrid>
              </Box>
            );
          })}
        </Stack>
      </Box>
    );
  };

  return (
    <DataTable
      textSelectionDisabled
      withBorder
      fetching={props.isLoading}
      columns={[
        {
          accessor: "id",
          title: <Text>Invoice</Text>,
          sortable: true,
          width: "10%",
          render: (record) => record.id,
        },
        {
          accessor: "name",
          title: <Text>Customer Name</Text>,
          sortable: true,
          width: "30%",
          render: (record) => record.name,
        },

        {
          accessor: "address",
          title: <Text>Address</Text>,
          sortable: true,
          width: "25%",
          render: (record) => record.address,
        },
        {
          accessor: "status",
          title: <Text>Status</Text>,
          sortable: true,
          textAlignment: "center",
          width: "10%",
          render: (record) => {
            return (
              <Badge color={orderColors[record.status]}>
                {orderType[record.status]}
              </Badge>
            );
          },
        },
        {
          accessor: "totalPrice",
          title: <Text>Total Price (RM)</Text>,
          sortable: true,
          textAlignment: "right",
          render: (record) => convertNumberToDecimal(record.totalPrice),
        },

        {
          accessor: "lastUpdate",
          title: <Text>Last Update</Text>,
          //   sortable: true,
          textAlignment: "right",
          width: "5%",
          render: (record) =>
            DateUtils.convertDateTimeToDateTimeString(record.lastUpdate),
        },
      ]}
      rowExpansion={{
        allowMultiple: true,
        content: ({ record }) => RawExpansionContent(record),
      }}
      records={records}
      loaderVariant="oval"
      totalRecords={props.tableData ? props.tableData.length : 0}
      recordsPerPage={PAGE_SIZE}
      page={page}
      onPageChange={(p) => setPage(p)}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
    />
  );
};

export default TableOrder;
