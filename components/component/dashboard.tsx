"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { WatchlistCard } from "../ui/listCard";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Snackbar from "@mui/material/Snackbar";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // height: "fit",
  bgcolor: "#000",
  p: 4,
};
interface Ticker {
  ticker: string;
  close_price: number;
}

interface Watchlist {
  id: number;
  name: string;
  tickers: Ticker[];
}
export function Dashboard() {
  const [user, setuser] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .post("http://localhost:8000/api/user", {
        token: localStorage.getItem("token"),
      })
      .then(function (response) {
        console.log(response.data);
        setuser(response.data.user);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const [newWatchlist, setNewWatchlist] = useState("");
  const [newTicker, setNewTicker] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openn, setOpenn] = useState(false);

  const toast = () => {
    setOpenn(true);
  };

  const handleClosee = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenn(false);
  };
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);

  async function hydrateWatchlists() {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/watchlists",
        {
          token: localStorage.getItem("token"),
        }
      );
      console.log(response.data.watchlists);
      setWatchlists(response.data.watchlists);
    } catch (error) {}
  }
  useEffect(() => {
    hydrateWatchlists();
  }, []);
  const addTickerToWatchlist = async (
    watchlistId: number,
    newTicker: Ticker
  ): Promise<void> => {
    let res = await axios.post("http://localhost:8000/api/price", {
      ticker: newTicker.ticker,
    });
    newTicker.close_price = res.data.price;
    // Find the watchlist in the state based on watchlistId
    newTicker.close_price = res.data.price;
    const updatedWatchlists = watchlists.map((watchlist) => {
      if (watchlist.id === watchlistId) {
        return {
          ...watchlist,
          tickers: [...watchlist.tickers, newTicker],
        };
      }
      return watchlist;
    });
    setWatchlists(updatedWatchlists);
  };
  const addWatchlist = async (
    newWatchlist: string,
    newTicker: Ticker
  ): Promise<void> => {
    //add real price of ticker
    let res = await axios.post("http://localhost:8000/api/price", {
      ticker: newTicker.ticker,
    });
    newTicker.close_price = res.data.price;
    setWatchlists((W) => [
      ...W,
      { id: 100, name: newWatchlist, tickers: [newTicker] },
    ]);
  };
  if (!watchlists) {
    return <div>Loading...</div>; // Or any other loading indicator
  }
  return (
    <>
      {/* {JSON.stringify(watchlists)} */}
      <div className="container mx-auto">
        {user&&(
        <>
          <div className="text-3xl font-bold  inline-flex mr-10">
            Watchlists
          </div>
          <Button onClick={handleOpen}>Create Watchlist</Button>
        </>
        )}
        <div className="flex flex-wrap gap-4">
          {watchlists.map((watchlist) => (
            <div key={watchlist.id} className="bg-black rounded shadow p-4">
              <WatchlistCard
                id={watchlist.id}
                name={watchlist.name}
                tickers={watchlist.tickers}
                addTicker={addTickerToWatchlist}
              />
            </div>
          ))}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Watchlist
              </Typography>
              <br />
              <div className="w-72 flex h-min flex-col">
                <div className="relative h-min w-full min-w-[200px] ">
                  <input
                    className="peer my-2 w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder="Watchlist Name"
                    onChange={(e) => {
                      setNewWatchlist(e.target.value);
                    }}
                  />

                  <input
                    className="peer my-2 w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder="Ticker"
                    onChange={(e) => {
                      setNewTicker(e.target.value);
                    }}
                  />
                </div>

                <Button
                  onClick={async () => {
                    addWatchlist(newWatchlist, {
                      ticker: newTicker,
                      close_price: -1,
                    });
                    let res = await axios.post(
                      "http://localhost:8000/api/addTicker",
                      {
                        name: newWatchlist,
                        ticker: newTicker,
                        token: localStorage.getItem("token"),
                      }
                    );
                    console.log(res.data);
                    console.log(res);
                    handleClose();
                    toast();
                  }}
                  variant="outlined"
                >
                  Add
                </Button>
              </div>
            </Box>
          </Modal>
          <Snackbar
            // anchorOrigin={"top", "center" }
            open={openn}
            autoHideDuration={4000}
            onClose={handleClosee}
            message="Watchlist Created & Ticker Added"
          />
        </div>
      </div>
    </>
  );
}
