const electron = require("electron");

const { app, BrowserWindow, Menu } = electron;

let newWindow;
let addTodoWindow;

app.on("ready", () => {
  newWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  newWindow.loadURL(`file://${__dirname}/index.html`);

  const mainMenu = Menu.buildFromTemplate(menuList);
  Menu.setApplicationMenu(mainMenu);
});

const addNewTodo = () => {
  addTodoWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: "Add New Todo",
  });

  addTodoWindow.loadURL(`file://${__dirname}/addTodo.html`);
};

let menuList = [
  {
    label: "file",
    submenu: [
      {
        label: "New Todo",
        click() {
          addNewTodo();
        },
      },
      {
        label: "Quit",
        accelerator: process.platform === "darwin" ? "command+Q" : "ctrl+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
];

if (process.platform === "darwin") {
  const updatedMenuList = [{ label: "" }, ...menuList];
  menuList = updatedMenuList;
}

if (process.env.NODE_ENV !== "production") {
  const updatedMenu = [
    ...menuList,
    {
      label: "developer",
      submenu: [
        {
          label: "devtool",
          click(item, focusedWindow) {
            focusedWindow.toggleDevTools();
          },
        },
      ],
    },
  ];

  menuList = updatedMenu;
}
