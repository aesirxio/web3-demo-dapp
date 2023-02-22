import { AesirXHelper } from "aesirx-toolkit/packages/aesirx-js-library";
import AesirXOptions from "@utils/AesirXOptions";

const getPageId = async (pageAlias) => {
  const getPageCategory = await AesirXHelper(
    "GET",
    "content",
    "category",
    {
      "filter[search]": pageAlias,
    },
    AesirXOptions
  );
  const pageCategoryId = getPageCategory?.body?.items?.[0]?.id;

  return pageCategoryId ?? null;
};

const getCategoryItems = async (pageId, categoryAlias, webAlias) => {
  const getCategory = await AesirXHelper(
    "GET",
    "content",
    "category",
    !pageId
      ? {
          "filter[search]": categoryAlias,
        }
      : {
          "filter[parentid]": pageId,
          "filter[search]": categoryAlias,
        },
    AesirXOptions
  );

  const getItems = await AesirXHelper(
    "GET",
    "content",
    "item",
    {
      "filter[catid]": getCategory?.body?.items?.[0]?.id,
    },
    AesirXOptions
  );
  return { alias: webAlias, list: getItems?.body?.items ?? [] };
};

export { getCategoryItems, getPageId };
