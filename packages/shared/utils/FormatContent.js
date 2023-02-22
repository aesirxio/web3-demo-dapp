import parse from "html-react-parser";
import useTrans from "@hook/useTrans";
import en from "@shared_lang/en";
import vi from "@shared_lang/vi";

const formatContent = (content) => {
  if (!content) {
    return null;
  }
  let cto = [];
  let count = 0;
  let formId = null;
  const regexRedForm = /{redform\}(.*?)\{\/redform\}/g;

  parse(content, {
    replace: (domeNode) => {
      if (domeNode.name && domeNode.name.includes("h2")) {
        cto.push({ title: domeNode.children[0].data, href: `title-${count}`, id: `${count}` });
        count++;
      }
      if (regexRedForm.exec(domeNode?.data)) {
        formId = domeNode?.data.replace("{redform}", "").replace("{/redform}", "");
      }
    },
  });

  return { cto, formId };
};

const formatMenuOurTeam = (menuData) => {
  const trans = useTrans(en, vi);

  if (!menuData) return [];
  let data = [{ title: `${trans.our_team.txt_all}`, href: "/our-team/all", slug: "all" }];
  menuData.forEach((item) => {
    data.push({ title: item.title, href: `/our-team/${item.alias}`, slug: item.alias });
  });
  return data;
};

const calculateReadTime = (content) => {
  if (!content) return 0;
  const regexHtmlTag = /<[^>]*>?/gm;
  const contentLength = content.replace(regexHtmlTag, "").split(" ").length;
  return Math.ceil(contentLength / 220).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
};

const getBreadCrumbs = (url, isBlogHome) => {
  let listBreadcrumbs = [{ href: "/", title: "Homepage" }];
  const formatTitle = (string) => {
    try {
      const url = string.replaceAll("-", " ");
      switch (url) {
        case "blog":
          return "News and Articles";
        case "our team":
          return "Meet our team";
        case "docs":
          return "Documentation";
        default:
          return url;
      }
    } catch (error) {
      return string;
    }
  };
  const formatHref = (href) => {
    switch (href) {
      case "/our-team":
        return "/our-team/all";
      default:
        return href;
    }
  };
  if (url === "/") {
    return listBreadcrumbs;
  } else {
    const list = url.split("?")[0].split("#")[0].split("/").slice(1);
    if (isBlogHome) {
      const position = list.indexOf("blog");
      if (position > -1) {
        list.splice(position, 1);
      }
    }
    let href = "";
    list.map((item) => {
      href += `/${item}`;
      listBreadcrumbs.push({
        href: formatHref(href),
        title: formatTitle(item),
      });
    });
  }
  return listBreadcrumbs;
};

const formatDataFromAPI = (data = [], arrayFormat = []) => {
  if ((data && !data.length) || !arrayFormat.length) return data;
  return arrayFormat.map((componentName) => {
    return data.find((item) => item.alias === componentName);
  });
};

const sliceText = (title, position) => {
  if (position) {
    const arr = title.split(" ");
    return (
      <>
        {arr.slice(0, position).join(" ")}{" "}
        <span className="d-xl-inline-block">{arr.slice(position).join(" ")}</span>
      </>
    );
  } else {
    return title;
  }
};

export {
  sliceText,
  formatContent,
  formatMenuOurTeam,
  calculateReadTime,
  getBreadCrumbs,
  formatDataFromAPI,
};
