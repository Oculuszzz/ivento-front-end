import {
  Box,
  Card,
  createStyles,
  Group,
  LoadingOverlay,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { convertNumberToDecimal } from "../../utils/CurrencyUtils";
import DateUtils from "../../utils/DateUtils";
import useAxiosFetch from "../hooks/useAxiosFetch";

const useStyles = createStyles((theme) => ({
  calendar: {
    fontWeight: 500,
    display: "block",
    // width: "100%",
    fontSize: theme.fontSizes.md,

    "&:hover": {
      backgroundColor: theme.colors.gray[0],
      color: theme.black,
    },
  },
  box: {
    backgroundColor: theme.colors.gray[0],
    textAlign: "center",
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    // boxShadow: theme.shadows.md,
    height: "auto",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const OrdersStatByMonth = () => {
  const { classes } = useStyles();
  const [selectedMonth, setSetSelectedMonth] = useState(
    DateUtils.getFirstDateCurrentMonth()
  );
  const [totOrders, setTotOrders] = useState(0);
  const [profits, setProfits] = useState(0);

  const url = `customer-orders/find-customer-order-by-date?startDateTime=${DateUtils.convertFirstDateToLocalDateTimeFormatString(
    selectedMonth
  )}&endDateTime=${DateUtils.convertLastDateToLocalDateTimeFormatString(
    selectedMonth
  )}`;

  const { data, isLoading, error } = useAxiosFetch(url);

  useEffect(() => {
    if (data && !isLoading) {
      setTotOrders(data.length);
      let profits = 0;

      data.forEach((element) => {
        profits += element.totalPrice;
      });

      console.log(data);

      setProfits(profits);
    }
  }, [data, isLoading]);

  return (
    <Card p="lg" radius="md" withBorder miw={"420px"} h="450px" w="420px">
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <Group position="apart" mt="md" mb="xs">
        <Title color="dimmed" order={3} transform="uppercase" weight={700}>
          PURCHASE ORDER
        </Title>
        <MonthPickerInput
          dropdownType="modal"
          className={classes.calendar}
          icon={<IconCalendar size="1.1rem" stroke={1.5} />}
          value={selectedMonth}
          placeholder="Pick date"
          onChange={setSetSelectedMonth}
          mx="auto"
          maw={400}
        />
      </Group>
      <Space h="lg" />
      <Stack spacing="xl">
        <Box className={classes.box}>
          <Title order={3} color="blue">
            Total Customer Orders
          </Title>
          <Space h="lg" />
          <Text>{totOrders}</Text>
        </Box>
        <Box className={classes.box}>
          <Title order={3} color="blue">
            Profits (RM)
          </Title>
          <Space h="lg" />
          <Text>{convertNumberToDecimal(profits)}</Text>
        </Box>
      </Stack>
    </Card>
  );
};

export default OrdersStatByMonth;
