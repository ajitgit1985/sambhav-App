import React, { useEffect, useState } from "react";
import { embedDashboard } from "@superset-ui/embedded-sdk";
import Back from "../assets/images/back.svg";
import { useParams } from "react-router-dom";

// const id = "93bd7edc-7211-42f1-aba0-e84b38f5fd14";

const ViewDashboard = () => {
  const { dbId } = useParams();
  useEffect(() => {
    const fetchGuestTokenFromBackend = async () => {
      const params = new URLSearchParams({
        username: "admin",
        password: "@@dm1n",
        iframe_user: "iframe",
        first_name: "Yashi",
        last_name: "iframe",
        id: dbId,
      });

      // const response = await fetch(`http://localhost:8088/api/guest_token?${params.toString()}`); // local
      const response = await fetch(
        `http://10.194.83.67/api/guest_token?${params.toString()}`
      );
      const data = await response.json();
      return data.guestToken;
    };

    const embedDashboardWithToken = async () => {
      const token = await fetchGuestTokenFromBackend();
      if (token) {
        embedDashboard({
          id: dbId,
          supersetDomain: "http://10.194.83.67",
          mountPoint: document.getElementById("my-superset-container"),
          fetchGuestToken: () => token,
          dashboardUiConfig: {
            hideTitle: false,
            filters: {
              expanded: false,
            },
            urlParams: {},
          },
        });
      }
    };

    embedDashboardWithToken();
  }, [dbId]);

  return (
    <>
      <div className="App">
        <div className="back_container">
          <div className="btnbox px-1">
            <a href="/dashboard" className="NEbtn back_btn">
              <img src={Back} alt="reset icon" /> Back
            </a>
          </div>
        </div>
        <div id="my-superset-container"></div>
      </div>
    </>
  );
};

// export { id };
export default ViewDashboard;
