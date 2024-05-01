import { createBrowserRouter, Navigate } from "react-router-dom";
import { GitApp } from "../GitApp";

import { ListView, IssueView, InfiniteListView } from "../issues/views";

export const router = createBrowserRouter([
  {
    path: "/issues",
    element: <GitApp />,
    children: [
      { path: "list", element: <ListView /> },
      { path: "list/infinite", element: <InfiniteListView /> },
      { path: "issue/:id", element: <IssueView /> },
      { path: "*", element: <Navigate to="list" /> },
    ],
  },
  {
    path: "/",
    element: <Navigate to="issues/list" />,
  },
  {
    path: "*",
    element: <GitApp />,
    children: [
      {
        path: "*",
        element: <p>No hay ningún contenido para esta dirección</p>,
      },
    ],
  },
]);
