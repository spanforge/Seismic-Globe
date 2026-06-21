import "./globals.css";

export const metadata = {
  title: "Seismic Globe",
  description: "Live global earthquake visualizer and creative globe nature project."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
