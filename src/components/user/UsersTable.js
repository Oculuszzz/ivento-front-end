import React from "react";
import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ScrollArea,
  useMantineTheme,
  ActionIcon,
  Menu,
} from "@mantine/core";
import {
  IconPencil,
  IconDots,
  IconLockAccessOff,
  IconLockAccess,
} from "@tabler/icons";
import { useNavigate } from "react-router-dom";

const roleColors = {
  User: "blue",
  Admin: "cyan",
};

const UsersTable = (props) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const userActivationHandler = (userData) => {
    props.onUserActivation(userData);
  };

  const editUserHandler = (userId) => {
    navigate(`update-user/${userId}`);
  };

  const Rows = () => {
    return props.usersData.map((item) => (
      <tr key={item.username}>
        <td>
          <Group spacing="sm">
            <Avatar size={40} src={item.avatar} radius={40} />
            <div>
              <Text size="sm" weight={500}>
                {item.username}
              </Text>
              <Text size="xs" color="dimmed">
                {item.email}
              </Text>
            </div>
          </Group>
        </td>
        <td>
          <Badge
            color={roleColors[item.role]}
            variant={theme.colorScheme === "dark" ? "light" : "outline"}
          >
            {item.role}
          </Badge>
        </td>
        <td>{Math.floor(Math.random() * 6 + 5)} days ago</td>
        <td>
          {!item.isBlocked ? (
            <Badge fullWidth>Active</Badge>
          ) : (
            <Badge color="pink" fullWidth>
              Disabled
            </Badge>
          )}
        </td>
        <td>
          <Group spacing={0} position="right">
            <Menu transition="pop" withArrow position="bottom-end">
              <Menu.Target>
                <ActionIcon color="gray">
                  <IconDots size={20} stroke={1.5} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={(event) => {
                    event.preventDefault();
                    editUserHandler(item.id);
                  }}
                  icon={<IconPencil size={16} stroke={1.5} />}
                >
                  Edit user
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    userActivationHandler(item);
                  }}
                  data={item}
                  icon={
                    item.isBlocked ? (
                      <IconLockAccess size={16} stroke={1.5} />
                    ) : (
                      <IconLockAccessOff size={16} stroke={1.5} />
                    )
                  }
                  color={item.isBlocked ? "blue" : "red"}
                >
                  {item.isBlocked ? "Enable account" : "Disable account"}
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </td>
      </tr>
    ));
  };

  return (
    <ScrollArea>
      <Table striped sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Users</th>
            <th>Role</th>
            <th>Last active</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <Rows />
        </tbody>
      </Table>
    </ScrollArea>
  );
};

export default UsersTable;
