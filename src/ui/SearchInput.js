import { useState } from "react";
import { TextInput, ActionIcon } from "@mantine/core";
import { IconSearch, IconArrowRight } from "@tabler/icons";
import { useMantineTheme } from "@mantine/core";

const SearchInput = (props) => {
  const theme = useMantineTheme();
  const [searchInput, setSearchInput] = useState("");
  const placeholder = props.placeholder ? props.placeholder : "Search...";

  const inputHandler = (event) => {
    setSearchInput(event.target.value);
  };
  const searchHandler = () => {
    props.onSearch(searchInput);
  };

  return (
    <TextInput
      icon={<IconSearch size={18} stroke={1.5} />}
      radius="xl"
      size="md"
      rightSection={
        <ActionIcon
          size={32}
          radius="xl"
          color={theme.primaryColor}
          variant="filled"
          onClick={searchHandler}
        >
          <IconArrowRight size={18} stroke={1.5} />
        </ActionIcon>
      }
      placeholder={placeholder}
      rightSectionWidth={42}
      onChange={inputHandler}
      defaultValue={props.defaultValue}
    />
  );
};

export default SearchInput;
