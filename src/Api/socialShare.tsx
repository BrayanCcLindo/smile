export const handleShareURL = (currentURL: string) => {
  navigator.clipboard
    .writeText(currentURL)
    .then(() => {
      console.log("Contenido copiado al portapapeles!");
    })
    .catch((err) => {
      console.error("Error al copiar el contenido: ", err);
    });
};
export const handleShareFaceBook = (currentURL: string) => {
  const facebookShareURL = `https://www.facebook.com/dialog/share?app_id=${998174781912745}&display=popup&href=${encodeURIComponent(
    currentURL
  )}`;

  window.open(facebookShareURL, "_blank", "noopener,noreferrer");
};
