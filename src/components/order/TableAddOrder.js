import { useState, useEffect } from "react";
import { Stack, Box, Group, Title, Text, ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import { DataTable } from "mantine-datatable";
import { convertNumberToDecimal } from "../../utils/CurrencyUtils";

const PAGE_SIZE = 5;

const TableAddOrder = (props) => {
  //   const [page, setPage] = useState(1);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setRecords(props.tableData);
  }, [props.tableData]);

  const deleteItemHandler = (item) => {
    props.onDeleteOrder(item);
  };

  const actionsRowContent = (item) => {
    return (
      <Group spacing={0} position="right">
        <ActionIcon
          color="red"
          onClick={() => {
            deleteItemHandler(item);
          }}
        >
          <IconTrash size={22} stroke={1.5} />
        </ActionIcon>
      </Group>
    );
  };

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[1],
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        height: "440px",
      })}
    >
      <Stack spacing="xl">
        <Title order={5}>Order Information</Title>
        <Text size="xs" opacity={0.65}>
          * Limit to 5 item per-order. In feature will be added more.
        </Text>
        <DataTable
          height={"305px"}
          textSelectionDisabled
          withBorder
          columns={[
            {
              accessor: "productCode",
              title: <Text>Product Code</Text>,
              // sortable: true,
              width: "10%",
              render: (item) => item.productCode,
            },
            {
              accessor: "brand",
              title: <Text>Brand</Text>,
              // sortable: true,
              width: "10%",
              render: (item) => item.brand,
            },
            {
              accessor: "name",
              title: <Text>Product Name</Text>,
              // sortable: true,
              width: "55%",
              render: (item) => item.name,
            },
            {
              accessor: "requestedQuantity",
              title: <Text>Quantity</Text>,
              textAlignment: "right",
              // sortable: true,
              render: (item) => item.requestedQuantity,
            },
            {
              accessor: "price",
              title: <Text>Price Per-unit (RM)</Text>,
              textAlignment: "right",
              width: "10%",
              render: (item) =>
                Number(convertNumberToDecimal(item.price)).toFixed(2),
            },
            {
              accessor: "totalPrice",
              title: <Text>Price (RM)</Text>,
              textAlignment: "right",
              width: "10%",
              render: (item) =>
                Number(convertNumberToDecimal(item.totalPrice)).toFixed(2),
            },
            {
              accessor: "actions",
              title: "",
              textAlignment: "right",
              width: "5%",
              render: (item) => {
                return actionsRowContent(item);
              },
            },
          ]}
          records={records}
          loaderVariant="oval"
          totalRecords={props.tableData ? props.tableData.length : 0}
          recordsPerPage={PAGE_SIZE}
          page={1}
          //   page={page}
          //   onPageChange={(p) => setPage(p)}
          //   sortStatus={sortStatus}
          //   onSortStatusChange={setSortStatus}
        />
      </Stack>
    </Box>
  );
};

export default TableAddOrder;
