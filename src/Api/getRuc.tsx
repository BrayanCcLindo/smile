// import { useState } from "react";

// export const fetchData = async () => {
//   const [data, setData] = useState();

//   const API_URL =
//     "https://cors-anywhere.herokuapp.com/https://api.apis.net.pe/v2/sunat/ruc";
//   const RUC_NUMBER = "20100047218";
//   const API_TOKEN = "apis-token-10321.OHos93XKFsJbnoCo1cUeE9txq16C7Gxb";

//   try {
//     const response = await fetch(`${API_URL}?numero=${RUC_NUMBER}`, {
//       headers: {
//         Authorization: API_TOKEN,
//         "Content-Type": "application/json"
//       }
//     });

//     console.log(response, "response");

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const ruc = await response.json();

//     setData(ruc);
//   } catch (error) {
//     console.error("Fetch error:", error);
//     // Handle error state here
//   }
//   return { data };
// };

// import { useState, useEffect } from "react";

// const useRucData = (rucNumber: string) => {
//   const [data, setData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const API_URL =
//       "https://cors-anywhere.herokuapp.com/https://api.apis.net.pe/v2/sunat/ruc";
//     const API_TOKEN = "apis-token-10321.OHos93XKFsJbnoCo1cUeE9txq16C7Gxb";

//     const fetchData = async () => {
//       setIsLoading(true);
//       setError(null);

//       try {
//         const response = await fetch(`${API_URL}?numero=${rucNumber}`, {
//           method: "GET",
//           headers: {
//             Authorization: API_TOKEN,
//             "Content-Type": "application/json"
//           }
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const ruc = await response.json();
//         setData(ruc);
//       } catch (error) {
//         console.error("Fetch error:", error);
//         setError(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [rucNumber]);

//   return { data, isLoading, error };
// };

// export default useRucData;
