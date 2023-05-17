import html2canvas from "html2canvas";

export const takeScreenshot = async () => {
  const canvas = await html2canvas(document.documentElement);

  const newTab = window.open();
  newTab!.document.write(
    '<img src="' + canvas.toDataURL("image/png") + '" alt="Screenshot"/>'
  );

  return canvas.toDataURL("image/png");
};
