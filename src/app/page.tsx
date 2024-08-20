"use client";
import store from "@/store";
import App from "next/app";
import Image from "next/image";
import { Provider } from "react-redux";
import AutomationPage from "./ui/pages/AutomationPage";


export default function Home() {
  return (
    <Provider store={store}>
    <AutomationPage />
  </Provider>
  );
}
