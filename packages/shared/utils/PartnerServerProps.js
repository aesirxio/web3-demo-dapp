import AesirXOptions from "@utils/AesirXOptions";
import { AesirXHelper } from "aesirx-toolkit/packages/aesirx-js-library";

async function BecomePartnerServerProps() {
  const res = await AesirXHelper(
    "GET",
    "content",
    "category",
    {
      "filter[search]": "become-partner",
      includeFields: 1,
      includeItemsFields: 1,
      includeItems: 1,
    },
    AesirXOptions
  );
  if (!res?.status === 200) {
    return {
      notFound: true,
    };
  }
  const resItems = await AesirXHelper(
    "GET",
    "content",
    "item",
    {
      "filter[catid]": res?.body?.items?.[0]?.id,
      includeFields: 1,
      includeItemsFields: 1,
      includeItems: 1,
      "list[ordering]": "i.ordering",
    },
    AesirXOptions
  );

  if (!resItems?.status === 200) {
    return {
      notFound: true,
    };
  }
  const form = resItems?.body?.items?.find((item) => item.alias === "become-partner-form");

  const formContent = await AesirXHelper(
    "GET",
    "redform",
    "redform",
    { id: form?.form_id },
    AesirXOptions
  );

  const params = res?.body?.items?.[0]?.params;
  const SEO = {
    title: params?.page_title ?? null,
    description: params?.meta_description ?? null,
    h1: params?.page_heading ?? null,
    url: `${process.env.NEXTAUTH_URL}/partner`,
    seo_image: res?.body?.items?.[0]?.seo_image ?? null,
  };

  return {
    props: {
      data: resItems?.body?.items ?? null,
      form: { fields: formContent?.body?.fields ?? [], id: form?.form_id ?? null },
      SEO: SEO,
    }, // will be passed to the page component as props
    revalidate: 60,
  };
}

async function ConnectPartnerServerProps() {
  const res = await AesirXHelper(
    "GET",
    "content",
    "category",
    {
      "filter[search]": "connect-partner",
      includeFields: 1,
      includeItemsFields: 1,
      includeItems: 1,
    },
    AesirXOptions
  );
  if (!res?.status === 200) {
    return {
      notFound: true,
    };
  }
  const resItems = await AesirXHelper(
    "GET",
    "content",
    "item",
    {
      "filter[catid]": res?.body?.items?.[0]?.id,
      includeFields: 1,
      includeItemsFields: 1,
      includeItems: 1,
      "list[ordering]": "i.ordering",
    },
    AesirXOptions
  );

  if (!resItems?.status === 200) {
    return {
      notFound: true,
    };
  }
  const form = resItems?.body?.items?.find((item) => item.alias === "connect-partner-form");

  const formContent = await AesirXHelper(
    "GET",
    "redform",
    "redform",
    { id: form?.form_id },
    AesirXOptions
  );

  const params = res?.body?.items?.[0]?.params;
  const SEO = {
    title: params?.page_title ?? null,
    description: params?.meta_description ?? null,
    h1: params?.page_heading ?? null,
    url: `${process.env.NEXTAUTH_URL}/partner/connect-partner`,
    seo_image: res?.body?.items?.[0]?.seo_image ?? null,
  };

  return {
    props: {
      data: resItems?.body?.items ?? null,
      form: { fields: formContent?.body?.fields ?? [], id: form?.form_id ?? null },
      SEO: SEO,
    }, // will be passed to the page component as props
    revalidate: 60,
  };
}

export { BecomePartnerServerProps, ConnectPartnerServerProps };
