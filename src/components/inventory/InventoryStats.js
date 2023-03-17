import { Card, LoadingOverlay, Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { StatsRing } from "../../ui/StatsRing";
import ErrorFetch from "../error-fetch";
import useAxiosFetch from "../hooks/useAxiosFetch";

const InventoryStats = () => {
  const { data, isLoading, error } = useAxiosFetch("products");
  const [inventoryStats, setInventoryStats] = useState([{}]);
  const [showStats, setShowStats] = useState(false);
  const [showErrorFetch, setShowErrorFetch] = useState(false);

  useEffect(() => {
    if (!isLoading && error) {
      setShowErrorFetch(true);
    } else {
      setShowErrorFetch(false);
    }
  }, [isLoading, error]);

  useEffect(() => {
    if (data && !isLoading) {
      let totGreenQuantity = 0;
      let totYellowQuantity = 0;
      let totRedQuantity = 0;

      data.forEach((element) => {
        if (element.quantity >= 20) {
          totGreenQuantity += 1;
        } else if (element.quantity < 20 && element.quantity !== 0) {
          totYellowQuantity += 1;
        } else {
          totRedQuantity += 1;
        }
      });

      const totProducts = totGreenQuantity + totYellowQuantity + totRedQuantity;

      setInventoryStats([
        {
          label: "Good Stock Products",
          stats: `${totGreenQuantity} / ${totProducts}`,
          stats2: `${totGreenQuantity} products are in good stock`,
          progress: (totGreenQuantity / totProducts) * 100,
          color: "green",
          icon: "up",
        },
        {
          label: "Low Stock Products",
          stats: `${totYellowQuantity} / ${totProducts}`,
          stats2: `${totYellowQuantity} of products are in low stock.`,
          progress: (totGreenQuantity / totProducts) * 100,
          color: "yellow",
          icon: "right",
        },
        {
          label: "Empty Stock Products",
          stats: `${totYellowQuantity} / ${totProducts}`,
          stats2: `${totYellowQuantity} product are require restock.`,
          progress: (totGreenQuantity / totProducts) * 100,
          color: "red",
          icon: "down",
        },
      ]);
      setShowStats(true);
    } else {
      setShowStats(false);
    }
  }, [data, isLoading]);

  return (
    <Card p="lg" radius="md" withBorder>
      <Stack spacing="xl">
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        {showStats && (
          <Title color="dimmed" order={3} transform="uppercase" weight={700}>
            Stock Summary
          </Title>
        )}
        {showErrorFetch && <ErrorFetch />}
        {showStats && <StatsRing data={inventoryStats} />}
      </Stack>
    </Card>
  );
};

export default InventoryStats;
