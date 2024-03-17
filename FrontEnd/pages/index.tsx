import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Logo from "./Img/Logo.svg";
import Screen from "./Img/screen.png";
import Mushroom1 from "./Gifs/Mushrooms/1.gif";
import Peas1 from "./Gifs/Peas/peas_1.gif";
import Rice1 from "./Gifs/Rice/rice_1.gif";
import Meditation1 from "./Gifs/Meditation/meditation_1.gif";
import Background from "./Img/background.png";
import Gnome1Image from "./Img/baseImg.png";
import Stats from "./Img/stats.png";
import Gnome2Image from "./Img/cute.png";
import BoopLine from "./Img/boopline.png";
import DanceImage from "./Gifs/Dance/dance_1.gif";
import SmokeImage from "./Gifs/Bong/bong_1.gif";
import SOL from "./solana.svg";
import { usePrivy } from "@privy-io/react-auth";
import { MouseEventHandler } from "react";
import type { StaticImageData } from "next/image";

import {
  fetchQuote,
  swapFromEvm,
  swapFromSolana,
  Quote,
} from "@mayanfinance/swap-sdk";
import {
  Box,
  Button,
  Stack,
  Flex,
  Center,
  Text,
  SimpleGrid,
  Link,
} from "@chakra-ui/react";
import {
  useAccount,
  useConnect,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";
import { useDebounce } from "usehooks-ts";
import React, { useState, useEffect } from "react";

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

import { LogDescription, parseEther, formatEther } from "ethers";

const Home: NextPage = () => {
  const [isSol, setSol] = useState<boolean>(false);
  const [chainTo, setChainTo] = useState<string>("eth"); // Initialize with an empty string or the default chain
  const [emotic, setEmotion] = useState<string>("base"); // Initialize with an empty string or the default chain
  const [emoID, setEmotionId] = useState<number>(0);
  const [hovered, setHovered] = useState<boolean>(false);
  const [hovered1, setHovered1] = useState<boolean>(false);
  const [hovered2, setHovered2] = useState<boolean>(false);

  interface GnomeEat {
    mushroom: string;
    rice: string;
    peas: string;
  }
  // Define the StaticImageData type as an array if not already defined
  type StaticImageData1 = any[]; // Assuming StaticImageData is an array type

  // Define the Gnome interface

  interface Gnome {
    [key: string]: StaticImageData | string; // Allow any string key with StaticImageData or string value
  }

  // Define gnome metadata
  const gnomeMetadata: Gnome[] = [
    {
      mushroom: Mushroom1,
      rice: Rice1,
      peas: Peas1,
      dance: DanceImage,
      meditate: Meditation1,
      smoke: SmokeImage,
    },
    // Add more gnome metadata entries as needed
  ];
  const gnomeBaseMetadata: Gnome[] = [
    {
      base: Gnome1Image,
      happy: Gnome1Image,
      cute: Gnome2Image,
      // Assuming Gnome1Image, Gnome2Image, etc., are defined somewhere
    },
    // Add more gnome metadata entries as needed
  ];
  interface Backgrounds {
    [key: string]: string;
  }
  const background: Backgrounds = {
    feed: "https://nftstorage.link/ipfs/bafkreierd42xegvwnyhp7lunzsx3gn5fhzmvj4hyqzjexycwzl6i4wzrwi",
    boop: "https://nftstorage.link/ipfs/bafkreihm4x52tj7vfx4vvvptk42rqkzomlj7pzdozv4rvaxiv4pfo6yoeq",
    items:
      "https://nftstorage.link/ipfs/bafkreiguepmudqft26eou36kuix5rhfdmmehxzcvpt6ma3d6bkt377gznm",
  };
  const Game = () => {
    const account = useAccount();
    const connect = useConnect();
    const network = useNetwork();
    const [selectedOption, setSelectedOption] = useState("feed");
    const [selectedAction, setSelectedAction] = useState("mushroom");
    const [selectedBase, setSelectedBase] = useState("base");
    const GnomeToken = "0x42069d11A2CC72388a2e06210921E839Cfbd3280";
    const GnomeFactory = "0x42069d11A2CC72388a2e06210921E839Cfbd3280";
    const GnomeNFT = "0x42069d11A2CC72388a2e06210921E839Cfbd3280";
    const GnomeGame = "0x42069d11A2CC72388a2e06210921E839Cfbd3280";

    const contractAddresses: {
      [key: string]: {
        GnomeToken?: string;
        GnomeFactory?: string;
        GnomeNFT?: string;
        GnomeGame?: string;
        GnomeBooper?: string;
        GnomeActivities?: string;
      };
    } = {
      "1": {
        GnomeToken: "3a457262cAc0b6B29B54F976e3F58a3CF8998Ea2",
        GnomeFactory: "CC03a9D85A5a8A6045595f52a00ce36A3041885a",
        GnomeGame: "CC03a9D85A5a8A6045595f52a00ce36A3041885a",
        GnomeBooper: "CC03a9D85A5a8A6045595f52a00ce36A3041885a",
      },
      "10": {
        GnomeToken: "3a457262cAc0b6B29B54F976e3F58a3CF8998Ea2",
        GnomeFactory: "CC03a9D85A5a8A6045595f52a00ce36A3041885a",
        GnomeGame: "CC03a9D85A5a8A6045595f52a00ce36A3041885a",
        GnomeBooper: "CC03a9D85A5a8A6045595f52a00ce36A3041885a",
      },
      "42161": {
        GnomeToken: "3a457262cAc0b6B29B54F976e3F58a3CF8998Ea2",
        GnomeFactory: "CC03a9D85A5a8A6045595f52a00ce36A3041885a",
        GnomeGame: "CC03a9D85A5a8A6045595f52a00ce36A3041885a",
        GnomeBooper: "CC03a9D85A5a8A6045595f52a00ce36A3041885a",
      },
      "11155111": {
        GnomeToken: "A540706bC622EC9D1f4b55475D395791314ACA13",
        GnomeFactory: "F81e37ce7d209B5471a7f01CB7740E239753f873",
        GnomeGame: "F7809999cfb5B042ca65851cef6fAD27bdaf73D5",
        GnomeBooper: "CC03a9D85A5a8A6045595f52a00ce36A3041885a",
      },
    };
    console.log("network", network.chain?.id);

    const [referralCode, setCode] = useState<string>("");
    const [isFromWhormHole, setWhormHole] = useState<boolean>(false);

    const [SolBridge, setSolBridge] = useState<string | undefined>(undefined);
    const [whormholeGnome, setWhormholeGnome] = useState<string | undefined>(
      undefined
    );
    const [chainTo, setChainTo] = useState<string>("eth"); // Initialize with an empty string or the default chain
    const debouncedChain = useDebounce<string>(chainTo, 1000);
    const debouncedreferralCode = useDebounce<string>(referralCode, 1000);
    const chainId = network.chain?.id;
    const [allowanceamount, setAllowanceamount] = useState<number>(0);
    useEffect(() => {
      // Check if chainId and contractAddresses exist
      if (chainId && contractAddresses[chainId]) {
        const { GnomeToken, GnomeFactory, GnomeGame, GnomeBooper } =
          contractAddresses[chainId];
        // Set the addresses with "0x" prefix if they exist
        if (whormholeGnome) setWhormholeGnome(`${whormholeGnome}`);
        if (SolBridge) setSolBridge(`${SolBridge}`);
      }
    }, [chainId]);
    const eatinGif = [
      "https://nftstorage.link/ipfs/bafkreib2ug6px3npvxgww3gmqcoqsw7u3sbh6tnhdevxot42evqx72bc6i",
      "https://nftstorage.link/ipfs/bafybeibg2omkjmsas5gdiq5sbtqtoxiuosjlhqvvsakgagcjcxqk5oqo7i",
      "https://nftstorage.link/ipfs/bafkreicaxf3de3pj42svmgufyrnjgi2dj2e4ln2zsfceabagn4h4zj2vje",
    ];
    const [players, setPlayers] = useState([
      { id: 1, name: "@Gnome0xLand" },
      { id: 2, name: "Player 2" },
      { id: 3, name: "Player 3" },
      { id: 4, name: "Player 3" },
      { id: 5, name: "Player 3" },
      { id: 6, name: "Player 3" },
      { id: 7, name: "Player 3" },
      // Add more players as needed
    ]);
    const [isGnomming, setisGnomming] = useState(false);

    const handleActionClick = (action: string, timeout: number) => {
      setisGnomming(true);
      setSelectedAction(action);

      // Set a timeout to reset the animation after the specified duration
      setTimeout(() => setisGnomming(false), timeout);
    };

    const [hasGnomeAllowance, setHasGnomeAllowance] = useState(false);
    const { logout, user, login } = usePrivy();
    const { config: boop } = usePrepareContractWrite({
      address: "0x42069d11A2CC72388a2e06210921E839Cfbd3280",
      abi: [
        {
          inputs: [
            {
              internalType: "string",
              name: "_chainTo",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "_amount",
              type: "uint256",
            },
          ],
          name: "bridge",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
      ],
      functionName: "bridge",
      args: [debouncedChain, debouncedreferralCode],
      value: parseEther("0.01"),
    });

    const { write: boopGnome } = useContractWrite(boop);

    const { data: balance } = useContractRead({
      address: whormholeGnome ? `0x${whormholeGnome}` : undefined,
      abi: [
        {
          constant: true,
          inputs: [{ internalType: "address", name: "owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
      ],
      functionName: "balanceOf",
      args: [account.address],
    });
    const { config: wrapConfig } = usePrepareContractWrite({
      address: SolBridge ? `0x${SolBridge}` : undefined,
      abi: [
        {
          inputs: [
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "wrap",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      functionName: "wrap",
      args: [debouncedreferralCode.toString()],
    });

    const { config: wrapSolConfig } = usePrepareContractWrite({
      address: SolBridge ? `0x${SolBridge}` : undefined,
      abi: [
        {
          inputs: [
            { internalType: "uint256", name: "amount", type: "uint256" },
          ],
          name: "unwrap",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      functionName: "unwrap",
      args: [debouncedreferralCode.toString()],
    });

    const { write: wrapwrite } = useContractWrite(wrapConfig);
    const { write: wrapwriteSol } = useContractWrite(wrapSolConfig);
    const { config: approveConfig } = usePrepareContractWrite({
      // Update the contract address and ABI for the approval function
      address: GnomeToken,
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      functionName: "approve", // Update with the actual function name for approval
      args: [
        SolBridge ? `0x${SolBridge}` : undefined,
        "115792089237316195423570985008687907853269984665640564039457584007913129639935",
      ],
    });
    const { config: approveConfigSol } = usePrepareContractWrite({
      // Update the contract address and ABI for the approval function
      address: whormholeGnome ? `0x${whormholeGnome}` : undefined,
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      functionName: "approve", // Update with the actual function name for approval
      args: [
        SolBridge ? `0x${SolBridge}` : undefined,
        "115792089237316195423570985008687907853269984665640564039457584007913129639935",
      ],
    });

    const { data: data1 } = useContractRead({
      address: GnomeToken,
      abi: [
        {
          constant: true,
          inputs: [
            { internalType: "address", name: "owner", type: "address" },
            { internalType: "address", name: "spender", type: "address" },
          ],
          name: "allowance",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
      ],
      functionName: "allowance",
      args: [account.address, SolBridge ? `0x${SolBridge}` : undefined],
    });
    console.log(account.address);
    console.log("allowance", data1);
    console.log("allowance", `0x${SolBridge}`);
    const { data: data2 } = useContractRead({
      address: whormholeGnome ? `0x${whormholeGnome}` : undefined,
      abi: [
        {
          constant: true,
          inputs: [
            { internalType: "address", name: "owner", type: "address" },
            { internalType: "address", name: "spender", type: "address" },
          ],
          name: "allowance",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
      ],
      functionName: "allowance",
      args: [account.address, SolBridge ? `0x${SolBridge}` : undefined],
    });

    console.log("balanceof", balance);
    const { write: approveWrite } = useContractWrite(approveConfig);
    const { write: approveWriteSol } = useContractWrite(approveConfigSol);
    const copyToClipboard = async () => {
      if (whormholeGnome)
        await navigator.clipboard.writeText(`0x${whormholeGnome}`);
    };

    const handleBoopClick = (playerId: number) => {
      // Logic to handle booping a player
      console.log(`Boop player with ID ${playerId}`);
    };

    return (
      <div
        className="max-wrap pad-wrap max-14 mt-70"
        style={{ marginBottom: "100px", width: "100vw", overflow: "visible" }}
      >
        <div
          className="rm-module module bdr"
          style={{
            left: isMobile ? "-35%" : "0%",
            width: isMobile ? "170%" : "",
            overflow: "visible",
            height: "600px",
          }}
        >
          <div>
            <Image
              src={Background}
              alt="My SVG"
              style={{
                overflow: "scroll",
                position: "absolute",
                top: "90px",
                left: "60px",
                width: "475px",
                height: "360px",
              }}
            />
          </div>
          <div className="mod-slide" style={{ overflow: "visible" }}>
            <Image
              src={Screen}
              alt="My SVG"
              style={{
                overflow: "scroll",
                position: "absolute",
                borderRadius: "25px",

                top: "-150px",

                width: "550px",
                zIndex: "10",
              }}
            />

            <div>
              <Image
                src={
                  isGnomming
                    ? gnomeMetadata[0][selectedAction]
                    : gnomeBaseMetadata[0][selectedBase]
                }
                alt="My SVG"
                style={{
                  overflow: "scroll",

                  transform: "scaleX(-1)",
                  position: "absolute",
                  top: "155px",
                  left: "10%",
                  width: "220px",
                }}
              />
            </div>
            <Image
              src={Stats}
              alt="My SVG"
              style={{
                overflow: "scroll",

                position: "absolute",
                top: "28px",
                left: "45%",
                width: "145px",
              }}
            />
            <div className="header-year"></div>

            <div
              className="module-contents"
              style={{ position: "relative", left: "100px" }}
            >
              <img
                src={background[selectedOption]}
                className="lazy-load"
                alt=""
                style={{
                  overflow: "scroll",
                  position: "absolute",
                  width: "699px",
                  top: "-10px",
                  right: "-10px",
                  zIndex: -1,
                }}
              />
              <div>
                <div>
                  <div
                    style={{
                      overflow: "hidden",
                      color: "black",
                      height: isMobile ? "120%" : "110%",
                    }}
                  >
                    {" "}
                    <div>
                      <div className="top-button-container">
                        <button
                          className={`top-button ${
                            selectedOption === "feed" ? "selected" : ""
                          }`}
                          onClick={() => setSelectedOption("feed")}
                        ></button>
                        <button
                          className={`top-button ${
                            selectedOption === "boop" ? "selected" : ""
                          }`}
                          onClick={() => setSelectedOption("boop")}
                        ></button>
                        <button
                          className={`top-button ${
                            selectedOption === "items" ? "selected" : ""
                          }`}
                          onClick={() => setSelectedOption("items")}
                        ></button>
                      </div>
                      {selectedOption === "boop" && (
                        <div className="player-list">
                          <h2>Leaderboard</h2>
                          <div
                            style={{
                              height: "450px",
                              overflow: "scroll",
                            }}
                          >
                            <ul
                              className="player-list-container"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-around",
                              }}
                            >
                              {players.map((player) => (
                                <div>
                                  <Image
                                    src={BoopLine}
                                    alt="My SVG"
                                    style={{
                                      overflow: "scroll",
                                      zIndex: -1,

                                      width: "585px",
                                    }}
                                  />
                                  <li
                                    key={player.id}
                                    style={{
                                      display: "flex",

                                      flexDirection: "row",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <img
                                      src={`https://nftstorage.link/ipfs/bafybeib54u57mk4yfu2ypszszp3ub5kstpmq4n5qmywyafp4m4aavao3ke`}
                                      alt={`Gnome ${player.id}`}
                                      className="gnome-image"
                                      style={{
                                        position: "relative",
                                        width: "45px",
                                        top: "0px",
                                        justifyContent: "space-between",
                                      }}
                                    />
                                    <span className="player-name">
                                      {player.name}
                                    </span>
                                    <div className="player-info">
                                      <button
                                        className="boop-button"
                                        onClick={() =>
                                          handleBoopClick(player.id)
                                        }
                                      >
                                        Boop
                                      </button>
                                    </div>
                                  </li>
                                </div>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                      {selectedOption === "feed" && (
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <div style={{}}>
                            {" "}
                            <div className="feed-grid">
                              <div
                                className="item-grid"
                                style={{
                                  position: "relative",
                                  top: "100px",
                                  right: "20px",
                                }}
                              >
                                <div
                                  className="feeditem"
                                  onClick={() =>
                                    handleActionClick("mushroom", 2000)
                                  }
                                >
                                  🫛
                                </div>
                                <div
                                  className="feeditem"
                                  onClick={() =>
                                    handleActionClick("mushroom", 2000)
                                  }
                                >
                                  🍚{" "}
                                </div>
                                <div
                                  className="feeditem"
                                  onClick={() =>
                                    handleActionClick("mushroom", 2000)
                                  }
                                >
                                  🍄
                                </div>
                                <div
                                  className="feeditem"
                                  onClick={() =>
                                    handleActionClick("mushroom", 2000)
                                  }
                                >
                                  🍌
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="activity-grid">
                            <div
                              className="item-grid"
                              style={{
                                position: "relative",
                                top: "100px",
                                right: "20px",
                              }}
                            >
                              <div
                                className="feeditem"
                                onClick={() => handleActionClick("dance", 7000)}
                              >
                                🕺
                              </div>
                              <div
                                className="feeditem"
                                onClick={() =>
                                  handleActionClick("meditate", 18000)
                                }
                              >
                                🧘
                              </div>
                              <div
                                className="feeditem"
                                onClick={() => handleActionClick("smoke", 1000)}
                              >
                                🌿⚗️
                              </div>
                            </div>
                          </div>{" "}
                        </div>
                      )}
                      {selectedOption === "items" && (
                        <div>
                          <div className="feed-grid">
                            <h4>Hats</h4>
                            <div className="item-grid">
                              <div className="item">🫛</div>
                              <div className="item">🍄</div>
                              <div className="item"> 🥕</div>
                              <div className="item">🍚</div>
                              <div className="item">🫛</div>
                              <div className="item">🍄</div>
                            </div>
                            <h4>Glasses</h4>
                            <div className="item-grid">
                              <div className="item">
                                <img
                                  src={`https://bafkreiaok2it5lvq7igrlovdh643fyeu7wqzsu2g7bv7d3u2eb26ad5mdq.ipfs.nftstorage.link/`}
                                  alt={`Nouns`}
                                  className="gnome-image"
                                  style={{
                                    position: "relative",
                                    width: "55px",
                                    height: "30px",
                                    top: "0px",
                                    justifyContent: "space-between",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Mint = () => {
    const account = useAccount();
    const connect = useConnect();
    const network = useNetwork();

    const handleMouseEnter = () => {
      setHovered(true); // Set hovered state to true on mouse enter
    };
    const handleMouseEnter1 = () => {
      setHovered1(true); // Set hovered state to true on mouse enter
    };
    const handleMouseEnter2 = () => {
      setHovered2(true); // Set hovered state to true on mouse enter
    };

    const handleMouseLeave = () => {
      setHovered(false); // Set hovered state to false on mouse leave
    };
    const handleMouseLeave1 = () => {
      setHovered1(false); // Set hovered state to false on mouse leave
    };
    const handleMouseLeave2 = () => {
      setHovered2(false); // Set hovered state to false on mouse leave
    };

    const handleClick = () => {
      setEmotion("base"); // Reset emotion state to 0 on click
      setEmotionId(0);
    };
    const handleClick1 = () => {
      setEmotion("happy"); // Reset emotion state to 0 on click
      setEmotionId(1);
    };
    const handleClick2 = () => {
      setEmotion("cute"); // Reset emotion state to 0 on click
      setEmotionId(2);
    };
    const contractAddresses: {
      [key: string]: {
        GnomeToken?: string;
        GnomeFactory?: string;
        GnomeNFT?: string;
        GnomeGame?: string;
        GnomeBooper?: string;
        GnomeActivities?: string;
      };
    } = {
      "1": {
        GnomeToken: "3a457262cAc0b6B29B54F976e3F58a3CF8998Ea2",
        GnomeFactory: "CC03a9D85A5a8A6045595f52a00ce36A3041885a",
        GnomeGame: "CC03a9D85A5a8A6045595f52a00ce36A3041885a",
        GnomeBooper: "CC03a9D85A5a8A6045595f52a00ce36A3041885a",
      },
      "10": {
        GnomeToken: "3a457262cAc0b6B29B54F976e3F58a3CF8998Ea2",
        GnomeFactory: "CC03a9D85A5a8A6045595f52a00ce36A3041885a",
        GnomeGame: "CC03a9D85A5a8A6045595f52a00ce36A3041885a",
        GnomeBooper: "CC03a9D85A5a8A6045595f52a00ce36A3041885a",
      },
      "42161": {
        GnomeToken: "3a457262cAc0b6B29B54F976e3F58a3CF8998Ea2",
        GnomeFactory: "CC03a9D85A5a8A6045595f52a00ce36A3041885a",
        GnomeGame: "CC03a9D85A5a8A6045595f52a00ce36A3041885a",
        GnomeBooper: "CC03a9D85A5a8A6045595f52a00ce36A3041885a",
      },
      "8453": {
        GnomeToken: "A540706bC622EC9D1f4b55475D395791314ACA13",
        GnomeFactory: "CC03a9D85A5a8A6045595f52a00ce36A3041885a",
        GnomeGame: "CC03a9D85A5a8A6045595f52a00ce36A3041885a",
        GnomeBooper: "CC03a9D85A5a8A6045595f52a00ce36A3041885a",
      },
      "11155111": {
        GnomeToken: "A540706bC622EC9D1f4b55475D395791314ACA13",
        GnomeFactory: "F81e37ce7d209B5471a7f01CB7740E239753f873",
        GnomeGame: "F7809999cfb5B042ca65851cef6fAD27bdaf73D5",
        GnomeBooper: "CC03a9D85A5a8A6045595f52a00ce36A3041885a",
      },
    };
    console.log("network", network.chain?.id);

    const [referralCode, setCode] = useState<string>("");
    const [isFromWhormHole, setWhormHole] = useState<boolean>(false);

    const [gnomeAdress, setgnomeAdress] = useState<string | undefined>(
      undefined
    );
    const [gnomeFactory, setgnomeFactory] = useState<string | undefined>(
      undefined
    );
    const [gnomeGame, setGnomeGame] = useState<string | undefined>(undefined);
    const [gnomeBooper, setGnomeBooper] = useState<string | undefined>(
      undefined
    );

    const [chainTo, setChainTo] = useState<string>("eth"); // Initialize with an empty string or the default chain
    const debouncedChain = useDebounce<string>(chainTo, 1000);
    const debouncedreferralCode = useDebounce<string>(referralCode, 1000);
    const chainId = network.chain?.id;
    const [allowanceamount, setAllowanceamount] = useState<number>(0);

    const [hasGnomeAllowance, setHasGnomeAllowance] = useState(false);

    const { logout, user, login, linkTwitter } = usePrivy();

    useEffect(() => {
      // Check if chainId and contractAddresses exist
      if (chainId && contractAddresses[chainId]) {
        const { GnomeToken, GnomeFactory, GnomeGame, GnomeBooper } =
          contractAddresses[chainId];
        // Set the addresses with "0x" prefix if they exist
        setgnomeAdress(`${GnomeToken}`);
        setgnomeFactory(GnomeFactory);
        setGnomeGame(`${GnomeGame}`);
        setGnomeBooper(`${GnomeBooper}`);
      }
    }, [chainId]);

    const { data: GnomePrice } = useContractRead({
      address: gnomeFactory ? `0x${gnomeFactory}` : undefined,
      abi: [
        {
          inputs: [],
          name: "getGnomeNFTPrice",
          outputs: [
            { internalType: "uint256", name: "priceGnome", type: "uint256" },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      functionName: "getGnomeNFTPrice",
      args: [],
    });

    const { data: gnomeId } = useContractRead({
      address: gnomeGame ? `0x${gnomeGame}` : undefined,
      abi: [
        {
          inputs: [{ internalType: "address", name: "", type: "address" }],
          name: "gnomeAddressId",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
      ],
      functionName: "gnomeAddressId",
      args: [account.address],
    });
    const [gnomeIdValue, setGnomeIdValue] = useState(gnomeId);
    useEffect(() => {
      // Function to fetch the gnomeId
      const fetchGnomeId = async () => {
        setGnomeIdValue(gnomeId);
        console.log("fetchingGnomeId", gnomeId);
      };

      // Initial fetch
      fetchGnomeId();

      // Set interval to fetch gnomeId every 15 seconds
      const interval = setInterval(fetchGnomeId, 15000);

      // Cleanup function to clear the interval
      return () => clearInterval(interval);
    }, [gnomeGame, account.address]); // Add dependencies if needed
    const [gnomePrice, setGnomePrice] = useState<number>(0);

    const { data: GnomePriceReferral } = useContractRead({
      address: gnomeFactory ? `0x${gnomeFactory}` : undefined,
      abi: [
        {
          inputs: [],
          name: "getGnomeNFTPriceReferral",
          outputs: [
            { internalType: "uint256", name: "priceGnome", type: "uint256" },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      functionName: "getGnomeNFTPriceReferral",
      args: [],
    });
    const { config: mintReferralConfig } = usePrepareContractWrite({
      address: gnomeFactory ? `0x${gnomeFactory}` : undefined,
      abi: [
        {
          inputs: [
            { internalType: "string", name: "code", type: "string" },
            { internalType: "string", name: "userX", type: "string" },
            { internalType: "uint256", name: "baseEmotion", type: "uint256" },
          ],
          name: "mintGnomeReferral",
          outputs: [
            { internalType: "uint256", name: "_tokenId", type: "uint256" },
            { internalType: "uint128", name: "liquidity", type: "uint128" },
            { internalType: "uint256", name: "amount0", type: "uint256" },
            { internalType: "uint256", name: "amount1", type: "uint256" },
            { internalType: "uint256", name: "refund0", type: "uint256" },
            { internalType: "uint256", name: "refund1", type: "uint256" },
          ],
          stateMutability: "payable",
          type: "function",
        },
      ],
      functionName: "mintGnomeReferral",
      args: [referralCode, user?.twitter?.username?.toString(), emoID],
      value: GnomePriceReferral
        ? (BigInt(101) * BigInt(Number(GnomePriceReferral))) / BigInt(100)
        : undefined,
    });

    const { data: balance } = useContractRead({
      address: gnomeAdress ? `0x${gnomeAdress}` : undefined,
      abi: [
        {
          constant: true,
          inputs: [{ internalType: "address", name: "owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
      ],
      functionName: "balanceOf",
      args: [account.address],
    });

    const { config: approveConfig } = usePrepareContractWrite({
      // Update the contract address and ABI for the approval function
      address: gnomeAdress ? `0x${gnomeAdress}` : undefined,
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      functionName: "approve", // Update with the actual function name for approval
      args: [
        gnomeFactory ? `0x${gnomeFactory}` : undefined,
        "115792089237316195423570985008687907853269984665640564039457584007913129639935",
      ],
    });
    console.log("userTwitter", user?.twitter?.username);

    const { config: mintConfig } = usePrepareContractWrite({
      // Update the contract address and ABI for the approval function
      address: gnomeFactory ? `0x${gnomeFactory}` : undefined,
      abi: [
        {
          inputs: [
            { internalType: "string", name: "userX", type: "string" },
            { internalType: "uint256", name: "baseEmotion", type: "uint256" },
          ],
          name: "mintGnome",
          outputs: [
            { internalType: "uint256", name: "_tokenId", type: "uint256" },
            { internalType: "uint128", name: "liquidity", type: "uint128" },
            { internalType: "uint256", name: "amount0", type: "uint256" },
            { internalType: "uint256", name: "amount1", type: "uint256" },
            { internalType: "uint256", name: "refund0", type: "uint256" },
            { internalType: "uint256", name: "refund1", type: "uint256" },
          ],
          stateMutability: "payable",
          type: "function",
        },
      ],
      functionName: "mintGnome", // Update with the actual function name for approval
      args: [user?.twitter?.username?.toString(), Number(emoID)],
      value: GnomePrice
        ? (BigInt(101) * BigInt(Number(GnomePrice))) / BigInt(100)
        : undefined,
    });
    const { write: mintReferralWrite } = useContractWrite(mintReferralConfig);
    const { write: approveWrite } = useContractWrite(approveConfig);
    const { write: mintWrite } = useContractWrite(mintConfig);

    return (
      <>
        {Number(gnomeIdValue) < 100000000 ? (
          <div
            className="max-wrap pad-wrap max-14 mt-70"
            style={{
              marginBottom: "100px",
              width: "100vw",
              overflow: "visible",
            }}
          >
            <div
              className="rm-module module bdr"
              style={{
                left: isMobile ? "-35%" : "0%",
                width: isMobile ? "170%" : "",
                overflow: "visible",
                height: "600px",
              }}
            >
              <div>
                <Image
                  src={Background}
                  alt="My SVG"
                  style={{
                    overflow: "scroll",
                    position: "absolute",
                    top: "90px",
                    left: "60px",
                    width: "475px",
                    height: "360px",
                  }}
                />
              </div>
              <div className="mod-slide" style={{ overflow: "visible" }}>
                <Image
                  src={Screen}
                  alt="My SVG"
                  style={{
                    overflow: "scroll",
                    position: "absolute",
                    borderRadius: "25px",

                    top: "-150px",

                    width: "550px",
                    zIndex: "10",
                  }}
                />
                <Image
                  src={gnomeBaseMetadata[0][emotic]}
                  alt="My SVG"
                  style={{
                    overflow: "scroll",
                    position: "absolute",
                    top: "175px",
                    left: "6%",
                    width: "280px",
                  }}
                />

                <div className="header-year"></div>
                <div
                  className="module-contents"
                  style={{
                    left: isMobile ? "5%" : "",
                    width: isMobile ? "100%" : "",
                    height: "550px",
                    overflow: "scroll",
                    top: isMobile ? "-100%" : "",
                  }}
                >
                  <div
                    className="slide-wrap rm has-swipe"
                    data-cur="0"
                    data-total="4"
                    data-modw="0"
                    data-gap="12"
                    data-swipe-max="1024"
                    style={{ overflow: "scroll" }}
                  >
                    <div
                      className="rm-slide inner module on"
                      data-year="2023"
                      data-num="0"
                    >
                      <div
                        className="rm-contents"
                        style={{
                          overflow: "scroll",
                          color: "black",
                          height: isMobile ? "120%" : "110%",
                        }}
                      >
                        <ul className="has-check p-sm">
                          <li>
                            <p style={{ fontWeight: "800" }}>
                              Gnomes Supply: 1260/3333
                            </p>
                            <ul>
                              Market Price per Gnome:{" "}
                              {typeof GnomePrice === "bigint"
                                ? `${
                                    (112 *
                                      Number(formatEther(BigInt(GnomePrice)))) /
                                    100
                                  } Ξ`
                                : "Undefined"}
                            </ul>
                          </li>
                          <li>
                            <p style={{ fontWeight: "800" }}>
                              Choose the base Emotion of your Gnome!
                            </p>
                            <ul>
                              Factory Price per Gnome:{" "}
                              {typeof GnomePrice === "bigint"
                                ? `${Number(formatEther(BigInt(GnomePrice)))} Ξ`
                                : "Undefined"}
                            </ul>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "10px",
                              }}
                            >
                              <div
                                style={{
                                  backgroundColor:
                                    emotic == "base"
                                      ? "#E0CBB6"
                                      : hovered
                                      ? "#E0CBB6"
                                      : "", // Change background color when hovered
                                  borderRadius: "15px",
                                  width: "55px",
                                }}
                                onMouseEnter={handleMouseEnter} // Set hovered state to true on mouse enter
                                onMouseLeave={handleMouseLeave} // Set hovered state to false on mouse leave
                                onClick={handleClick} // Set emotion to 0 on click
                              >
                                <img
                                  src="  https://nftstorage.link/ipfs/bafybeib54u57mk4yfu2ypszszp3ub5kstpmq4n5qmywyafp4m4aavao3ke"
                                  className="lazy-load"
                                  alt=""
                                  style={{
                                    overflow: "scroll",
                                    position: "relative",
                                    left: "5%",
                                    width: "50px",
                                    height: "60px",
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  backgroundColor:
                                    emotic == "happy"
                                      ? "#E0CBB6"
                                      : hovered1
                                      ? "#E0CBB6"
                                      : "", // Change background color when hovered
                                  borderRadius: "15px",
                                  width: "55px",
                                }}
                                onMouseEnter={handleMouseEnter1} // Set hovered state to true on mouse enter
                                onMouseLeave={handleMouseLeave1} // Set hovered state to false on mouse leave
                                onClick={handleClick1} // Set emotion to 0 on click
                              >
                                <img
                                  src=" https://nftstorage.link/ipfs/bafybeid2qj6ceomje47h57od7x4u3q66cj2yai3sx5btbfq3mrsno7xtey"
                                  className="lazy-load"
                                  alt=""
                                  style={{
                                    overflow: "scroll",
                                    position: "relative",
                                    top: "0px",
                                    left: "5%",
                                    width: "50px",
                                    height: "60px",
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  backgroundColor:
                                    emotic == "cute"
                                      ? "#E0CBB6"
                                      : hovered2
                                      ? "#E0CBB6"
                                      : "", // Change background color when hovered
                                  borderRadius: "15px",
                                  width: "55px",
                                }}
                                onMouseEnter={handleMouseEnter2} // Set hovered state to true on mouse enter
                                onMouseLeave={handleMouseLeave2} // Set hovered state to false on mouse leave
                                onClick={handleClick2} // Set emotion to 0 on click
                              >
                                <img
                                  src="  https://nftstorage.link/ipfs/bafybeiaobxgvtux2mb2cpfxnupum6mmrdlgk25n4kgk5qzifk4blggjhq4"
                                  className="lazy-load"
                                  alt=""
                                  style={{
                                    overflow: "scroll",
                                    position: "relative",
                                    top: "0px",
                                    left: "4%",
                                    width: "50px",
                                    height: "60px",
                                  }}
                                />
                              </div>
                            </div>
                            <button
                              type="submit"
                              style={{
                                position: "relative",

                                backgroundColor: "#509cee",
                                borderRadius: "8px",
                                height: "40px",
                                top: "15%",
                                width: "25%",

                                alignItems: "center",
                                left: "70%",
                                color: "white",
                              }}
                              onClick={
                                mintWrite as MouseEventHandler<HTMLButtonElement>
                              }
                            >
                              {"mint"}
                            </button>
                          </li>

                          <li>
                            <p style={{ fontWeight: "800" }}>
                              If you have a referral from fren you can mint with
                              a discount!
                            </p>
                            <ul>
                              Referral Price per Gnome:{" "}
                              {typeof GnomePriceReferral === "bigint"
                                ? `${Number(
                                    formatEther(BigInt(GnomePriceReferral))
                                  )} Ξ`
                                : "Undefined"}
                            </ul>
                            <form
                              id="subscribe-form"
                              className="subscribe-form global-form"
                              action=""
                              method="post"
                              onSubmit={(e) => {
                                e.preventDefault();
                              }}
                            >
                              <div
                                className="email-wrap field-wrap cta-btn"
                                style={{ width: "80%", left: "10%" }}
                              >
                                <div className="input-wrap">
                                  <input
                                    type="string"
                                    name="Gnomes"
                                    data-type="req"
                                    placeholder="referral code"
                                    value={referralCode} // Make sure to bind the value to the state variable
                                    onChange={(e) => setCode(e.target.value)}
                                  />
                                </div>

                                {user ? (
                                  <button
                                    type="submit"
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      backgroundColor: "#509cee",
                                      borderRadius: "10px",
                                      height: "70%",
                                      top: "15%",
                                      width: "20%",
                                      right: "2%",
                                      color: "white",
                                    }}
                                    onClick={
                                      mintReferralWrite as MouseEventHandler<HTMLButtonElement>
                                    }
                                  >
                                    {" "}
                                    <div
                                      style={{
                                        position: "relative",
                                        width: "80%",
                                        height: "50%",
                                        top: "20%",
                                        left: "10%",
                                      }}
                                    >
                                      mint
                                    </div>
                                  </button>
                                ) : (
                                  <button
                                    type="submit"
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      backgroundColor: "#509cee",
                                      borderRadius: "15px",
                                      height: "70%",
                                      top: "15%",
                                      width: "20%",
                                      right: "2%",
                                      color: "white",
                                    }}
                                  >
                                    <div
                                      style={{
                                        position: "relative",
                                        width: "80%",
                                        height: "50%",
                                        top: "20%",
                                        left: "10%",
                                      }}
                                      onClick={login}
                                    >
                                      Link X
                                    </div>
                                  </button>
                                )}
                              </div>
                            </form>
                          </li>
                        </ul>

                        <div>
                          <div> </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Game />
        )}
      </>
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>GnomeLand App Desktop</title>
        <meta content="" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <div
          style={{
            display: "flex",
            gap: "100px",
            height: "75px",
          }}
        >
          <Image
            src={Logo}
            alt="My SVG"
            width={20}
            height={20}
            style={{
              position: "absolute",
              width: "100px",
              top: "5%",
              left: "5%",
            }}
          />
          <div
            style={{
              position: "absolute",

              top: "10%",
              right: "5%",
            }}
          >
            {" "}
            <ConnectButton />
          </div>
        </div>
        {}
        <Mint />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://gnomeland.money"
          rel="noopener noreferrer"
          target="_blank"
        >
          Made with ❤️ by your Gnome Frens
        </a>
      </footer>
    </div>
  );
};

export default Home;
