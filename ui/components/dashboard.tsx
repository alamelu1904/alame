// import React from 'react';

// const DashboardPage: React.FC = () => {
//   // Fetch menu data or perform any necessary actions

//   return (
//     <div>
//       {/* Render the menus */}
//     </div>
//   );
// };

// export default DashboardPage;
import React, { useState } from "react";
import { DrawerLayout, DrawerListener, DrawerPosition } from "react-native";
import { DropDownMenuSelect, DropDownMenuSelectProps } from "react-native-dropdown-menu-select";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsOpen(true);
  };

  const handleDrawerClose = () => {
    setIsOpen(false);
  };

  const option: Partial<DropDownMenuSelectProps> = {
    placeholder: (
      <IconButton onClick={handleDrawerOpen}>
        <MenuIcon />
      </IconButton>
    ),
    options: [
      {
        label: "Menu 1",
        value: "1",
        children: [
          {
            label: "Submenu 1-1",
            value: "1-1",
          },
          {
            label: "Submenu 1-2",
            value: "1-2",
          },
        ],
      },
      {
        label: "Menu 2",
        value: "2",
        children: [
          {
            label: "Submenu 2-1",
            value: "2-1",
          },
          {
            label: "Submenu 2-2",
            value: "2-2",
            children: [
              {
                label: "Sub-submenu 2-2-1",
                value: "2-2-1",
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <DrawerLayout
      drawerPosition={DrawerPosition.Left}
      drawerWidth={300}
      drawerOpen={isOpen}
      onDrawerOpen={handleDrawerOpen}
      onDrawerClose={handleDrawerClose}
    >
      <DropDownMenuSelect
        options={option}
        placeholder="Select an option"
        onSelect={(value) => {
          // Do something with the selected value
        }}
      />
    </DrawerLayout>
  );
};

export default Dashboard;
