import { useState, forwardRef, useEffect, useRef } from "react";
import {
  Title,
  TextInput,
  Group,
  NumberInput,
  Grid,
  Box,
  Select,
  Text,
  Button,
} from "@mantine/core";
import {
  convertDecimalToNumber,
  convertNumberToCurrency,
  convertNumberToDecimal,
} from "../../utils/CurrencyUtils";
import { isUndefined } from "lodash";

const SelectItem = forwardRef(
  ({ image, label, description, price, quantity, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {description} - {convertNumberToCurrency(price)} - Stock -{" "}
            {quantity}
          </Text>
        </div>
      </Group>
    </div>
  )
);

const ProductOrderSelection = (props) => {
  const [productAvailableSelection, setProductAvailableSelection] = useState(
    []
  );
  const selectProductRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState();
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [productCode, setProductCode] = useState("");
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [availableStock, setAvailableStock] = useState(0);
  const [disabledField, setDisabledField] = useState(false);
  const [disabledAdd, setDisabledAdd] = useState(true);

  // Update selection option
  useEffect(() => {
    if (props.data) {
      setProductAvailableSelection(
        props.data.map((item) => {
          return {
            id: item.id,
            label: item.name,
            value: item.name,
            description: item.brand,
            price: item.price,
            quantity: item.quantity,
            disabled: item.quantity <= 0,
          };
        })
      );
    } else {
      setProductAvailableSelection([]);
    }
  }, [props.data]);

  // Disabled Item from selection after selected the item
  useEffect(() => {
    if (
      props.selectedItems &&
      props.selectedItems.length > 0 &&
      props.data &&
      props.data.length > 0
    ) {
      const map = new Map(props.selectedItems.map((obj) => [obj.id, obj]));

      setProductAvailableSelection(
        props.data.map((item) => {
          const isSelected = !isUndefined(map.get(item.id));

          return {
            id: item.id,
            label: item.name,
            value: item.name,
            description: item.brand,
            price: item.price,
            quantity: item.quantity,
            disabled: item.quantity <= 0 || isSelected,
          };
        })
      );
    }
  }, [props.selectedItems, props.data]);

  // Enable/disable fields
  useEffect(() => {
    setDisabledField(props.disabled);
  }, [props.disabled]);

  // Update total price
  useEffect(() => {
    setTotalPrice(price * quantity);
  }, [price, quantity]);

  // Enable/disable button
  useEffect(() => {
    if (selectedProduct && quantity > 0) {
      setDisabledAdd(false);
    } else {
      setDisabledAdd(true);
    }
  }, [selectedProduct, quantity]);

  const onSelectProductHandler = (value) => {
    // Update other product info fields
    if (props.data) {
      const selected = props.data.filter((product) => {
        return product.name === value;
      })[0];

      setProductName(value);
      setSelectedProduct(selected);
      setBrand(selected.brand);
      setProductCode(selected.productCode);
      setPrice(Number(convertNumberToDecimal(selected.price)));
      setAvailableStock(Number(selected.quantity));
    }
  };

  const addHandler = (value) => {
    // Add quantity requested and total price into object
    const order = value;
    order.requestedQuantity = quantity;
    order.totalPrice = convertDecimalToNumber(totalPrice);

    // Re-initialize fields
    setSelectedProduct(null);
    setProductName("");
    setBrand("");
    setProductCode("");
    setPrice(0);
    setTotalPrice(0);
    setQuantity(0);
    setAvailableStock(0);
    setDisabledAdd(true);

    props.onAddProduct(order);
  };

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[1],
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
      })}
    >
      <Grid grow>
        <Grid.Col span={10}>
          <Title order={5}>Product Information</Title>
          <Text size="xs" opacity={0.65}>
            * Limit to 5 item per-order. In future will be added more.
          </Text>
          <Text size="xs" opacity={0.65}>
            * Please refer on below table for order summary.
          </Text>
        </Grid.Col>
        <Grid.Col span={10}>
          <Select
            searchable
            withAsterisk
            disabled={disabledField}
            data={productAvailableSelection}
            itemComponent={SelectItem}
            label="Product"
            nothingFound="No available product to select"
            ref={selectProductRef}
            onChange={onSelectProductHandler}
            value={productName}
          />
        </Grid.Col>
        <Grid.Col span={5}>
          <TextInput
            readOnly
            disabled={disabledField}
            id="productCode"
            label="Product Code"
            placeholder="Product Code"
            defaultValue={productCode}
          />
        </Grid.Col>
        <Grid.Col span={5}>
          <TextInput
            readOnly
            disabled={disabledField}
            id="brand"
            label="Brand"
            placeholder="Brand"
            defaultValue={brand}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <NumberInput
            withAsterisk
            disabled={disabledField}
            id="quantity"
            label="Quantity"
            min={0}
            max={availableStock}
            value={quantity}
            onChange={setQuantity}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <NumberInput
            readOnly
            disabled={disabledField}
            value={availableStock}
            id="availableStock"
            label="Available Stock"
            min={0}
            max={availableStock}
            hideControls
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <NumberInput
            readOnly
            disabled={disabledField}
            value={price}
            id="price"
            label="Price per-unit (RM)"
            precision={2}
            hideControls
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <NumberInput
            readOnly
            disabled={disabledField}
            value={totalPrice}
            id="totalPrice"
            label="TotalPrice (RM)"
            precision={2}
            hideControls
          />
        </Grid.Col>
        <Grid.Col span={10}>
          <Group position="right" mt="md">
            <Button
              disabled={disabledAdd}
              color="green"
              onClick={() => {
                addHandler(selectedProduct);
              }}
            >
              Add Order
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default ProductOrderSelection;
