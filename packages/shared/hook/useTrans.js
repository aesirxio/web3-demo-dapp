import { useRouter } from "next/router";

const useTrans = (en, vi) => {
  const { locale } = useRouter();

  const trans = locale == "vi" ? vi : en;

  return trans;
};

export default useTrans;
