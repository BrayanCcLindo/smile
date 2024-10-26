export const processPayment = async (tokenId: string, amount: string) => {
  const response = await fetch("http://localhost:3000/api/process-payment", {
    method: "POST",
    headers: {
      Authorization:
        "Bearer TEST-3042054221475233-072601-07360d81f11ca843a6dd94b9c6eecc65-834410747",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: tokenId,
      transaction_amount: parseInt(amount)
    })
  });
  return response.json();
};
