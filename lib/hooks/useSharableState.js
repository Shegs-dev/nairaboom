import { useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import useUser from "./useUser";

const onEvent = (something) => {
};

export const fetchData = async () => {
  await fetchEventSource(`https://staging.nairaboom.ng/api/fetch_clock`, {
    headers: {
      "X-APP-KEY": "7ey11nw9z2L6j6V4bZQ4594",
      // Authorization: `Bearer ${bearerToken}`,
    },
    onopen(res) {
      if (res.ok && res.status === 200) {
      } else if (res.status >= 400 && res.status < 500 && res.status !== 429) {
      }
    },
    onmessage(ev) {
      const parsedData = ev.data;
      onEvent(parsedData);
    },
    onclose() {
    },
    onerror(err) {
    },
  });
};
