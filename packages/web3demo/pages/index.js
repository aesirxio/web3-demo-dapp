import dynamic from "next/dynamic";

const ListComponent = dynamic(() => import("@components/List"), {
  ssr: false,
});

export default function Home() {
  return <ListComponent />;
}
