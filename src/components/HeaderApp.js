import {
  Header,
  MediaQuery,
  Burger,
  Title,
  Group,
  Box,
  UnstyledButton,
} from "@mantine/core";

const HeaderApp = (props) => {
  const openNavHandler = () => {
    props.onOpened(!props.opened);
  };

  return (
    <Header height={{ base: 50, md: 70 }} p="md">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={props.opened}
            onClick={openNavHandler}
            size="sm"
            color={props.theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <UnstyledButton>
          <Group spacing={6}>
            <Box
              sx={(theme) => ({
                // backgroundColor: theme.colors.cyan[5],
                padding: theme.spacing.md,
                height: "100%",
              })}
            >
              <Title
                color="white"
                variant="gradient"
                gradient={{ from: "teal", to: "lime", deg: 105 }}
              >
                Ivento
              </Title>
            </Box>
          </Group>
        </UnstyledButton>
      </div>
    </Header>
  );
};

export default HeaderApp;
