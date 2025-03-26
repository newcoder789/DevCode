import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthClient } from "@dfinity/auth-client";
import { Menu, X } from 'lucide-react';
import { ConnectWallet } from "@nfid/identitykit/react";
import { useAuth } from "../src/StateManagement/useContext/useClient";

const ConnectBtn = ({ onClick }) => (

  <button
    onClick={onClick}
    className=" bg-white"
  >
    <div className=" w-full h-full  rounded-xl flex items-center justify-center  ">
      Connect Wallet
    </div>
  </button>
);


const Navbar = ({ identity, setIdentity, setActor }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated,  principal,actor } = useAuth();



  // const handleLogin = async () => {
  //   const authClient = await AuthClient.create();
  //   await authClient.login({
  //     identityProvider: process.env.DFX_NETWORK === "ic" ? "https://identity.ic0.app" : "http://br5f7-7uaaa-aaaaa-qaaca-cai.localhost:4943/",
  //     onSuccess: async () => {
  //       try {
  //         const identity = authClient.getIdentity();
  //         setIdentity(identity);

  //         const { Actor, HttpAgent } = await import("@dfinity/agent");
  //         const { idlFactory } = await import("../../declarations/ModelX_backend");

  //         const agent = new HttpAgent({ identity });
  //         if (process.env.DFX_NETWORK !== "ic") {
  //           await agent.fetchRootKey();
  //         }
  //         const actorInstance = Actor.createActor(idlFactory, {
  //           agent,
  //           canisterId: process.env.CANISTER_ID || "br5f7-7uaaa-aaaaa-qaaca-cai",
  //         });
  //         setActor(actorInstance);
  //         navigate("/");
  //       } catch (error) {
  //         console.log("Error while creating agents:", error);
  //       }
  //     },
  //     onError: (err) => console.log("Auth client error:", err),
  //   });
  // };



  // const handleLogout = async () => {
  //   const authClient = await AuthClient.create();
  //   await authClient.logout();
  //   setIdentity(null);
  //   setActor(null);
  //   navigate("/");
  // };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Desktop Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              className="w-6 h-6 mr-2"
              src="/favicon.ico"
              alt="Dev Code Logo"
            />
            <span className="text-xl font-bold text-gray-900">Dev Code</span>
          </Link>
        </div>

        {/* Navigation Links and Search */}
        <nav className="hidden md:flex items-center space-x-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search models."
              className="pl-8 pr-4 py-1 rounded-lg border border-gray-300 text-gray-600 text-sm focus:outline-none focus:border-gray-500"
            />
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
          <Link to="/ModelPage" className="text-gray-600 hover:text-gray-900 text-sm">
            Models
          </Link>
          <Link to="/createmodel" className="text-gray-600 hover:text-gray-900 text-sm">
            Create Model
          </Link>
          <Link to="/governence" className="text-gray-600 hover:text-gray-900 text-sm">
            Governance
          </Link>
          <Link to="/create-bounty" className="text-gray-600 hover:text-gray-900 text-sm">
            Create Bounty
          </Link>
          <Link to="/CommunityActivity" className="text-gray-600 hover:text-gray-900 text-sm">
          CommunityActivity
          </Link>
          {/* <Link to="/pricing" className="text-gray-600 hover:text-gray-900 text-sm">
            Pricing
          </Link> */}
          {/* {identity ? (
           <button
           onClick={handleLogout}
           className="text-white bg-red-500 border border-red-600 px-4 py-2 rounded-md text-sm font-semibold 
                      hover:bg-red-600 hover:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
         >
           Log Out
         </button>        
          ) : (
            <>
              <button
                onClick={handleLogin}
                className="text-gray-600 hover:text-gray-900 text-sm"
              >
                Log In
              </button>
            </>
          )} */}
          {!isAuthenticated && (
          <div className="hidden font-posterama md:block">
            <ConnectWallet
              connectButtonComponent={ConnectBtn}
              className="rounded-full bg-black"
            />
          </div>
        )}

        {/* User Info */}
        {isAuthenticated && (
          <div className=" hidden md:inline-block relative  rounded-2xl bg-gradient-to-r  from-[#f09787] to-[#CACCF5] text-left p-[1.5px]">
            <Link
            to= "/profile/1">
            <button
              // onClick={toggleDropdown}
              className="flex items-center text-white rounded-full"
            >
              <div className="bg-black h-full w-full rounded-2xl flex items-center p-1 px-3">

                <div className="flex flex-col items-start w-24 h-8 lg:w-40 lg:h-full ">
                  <span className=" text-[10px] lg:text-xs text-gray-400 w-full overflow-hidden whitespace-nowrap text-ellipsis">
                    {principal?.toString() || "N/A"}
                  </span>
                </div>

              </div>
            </button>
            </Link>
          </div>

        )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 py-3">
          <div className="space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search models."
                className="w-full pl-8 pr-4 py-1 rounded-lg border border-gray-300 text-gray-600 text-sm focus:outline-none focus:border-gray-500"
              />
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
            <Link
              to="/ModelPage"
              className="block text-gray-600 hover:text-gray-900 text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Models
            </Link>
            <Link
              to="/datasets"
              className="block text-gray-600 hover:text-gray-900 text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Datasets
            </Link>
            <Link
              to="/docs"
              className="block text-gray-600 hover:text-gray-900 text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Docs
            </Link>
            <Link
              to="/pricing"
              className="block text-gray-600 hover:text-gray-900 text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            {identity ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left text-gray-600 hover:text-gray-900 text-sm"
              >
                Log Out
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    handleLogin();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left text-gray-600 hover:text-gray-900 text-sm"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    handleLogin();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left bg-black text-white px-4 py-1 rounded-full text-sm hover:bg-gray-800"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;