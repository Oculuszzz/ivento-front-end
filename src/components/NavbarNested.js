import { useState } from "react";
import { Navbar, ScrollArea, createStyles, Menu } from "@mantine/core";
import {
  IconAccessible,
  IconMenuOrder,
  IconBoxMultiple,
  IconLogout,
  IconGauge,
} from "@tabler/icons";
import UserButton from "../ui/UserButton";
import { LinksGroup } from "../ui/NavbarLinksGroup";
import TokenService from "../services/TokenService";

const navAdmin = [
  { label: "Dashboard", icon: IconGauge, parentLink: "/" },
  {
    label: "Orders",
    icon: IconMenuOrder,
    initiallyOpened: true,
    links: [
      { label: "List of Order", link: "/orders/" },
      { label: "Add Customer Order", link: "/orders/add-new-customer-order" },
    ],
  },
  {
    label: "Inventory",
    icon: IconBoxMultiple,
    initiallyOpened: true,
    links: [
      { label: "List of Product", link: "/inventory/" },
      { label: "Add Product", link: "/inventory/add-new-product" },
    ],
  },
  {
    label: "Admin",
    icon: IconAccessible,
    initiallyOpened: true,
    links: [{ label: "Users", link: "/users/" }],
  },
];

const navUser = [
  { label: "Dashboard", icon: IconGauge, parentLink: "/" },
  {
    label: "Orders",
    icon: IconMenuOrder,
    initiallyOpened: true,
    links: [
      { label: "List of Order", link: "/orders/" },
      { label: "Add Customer Order", link: "/orders/add-new-customer-order" },
    ],
  },
  {
    label: "Inventory",
    icon: IconBoxMultiple,
    initiallyOpened: true,
    links: [
      { label: "List of Product", link: "/inventory/" },
      { label: "Add Product", link: "/inventory/add-new-product" },
    ],
  },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
    // height: "90%",
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

const NavbarNested = (props) => {
  let isAdmin = TokenService.getUserRole() === "ROLE_ADMIN";
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);

  const adminLinks = navAdmin.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  const userLinks = navUser.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  const logoutHandler = () => {
    props.onLogout();
  };

  return (
    <Navbar
      hidden={props.hidden}
      width={{ sm: 300 }}
      p="md"
      className={classes.navbar}
    >
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>
          {isAdmin ? adminLinks : userLinks}
        </div>
      </Navbar.Section>
      <Navbar.Section className={classes.footer}>
        <Menu
          position="right-end"
          shadow="md"
          width={"100%"}
          opened={opened}
          onChange={setOpened}
        >
          <Menu.Target>
            <UserButton
              image={TokenService.getUserImage()}
              username={TokenService.getUsername()}
              email={TokenService.getUserEmail()}
            />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              color="red"
              icon={<IconLogout size={14} />}
              onClick={logoutHandler}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Navbar.Section>
    </Navbar>
  );
};

export default NavbarNested;
