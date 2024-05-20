"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#000",
  borderColor: "red",
  boxShadow: 24,
  p: 4,
};
export function WatchlistCard({ id, name, tickers, addTicker }) {
  const [newTicker, setNewTicker] = useState();
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

  return (
    <>
      {/* {JSON.stringify(tickers)} */}

      <div className=" max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 w-96">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            {name}
          </h5>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {tickers.map((element) => {
              console.log(element);
              return (
                <li key={element} className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {element.ticker}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {element.close_price}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <Button onClick={handleOpen}>Add Ticker</Button>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          display: "block",
          padding: 30,
          margin: "auto",
        }}
      >
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add ticker in {name}
              </Typography>
              <br />
              <div className="w-72">
                <div className="relative w-full min-w-[200px] h-10">
                  <input
                    className="peer w-full mb-3 h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder=" "
                    onChange={(e): ChangeEvent<HTMLInputElement> => {
                      setNewTicker(e.target.value);
                    }}
                  />
                  <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                    ticker
                  </label>
                </div>
              </div>
              <Button
                className="mt-2"
                onClick={async () => {
                  addTicker(id, {
                    ticker: newTicker,
                    close_price: -1,
                  });
                  let res = await axios.post(
                    "http://localhost:8000/api/addTicker",
                    {
                      name: name,
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
            </Box>
          </Modal>
        </div>
        <Snackbar
          // anchorOrigin={"top", "center" }
          open={openn}
          autoHideDuration={4000}
          onClose={handleClosee}
          message="Ticker Added"
        />
      </div>
    </>
  );
}
