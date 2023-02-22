import Link from "next/link";
import logo_img from "@public/images/Logo.svg";
import Image from "next/image";
import RegisterForm from "./RegisterForm";
import { NextSeo } from "next-seo";

const Register = ({ SEO_image }) => {
  return (
    <>
      <NextSeo
        title="AesirX | Register"
        noindex={true}
        nofollow={true}
        openGraph={{
          images: [
            {
              alt: "AesirX ",
              url: SEO_image?.src,
            },
          ],
        }}
      />
      <div
        className="sign-in position-fixed start-0 top-0 bottom-0 end-0 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "#f0f3fb" }}
      >
        <div className="text-primary">
          <div className="text-center mb-4">
            <Link href="/" passHref>
              <a>
                <Image
                  quality={100}
                  src={logo_img}
                  width={141}
                  height={36}
                  alt="logo image"
                ></Image>
              </a>
            </Link>
          </div>
          <div className="sign-in-form bg-white rounded-4">
            <h3 className="font-robotoslab fs-9 text-center mb-4 lh-base">Register</h3>
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
