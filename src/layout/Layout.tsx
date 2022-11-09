import { ReactNode } from "react";

type LayoutProps = { children: ReactNode };

export const Layout = ({ children }: LayoutProps): JSX.Element => (
  <div style={layoutWrapper}>
    <header style={layoutHeader}>
      <p style={headerTitle}>都道府県アプリ</p>
    </header>
    <main style={mainContent}>{children}</main>
  </div>
);

const layoutWrapper = {
  margin: "10px",
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
} as const;

const layoutHeader = {
  position: "sticky",
  top: 0,
  width: "100%",
  height: "50px",
  backgroundColor: "rgba(255, 255, 255, 0.8);",
  opacity: "0.5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
} as const;

const headerTitle = {
  fontWeight: "bold",
  fontSize: "30px",
} as const;

const mainContent = {
  flexGrow: "1",
} as const;

export default Layout;
