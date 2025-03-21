import { useEffect, useState } from "react";

export default function GetRemoteAddress() {
  const [ip, setIp] = useState("Fetching...");

  const getRemoteIP = async () => {
    try {
      const response = await fetch("https://api64.ipify.org?format=json"); // Supports IPv4 & IPv6
      const data = await response.json();
      setIp(data.ip);
    } catch (error) {
      console.error("Error fetching IP:", error);
      setIp("Error fetching IP");
    }
  };

  useEffect(() => {
    getRemoteIP();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <h2>Your Remote IP Address:</h2>
      <p>{ip}</p>
    </div>
  );
}
