import { UnstyledButton, Group, Avatar, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { forwardRef } from "react";

const UserButton = forwardRef(({ username, email, icon, ...others }, ref) => {
  return (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.md,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      {...others}
    >
      <Group>
        <Avatar
          size={40}
          variant="gradient"
          gradient={{ from: "teal", to: "lime", deg: 105 }}
        >
          {username.charAt(0)}
          {username.charAt(username.length - 1)}
        </Avatar>
        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {username}
          </Text>
          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>
        {icon || <IconChevronRight size={14} stroke={1.5} />}
      </Group>
    </UnstyledButton>
  );
});

export default UserButton;
