import { initNufiDappCardanoSdk } from "@nufi/dapp-client-cardano";
import nufiCoreSdk from "@nufi/dapp-client-core";

import { Wallet } from "@meshsdk/common";

const nufiDomain: { [key: string]: string } = {
  production: "https://wallet.nu.fi",
  mainnet: "https://wallet-staging.nu.fi",
  preprod: "https://wallet-testnet-staging.nu.fi",
  preview: "https://wallet-preview-staging.nu.fi",
};

export function checkIfMetamaskInstalled(
  network = "preprod",
): Promise<Wallet | undefined> {
  try {
    const _nufiCoreSdk = (nufiCoreSdk as any).default;

    _nufiCoreSdk.init(nufiDomain[network]);

    return new Promise((resolve) => {
      _nufiCoreSdk
        .getApi()
        .isMetamaskInstalled()
        .then((isMetamaskInstalled: boolean) => {
          if (isMetamaskInstalled) {
            initNufiDappCardanoSdk(_nufiCoreSdk, "snap");
            resolve({
              id: "nufiSnap",
              name: "MetaMask",
              icon: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjkuMiAxNjMuNzEiPgogIDxkZWZzPgogICAgPHN0eWxlPgogICAgICAuY2xzLTEgewogICAgICAgIGZpbGw6ICNlMjc2MjU7CiAgICAgIH0KCiAgICAgIC5jbHMtMSwgLmNscy0yLCAuY2xzLTMsIC5jbHMtNCwgLmNscy01LCAuY2xzLTYsIC5jbHMtNywgLmNscy04LCAuY2xzLTkgewogICAgICAgIHN0cm9rZS13aWR0aDogMHB4OwogICAgICB9CgogICAgICAuY2xzLTIgewogICAgICAgIGZpbGw6ICM3NjNlMWE7CiAgICAgIH0KCiAgICAgIC5jbHMtMyB7CiAgICAgICAgZmlsbDogI2MwYWQ5ZTsKICAgICAgfQoKICAgICAgLmNscy00IHsKICAgICAgICBmaWxsOiAjMzQ2OGQxOwogICAgICB9CgogICAgICAuY2xzLTUgewogICAgICAgIGZpbGw6ICNjYzYyMjg7CiAgICAgIH0KCiAgICAgIC5jbHMtNiB7CiAgICAgICAgZmlsbDogI2Y1ODQxZjsKICAgICAgfQoKICAgICAgLmNscy03IHsKICAgICAgICBmaWxsOiAjZDdjMWIzOwogICAgICB9CgogICAgICAuY2xzLTggewogICAgICAgIGZpbGw6ICNmZmY7CiAgICAgICAgZmlsbC1ydWxlOiBldmVub2RkOwogICAgICB9CgogICAgICAuY2xzLTkgewogICAgICAgIGZpbGw6ICMyZjM0M2I7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgPC9kZWZzPgogIDxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+CiAgICA8ZyBpZD0iTU1fSGVhZF9iYWNrZ3JvdW5kX0RvX25vdF9lZGl0XyIgZGF0YS1uYW1lPSJNTSBIZWFkIGJhY2tncm91bmQgKERvIG5vdCBlZGl0KSI+CiAgICAgIDxwYXRoIGNsYXNzPSJjbHMtNiIgZD0iTTE0MS44LDcwLjVsNi45LTguMS0zLTIuMiw0LjgtNC40LTMuNy0yLjgsNC44LTMuNi0zLjEtMi40LDUtMjQuNC03LjYtMjIuNk0xNDUuOSwwbC00OC44LDE4LjFoLTQwLjdMNy42LDBsLjMuMkw3LjYsMCwwLDIyLjZsNS4xLDI0LjQtMy4yLDIuNCw0LjksMy42LTMuNywyLjgsNC44LDQuNC0zLDIuMiw2LjksOC4xTDEuMywxMDIuOWgwbDkuNywzMy4xLDM0LjEtOS40di0uMS4xaDBsNi42LDUuNCwxMy41LDkuMmgyMy4xbDEzLjUtOS4yLDYuNi01LjRoMGwzNC4yLDkuNCw5LjgtMzMuMWgwbC0xMC42LTMyLjQiLz4KICAgIDwvZz4KICAgIDxnIGlkPSJMb2dvcyI+CiAgICAgIDxnPgogICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIxNDUuOSAwIDg2IDQ0LjEgOTcuMSAxOC4xIDE0NS45IDAiLz4KICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTEiIHBvaW50cz0iNy42IDAgNjcgNDQuNSA1Ni40IDE4LjEgNy42IDAiLz4KICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTEiIHBvaW50cz0iMTI0LjQgMTAyLjMgMTA4LjQgMTI2LjUgMTQyLjYgMTM1LjkgMTUyLjQgMTAyLjggMTI0LjQgMTAyLjMiLz4KICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTEiIHBvaW50cz0iMS4zIDEwMi44IDExIDEzNS45IDQ1LjEgMTI2LjUgMjkuMiAxMDIuMyAxLjMgMTAyLjgiLz4KICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTEiIHBvaW50cz0iNDMuMyA2MS4zIDMzLjggNzUuNiA2Ny42IDc3LjEgNjYuNSA0MC45IDQzLjMgNjEuMyIvPgogICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIxMTAuMyA2MS4zIDg2LjcgNDAuNSA4NiA3Ny4xIDExOS44IDc1LjYgMTEwLjMgNjEuMyIvPgogICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSI0NS4xIDEyNi41IDY1LjYgMTE2LjcgNDcuOSAxMDMuMSA0NS4xIDEyNi41Ii8+CiAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy0xIiBwb2ludHM9Ijg4IDExNi43IDEwOC40IDEyNi41IDEwNS42IDEwMy4xIDg4IDExNi43Ii8+CiAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy03IiBwb2ludHM9IjEwOC40IDEyNi41IDg4IDExNi43IDg5LjcgMTI5LjkgODkuNSAxMzUuNSAxMDguNCAxMjYuNSIvPgogICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtNyIgcG9pbnRzPSI0NS4xIDEyNi41IDY0LjEgMTM1LjUgNjQgMTI5LjkgNjUuNiAxMTYuNyA0NS4xIDEyNi41Ii8+CiAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy05IiBwb2ludHM9IjY0LjQgOTQuMyA0Ny41IDg5LjQgNTkuNSA4My45IDY0LjQgOTQuMyIvPgogICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtOSIgcG9pbnRzPSI4OS4xIDk0LjMgOTQuMSA4My45IDEwNi4xIDg5LjQgODkuMSA5NC4zIi8+CiAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy01IiBwb2ludHM9IjQ1LjEgMTI2LjUgNDguMSAxMDIuMyAyOS4yIDEwMi44IDQ1LjEgMTI2LjUiLz4KICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTUiIHBvaW50cz0iMTA1LjUgMTAyLjMgMTA4LjQgMTI2LjUgMTI0LjQgMTAyLjggMTA1LjUgMTAyLjMiLz4KICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTUiIHBvaW50cz0iMTE5LjggNzUuNiA4NiA3Ny4xIDg5LjEgOTQuMyA5NC4xIDgzLjkgMTA2LjEgODkuNCAxMTkuOCA3NS42Ii8+CiAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy01IiBwb2ludHM9IjQ3LjUgODkuNCA1OS41IDgzLjkgNjQuNCA5NC4zIDY3LjYgNzcuMSAzMy44IDc1LjYgNDcuNSA4OS40Ii8+CiAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy0xIiBwb2ludHM9IjMzLjggNzUuNiA0Ny45IDEwMy4xIDQ3LjUgODkuNCAzMy44IDc1LjYiLz4KICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTEiIHBvaW50cz0iMTA2LjEgODkuNCAxMDUuNiAxMDMuMSAxMTkuOCA3NS42IDEwNi4xIDg5LjQiLz4KICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTEiIHBvaW50cz0iNjcuNiA3Ny4xIDY0LjQgOTQuMyA2OC40IDExNC43IDY5LjMgODcuOSA2Ny42IDc3LjEiLz4KICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTEiIHBvaW50cz0iODYgNzcuMSA4NC4zIDg3LjggODUuMSAxMTQuNyA4OS4xIDk0LjMgODYgNzcuMSIvPgogICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtNiIgcG9pbnRzPSI4OS4xIDk0LjMgODUuMSAxMTQuNyA4OCAxMTYuNyAxMDUuNiAxMDMuMSAxMDYuMSA4OS40IDg5LjEgOTQuMyIvPgogICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtNiIgcG9pbnRzPSI0Ny41IDg5LjQgNDcuOSAxMDMuMSA2NS42IDExNi43IDY4LjQgMTE0LjcgNjQuNCA5NC4zIDQ3LjUgODkuNCIvPgogICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtMyIgcG9pbnRzPSI4OS41IDEzNS41IDg5LjcgMTI5LjkgODguMSAxMjguNiA2NS40IDEyOC42IDY0IDEyOS45IDY0LjEgMTM1LjUgNDUuMSAxMjYuNSA1MS43IDEzMS45IDY1LjIgMTQxLjIgODguMyAxNDEuMiAxMDEuOCAxMzEuOSAxMDguNCAxMjYuNSA4OS41IDEzNS41Ii8+CiAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy05IiBwb2ludHM9Ijg4IDExNi43IDg1LjEgMTE0LjcgNjguNCAxMTQuNyA2NS42IDExNi43IDY0IDEyOS45IDY1LjQgMTI4LjYgODguMSAxMjguNiA4OS43IDEyOS45IDg4IDExNi43Ii8+CiAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy0yIiBwb2ludHM9IjE0OC41IDQ3IDE1My41IDIyLjYgMTQ1LjkgMCA4OCA0Mi42IDExMC4zIDYxLjMgMTQxLjggNzAuNSAxNDguNyA2Mi40IDE0NS43IDYwLjIgMTUwLjUgNTUuOSAxNDYuOCA1MyAxNTEuNiA0OS40IDE0OC41IDQ3Ii8+CiAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy0yIiBwb2ludHM9IjAgMjIuNiA1LjEgNDcgMS45IDQ5LjQgNi43IDUzLjEgMyA1NS45IDcuOCA2MC4yIDQuOCA2Mi40IDExLjggNzAuNSA0My4zIDYxLjMgNjUuNiA0Mi42IDcuNiAwIDAgMjIuNiIvPgogICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtNiIgcG9pbnRzPSIxNDEuOCA3MC41IDExMC4zIDYxLjMgMTE5LjggNzUuNiAxMDUuNiAxMDMuMSAxMjQuNCAxMDIuOCAxNTIuNCAxMDIuOCAxNDEuOCA3MC41Ii8+CiAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy02IiBwb2ludHM9IjQzLjMgNjEuMyAxMS44IDcwLjUgMS4zIDEwMi44IDI5LjIgMTAyLjggNDcuOSAxMDMuMSAzMy44IDc1LjYgNDMuMyA2MS4zIi8+CiAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy02IiBwb2ludHM9Ijg2IDc3LjEgODggNDIuNiA5Ny4xIDE4LjEgNTYuNCAxOC4xIDY1LjYgNDIuNiA2Ny42IDc3LjEgNjguNCA4Ny45IDY4LjQgMTE0LjcgODUuMSAxMTQuNyA4NS4yIDg3LjkgODYgNzcuMSIvPgogICAgICA8L2c+CiAgICA8L2c+CiAgICA8ZyBpZD0iY2FyZGFub19hZGEiIGRhdGEtbmFtZT0iY2FyZGFubyBhZGEiPgogICAgICA8ZyBpZD0iY2FyZGFub19hZGEtMiIgZGF0YS1uYW1lPSJjYXJkYW5vIGFkYS0yIj4KICAgICAgICA8Y2lyY2xlIGlkPSJf0K3Qu9C70LjQv9GBXzYiIGRhdGEtbmFtZT0i0K3Qu9C70LjQv9GBIDYiIGNsYXNzPSJjbHMtNCIgY3g9IjEyOC4wNSIgY3k9IjEyMi41NiIgcj0iNDEuMTUiLz4KICAgICAgICA8cGF0aCBpZD0iX9Ct0LvQu9C40L/RgV82X9C60L7Qv9C40Y9fMjkiIGRhdGEtbmFtZT0i0K3Qu9C70LjQv9GBIDYg0LrQvtC/0LjRjyAyOSIgY2xhc3M9ImNscy04IiBkPSJNMTIzLjQ2LDEwOS45M2MyLjI1LDAsNC4wNywxLjgyLDQuMDcsNC4wNywwLDIuMjUtMS44Miw0LjA3LTQuMDcsNC4wNy0yLjI1LDAtNC4wNy0xLjgyLTQuMDctNC4wNywwLTIuMjUsMS44Mi00LjA3LDQuMDctNC4wN1pNMTMzLjI4LDEwOS45M2MyLjI1LDAsNC4wNywxLjgyLDQuMDcsNC4wNywwLDIuMjUtMS44Miw0LjA3LTQuMDcsNC4wNy0yLjI1LDAtNC4wNy0xLjgyLTQuMDctNC4wNywwLTIuMjUsMS44Mi00LjA3LDQuMDctNC4wN2gwWk0xMzMuMjgsMTI3LjA1YzIuMjUsMCw0LjA3LDEuODIsNC4wNyw0LjA3LDAsMi4yNS0xLjgyLDQuMDctNC4wNyw0LjA3LTIuMjUsMC00LjA3LTEuODItNC4wNy00LjA3LDAtMi4yNSwxLjgyLTQuMDcsNC4wNy00LjA3aDAsMFpNMTIzLjQ2LDEyNy4wNWMyLjI1LDAsNC4wNywxLjgyLDQuMDcsNC4wNywwLDIuMjUtMS44Miw0LjA3LTQuMDcsNC4wNy0yLjI1LDAtNC4wNy0xLjgyLTQuMDctNC4wNywwLTIuMjUsMS44Mi00LjA3LDQuMDctNC4wN1pNMTE4LjQxLDExOC42M2MyLjI1LDAsNC4wNywxLjgyLDQuMDcsNC4wNywwLDIuMjUtMS44Miw0LjA3LTQuMDcsNC4wNy0yLjI1LDAtNC4wNy0xLjgyLTQuMDctNC4wNywwLTIuMjUsMS44Mi00LjA3LDQuMDctNC4wN2gwWk0xMzguMzMsMTE4LjYzYzIuMjUsMCw0LjA3LDEuODIsNC4wNyw0LjA3LDAsMi4yNS0xLjgyLDQuMDctNC4wNyw0LjA3LTIuMjUsMC00LjA3LTEuODItNC4wNy00LjA3LDAtMi4yNSwxLjgyLTQuMDcsNC4wNy00LjA3aDBaTTE0Mi45NiwxMTEuNjJjMS4zOSwwLDIuNTIsMS4xMywyLjUyLDIuNTMsMCwxLjM5LTEuMTMsMi41Mi0yLjUzLDIuNTItMS4zOSwwLTIuNTItMS4xMy0yLjUyLTIuNTJzMS4xMy0yLjUyLDIuNTItMi41MmgwWk0xNDIuOTYsMTI4LjQ1YzEuMzksMCwyLjUyLDEuMTMsMi41MiwyLjUzLDAsMS4zOS0xLjEzLDIuNTItMi41MywyLjUyLTEuMzksMC0yLjUyLTEuMTMtMi41Mi0yLjUyczEuMTMtMi41MiwyLjUyLTIuNTJoMFpNMTEzLjc4LDEyOC40NWMxLjM5LDAsMi41MiwxLjEzLDIuNTIsMi41MywwLDEuMzktMS4xMywyLjUyLTIuNTMsMi41Mi0xLjM5LDAtMi41Mi0xLjEzLTIuNTItMi41MiwwLTEuMzksMS4xMy0yLjUyLDIuNTMtMi41MmgwWk0xMTMuNzgsMTExLjYyYzEuMzksMCwyLjUyLDEuMTMsMi41MiwyLjUzLDAsMS4zOS0xLjEzLDIuNTItMi41MywyLjUyLTEuMzksMC0yLjUyLTEuMTMtMi41Mi0yLjUyLDAtMS4zOSwxLjEzLTIuNTIsMi41My0yLjUyaDBaTTEyOC4zNywxMDMuMmMxLjM5LDAsMi41MiwxLjEzLDIuNTIsMi41MywwLDEuMzktMS4xMywyLjUyLTIuNTMsMi41Mi0xLjM5LDAtMi41Mi0xLjEzLTIuNTItMi41MnMxLjEzLTIuNTIsMi41Mi0yLjUyaDBaTTEyOC4zNywxMzYuODZjMS4zOSwwLDIuNTIsMS4xMywyLjUyLDIuNTMsMCwxLjM5LTEuMTMsMi41Mi0yLjUzLDIuNTItMS4zOSwwLTIuNTItMS4xMy0yLjUyLTIuNTJzMS4xMy0yLjUyLDIuNTItMi41MmgwWk0xMzkuMTcsMTM5LjM5YzEuMTYsMCwyLjEuOTQsMi4xLDIuMSwwLDEuMTYtLjk0LDIuMS0yLjEsMi4xLTEuMTYsMC0yLjEtLjk0LTIuMS0yLjFzLjk0LTIuMSwyLjEtMi4xaDBaTTExNy41NywxMzkuMzljMS4xNiwwLDIuMS45NCwyLjEsMi4xLDAsMS4xNi0uOTQsMi4xLTIuMSwyLjEtMS4xNiwwLTIuMS0uOTQtMi4xLTIuMXMuOTQtMi4xLDIuMS0yLjFoMFpNMTE3LjU3LDEwMS41MmMxLjE2LDAsMi4xLjk0LDIuMSwyLjEsMCwxLjE2LS45NCwyLjEtMi4xLDIuMS0xLjE2LDAtMi4xLS45NC0yLjEtMi4xcy45NC0yLjEsMi4xLTIuMWgwWk0xMzkuMTcsMTAxLjUyYzEuMTYsMCwyLjEuOTQsMi4xLDIuMSwwLDEuMTYtLjk0LDIuMS0yLjEsMi4xLTEuMTYsMC0yLjEtLjk0LTIuMS0yLjFzLjk0LTIuMSwyLjEtMi4xaDBaTTE1MC4xMSwxMjAuMzFjMS4xNiwwLDIuMS45NCwyLjEsMi4xLDAsMS4xNi0uOTQsMi4xLTIuMSwyLjEtMS4xNiwwLTIuMS0uOTQtMi4xLTIuMSwwLTEuMTYuOTQtMi4xLDIuMS0yLjFoMFpNMTA2LjYyLDEyMC4zMWMxLjE2LDAsMi4xLjk0LDIuMSwyLjEsMCwxLjE2LS45NCwyLjEtMi4xLDIuMS0xLjE2LDAtMi4xLS45NC0yLjEtMi4xcy45NC0yLjEsMi4xLTIuMWgwWk0xMDUuMDgsMTA3LjQxYy45MywwLDEuNjguNzUsMS42OCwxLjY4cy0uNzUsMS42OC0xLjY4LDEuNjgtMS42OC0uNzUtMS42OC0xLjY4aDBjMC0uOTMuNzUtMS42OCwxLjY4LTEuNjhoMFpNMTA1LjA4LDEzNC4zNGMuOTMsMCwxLjY4Ljc1LDEuNjgsMS42OHMtLjc1LDEuNjgtMS42OCwxLjY4LTEuNjgtLjc1LTEuNjgtMS42OGgwYzAtLjkzLjc1LTEuNjgsMS42OC0xLjY4aDBaTTE1MS42NiwxMzQuMzRjLjkzLDAsMS42OC43NSwxLjY4LDEuNjgsMCwuOTMtLjc1LDEuNjgtMS42OCwxLjY4cy0xLjY4LS43NS0xLjY4LTEuNjhoMGMwLS45My43NS0xLjY4LDEuNjgtMS42OGgwWk0xNTEuNjYsMTA3LjQxYy45MywwLDEuNjguNzUsMS42OCwxLjY4LDAsLjkzLS43NSwxLjY4LTEuNjgsMS42OHMtMS42OC0uNzUtMS42OC0xLjY4aDBjMC0uOTMuNzUtMS42OCwxLjY4LTEuNjhoMFpNMTI4LjM3LDkzLjk0Yy45MywwLDEuNjguNzUsMS42OCwxLjY4LDAsLjkzLS43NSwxLjY4LTEuNjgsMS42OC0uOTMsMC0xLjY4LS43NS0xLjY4LTEuNjhoMGMwLS45My43NS0xLjY4LDEuNjgtMS42OGgwWk0xMjguMzcsMTQ3LjhjLjkzLDAsMS42OC43NSwxLjY4LDEuNjgsMCwuOTMtLjc1LDEuNjgtMS42OCwxLjY4LS45MywwLTEuNjgtLjc1LTEuNjgtMS42OHMuNzUtMS42OCwxLjY4LTEuNjhoMFpNMTQzLjI0LDE0Ni42OGMuNzcsMCwxLjQuNjMsMS40LDEuNCwwLC43Ny0uNjMsMS40LTEuNCwxLjRzLTEuNC0uNjMtMS40LTEuNGgwYzAtLjc3LjYzLTEuNCwxLjQtMS40Wk0xMTMuNSwxNDYuNjhjLjc3LDAsMS40LjYzLDEuNCwxLjRzLS42MywxLjQtMS40LDEuNC0xLjQtLjYzLTEuNC0xLjRoMGMwLS43Ny42My0xLjQsMS40LTEuNFpNMTEzLjUsOTUuNjNjLjc3LDAsMS40LjYzLDEuNCwxLjRzLS42MywxLjQtMS40LDEuNC0xLjQtLjYzLTEuNC0xLjRoMGMwLS43Ny42My0xLjQsMS40LTEuNGgwWk0xNDMuMjQsOTUuNjNjLjc3LDAsMS40LjYzLDEuNCwxLjQsMCwuNzctLjYzLDEuNC0xLjQsMS40cy0xLjQtLjYzLTEuNC0xLjRoMGMwLS43Ny42My0xLjQsMS40LTEuNGgwWk0xNTcuODMsMTIxLjE2Yy43NywwLDEuNC42MywxLjQsMS40LDAsLjc3LS42MywxLjQtMS40LDEuNHMtMS40LS42My0xLjQtMS40aDBjMC0uNzguNjMtMS40LDEuNC0xLjRoMFpNOTguOTEsMTIxLjE2Yy43NywwLDEuNC42MywxLjQsMS40cy0uNjMsMS40LTEuNCwxLjQtMS40LS42My0xLjQtMS40aDBjMC0uNzguNjMtMS40LDEuNC0xLjRoMFoiLz4KICAgICAgPC9nPgogICAgPC9nPgogIDwvZz4KPC9zdmc+",
              version: "version",
            });
          } else {
            resolve(undefined);
          }
        });
    });
  } catch (err) {
    return Promise.resolve(undefined);
  }
}
